const userService = require("./../services/userService");

// CREATE USER
exports.createUser = async (req, res) => {
  const { userName, userPassword, userEmail } = req.body;

  if (
    !userName ||
    userName.trim().length < 1 ||
    !userPassword ||
    userPassword.trim().length < 1 ||
    !userEmail ||
    userEmail.trim().length < 1
  ) {
    return res.status(400).json({
      success: false,
      error: "Fyll i alla fält",
    });
  }

  try {
    await userService.createUser(userName, userPassword, userEmail);
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
    const books = await userService.getUsers();
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
    const book = await userService.getuser(id);
    res.json({ user });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

// UPDATE USER
exports.updateUser = async (req, res) => {
  const { userName, userPassword, userEmail, userId } = req.body;

  if (!userId) {
    return res.status(400).json({
      success: false,
      error: "Du har inte skrivit in något ID för boken du ska uppdatera!",
    });
  }

  try {
    await userService.updateUser(userName, userPassword, userEmail, userId);
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
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      error: "Du har inte fyllt i ID för användaren du ska radera!",
    });
  }

  try {
    await userService.deleteUser(id);
    return res.status(201).json({
      success: true,
      error: "",
      message: "Användarkontot är nu raderad!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
