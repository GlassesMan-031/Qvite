const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");

router.get("/api/account/:usersName", accountController.getAccount); //? fetch
router.post("/api/:usersName/account", accountController.createAccount);//?create
router.put("/api/:usersName/account", accountController.updateAccountBalance);//? update
router.delete( //! Delete
  "/api/account/transaction/:id",
  accountController.deleteTransaction
);

module.exports = router;
