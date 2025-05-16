const express = require("express");
const router = express.Router();
const transactionsController = require("../controllers/transactionsController");

//? Get all current transactions (from MongoDB)
router.get("/api/transactions", transactionsController.getTransactions);

//? Get a single transaction by ID (from MongoDB)
router.get("/api/transaction/:id", transactionsController.getTransaction);

//? Create a new transaction (save to both MongoDB + MySQL history)
router.post("/api/transactions", transactionsController.createTransaction);

//? Update a transaction (MongoDB)
router.put("/api/transactions", transactionsController.updateTransaction);

//! Delete a transaction (from MongoDB)
router.delete("/api/transactions/:id", transactionsController.deleteTransaction);


module.exports = router;
