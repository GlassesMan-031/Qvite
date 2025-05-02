const accountService = require("./../services/accountServices");

//? WE DONT WANT THIS
// Gets the available accounts (only one)
// exports.getAccount = async (req, res) => {
//   try {
//     const accounts = await accountService.getAccount();
//     res.json({ accounts });
//   } catch (error) {
//     return res.status(500).json({
//       error: error.message,
//     });
//   }
// };

exports.getAccount = async (req, res) => {
  const { usersName } = req.params;

  try {
    const account = await accountService.getAccount(usersName);
    res.json({ account });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

// Creates account, throws error if there's no account available
exports.createAccount = async (req, res) => {
  const { accountBalance } = req.body;
  const { usersName } = req.params;

  try {
    await accountService.createAccount(usersName, accountBalance);
    return res.status(201).json({
      success: true,
      error: "",
      message: `Succesfully created an account ${usersName}, welcome to Qvite!`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Updates the balance on the account
exports.updateAccountBalance = async (req, res) => {
  const { accountBalance } = req.body;
  const { usersName } = req.params;

  if (!accountBalance) {
    return res.status(400).json({
      success: false,
      error: "Please input your prefered balance",
    });
  }

  //? FIX LATER
  // if (!usersName) {
  //   return res.status(400).json({
  //     success: false,
  //     error: "There's no account here, please create an account to proceed",
  //   });
  // }

  try {
    await accountService.updateAccountBalance(accountBalance, usersName);
    return res.status(201).json({
      success: true,
      message: `Your new balance is ${accountBalance}`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// deletes transaction by id
exports.deleteTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    await accountService.deleteTransaction(id);
    return res.status(201).json({
      success: true,
      error: "",
      message: "Transaction successfully deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
