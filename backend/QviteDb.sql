CREATE DATABASE QviteDb;
USE QviteDb;


CREATE TABLE budgetCategory (
    categoryId INT AUTO_INCREMENT NOT NULL PRIMARY KEY ,
    categoryName VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE budget (
    budgetId INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    budgetCategoryId INT NOT NULL,
    budgetAmount INT NOT NULL,
    budgetName VARCHAR(50) NOT NULL ,
    budgetUsed INT NOT NULL,
    budgetRemaining INT NOT NULL,

FOREIGN KEY (budgetCategoryId) REFERENCES budgetCategory(categoryId) ON DELETE CASCADE
);

CREATE TABLE transactions (
    transactionId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    transactionAmount INT NOT NULL,
    transactionName VARCHAR(30) NOT NULL
);
CREATE TABLE account (
    accountId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    accountBalance INT NOT NULL,
    accountTransactionId INT NOT NULL,
    accountBudgetId INT NOT NULL,
FOREIGN KEY (accountBudgetId) REFERENCES budget(budgetId) ON DELETE CASCADE,
FOREIGN KEY (accountTransactionId) REFERENCES transactions(transactionId) ON DELETE CASCADE
);

CREATE TABLE users (
    usersAccountId INT NOT NULL,
    userEmail VARCHAR(100) NOT NULL PRIMARY KEY,
    userPassword VARCHAR(50) NOT NULL,
    userName VARCHAR(50) NOT NULL,
FOREIGN KEY (usersAccountId) REFERENCES account(accountId)
);

DROP DATABASE QviteDb;
