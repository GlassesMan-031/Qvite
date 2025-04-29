CREATE DATABASE QviteDb;
USE QviteDb;

-- Budget category table
CREATE TABLE budgetCategory (
    categoryId INT AUTO_INCREMENT PRIMARY KEY,
    categoryName VARCHAR(30) NOT NULL UNIQUE
);

-- Budget table
CREATE TABLE budget (
    budgetId INT AUTO_INCREMENT PRIMARY KEY,
    budgetCategoryId INT NOT NULL,
    budgetAmount INT NOT NULL,
    budgetName VARCHAR(50) NOT NULL,
    budgetUsed INT DEFAULT 0,
    budgetRemaining INT GENERATED ALWAYS AS (budgetAmount - budgetUsed) STORED,
    FOREIGN KEY (budgetCategoryId) REFERENCES budgetCategory(categoryId) ON DELETE CASCADE
);

-- Transactions table
CREATE TABLE transactions (
    transactionId INT AUTO_INCREMENT PRIMARY KEY,
    transactionAmount INT NOT NULL,
    transactionName VARCHAR(30) NOT NULL
);

-- Account table
CREATE TABLE account (
    accountId  INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    accountBalance INT NOT NULL,
    FOREIGN KEY (accountId) REFERENCES budget(budgetId) ON DELETE CASCADE
);

-- Linking table between accounts and transactions (many-to-many structure)
CREATE TABLE account_transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    accountId INT NOT NULL,
    transactionId INT NOT NULL,
    transactionDate DATETIME NOT NULL,
    FOREIGN KEY (accountId) REFERENCES account(accountId) ON DELETE CASCADE,
    FOREIGN KEY (transactionId) REFERENCES transactions(transactionId) ON DELETE CASCADE
);

-- Users table
CREATE TABLE users (
    userEmail VARCHAR(100) PRIMARY KEY,
    usersAccountId INT NOT NULL,
    userPassword VARCHAR(255) NOT NULL,
    userName VARCHAR(50) NOT NULL,
    FOREIGN KEY (usersAccountId) REFERENCES account(accountId) ON DELETE CASCADE
);

DROP DATABASE QviteDb;