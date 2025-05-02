const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");

router.get("/api/:usersName/account", accountController.getAccount);
router.get("/api/account/:id", accountController.getAccount); //! get rid of eventually
router.post("/api/:usersName/account", accountController.createAccount);
router.put("/api/:usersName/account", accountController.updateAccountBalance);
router.delete(
  "/api/account/transaction/:id",
  accountController.deleteTransaction
);

module.exports = router;
