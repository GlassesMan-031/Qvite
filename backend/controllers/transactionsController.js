const transactionModel = require("../models/transactionModel");
const connectionMySQL = require("../connectionMySQL");

// Fetches all transactions from MongoDB
exports.getTransactions = async (req, res) => {
  try {
    // Get all transactions from MongoDB
    const allTransactions = await transactionModel.find();
    return res.status(200).json(allTransactions); // Respond with the transactions
  } catch (error) {
    return res.status(500).json({ error: error.message }); // Handle error if MongoDB query fails
  }
};

// Fetches a single transaction by ID from MongoDB
exports.getTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await transactionModel.findById(id);
    if (!transaction) return res.status(404).json({ error: "Transaction not found" });
    return res.status(200).json(transaction); // Respond with the found transaction
  } catch (error) {
    return res.status(500).json({ error: error.message }); // Handle error if MongoDB query fails
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

  // Check if the required fields are present in the request
  if (!transactionBudgetId || !transactionAmount || !transactionAccountId || !transactionNote || !transactionDate) {
    return res.status(400).json({ error: "Missing required fields" }); // Return an error if any field is missing
  }

  let insertedTransaction;

  try {
    // Fetch the budget data from MySQL
    const budget = await new Promise((resolve, reject) => {
      const sql = `SELECT budgetRemaining, budgetAmount FROM budget WHERE budgetId = ? AND budgetAccountId = ?`;
      connectionMySQL.query(sql, [transactionBudgetId, transactionAccountId], (err, rows) => {
        if (err) reject(err);
        else if (rows.length === 0) reject(new Error("Budget not found or account mismatch"));
        else resolve(rows[0]); // Resolve with budget data if found
      });
    });

    // // Check if the transaction amount exceeds the remaining budget
    // if (transactionAmount > budget.budgetRemaining) {
    //   return res.status(400).json({ error: "Transaction amount exceeds remaining budget" });
    // }

    // Fetch the account data from MySQL
    const account = await new Promise((resolve, reject) => {
      const sql = `SELECT accountBalance FROM account WHERE accountId = ?`;
      connectionMySQL.query(sql, [transactionAccountId], (err, rows) => {
        if (err) reject(err);
        else if (rows.length === 0) reject(new Error("Account not found"));
        else resolve(rows[0]); // Resolve with account data if found
      });
    });

    // Check if the transaction amount exceeds the account balance
    if (transactionAmount > account.accountBalance) {
      return res.status(400).json({ error: "Transaction amount exceeds account balance" });
    }

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
        console.error("Failed to save transaction to history:", err);
      }
    });

    // Start a transaction in MySQL for updating budget and account
    await new Promise((resolve, reject) => {
      connectionMySQL.beginTransaction(err => {
        if (err) reject(err);
        else resolve();
      });
    });

    // Update budgetUsed in MySQL by adding the transaction amount
    await new Promise((resolve, reject) => {
      const sql = `UPDATE budget SET budgetUsed = budgetUsed + ? WHERE budgetId = ?`;
      connectionMySQL.query(sql, [transactionAmount, transactionBudgetId], (err, result) => {
        if (err) reject(err);
        else if (result.affectedRows === 0) reject(new Error("Budget update failed"));
        else resolve();
      });
    });

    // Update the account balance with the new transaction amount
    await new Promise((resolve, reject) => {
      const sql = `UPDATE account SET accountBalance = accountBalance - ? WHERE accountId = ?`;
      connectionMySQL.query(sql, [transactionAmount, transactionAccountId], (err, result) => {
        if (err) reject(err);
        else if (result.affectedRows === 0) reject(new Error("Account update failed"));
        else resolve();
      });
    });

    // Commit the transaction in MySQL
    await new Promise((resolve, reject) =>{
     connectionMySQL.commit( err => {
      if (err) reject(err);
      else resolve();
     })})
    return res.status(201).json(insertedTransaction); // Respond with the created transaction
  } catch (error) {
    // Rollback the transaction if an error occurs
    await new Promise(resolve => {
      connectionMySQL.rollback(() => resolve());
    });

    // Clean up the MongoDB transaction if needed
    if (insertedTransaction) {
      await transactionModel.deleteOne({ _id: insertedTransaction._id }).catch(err => {
        console.error("Failed to clean up MongoDB transaction:", err.message);
      });
    }

    return res.status(500).json({ error: error.message }); // Return an error if something goes wrong
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
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Fetch the old transaction to calculate the difference
    const oldTransaction = await transactionModel.findById(id);
    if (!oldTransaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    const oldAmount = oldTransaction.transactionAmount;

    // Fetch current account balance
    const account = await new Promise((resolve, reject) => {
      const sql = `SELECT accountBalance FROM account WHERE accountId = ?`;
      connectionMySQL.query(sql, [transactionAccountId], (err, rows) => {
        if (err) reject(err);
        else if (rows.length === 0) reject(new Error("Account not found"));
        else resolve(rows[0]);
      });
    });

    const difference = transactionAmount - oldAmount;
    const updatedBalance = account.accountBalance - difference;

    // Do not allow account balance to go negative
    if (updatedBalance < 0) {
      return res.status(400).json({ error: "Transaction amount exceeds account balance" });
    }

    // Begin transaction for MySQL changes
    await new Promise((resolve, reject) => {
      connectionMySQL.beginTransaction(err => {
        if (err) reject(err);
        else resolve();
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
        else if (result.affectedRows === 0) reject(new Error("Budget update failed"));
        else resolve();
      });
    });

    // Update accountBalance
    await new Promise((resolve, reject) => {
      const sql = `UPDATE account SET accountBalance = accountBalance - ? WHERE accountId = ?`;
      connectionMySQL.query(sql, [difference, transactionAccountId], (err, result) => {
        if (err) reject(err);
        else if (result.affectedRows === 0) reject(new Error("Account update failed"));
        else resolve();
      });
    });

    // Commit transaction
    await new Promise((resolve, reject) =>{
    connectionMySQL.commit( err => {
      if (err) reject(err);
      else resolve();
    })})
    return res.status(200).json({ message: "Transaction updated successfully" });

  } catch (error) {
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
    if (!deleted) return res.status(404).json({ error: "Transaction not found" });
    return res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


// Fetches all transaction history from MySQL
exports.getTransactionHistory = async (req, res) => {
  try {
    // Query to fetch all transaction history from MySQL
    const sql = `SELECT * FROM transactionHistory ORDER BY createdAt DESC`;
    connectionMySQL.query(sql, (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.status(200).json(rows); // Respond with the transaction history
    });
  } catch (error) {
    return res.status(500).json({ error: error.message }); // Handle error if the query fails
  }
};

//-----------------------------------------------------------------------------
// OLD (last version)

// const transactionModel = require("../models/transactionModel");
// const connectionMySQL = require("../connectionMySQL")


// // Fetches all transactions from MongoDB
// // Returns: JSON array of all transactions
// // Errors: Returns 500 with error message if query fails
// exports.getTransactions = async (req, res) => {
//   try {
//     const allTransactions = await transactionModel.find();
//     return res.status(200).json(allTransactions);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };


// // Fetches a single transaction by ID from MongoDB
// // Input: Transaction ID in req.params
// // Returns: JSON object of the transaction, or 404 if not found
// // Errors: Returns 500 with error message if query fails
// exports.getTransaction = async (req, res) => {
//   const { id } = req.params; // Changed from req.body to req.params for RESTful API
//   try {
//     const transaction = await transactionModel.findById(id);
//     if (!transaction) return res.status(404).json({ error: "Transaction not found" });
//     return res.status(200).json(transaction);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };

// // Creates a new transaction in MongoDB and updates budget/account in MySQL
// // Input: req.body with transactionAccountId, transactionNote, transactionAmount, transactionImage, transactionRecurring, transactionDate, transactionBudgetId
// // Steps:
// // 1. Validates required fields and budget/account constraints
// // 2. Creates transaction in MongoDB
// // 3. Updates budgetUsed (increases) and accountBalance (decreases) in MySQL within a transaction
// // Returns: Created transaction object with 201 status
// // Errors: Rolls back changes and returns 400/500 with error message
// exports.createTransaction = async (req, res) => {
//   const {
//     transactionAccountId,
//     transactionNote,
//     transactionAmount,
//     transactionImage,
//     transactionRecurring,
//     transactionDate,
//     transactionBudgetId,
//   } = req.body;
  
//   // Ensure all required fields are provided
//   if (!transactionBudgetId || !transactionAmount || !transactionAccountId || !transactionNote || !transactionDate) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   try {
//     // Validate budget exists and has enough remaining amount
//     const budget = await new Promise((resolve, reject) => {
//       const sql = `SELECT budgetRemaining, budgetAmount FROM budget WHERE budgetId = ? AND budgetAccountId = ?`;
//       connectionMySQL.query(sql, [transactionBudgetId, transactionAccountId], (err, rows) => {
//         if (err) reject(err);
//         else if (rows.length === 0) reject(new Error("Budget not found or account mismatch"));
//         else resolve(rows[0]);
//       });
//     });

//     if (transactionAmount > budget.budgetRemaining) {
//       return res.status(400).json({ error: "Transaction amount exceeds remaining budget" });
//     }
//     // Validate account exists and has sufficient balance
//     const account = await new Promise((resolve, reject) => {
//       const sql = `SELECT accountBalance FROM account WHERE accountId = ?`;
//       connectionMySQL.query(sql, [transactionAccountId], (err, rows) => {
//         if (err) reject(err);
//         else if (rows.length === 0) reject(new Error("Account not found"));
//         else resolve(rows[0]);
//       });
//     });

//     if (transactionAmount > account.accountBalance) {
//       return res.status(400).json({ error: "Transaction amount exceeds account balance" });
//     }

//      // Start MySQL transaction for atomic updates
//     await new Promise((resolve, reject) => {
//       connectionMySQL.beginTransaction((err) => {
//         if (err) reject(err);
//         else resolve();
//       });
//     });

//     // Create transaction in MongoDB
//     const newTransaction = new transactionModel({
//       transactionAccountId,
//       transactionNote,
//       transactionAmount,
//       transactionImage,
//       transactionRecurring,
//       transactionDate,
//       transactionBudgetId,
//     });
//     const insertedTransaction = await newTransaction.save();

//      // Update budget: Increase budgetUsed (budgetRemaining auto-updates via generated column)
//     await new Promise((resolve, reject) => {
//       const sql = `UPDATE budget SET budgetUsed = budgetUsed + ? WHERE budgetId = ?`;
//       connectionMySQL.query(sql, [transactionAmount, transactionBudgetId], (err, result) => {
//         if (err) reject(err);
//         else if (result.affectedRows === 0) reject(new Error("Budget update failed"));
//         else resolve();
//       });
//     });
    
//     // Update account: Decrease accountBalance
//     await new Promise((resolve, reject) => {
//       const sql = `UPDATE account SET accountBalance = accountBalance - ? WHERE accountId = ?`;
//       connectionMySQL.query(sql, [transactionAmount, transactionAccountId], (err, result) => {
//         if (err) reject(err);
//         else if (result.affectedRows === 0) reject(new Error("Account update failed"));
//         else resolve();
//       });
//     });
//     // 
//     await new Promise((resolve, reject) => {
//       const sql = `UPDATE budget SET budgetUsed = budgetUsed + ? WHERE budgetAccountId = ?`;
//       connectionMySQL.query(sql, [transactionAmount, transactionBudgetId], (err, result) => {
//         if (err) reject(err);
//         else if (result.affectedRows === 0) reject(new Error("budgetUsed update failed"));
//         else resolve();
//       });
//     });


//     // Commit MySQL transaction
//     await new Promise((resolve, reject) => {
//       connectionMySQL.commit((err) => {
//         if (err) reject(err);
//         else resolve();
//       });
//     });

//     return res.status(201).json(insertedTransaction);
//   } catch (error) {
//     // Rollback MySQL transaction
//     await new Promise((resolve) => {
//       connectionMySQL.rollback(() => resolve());
//     });

//     // Clean up MongoDB transaction if created
//     if (insertedTransaction) {
//       await transactionModel.deleteOne({ _id: insertedTransaction._id }).catch((err) => {
//         console.error("Failed to clean up MongoDB transaction:", err.message);
//       });
//     }

//     return res.status(500).json({ error: error.message });
//   }
// };


// // Updates an existing transaction in MongoDB and syncs budget/account in MySQL
// // Input: req.body with id, transactionAccountId, transactionNote, transactionAmount, transactionImage, transactionRecurring, transactionDate, transactionBudgetId
// // Steps:
// // 1. Validates required fields and budget/account constraints
// // 2. Updates transaction in MongoDB
// // 3. Adjusts budgetUsed and accountBalance based on amount/budget changes within a MySQL transaction
// // Returns: Updated transaction object with 200 status
// // Errors: Rolls back changes and returns 400/404/500 with error message
// exports.updateTransaction = async (req, res) => {
//   const {
//     id,
//     transactionAccountId,
//     transactionNote,
//     transactionAmount,
//     transactionImage,
//     transactionRecurring,
//     transactionDate,
//     transactionBudgetId,
//   } = req.body;

//     // Ensure all required fields are provided
//   if (!id || !transactionBudgetId || !transactionAmount || !transactionAccountId || !transactionNote || !transactionDate) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   try {
//     // Fetch existing transaction to calculate adjustments
//     const existingTransaction = await transactionModel.findById(id);
//     if (!existingTransaction) {
//       return res.status(404).json({ error: "Transaction not found" });
//     }

//     // Validate budget exists and has enough remaining amount
//     const budget = await new Promise((resolve, reject) => {
//       const sql = `SELECT budgetRemaining, budgetUsed, budgetAmount FROM budget WHERE budgetId = ? AND budgetAccountId = ?`;
//       connectionMySQL.query(sql, [transactionBudgetId, transactionAccountId], (err, rows) => {
//         if (err) reject(err);
//         else if (rows.length === 0) reject(new Error("Budget not found or account mismatch"));
//         else resolve(rows[0]);
//       });
//     });

//     // Calculate budget adjustment
//     const isSameBudget = existingTransaction.transactionBudgetId === transactionBudgetId;
//     const oldAmount = existingTransaction.transactionAmount;
//     const budgetAdjustment = isSameBudget ? transactionAmount - oldAmount : transactionAmount;
//     const adjustedRemaining = isSameBudget
//       ? budget.budgetRemaining - (transactionAmount - oldAmount)
//       : budget.budgetRemaining - transactionAmount;

//     if (adjustedRemaining < 0) {
//       return res.status(400).json({ error: "Transaction amount exceeds remaining budget" });
//     }


//     // Validate account exists and has sufficient balance
//     const account = await new Promise((resolve, reject) => {
//       const sql = `SELECT accountBalance FROM account WHERE accountId = ?`;
//       connectionMySQL.query(sql, [transactionAccountId], (err, rows) => {
//         if (err) reject(err);
//         else if (rows.length === 0) reject(new Error("Account not found"));
//         else resolve(rows[0]);
//       });
//     });

//     const accountAdjustment = transactionAmount - oldAmount;
//     const adjustedBalance = account.accountBalance - accountAdjustment;
//     if (adjustedBalance < 0) {
//       return res.status(400).json({ error: "Transaction amount exceeds account balance" });
//     }

//     // Start MySQL transaction
//     await new Promise((resolve, reject) => {
//       connectionMySQL.beginTransaction((err) => {
//         if (err) reject(err);
//         else resolve();
//       });
//     });

//     // Update transaction in MongoDB
//     const updatedTransaction = await transactionModel.findByIdAndUpdate(
//       id,
//       {
//         transactionAccountId,
//         transactionNote,
//         transactionAmount,
//         transactionImage,
//         transactionRecurring,
//         transactionDate,
//         transactionBudgetId,
//       },
//       { new: true }
//     );

//     // Update budgets
//     if (isSameBudget) {
//       // Adjust same budget
//       await new Promise((resolve, reject) => {
//         const sql = `UPDATE budget SET budgetUsed = budgetUsed + ? WHERE budgetId = ?`;
//         connectionMySQL.query(sql, [budgetAdjustment, transactionBudgetId], (err, result) => {
//           if (err) reject(err);
//           else if (result.affectedRows === 0) reject(new Error("Budget update failed"));
//           else resolve();
//         });
//       });
//     } else {
//       // Revert old budget
//       await new Promise((resolve, reject) => {
//         const sql = `UPDATE budget SET budgetUsed = budgetUsed - ? WHERE budgetId = ?`;
//         connectionMySQL.query(sql, [oldAmount, existingTransaction.transactionBudgetId], (err, result) => {
//           if (err) reject(err);
//           else if (result.affectedRows === 0) reject(new Error("Old budget update failed"));
//           else resolve();
//         });
//       });

//       // Update new budget
//       await new Promise((resolve, reject) => {
//         const sql = `UPDATE budget SET budgetUsed = budgetUsed + ? WHERE budgetId = ?`;
//         connectionMySQL.query(sql, [transactionAmount, transactionBudgetId], (err, result) => {
//           if (err) reject(err);
//           else if (result.affectedRows === 0) reject(new Error("New budget update failed"));
//           else resolve();
//         });
//       });
//     }

//     // Update account balance
//     await new Promise((resolve, reject) => {
//       const sql = `UPDATE account SET accountBalance = accountBalance - ? WHERE accountId = ?`;
//       connectionMySQL.query(sql, [accountAdjustment, transactionAccountId], (err, result) => {
//         if (err) reject(err);
//         else if (result.affectedRows === 0) reject(new Error("Account update failed"));
//         else resolve();
//       });
//     });

//     // Commit MySQL transaction
//     await new Promise((resolve, reject) => {
//       connectionMySQL.commit((err) => {
//         if (err) reject(err);
//         else resolve();
//       });
//     });

//     return res.status(200).json(updatedTransaction);
//   } catch (error) {
//     // Rollback MySQL transaction
//     await new Promise((resolve) => {
//       connectionMySQL.rollback(() => resolve());
//     });

//     return res.status(500).json({ error: error.message });
//   }
// };
// //-----------------------------------------------------------

// // Deletes a transaction from MongoDB and reverses budget/account updates in MySQL
// // Input: Transaction ID in req.params
// // Steps:
// // 1. Fetches transaction to get amount and budgetId
// // 2. Deletes transaction from MongoDB
// // 3. Decreases budgetUsed and increases accountBalance in MySQL within a transaction
// // Returns: Success message with 200 status
// // Errors: Rolls back changes and returns 404/500 with error message
// exports.deleteTransaction = async (req, res) => {
//   const { id } = req.params; // Changed from req.body to req.params for RESTful API

//   try {
//     // Fetch transaction to get amount and budgetId
//     const transaction = await transactionModel.findById(id);
//     if (!transaction) {
//       return res.status(404).json({ error: "Transaction not found" });
//     }

//     // Start MySQL transaction
//     await new Promise((resolve, reject) => {
//       connectionMySQL.beginTransaction((err) => {
//         if (err) reject(err);
//         else resolve();
//       });
//     });

//     // Delete transaction from MongoDB
//     await transactionModel.findByIdAndDelete(id);

//     // Update budget (decrease budgetUsed)
//     await new Promise((resolve, reject) => {
//       const sql = `UPDATE budget SET budgetUsed = budgetUsed - ? WHERE budgetId = ?`;
//       connectionMySQL.query(sql, [transaction.transactionAmount, transaction.transactionBudgetId], (err, result) => {
//         if (err) reject(err);
//         else if (result.affectedRows === 0) reject(new Error("Budget update failed"));
//         else resolve();
//       });
//     });

//     // Update account (increase balance)
//     await new Promise((resolve, reject) => {
//       const sql = `UPDATE account SET accountBalance = accountBalance + ? WHERE accountId = ?`;
//       connectionMySQL.query(sql, [transaction.transactionAmount, transaction.transactionAccountId], (err, result) => {
//         if (err) reject(err);
//         else if (result.affectedRows === 0) reject(new Error("Account update failed"));
//         else resolve();
//       });
//     });

//     // Commit MySQL transaction
//     await new Promise((resolve, reject) => {
//       connectionMySQL.commit((err) => {
//         if (err) reject(err);
//         else resolve();
//       });
//     });

//     return res.status(200).json({ message: "Transaction deleted" });
//   } catch (error) {
//     // Rollback MySQL transaction
//     await new Promise((resolve) => {
//       connectionMySQL.rollback(() => resolve());
//     });

//     return res.status(500).json({ error: error.message });
//   }
// };
// ---------------------------------------------------------------------
 // OLLLLLLDEST version  0
// exports.getTransaction = async (req, res) => {
//   const { id } = req.body;
//   try {
//     const transaction = await transactionModel.find({
//       _id: id,
//     });
//     return res.status(200).json(transaction);
//   } catch (error) {
//     return res.status(500).json({
//       error: error.message,
//     });
//   }
// };



//forminput where transaction are made inte the frontend get a prefix with input
// exports.createTransaction = async (req, res) => {
//   const {
//     transactionAccountId,
//     transactionNote,
//     transactionAmount,
//     transactionImage,
//     transactionReurring,
//     transactionDate,
//     transactionBudgetId,
//   } = req.body;

//   try {
//     const newTransaction = new transactionModel({
//       transactionAccountId: transactionAccountId,
//       transactionNote: transactionNote,
//       transactionAmount: transactionAmount,
//       transactionImage: transactionImage,
//       transactionRecurring: transactionReurring,
//       transactionDate: transactionDate,
//       transactionBudgetId: transactionBudgetId,
//     });
//     const insertedTransaction = await newTransaction.save();
//     return res.status(201).json(insertedTransaction);
//   } catch (error) {
//     return res.status(500).json({
//       error: error.message,
//     });
//   }
// };




// // update transction, ask jerry how to find  ref ID (( OLD ))

// exports.updateTransaction = async (req, res) => {
//   const {
//     id,
//     transactionAccountId,
//     transactionNote,
//     transactionAmount,
//     transactionImage,
//     transactionRecurring,
//     transactionDate,
//   } = req.body;

//   try {
//     await transactionModel.updateOne(
//       { _id: id },
//       {
//         transactionAccountId,
//         transactionNote,
//         transactionAmount,
//         transactionImage,
//         transactionRecurring,
//         transactionDate,
//       }
//     );
//     const updatedTransaction = await transactionModel.find({
//       _id: id,
//     });
//     return res.status(201).json(updatedTransaction);
//   } catch (error) {
//     return res.status(500).json({
//       error: error.message,
//     });
//   }
// };

// //delete transaction

// exports.deleteTransaction = async (req, res) => {
//   const { id } = req.body;
//   try {
//     const deletedBook = await transactionModel.deleteOne({
//       _id: id,
//     });
//     return res
//       .status(200)
//       .json("The transaction has been thrown into the fires of Mount");
//   } catch (error) {
//     return res.status(500).json({
//       error: error.message,
//     });
//   }
// };

// get transaction with find-by-ID

// exports.getTransactionById = async (req, res) => {
//   const { transactionAccountId } = req.params;
//   try {
//     const transaction = await transactionModel.findById(transactionAccountId);
//     return res.status(200).json(transaction);
//   } catch (error) {
//     return res.status(500).json({
//       error: error.message,
//     });
//   }
// };

// //alternative functions for create

// exports.createTransactionVersionCreate = async (req, res) => {
//   const {
//     transactionAccountId,
//     transactionNote,
//     transactionAmount,
//     transactionImage,
//     transactionReurring,
//     transactionDate,
//   } = req.body;

//   try {
//     const newTransaction = await transactionModel.create({
//       transactionAccountId: inputTransactionAccountId,
//       transactionNote: inputTransactionNote,
//       transactionAmount: inputTransactionAmount,
//       transactionImage: inputTransactionImage,
//       transactionRecurring: inputRransactionRecurring,
//       transactionDate: inputTransactionDate,
//     });
//     return res.status(201).json(newTransaction);
//   } catch (error) {
//     return res.status(500).json({
//       error: error.message,
//     });
//   }
// };

// //alternative functions for find-by-id-and-delete

// exports.deleteTransactionById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deletedTransaction = await transacionModel.findByIdAndDelete(id);
//     return res.status(200).json(deletedTransaction);
//   } catch (error) {
//     return res.status(500).json({
//       error: error.message,
//     });
//   }
// };