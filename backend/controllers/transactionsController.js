const transactionModel = require("../models/transactionModel");
const connectionMySQL = require("../connectionMySQL");

// Fetches all transactions from MongoDB
exports.getTransactions = async (req, res) => {
  try {
    // Get all transactions from MongoDB
    const allTransactions = await transactionModel.find();
    return res.status(200).json(allTransactions); //**  Respond with the transactions*/
  } catch (error) {
    return res.status(500).json({ error: error.message }); //! Handle error if MongoDB query fails
  }
};

// Fetches a single transaction by ID from MongoDB
exports.getTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await transactionModel.findById(id);
    if (!transaction) return res.status(404).json({ error: "Transaction not found" });
    return res.status(200).json(transaction); //**  Respond with the found transaction */
  } catch (error) {
    return res.status(500).json({ error: error.message }); //! Handle error if MongoDB query fails
  }
};

// Creates a new transaction and saves it to both MongoDB and MySQL for history tracking
exports.createTransaction = async (req, res) => {
  const {
    transactionAccountId,
    transactionNote,
    transactionAmount,
    transactionImage,
    transactionRecurring,
    transactionDate,
    transactionBudgetId,
  } = req.body;


  if (!transactionBudgetId || !transactionAmount || !transactionAccountId || !transactionNote || !transactionDate) {
    return res.status(400).json({ error: "Missing required fields" }); //! Return an error if any field is missing
  }

  let insertedTransaction;

  try {
    // Fetch the budget data from MySQL
    const budget = await new Promise((resolve, reject) => {
      const sql = `SELECT budgetRemaining, budgetAmount FROM budget WHERE budgetId = ? AND budgetAccountId = ?`;
      connectionMySQL.query(sql, [transactionBudgetId, transactionAccountId], (err, rows) => {
        if (err) reject(err);
        else if (rows.length === 0) reject(new Error("Budget not found or account mismatch"));
        else resolve(rows[0]); //? Resolve with budget data if found
      });
    });

    // Fetch the account data from MySQL
    const account = await new Promise((resolve, reject) => {
      const sql = `SELECT accountBalance FROM account WHERE accountId = ?`;
      connectionMySQL.query(sql, [transactionAccountId], (err, rows) => {
        if (err) reject(err);
        else if (rows.length === 0) reject(new Error("Account not found"));
        else resolve(rows[0]); //? Resolve with account data if found
      });
    });

    // Check if the transaction amount exceeds the account balance
    if (transactionAmount > account.accountBalance) {
      return res.status(400).json({ error: "Transaction amount exceeds account balance" });
    } //? partially successful fetch, amount is not correct

    // Save the transaction to MongoDB
    const newTransaction = new transactionModel({
      transactionAccountId,
      transactionNote,
      transactionAmount,
      transactionImage,
      transactionRecurring,
      transactionDate,
      transactionBudgetId,
    });
    insertedTransaction = await newTransaction.save();

    // Save the transaction to MySQL (transactionHistory) for history tracking
    const sqlInsertHistory = `INSERT INTO transactionHistory (transactionAccountId, transactionNote, transactionAmount, transactionImage, transactionRecurring, transactionDate, transactionBudgetId) 
                               VALUES (?, ?, ?, ?, ?, ?, ?)`;
    connectionMySQL.query(sqlInsertHistory, [transactionAccountId, transactionNote, transactionAmount, transactionImage, transactionRecurring, transactionDate, transactionBudgetId], (err, result) => {
      if (err) {
        console.error("Failed to save transaction to history:", err);//! Error if save doesn't pull through
      }
    });

    // Start a transaction in MySQL for updating budget and account
    await new Promise((resolve, reject) => {
      connectionMySQL.beginTransaction(err => {
        if (err) reject(err);
        else resolve(); //? resolves error if possible
      });
    });

    // Update budgetUsed in MySQL by adding the transaction amount
    await new Promise((resolve, reject) => {
      const sql = `UPDATE budget SET budgetUsed = budgetUsed + ? WHERE budgetId = ?`;
      connectionMySQL.query(sql, [transactionAmount, transactionBudgetId], (err, result) => {
        if (err) reject(err);
        else if (result.affectedRows === 0) reject(new Error("Budget update failed")); //! Error if update fails, serverside most likely
        else resolve(); //? resolve if possible
      });
    });

    // Update the account balance with the new transaction amount
    await new Promise((resolve, reject) => {
      const sql = `UPDATE account SET accountBalance = accountBalance - ? WHERE accountId = ?`;
      connectionMySQL.query(sql, [transactionAmount, transactionAccountId], (err, result) => {
        if (err) reject(err);
        else if (result.affectedRows === 0) reject(new Error("Account update failed")); //!Error on update
        else resolve();//? resolve if possible
      });
    });

    // Commit the transaction in MySQL
    await new Promise((resolve, reject) =>{
     connectionMySQL.commit( err => {
      if (err) reject(err); //!error on promise
      else resolve(); //? resolve if possible
     })})
    return res.status(201).json(insertedTransaction); // Respond with the created transaction
  } catch (error) { //!error on insertedTransaction
    await new Promise(resolve => {
      connectionMySQL.rollback(() => resolve());
    });

    // Clean up the MongoDB transaction if needed
    if (insertedTransaction) {
      await transactionModel.deleteOne({ _id: insertedTransaction._id }).catch(err => {
        console.error("Failed to clean up MongoDB transaction:", err.message); //! error on cleanup, function not called properly
      });
    }

    return res.status(500).json({ error: error.message });//! 500 error - server error
  }
};

