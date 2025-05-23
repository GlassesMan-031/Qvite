const budgetService = require('../services/budgetServices'); // Import the service layer that interacts with the database

// Controller to fetch all budgets
exports.getAllBudgets = async (req, res) => {
    try {
      const budgets = await budgetService.getAllBudgets();
      res.json(budgets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
// Controller to fetch a single budget by ID
exports.getBudget = async (req, res) => {
    try {
      const budget = await budgetService.getBudgetById(req.params.id);
      if (!budget) return res.status(404).json({ message: "Budget not found" });
      res.json(budget);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

// Controller to create a new budget

exports.createBudget = async (req, res) => {
    const { budgetCategoryId, budgetAmount } = req.body;
    const { usersName } = req.params;
  
    try {
      const newId = await budgetService.createBudget(usersName, budgetCategoryId, budgetAmount);
      res.status(201).json({ message: "Budget created", budgetId: newId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Controller to update an existing budget
exports.updateBudget = async (req, res) => {
    const { budgetCategoryId, budgetAmount, budgetUsed } = req.body;
    const { budgetId } = req.params;
  
    try {
      await budgetService.updateBudget(budgetCategoryId, budgetAmount, budgetUsed, budgetId);
      res.json({ message: `Budget updated budgetId: ${budgetId}` });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  
  // Controller to delete a budget by id
  exports.deleteBudget = async (req, res) => {
    const { id } = req.params;
    try {
      await budgetService.deleteBudget(id);
      res.json({ message: "Budget deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

// Fetches all budgets for a user
// Input: usersName in req.params
// Returns: JSON object with budgets array
  exports.getUserBudgets = async (req, res) => {
    const { usersName } = req.params;
    try {
      const budgets = await budgetService.getUserBudgets(usersName);
      res.json({ budgets });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };