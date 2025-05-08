const userService = require("./../services/userService");

// CREATE USER
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
      error: "Fyll i alla fält",
    });
  }

  try {
    await userService.createUser(name, usersName, usersPassword, usersEmail);
    return res.status(201).json({
      success: true,
      error: "",
      message: "Du har skapat ett användarkonto!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

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