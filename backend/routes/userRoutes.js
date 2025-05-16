const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");


router.get("/api/users", userController.getUsers); //? get users
router.get("/api/users/:id", userController.getUser); //? see logged in user at frontend
router.post("/api/users", userController.createUser); //? create user 
router.put("/api/:usersName", userController.updateUser); //? update user
router.delete("/api/:usersName", userController.deleteUser); //! delete user 
router.get("/api/:usersName", userController.getUserInfo); //? fetch user by ID

module.exports = router;
