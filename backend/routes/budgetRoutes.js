const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');

// Get all budgets
router.get('/api/:usersName/budgets', budgetController.getAllBudgets);

// Get budget with ID
router.get('/api/:usersName/:budgetName', budgetController.getBudget);

// Create new budget
router.post('/api/:usersName/budgets', budgetController.createBudget);

// Update budget
router.put('/api/:usersName/:budgetId', budgetController.updateBudget);

// Delete budget
router.delete('/api/budgets/:budgetId', budgetController.deleteBudget);

module.exports = router;
