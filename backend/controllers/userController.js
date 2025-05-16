const userService = require("./../services/userService");
const accountService = require("./../services/accountServices");
const budgetCategoryService = require("./../services/budgetCategoryServices");
const budgetService = require("./../services/budgetServices");
const connectionMySQL = require("./../connectionMySQL");


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
      error: "Fill in all fields", //! error if inputfields are empty
    });
  }

  try {
 
    await userService.createUser(name, usersName, usersPassword, usersEmail);

    const userId = await new Promise((resolve, reject) => {
      const sql = `SELECT usersId FROM users WHERE usersName = ?`;
      connectionMySQL.query(sql, [usersName], (err, rows) => {
        if (err) reject(err);
        else if (rows.length === 0) reject(new Error("User not found")); //! error user not found/input correctly
        else resolve(rows[0].usersId); //? resolve if possible
      });
    });

    await accountService.createAccount(usersName, 0);

    // Create budgetCategoies
    for (const categoryName of budgetCategory) {
      await budgetCategoryService.createCategory(categoryName, userId);
    }

    const categories = await budgetCategoryService.getAllCategories(userId);
    for (const category of categories) {
      await budgetService.createBudget(usersName, category.categoryId, 0);
    }
    return res.status(201).json({
      success: true,
      error: "",
      message: "User created successfully",
    }); //** Successfully created user */
  } catch (err) { //! errorblock - Serverside
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};


// GET USERS
exports.getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.json({ users });
  } catch (error) {
    return res.status(500).json({  //! errorblock - Serverside
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
    return res.status(500).json({ //! errorblock - Serverside
      error: error.message,
    });
  }
};

// GET USER INFO
exports.getUserInfo = async (req, res) => {
  const { usersName } = req.params;
  console.log("param" + usersName); //? Console log in terminal for user

  try {
    const userInfo = await userService.getUserInfo(usersName);
    res.json({ userInfo });
  } catch (error) {
    return res.status(500).json({ //! errorblock - Serverside
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
    return res.status(201).json({ //** Successfully updated user */
      success: true,
      error: "",
    });
  } catch (error) {
    return res.status(500).json({ //! errorblock - Serverside
      success: false,
      error: error.message,
    });
  }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
  const { usersName } = req.params;

  if (!usersName) { //! no username chosen - error
    return res.status(400).json({
      success: false,
      error: "Please select usersName to delete",
    });
  }

  try { //** Successfully deleted user - only backend*/
    await userService.deleteUser(usersName);
    return res.status(201).json({
      success: true,
      error: "",
      message: `${usersName} is no more`,
    });
  } catch (error) {
    return res.status(500).json({ //! errorblock - Serverside
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
    return res.status(500).json({ //! errorblock - Serverside
      error: error.message,
    });
  }
};
