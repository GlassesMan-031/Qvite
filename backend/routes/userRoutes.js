const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/api/check-user", userController.checkUserExists);
router.get("/api/users", userController.getUsers);
router.get("/api/users/:id", userController.getUser); // see inlogged user at frontend
router.post("/api/users", userController.createUser);
router.put("/api/:usersName", userController.updateUser);
router.delete("/api/:usersName", userController.deleteUser);
router.get("/api/:usersName", userController.getUserInfo);

module.exports = router;
