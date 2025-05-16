const connectionMySQL = require("./../connectionMySQL");

// Retrieves account details
function getAccount(usersName) {
  return new Promise((resolve, reject) => {
    let sql = `
    SELECT users.usersName, account.accountBalance
    FROM account
    JOIN users ON account.accountId = users.usersId
    WHERE users.usersName = ?;
    `;
    let params = [usersName];

    connectionMySQL.query(sql, params, (err, rows) => { //! error - serverside
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

// create account
function createAccount(usersName, accountBalance) {
  return new Promise((resolve, reject) => {
    console.log("usersName: ", usersName);

    let sql = `
    INSERT INTO account (accountId, accountBalance)
    SELECT usersId, ?
    FROM users
    WHERE usersName = ?;
    `;
    let params = [accountBalance, usersName];

    connectionMySQL.query(sql, params, (err) => { //! error - serverside
      if (err) reject(err);
      else resolve(); //? resolve if possible
    });
  });
}

// Updates the account balance
function updateAccountBalance(accountBalance, usersName) {
  return new Promise((resolve, reject) => {
    let sql = `
    UPDATE account
    JOIN users ON account.accountId = users.usersId
    SET account.accountBalance = ?
    WHERE users.usersName = ?;
    `;
    let params = [accountBalance, usersName];

    connectionMySQL.query(sql, params, (err) => { //! error - serverside
      if (err) reject(err);
      else resolve(); //? resolve if possible
    });
  });
}

// Deletes a transaction from the account
function deleteTransaction(id) {
  return new Promise((resolve, reject) => {
    let sql = "DELETE FROM account WHERE transactionId = ?";

    connectionMySQL.query(sql, [id], (err) => { //! error - serverside
      if (err) reject(err);
      else resolve(); //? resolve if possible
    });
  });
}

module.exports = {
  getAccount,
  createAccount,
  updateAccountBalance,
  deleteTransaction,
};
