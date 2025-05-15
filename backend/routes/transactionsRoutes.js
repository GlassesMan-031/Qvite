const express = require("express");
const router = express.Router();
const transactionsController = require("../controllers/transactionsController");

// Get all current transactions (from MongoDB)
router.get("/api/transactions", transactionsController.getTransactions);

// Get a single transaction by ID (from MongoDB)
router.get("/api/transaction/:id", transactionsController.getTransaction);

// Create a new transaction (save to both MongoDB + MySQL history)
router.post("/api/transactions", transactionsController.createTransaction);

// Update a transaction (MongoDB, implement if you have logic)
router.put("/api/transactions", transactionsController.updateTransaction);

// Delete a transaction (from MongoDB)
router.delete("/api/transactions/:id", transactionsController.deleteTransaction);

//  NEW: Get all transaction history (from MySQL)
router.get("/api/transaction-history", transactionsController.getTransactionHistory);


// // Alternative  create endpoint for mongoose
// router.post(
//   "/user/account/transactions",
//   transactionsController.createTransactionVersionCreate
// );

// // Alternativ för att hämta en bok med obejctid
// router.get(
//   "/user/account/transactions-byid/:id",
//   transactionsController.getTransactionsById
// );
// // alternativ för att radera en bok med obectid
// router.delete(
//   "/user/account/transactions-byid/:id",
//   transactionsController.deleteTransactionById
// );

module.exports = router;
