const connectionMySQL = require("./../connectionMySQL");

function getAccount(id) {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM account WHERE accountId = ?";
    let params = [id];
    connectionMySQL.query(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function createAccount(accountBalance) {
  return new Promise((resolve, reject) => {
    let sql = "INSERT INTO account (accountBalance, ) VALUES (?)";
    let params = [accountBalance];

    connectionMySQL.query(sql, params, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

function updateAccountBalance(accountBalance, accountId) {
  return new Promise((resolve, reject) => {
    let sql =
      "UPDATE accountBalance SET accountBalance = ? WHERE accountId = ?";
    let params = [accountBalance, accountId];

    connectionMySQL.query(sql, params, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

function deleteTransaction(id) {
  return new Promise((resolve, reject) => {
    let sql = "DELETE FROM account WHERE transactionId = ?";

    connectionMySQL.query(sql, [id], (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

module.exports = {
  getAccount,
  createAccount,
  updateAccountBalance,
  deleteTransaction,
};
