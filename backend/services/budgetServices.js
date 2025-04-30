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

// Create a new budget 
function createBudget(budgetCategoryId, budgetName, budgetAmount, budgetUsed) {
    return new Promise((resolve, reject) => {
        let sql = 'INSERT INTO budget (budgetCategoryId, budgetName, budgetAmount, budgetUsed) VALUES (?,?,?,?)';
        let params = [budgetCategoryId, budgetName, budgetAmount, budgetUsed];
        connectionMySQL.query(sql, params, (err, result) => {
            if(err) reject(err);
            else resolve(result.insertId);
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
