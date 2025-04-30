const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');

// Get all budgets
router.get('user/account/budgets', budgetController.getBudgets);

// Get budget with ID
router.get('user/account/budgets/:id', budgetController.getBudget);

// Create new budget
router.post('user/account/budgets', budgetController.createBudget);

// Update budget
router.put('user/account/budgets/:id', budgetController.updateBudget);

// Delete budget
router.delete('user/account/budgets/:id', budgetController.deleteBudget);

module.exports = router;
