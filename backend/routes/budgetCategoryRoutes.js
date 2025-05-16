const express = require("express");
const router = express.Router();
const controller = require("../controllers/budgetCategoryController");

router.get("/api/budget/categories", controller.getAllCategories); //? fetch all
router.get("/api/:userName/category/:categoryName", controller.getOneCategory); //? fetch one
router.post("/api/:userName/category", controller.createCategory); //?give user category
router.put("/api/:userName/category/:categoryId", controller.updateCategory);//? update user category
router.delete("/api/:userName/category/:categoryId", controller.deleteCategory);//! delete category from user

module.exports = router;
