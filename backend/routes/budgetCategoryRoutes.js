const express = require('express');
const router = express.Router();
const controller = require('../controllers/budgetCategoryController');

router.get('/api/:userName/categories', controller.getAllCategories);
router.get('/api/:userName/category/:categoryName', controller.getOneCategory);
router.post('/api/:userName/category', controller.createCategory);
router.put('/api/:userName/category/:categoryId', controller.updateCategory);
router.delete('/api/:userName/category/:categoryId', controller.deleteCategory);

module.exports = router;
