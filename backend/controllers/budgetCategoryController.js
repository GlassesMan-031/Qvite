const budgetCategoryService = require("../services/budgetCategoryServices");
const connectionMySQL = require("../connectionMySQL");

// Helper: get userId from userName
async function getUserIdByUserName(userName) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT usersId FROM users WHERE usersName = ?";
    connectionMySQL.query(sql, [userName], (err, rows) => {
      if (err) reject(err);
      else if (rows.length === 0) reject(new Error("User not found"));//! Reject error, no user or wrong user
      else resolve(rows[0].usersId);
    });
  });
}

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await budgetCategoryService.getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });//! 500 error - server error
  }
};

// Get single category
exports.getOneCategory = async (req, res) => {
  try {
    const userId = await getUserIdByUserName(req.params.userName);
    const category = await budgetCategoryService.getCategoryByName(
      req.params.categoryName,
      userId
    );
    if (!category)
      return res.status(404).json({ message: "Category not found" });//! reject error, category is missing/found incorrectly
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });//! 500 error - server error
  }
};

// Create new category
exports.createCategory = async (req, res) => {
  const { categoryName } = req.body;
  if (!categoryName)
    return res.status(400).json({ message: "categoryName is required" });//! reject error, no category is found

  try {
    const userId = await getUserIdByUserName(req.params.userName);
    const newCategory = await budgetCategoryService.createCategory(
      categoryName,
      userId
    );
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });//! 500 error - server error
  }
};

// Update category
exports.updateCategory = async (req, res) => {
  const { categoryName } = req.body;
  const { categoryId } = req.params; // Changed from id to categoryId
  if (!categoryName)
    return res.status(400).json({ message: "categoryName is required" });//! reject error, no category is found
  if (isNaN(categoryId))
    return res.status(400).json({ message: "Invalid category ID" });//! reject error, no categoryID is found

  try {
    const userId = await getUserIdByUserName(req.params.userName);
    const updated = await budgetCategoryService.updateCategory(
      categoryId,
      categoryName,
      userId
    );
    res.json(updated);
  } catch (error) {
    if (error.message === "Category not found or user not authorized") {//! reject error, no category/user is found
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ error: error.message });//! 500 error - server error
  }
};

// Delete category
exports.deleteCategory = async (req, res) => {
  const { categoryId } = req.params; // Changed from id to categoryId

  try {
    const userId = await getUserIdByUserName(req.params.userName);
    await budgetCategoryService.deleteCategory(categoryId, userId);
    res.json({ message: "Category deleted" });//** successful delete */
  } catch (error) {
    res.status(500).json({ error: error.message });//! 500 error - server error
  }
};
