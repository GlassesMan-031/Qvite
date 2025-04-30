const accountService = require("./../services/accountServices");

// Gets the available accounts (only one)
exports.getAccounts = async (req, res) => {
  try {
    const accounts = await accountService.getAccounts();
    res.json({ accounts });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.getAccount = async (req, res) => {
  const { id } = req.params;
  console.log("param" + id);

  try {
    const account = await accountService.getAccount(id);
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

  try {
    await accountService.createAccount(
      accountBalance,
      transactionsId,
      accountId
    );
    return res.status(201).json({
      success: true,
      error: "",
      message: "Succesfully created an account, welcome to Qvite!",
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
  const { accountBalance, accountId } = req.body;

  if (!accountBalance) {
    return res.status(400).json({
      success: false,
      error: "Please input your prefered balance",
    });
  }

  if (!accountId) {
    return res.status(400).json({
      success: false,
      error: "There's no account here, please create an account to proceed",
    });
  }

  try {
    await accountService.updateAccountBalance(accountBalance, accountId);
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
