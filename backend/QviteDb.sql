CREATE DATABASE QviteDb;
USE QviteDb;

-- Users table
CREATE TABLE users (
    usersId INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    name VARCHAR(100),
    usersEmail VARCHAR(100) UNIQUE,
    usersPassword VARCHAR(255) NOT NULL,
    usersName VARCHAR(50) NOT NULL UNIQUE
);

-- Account table
CREATE TABLE account (
    accountId  INT NOT NULL primary key,
    accountBalance INT NOT NULL,
    accountTransactionId INT, -- POSSIBLY NOT NECESSARY
    FOREIGN KEY (accountId) REFERENCES users(usersId) ON DELETE CASCADE
);

-- Budget category table
CREATE TABLE budgetCategory (
    categoryId INT AUTO_INCREMENT PRIMARY KEY UNIQUE,
    categoryName VARCHAR(30) NOT NULL UNIQUE
);

INSERT INTO budgetCategory (categoryName)
VALUES ('uncategorized'),('household'), ('groceries'), ('transportation'), ('dining and drinks'),
       ('leisure'), ('health and beauty'), ('shopping'), ('other');

-- Budget table
CREATE TABLE budget (
    budgetId INT AUTO_INCREMENT PRIMARY KEY UNIQUE,
    budgetCategoryId INT DEFAULT 1,
    budgetAmount INT NOT NULL,
    budgetUsed INT DEFAULT 0,
    budgetRemaining INT GENERATED ALWAYS AS (budgetAmount - budgetUsed) STORED,
    budgetAccountId INT ,
    FOREIGN KEY (budgetAccountId) REFERENCES account(accountId)ON DELETE CASCADE,
    FOREIGN KEY (budgetCategoryId) REFERENCES budgetCategory(categoryId) ON DELETE CASCADE
);

-- connects budgetID to an account using accountId
CREATE TABLE accountMiddleBudget (
    accountBudgetId INT PRIMARY KEY AUTO_INCREMENT,
    accountBudgetAId INT,
    accountBudgetBId INT,
    FOREIGN KEY (accountBudgetAId) REFERENCES account(accountId)  ON DELETE  CASCADE,
    FOREIGN KEY (accountBudgetBId) REFERENCES budget(budgetId) ON DELETE CASCADE
);

CREATE TABLE transactionHistory (
  historyId INT AUTO_INCREMENT PRIMARY KEY,
  transactionAccountId INT,
  transactionNote TEXT,
  transactionAmount DECIMAL(10, 2),
  transactionImage TEXT,
  transactionRecurring BOOLEAN,
  transactionDate DATETIME,
  transactionBudgetId INT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Dummy data users
INSERT INTO users (usersName, usersPassword, usersEmail)
VALUES ('Lisa', 'kebab', 'lisa@gmail.com'),
       ('Greger', 'Password1', 'greger@gmail.com'),
       ('Per', 'falukorv', 'per@gmail.com');

-- Dummy data account
INSERT INTO account (accountId, accountBalance)
SELECT usersId, 1000
FROM users
WHERE usersName = 'Lisa';

INSERT INTO account (accountId, accountBalance)
SELECT usersId, 2000
FROM users
WHERE usersName = 'Per';

INSERT INTO account (accountId, accountBalance)
SELECT usersId, 3000
FROM users
WHERE usersName = 'Greger';

-- Dummy data budget
INSERT INTO budget(budgetCategoryId, budgetAmount, budgetUsed, budgetAccountId)
VALUES (3, 1000, 200, 3),
       (2, 2000, 0, 3),
       (1, 3000, 23, 3),
       (4, 4000, 560, 2),
       (5, 5000, 200, 2),
       (6, 6000, 400, 2),
        (2, 200, 20, 1),
       (8, 300, 30, 1),
       (9, 400, 40, 1);
