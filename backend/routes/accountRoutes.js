const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");

router.get("/api/account", accountController.getAccount);
router.get("/api/account/:id", accountController.getAccount);
router.post("/api/account", accountController.createAccount);
router.put("/api/account", accountController.updateAccountBalance);
router.delete(
  "/api/account/transaction/:id",
  accountController.deleteTransaction
);

module.exports = router;
