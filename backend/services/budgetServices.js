// Import MySQL-connection
const connectionMySQL = require('./../connectionMySQL');

// Fetches all budgets from the database
// Returns: Array of budget objects
// Get all budgets from the databas
function getAllBudgets() {
    return new Promise((resolve, reject) => {
      let sql = "SELECT * FROM budget";
      connectionMySQL.query(sql, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }



// Fetches a single budget by ID
// Input: Budget ID
// Returns: Budget object or undefined if not found
// get a budget by id 
function getBudgetById(id) {
    return new Promise((resolve, reject) => {
      let sql = "SELECT * FROM budget WHERE budgetId = ?";
      connectionMySQL.query(sql, [id], (err, rows) => {
        if (err) reject(err);
        else resolve(rows[0]);
      });
    });
  }

/* // Create a new budget 
function createBudget( budgetCategoryId, budgetAmount) {
    return new Promise((resolve, reject) => {
        let sql = `INSERT INTO budget (budgetCategoryId, budgetAmount) 
        VALUES (?,?,?,?)`;
        let params = [ budgetCategoryId, budgetAmount,];
        connectionMySQL.query(sql, params, (err, result) => {
            if(err) reject(err);
            else resolve(result.insertId);
        });
    });
} */
    // Creates a new budget and links it to an account
    // Input: usersName, budgetCategoryId, budgetAmount
    // Steps:
    // 1. Inserts budget into budget table
    // 2. Links budget to account via accountMiddleBudget
    // Uses transaction for atomicity
    // Returns: Inserted budgetId
    // Create a new budget
    function createBudget(usersName, budgetCategoryId, budgetAmount) {
    return new Promise((resolve, reject) => {
      connectionMySQL.beginTransaction((err) => {
        if (err) return reject(err);
        let sqlBudget = `
          INSERT INTO budget (budgetCategoryId, budgetAmount, budgetAccountId)
          VALUES (?, ?, (SELECT usersId FROM users WHERE usersName = ?))
        `;
        let budgetParams = [budgetCategoryId, budgetAmount, usersName];
  
        connectionMySQL.query(sqlBudget, budgetParams, (err, budgetResult) => {
          if (err) {
            return connectionMySQL.rollback(() => reject(err));
          }
  
          const budgetId = budgetResult.insertId;
          let sqlAccount = `
            SELECT accountId
            FROM account
            WHERE accountId = (SELECT usersId FROM users WHERE usersName = ?)
          `;
  
          connectionMySQL.query(sqlAccount, [usersName], (err, accountResult) => {
            if (err) {
              return connectionMySQL.rollback(() => reject(err));
            }
            if (accountResult.length === 0) {
              return connectionMySQL.rollback(() => reject(new Error("Account not found for user")));
            }
  
            const accountId = accountResult[0].accountId;
            let sqlMiddle = `
              INSERT INTO accountMiddleBudget (accountBudgetAId, accountBudgetBId)
              VALUES (?, ?)
            `;
            let middleParams = [accountId, budgetId];
  
            connectionMySQL.query(sqlMiddle, middleParams, (err) => {
              if (err) {
                return connectionMySQL.rollback(() => reject(err));
              }
  
              connectionMySQL.commit((err) => {
                if (err) {
                  return connectionMySQL.rollback(() => reject(err));
                }
                resolve(budgetId);
              });
            });
          });
        });
      });
    });
  }







// Updates an existing budget
// Input: budgetCategoryId, budgetAmount, budgetUsed, budgetId
// Returns: Success message
function updateBudget(budgetCategoryId, budgetAmount, budgetUsed, budgetId) {
    return new Promise((resolve, reject) => {
      let sql = "UPDATE budget SET budgetCategoryId = ?, budgetAmount = ?, budgetUsed = ? WHERE budgetId = ?";
      let params = [budgetCategoryId, budgetAmount, budgetUsed, budgetId];
      connectionMySQL.query(sql, params, (err) => {
        if (err) reject(err);
        else resolve("Your budget updated successfully!");
      });
    });
  }
  
// Deletes a budget by ID
// Input: Budget ID
// Returns: Nothing (resolves on success)
function deleteBudget(id) {
    return new Promise((resolve, reject) => {
      let sql = "DELETE FROM budget WHERE budgetId = ?";
      connectionMySQL.query(sql, [id], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
  
// Fetches all budgets for a user
// Input: usersName
// Returns: Array of budget objects with category names
// Joins budget, budgetCategory, account, and users tables
  function getUserBudgets(usersName) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT b.budgetId, b.budgetCategoryId, b.budgetAmount, b.budgetUsed, b.budgetRemaining, bc.categoryName
        FROM budget b
        INNER JOIN budgetCategory bc ON b.budgetCategoryId = bc.categoryId
        INNER JOIN account a ON b.budgetAccountId = a.accountId
        INNER JOIN users u ON a.accountId = u.usersId
        WHERE u.usersName = ?
      `;
      connectionMySQL.query(sql, [usersName], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
  

// Export functions 
module.exports = {
    getAllBudgets,
    getBudgetById,
    createBudget,
    updateBudget,
    deleteBudget,
    getUserBudgets,
  };