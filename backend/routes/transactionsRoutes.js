const express = require("express");
const router = express.Router();
const transactionsController = require("../controllers/transactionsController");

router.get(
  "/api/transactions",
  transactionsController.getTransactions
);

router.get("/api/transaction/:id", transactionsController.getTransaction);

router.post(
  "/api/transactions",
  transactionsController.createTransaction
);

router.put(
  "/api/transactions",
  transactionsController.updateTransaction
);

router.delete(
  "/api/transactions/:id",
  transactionsController.deleteTransaction
);

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
