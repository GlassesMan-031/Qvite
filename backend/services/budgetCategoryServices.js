const connectionMySQL = require('./../connectionMySQL');

// Get all categories for a specific user
function getAllCategories(userId) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM budgetCategory WHERE budgetCategoryUserId = ? ORDER BY categoryId ASC';
        connectionMySQL.query(sql, [userId], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

// Get one category by name for specific user
function getCategoryByName(categoryName, userId) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM budgetCategory WHERE categoryName = ? AND budgetCategoryUserId = ?';
        connectionMySQL.query(sql, [categoryName, userId], (err, rows) => {
            if (err) reject(err);
            else resolve(rows[0]);
        });
    });
}

// Create new category for a specific user
function createCategory(categoryName, userId) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO budgetCategory (categoryName, budgetCategoryUserId) VALUES (?, ?)';
        connectionMySQL.query(sql, [categoryName, userId], (err, result) => {
            if (err) reject(err);
            else resolve({ categoryId: result.insertId, categoryName, userId });
        });
    });
}

// Update a category for a specific user (with security check)
function updateCategory(categoryId, categoryName, userId) {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE budgetCategory SET categoryName = ? WHERE categoryId = ? AND budgetCategoryUserId = ?';
        connectionMySQL.query(sql, [categoryName, categoryId, userId], (err, result) => {
            if (err) reject(err);
            else resolve({ categoryId, categoryName });
        });
    });
}

// Delete a category for a specific user (with security check)
function deleteCategory(categoryId, userId) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM budgetCategory WHERE categoryId = ? AND budgetCategoryUserId = ?';
        connectionMySQL.query(sql, [categoryId, userId], (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
}

module.exports = {
    getAllCategories,
    getCategoryByName,
    createCategory,
    updateCategory,
    deleteCategory
};
