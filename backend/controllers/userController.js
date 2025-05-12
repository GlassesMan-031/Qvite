const userService = require("./../services/userService");
const accountService = require("./../services/accountServices");
const budgetCategoryService = require("./../services/budgetCategoryServices");
const budgetService = require("./../services/budgetServices");
const connectionMySQL = require("./../connectionMySQL");

// trying to create a account and budgetCategory and budget when a new user is created

// define budgetCategory
const budgetCategory = [
  "uncategorized",
  "household",
  "groceries",
  "transportation",
  "dining and drinks",
  "leisure",
  "health and beauty",
  "shopping",
  "other",
];

// Create user with account, budgetCategory and budget
exports.createUser = async (req, res) => {
  const { name, usersName, usersPassword, usersEmail } = req.body;

  if (
    !name ||
    name.trim().length < 1 ||
    !usersName ||
    usersName.trim().length < 1 ||
    !usersPassword ||
    usersPassword.trim().length < 1 ||
    !usersEmail ||
    usersEmail.trim().length < 1
  ) {
    return res.status(400).json({
      success: false,
      error: "Fill in all fields",
    });
  }

  try {
    // Create the user
    await userService.createUser(name, usersName, usersPassword, usersEmail);
    // Get the user ID
    const userId = await new Promise((resolve, reject) => {
      const sql = `SELECT usersId FROM users WHERE usersName = ?`;
      connectionMySQL.query(sql, [usersName], (err, rows) => {
        if (err) reject(err);
        else if (rows.length === 0) reject(new Error("User not found"));
        else resolve(rows[0].usersId);
      });
    });
    // Create an account for the new user with balance 0
    await accountService.createAccount(usersName, 0);

    // Create budgetCategoies
    for (const categoryName of budgetCategory) {
      await budgetCategoryService.createCategory(categoryName, userId);
    }

    // Create budget for each category with 0 budget
    const categories = await budgetCategoryService.getAllCategories(userId);
    for (const category of categories) {
      await budgetService.createBudget(usersName, category.categoryId, 0);
    }
    return res.status(201).json({
      success: true,
      error: "",
      message: "User created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// CREATE USER Old version

// exports.createUser = async (req, res) => {
//   const { name, usersName, usersPassword, usersEmail } = req.body;

//   if (
//     !name ||
//     name.trim().length < 1 ||
//     !usersName ||
//     usersName.trim().length < 1 ||
//     !usersPassword ||
//     usersPassword.trim().length < 1 ||
//     !usersEmail ||
//     usersEmail.trim().length < 1
//   ) {
//     return res.status(400).json({
//       success: false,
//       error: "Fyll i alla fält",
//     });
//   }

//   try {
//     await userService.createUser(name, usersName, usersPassword, usersEmail);
//     return res.status(201).json({
//       success: true,
//       error: "",
//       message: "Du har skapat ett användarkonto!",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };

// GET USERS
exports.getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.json({ users });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

// GET USER
exports.getUser = async (req, res) => {
  const { id } = req.params;
  console.log("param" + id);

  try {
    const users = await userService.getUser(id);
    res.json({ users });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

// GET USER INFO
exports.getUserInfo = async (req, res) => {
  const { usersName } = req.params;
  console.log("param" + usersName);

  try {
    const userInfo = await userService.getUserInfo(usersName);
    res.json({ userInfo });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

// UPDATE USER
exports.updateUser = async (req, res) => {
  const { newUsersName, usersPassword, usersEmail } = req.body;
  const { usersName } = req.params;

  try {
    await userService.updateUser(
      usersName,
      newUsersName,
      usersPassword,
      usersEmail
    );
    return res.status(201).json({
      success: true,
      error: "",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
  const { usersName } = req.params;

  if (!usersName) {
    return res.status(400).json({
      success: false,
      error: "Please select usersName to delete",
    });
  }

  try {
    await userService.deleteUser(usersName);
    return res.status(201).json({
      success: true,
      error: "",
      message: `${usersName} is no more`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// CHECK IF USER EXISTS
exports.checkUserExists = async (req, res) => {
  const { usersName, usersEmail } = req.query;

  try {
    const exists = await userService.checkUserExists(usersName, usersEmail);
    return res.json({ exists });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
