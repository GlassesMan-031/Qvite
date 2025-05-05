// Import MySQL-connection
const connectionMySQL = require('./../connectionMySQL');

// Get all budgets from the databas
function getAllBudgets() {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM budget';
        connectionMySQL.query(sql, (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
}

// get a budget by id 
function getBudgetById(id) {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM budget WHERE budgetId = ?';
        connectionMySQL.query(sql, [id], (err, rows) => {
            if(err) reject(err);
            else resolve(rows[0]);
        });
    });
}

/* // Create a new budget 
function createBudget( budgetCategoryId, budgetName, budgetAmount) {
    return new Promise((resolve, reject) => {
        let sql = `INSERT INTO budget (budgetCategoryId, budgetName, budgetAmount) 
        VALUES (?,?,?,?)`;
        let params = [ budgetCategoryId, budgetName, budgetAmount,];
        connectionMySQL.query(sql, params, (err, result) => {
            if(err) reject(err);
            else resolve(result.insertId);
        });
    });
} */

    // Create a new budget
function createBudget(usersName, budgetCategoryId, budgetAmount) {
    return new Promise((resolve, reject) => {
        // Start a transaction to ensure data consistency
        connectionMySQL.beginTransaction((err) => {
            if (err) return reject(err);
                console.log("testar om vi kan se budgetamount = ",budgetAmount);
            // Step 1: Insert the budget into the budget table
            let sqlBudget = `
                INSERT INTO budget (budgetCategoryId, budgetAmount)
                VALUES (?, ?)
            `;
            let budgetParams = [budgetCategoryId, budgetAmount];

            connectionMySQL.query(sqlBudget, budgetParams, (err, budgetResult) => {
                if (err) {
                    return connectionMySQL.rollback(() => reject(err));
                }

                const budgetId = budgetResult.insertId;

                // Step 2: Find the accountId associated with the usersName
                let sqlAccount = `
                SELECT accountId
                FROM account
                WHERE accountId = (SELECT usersId FROM users WHERE usersName = ?)`;


                connectionMySQL.query(sqlAccount, [usersName], (err, accountResult) => {
                    if (err) {
                        return connectionMySQL.rollback(() => reject(err));
                    }
                    if (accountResult.length === 0) {
                        return connectionMySQL.rollback(() => reject(new Error('Account not found for user')));
                    }

                    const accountId = accountResult[0].accountId;

                    // Step 3: Insert into accountMiddleBudget to link budget to account
                    let sqlMiddle = `
                        INSERT INTO accountMiddleBudget ( accountBudgetAId, accountBudgetBId)
                        VALUES ( ?, ?)
                    `;
                    
                    let middleParams = [accountId, budgetId];

                 

                    connectionMySQL.query(sqlMiddle, middleParams, (err) => {
                        if (err) {
                            return connectionMySQL.rollback(() => reject(err));
                        }

                        // Commit the transaction
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








// update exsisting  budget
function updateBudget(budgetCategoryId, budgetName, budgetAmount, budgetUsed, budgetId) {
    return new Promise((resolve, reject) => {
        let sql = 'UPDATE budget SET budgetCategoryId = ?, budgetName = ?, budgetAmount = ?, budgetUsed = ? WHERE budgetId = ?';
        let params = [budgetCategoryId, budgetName, budgetAmount, budgetUsed, budgetId];
        connectionMySQL.query(sql, params, (err) => {
            if(err) reject(err);
            else resolve();
        });
    });
}

// delete budget by id 
function deleteBudget(id) {
    return new Promise((resolve, reject) => {
        let sql = 'DELETE FROM budget WHERE budgetId = ?';
        connectionMySQL.query(sql, [id], (err) => {
            if(err) reject(err);
            else resolve();
        });
    });
}

// Export functions 
module.exports = {
    getAllBudgets,
    getBudgetById,
    createBudget,
    updateBudget,
    deleteBudget
};
