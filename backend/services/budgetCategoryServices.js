const connectionMySQL = require("./../connectionMySQL");

// Get all categories for a specific user
function getAllCategories() {
  return new Promise((resolve, reject) => {
    const sql = "SELECT categoryName FROM budgetCategory ORDER BY categoryId";
    connectionMySQL.query(sql, (err, rows) => { 
      if (err) reject(err); //! error - serverside
      else resolve(rows); //? resolve if possible
    });
  });
}

// Get one category by name for specific user
function getCategoryByName(categoryName, userId) {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT * FROM budgetCategory WHERE categoryName = ? AND budgetCategoryUserId = ?";
    connectionMySQL.query(sql, [categoryName, userId], (err, rows) => {
      if (err) reject(err); //! error - serverside
      else resolve(rows[0]); //? resolve if possible
    });
  });
}

// Create new category for a specific user
function createCategory(categoryName, userId) {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO budgetCategory (categoryName, budgetCategoryUserId) VALUES (?, ?)";
    connectionMySQL.query(sql, [categoryName, userId], (err, result) => {
      if (err) reject(err); //! error - serverside
      else resolve({ categoryId: result.insertId, categoryName, userId }); //? resolve if possible, look for params
    });
  });
}

// Update a category for a specific user (with security check)
function updateCategory(categoryId, categoryName, userId) {
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE budgetCategory SET categoryName = ? WHERE categoryId = ? AND budgetCategoryUserId = ?";
    connectionMySQL.query(
      sql,
      [categoryName, categoryId, userId],
      (err, result) => {
        if (err) reject(err); //! error - serverside
        else resolve({ categoryId, categoryName }); //? resolve if possible, look for params
      }
    );
  });
}

// Delete a category for a specific user (with security check)
function deleteCategory(categoryId, userId) {
  return new Promise((resolve, reject) => {
    const sql =
      "DELETE FROM budgetCategory WHERE categoryId = ? AND budgetCategoryUserId = ?";
    connectionMySQL.query(sql, [categoryId, userId], (err) => {
      if (err) reject(err); //! error - serverside
      else resolve(); //? resolve if possible
    });
  });
}

module.exports = {
  getAllCategories,
  getCategoryByName,
  createCategory,
  updateCategory,
  deleteCategory,
};