exports.updateTransaction = async (req, res) => {
  const {
    id,
    transactionAccountId,
    transactionNote,
    transactionAmount,
    transactionImage,
    transactionRecurring,
    transactionDate,
    transactionBudgetId,
  } = req.body;

  if (!id || !transactionBudgetId || !transactionAmount || !transactionAccountId || !transactionNote || !transactionDate) {
    return res.status(400).json({ error: "Missing required fields" }); //! error on input, fields not found/empty
  }

  try {
    // Fetch the old transaction to calculate the difference
    const oldTransaction = await transactionModel.findById(id);
    if (!oldTransaction) {
      return res.status(404).json({ error: "Transaction not found" }); //! error on input, fields not found/empty
    }

    const oldAmount = oldTransaction.transactionAmount;

    // Fetch current account balance
    const account = await new Promise((resolve, reject) => {
      const sql = `SELECT accountBalance FROM account WHERE accountId = ?`;
      connectionMySQL.query(sql, [transactionAccountId], (err, rows) => {
        if (err) reject(err);
        else if (rows.length === 0) reject(new Error("Account not found")); //! error on account
        else resolve(rows[0]); //? resolve if possible
      });
    });

    const difference = transactionAmount - oldAmount;
    const updatedBalance = account.accountBalance - difference;

    // Do not allow account balance to go negative
    if (updatedBalance < 0) {
      return res.status(400).json({ error: "Transaction amount exceeds account balance" }); //! error if amount exceeds balance
    }

    // Begin transaction for MySQL changes
    await new Promise((resolve, reject) => {
      connectionMySQL.beginTransaction(err => {
        if (err) reject(err); //! connection error
        else resolve(); //? resolve if possible
      });
    });

    // Update transaction in MongoDB
    await transactionModel.findByIdAndUpdate(id, {
      transactionAccountId,
      transactionNote,
      transactionAmount,
      transactionImage,
      transactionRecurring,
      transactionDate,
      transactionBudgetId,
    });

    // Update budgetUsed (allow overspending)
    await new Promise((resolve, reject) => {
      const sql = `UPDATE budget SET budgetUsed = budgetUsed + ? WHERE budgetId = ?`;
      connectionMySQL.query(sql, [difference, transactionBudgetId], (err, result) => {
        if (err) reject(err);
        else if (result.affectedRows === 0) reject(new Error("Budget update failed")); //! error on update
        else resolve(); //? resolve if possible
      });
    });

    // Update accountBalance
    await new Promise((resolve, reject) => {
      const sql = `UPDATE account SET accountBalance = accountBalance - ? WHERE accountId = ?`;
      connectionMySQL.query(sql, [difference, transactionAccountId], (err, result) => {
        if (err) reject(err);
        else if (result.affectedRows === 0) reject(new Error("Account update failed")); //! error on update
        else resolve(); //? resolve if possible
      });
    });

    // Commit transaction
    await new Promise((resolve, reject) =>{
    connectionMySQL.commit( err => {
      if (err) reject(err); //! error
      else resolve(); //? resolve if possible
    })})
    return res.status(200).json({ message: "Transaction updated successfully" }); //** Successfully updated  */

  } catch (error) { //! General rollback error
    // Rollback if anything goes wrong
    await new Promise(resolve => {
      connectionMySQL.rollback(() => resolve());
    });
    return res.status(500).json({ error: error.message });
  }
};

// Delete transaction
exports.deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await transactionModel.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Transaction not found" }); //! transactionfield empty/not found
    return res.status(200).json({ message: "Transaction deleted successfully" }); //** Successfully deleted */
  } catch (error) {
    return res.status(500).json({ error: error.message }); //! Serverside error
  }
};


// Fetches all transaction history from MySQL
exports.getTransactionHistory = async (req, res) => {
  try {
    // Query to fetch all transaction history from MySQL
    const sql = `SELECT * FROM transactionHistory ORDER BY createdAt DESC`;
    connectionMySQL.query(sql, (err, rows) => {
      if (err) return res.status(500).json({ error: err.message }); //! Serverside error
      return res.status(200).json(rows); //**  Respond with the transaction history*/
    });
  } catch (error) {
    return res.status(500).json({ error: error.message }); //! Handle error if the query fails
  }
};
