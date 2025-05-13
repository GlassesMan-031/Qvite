const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');


// Budget routes
// Get all budgets for user
router.get("/api/budgets/:usersName", budgetController.getUserBudgets);
// Get all budgets
router.get("/api/budgets", budgetController.getAllBudgets);
// get budget by id
router.get("/api/budgets/id/:id", budgetController.getBudget);
// Create new budget
router.post("/api/budgets/:usersName", budgetController.createBudget);
// Update budget
router.put("/api/budgets/:budgetId", budgetController.updateBudget);
// Delete budget
router.delete("/api/budgets/:id", budgetController.deleteBudget);


// // Get all budgets
// router.get('/api/:usersName/budgets', budgetController.getAllBudgets);

// // Get budget with ID
// router.get('/api/:usersName/:budgetName', budgetController.getBudget);

// // Create new budget
// router.post('/api/:usersName/budgets', budgetController.createBudget);

// // Update budget
// router.put('/api/:usersName/:budgetId', budgetController.updateBudget);

// // Delete budget
// router.delete('/api/budgets/:budgetId', budgetController.deleteBudget);

module.exports = router;
