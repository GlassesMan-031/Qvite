const connectionMySQL = require("../connectionMySQL");

// CREATE
function createUser(name, usersName, usersPassword, usersEmail) {
  return new Promise((resolve, reject) => {
    let sql =
      "INSERT INTO users (name, usersName, usersPassword, usersEmail) VALUES (?, ?, ?, ?)";
    let params = [name, usersName, usersPassword, usersEmail];

    connectionMySQL.query(sql, params, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

// READ
function getUsers() {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM users";
    connectionMySQL.query(sql, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function getUser() {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM users";
    connectionMySQL.query(sql, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function getUserInfo(usersName) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT *
      FROM budgetCategory
      INNER JOIN budget b ON budgetCategory.categoryId = b.budgetCategoryId
      INNER JOIN account a ON b.budgetAccountId = a.accountId
      INNER JOIN users u ON a.accountId = u.usersId
      WHERE u.usersName = ?`;
    let params = [usersName];
    connectionMySQL.query(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

// UPDATE USER
function updateUser(usersName, newUsersName, usersPassword, usersEmail) {
  return new Promise((resolve, reject) => {
    let sql = `
    UPDATE users SET usersName = ?, usersPassword = ?, usersEmail = ?
    WHERE usersName = ?
    `;
    let params = [newUsersName, usersPassword, usersEmail, usersName];

    connectionMySQL.query(sql, params, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

// DELETE
function deleteUser(usersName) {
  return new Promise((resolve, reject) => {
    let sql = "DELETE FROM users WHERE usersName = ?";

    connectionMySQL.query(sql, [usersName], (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

// check if user exists
function checkUserExists(usersName, usersEmail) {
  return new Promise((resolve, reject) => {
    let sql = `
      SELECT * FROM users
      WHERE usersName = ? OR usersEmail = ?
    `;
    connectionMySQL.query(sql, [usersName, usersEmail], (err, rows) => {
      if (err) reject(err);
      else resolve(rows.length > 0); // true = finns redan
    });
  });
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  checkUserExists,
  getUserInfo,
};
