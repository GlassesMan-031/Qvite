const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');



//? Get all budgets for user
router.get("/api/budgets/:usersName", budgetController.getUserBudgets);
//? Get all budgets
router.get("/api/budgets", budgetController.getAllBudgets);
//? get budget by id
router.get("/api/budgets/id/:id", budgetController.getBudget);
//? Create new budget
router.post("/api/budgets/:usersName", budgetController.createBudget);
//? Update budget
router.put("/api/budgets/:budgetId", budgetController.updateBudget);
//! Delete budget
router.delete("/api/budgets/:id", budgetController.deleteBudget);

module.exports = router;
