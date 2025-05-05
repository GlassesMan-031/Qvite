const budgetService = require('../services/budgetServices'); // Import the service layer that interacts with the database

// Controller to fetch all budgets
exports.getAllBudgets = async (req, res) => {
    try {
        const budgets = await budgetService.getBudgets(); 
        res.json(budgets); 
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
};

// Controller to fetch a single budget by ID
exports.getBudget = async (req, res) => {
    try {
        const budget = await budgetService.getBudgetById(req.params.id); // Get budget by ID
        if (!budget) return res.status(404).json({ message: 'Budget not found' }); 
        res.json(budget); 
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
};

// Controller to create a new budget
exports.createBudget = async (req, res) => {
    const { budgetCategoryId,  budgetAmount, } = req.body; 
    const {usersName } = req.params;
    console.log("testing testing budget");
    
   /*  if (!budgetCategoryId || !budgetName || !budgetAmount|| !budgetUsed) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (budgetAmount < 0 || budgetUsed < 0) {
        return res.status(400).json({ message: 'Amount and used must be assigned' });
    } */
    try {
        const newId = await budgetService.createBudget(usersName, budgetCategoryId, budgetAmount ); 
        res.status(201).json({ message: 'Budget created', budgetId: newId }); 
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
};

// Controller to update an existing budget
exports.updateBudget = async (req, res) => {
    const { budgetCategoryId, budgetName, budgetAmount, budgetUsed } = req.body;
    const budgetId = req.params.id; 

    try {
        await budgetService.updateBudget(budgetCategoryId, budgetName, budgetAmount, budgetUsed, budgetId); 
        res.json({ message: 'Budget updated' }); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to delete a budget by id
exports.deleteBudget = async (req, res) => {
    try {
        await budgetService.deleteBudget(req.params.id); 
        res.json({ message: 'Budget deleted' }); 
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
};
