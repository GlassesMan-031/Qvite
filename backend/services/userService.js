const connectionMySQL = require("../connectionMySQL");

// CREATE
function createUser(usersName, usersPassword, usersEmail) {
  return new Promise((resolve, reject) => {
    let sql =
      "INSERT INTO users (usersName, usersPassword, usersEmail) VALUES (?,?,?)";
    let params = [usersName, usersPassword, usersEmail];

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
  checkUserExists,
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
