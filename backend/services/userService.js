const connectionMySQL = require("../connectionMySQL");

// CREATE
function createUser(userName, userPassword, userEmail) {
  return new Promise((resolve, reject) => {
    let sql =
      "INSERT INTO users (userName, userPassword, userEmail) VALUES (?,?,?)";
    let params = [userName, userPassword, userEmail];

    connectionMySQL.query(sql, params, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

// READ
function getUsers() {
  return new Promise((resolve, reject) => {
    let sql = "SELECT userName FROM users";
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
function updateUser(userName, userPassword, userEmail, userId) {
  return new Promise((resolve, reject) => {
    let sql = `
    UPDATE users SET userName = ?, userPassword = ?, userEmail = ?
    WHERE userId = ?
    `;
    let params = [userName, userPassword, userEmail, userId];

    connectionMySQL.query(sql, params, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

// DELETE
function deleteUser(id) {
  return new Promise((resolve, reject) => {
    let sql = "DELETE FROM users WHERE userId = ?";

    connectionMySQL.query(sql, [id], (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
