const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.get('/user/account/transactions', transactionController.getTransactions);

router.get('/user/account/transactions/:id', transactionController.getTransaction);

router.post('/user/account/transactions', transactionController.createTransaction);

router.put('/user/account/transactions', transactionController.updateTransaction);

router.delete('/user/account/transactions/:id', transactionController.deleteTransaction);

// Alternative  create endpoint for mongoose
router.post('/user/account/transactions', transactionController.createTransactionVersionCreate);

// Alternativ för att hämta en bok med obejctid
router.get('/user/account/transactions-byid/:id', transactionController.getTransactionsById);
// alternativ för att radera en bok med obectid
router.delete('/user/account/transactions-byid/:id', transactionController.deleteTransactionById);

module.exports = router;