CREATE DATABASE QviteDb;
USE QviteDb;

-- Users table
CREATE TABLE users (
    usersId INT NOT NULL AUTO_INCREMENT UNIQUE,
    usersEmail VARCHAR(100) PRIMARY KEY UNIQUE,
    usersPassword VARCHAR(255) NOT NULL,
    usersName VARCHAR(50) NOT NULL UNIQUE
);

-- Account table
CREATE TABLE account (
    accountId  INT NOT NULL PRIMARY KEY,
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


-- middle table that connects budgetCategory and budget
CREATE TABLE budgetMiddleCategory (
    budgetCategoryId INT PRIMARY KEY ,
    budgetCategoryBId INT ,
    budgetCategoryCId  INT ,
    FOREIGN KEY (budgetCategoryBId) REFERENCES budget(budgetId) ,
    FOREIGN KEY (budgetCategoryCId) REFERENCES budgetCategory(categoryId)
);


-- connects budgetID to an account using accountId
CREATE TABLE accountMiddleBudget (
    accountBudgetId INT PRIMARY KEY AUTO_INCREMENT,
    accountBudgetAId INT,
    accountBudgetBId INT,
    FOREIGN KEY (accountBudgetAId) REFERENCES account(accountId),
    FOREIGN KEY (accountBudgetBId) REFERENCES budget(budgetId)
);

INSERT INTO users (usersName, usersPassword, usersEmail)
VALUES ('Lisa', 'kebab', 'lisa@gmail.com'),
       ('Greger', 'Password1', 'greger@gmail.com'),
       ('Per', 'falukorv', 'per@gmail.com');


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

-- Transactions table
-- CREATE TABLE transactions (
--     transactionId INT AUTO_INCREMENT PRIMARY KEY,
--     transactionAmount INT NOT NULL,
--     transactionName VARCHAR(30) NOT NULL
-- );



-- Linking table between accounts and transactions (many-to-many structure)
-- CREATE TABLE account_transactions (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     accountId INT NOT NULL,
--     transactionId INT NOT NULL,
--     transactionDate DATETIME NOT NULL,
--     FOREIGN KEY (accountId) REFERENCES account(accountId) ON DELETE CASCADE,
--     FOREIGN KEY (transactionId) REFERENCES transactions(transactionId) ON DELETE CASCADE
-- );

SELECT * FROM account WHERE accountId = 1;

SELECT * FROM users;

SELECT * FROM account;

-- SEE EVERYTHING
SELECT * FROM users
INNER JOIN account a ON users.usersId = a.accountId;

-- CREATE ACCOUNT
INSERT INTO account (accountId, accountBalance)
SELECT usersId, 1000
FROM users
WHERE usersName = 'Lisa';

-- UPDATE ACCOUNT BALANCE MANUALLY
UPDATE account
JOIN users ON account.accountId = users.usersId
SET account.accountBalance = 1500
WHERE users.usersName = 'LisaLotta';

-- UPDATE TRANSACTION ARRAY
UPDATE account
JOIN users ON account.accountId = users.usersId
SET account.accountTransactionId = [1, 2, 3]
WHERE users.usersName = 'Bengt';

SELECT account.accountBalance
FROM account
JOIN users ON account.accountId = users.usersId
WHERE users.usersName = 'Greger';

-- INSERT INTO account (accountId, accountBalance)
    SELECT usersId,
    FROM users
    WHERE usersName = 'Greger';

-- trying to find which account that has which budget and what amount the budget has.

SELECT usersName, accountBudgetBId, budgetAmount
FROM users
INNER JOIN account ON account.accountId = users.usersId
INNER JOIN accountMiddleBudget aMB ON account.accountId = aMB.accountBudgetAId
INNER JOIN budget b ON account.accountId = b.budgetAccountId

 WHERE usersId = 3 ;

SELECT * FROM users
INNER JOIN account a ON users.usersId = a.accountId;

SELECT *
FROM account
LEFT JOIN users u ON u.usersId = account.accountId;

SELECT *
FROM accountMiddleBudget;

SELECT *
FROM account;


SELECT *
FROM budgetMiddleCategory;

SELECT *
FROM budget;

SELECT *
FROM budgetCategory
ORDER BY budgetCategory.categoryId ASC;










DROP DATABASE IF EXISTS QviteDb;

