const express = require("express");
const router = express.Router();
const transactionsController = require("../controllers/transactionsController");

router.get(
  "/user/account/transactions",
  transactionsController.getTransactions
);

router.get(
  "/user/account/transactions/:id",
  transactionsController.getTransaction
);

router.post(
  "/user/account/transactions",
  transactionsController.createTransaction
);

router.put(
  "/user/account/transactions",
  transactionsController.updateTransaction
);

router.delete(
  "/user/account/transactions/:id",
  transactionsController.deleteTransaction
);

// Alternative  create endpoint for mongoose
router.post(
  "/user/account/transactions",
  transactionsController.createTransactionVersionCreate
);

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
