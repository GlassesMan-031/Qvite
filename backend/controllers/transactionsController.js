const transactionModel = require("../models/transactionModel");

exports.getTransactions = async (req, res) => {
  try {
    const allTransactions = await transactionModel.find();
    return res.status(200).json(allTransactions);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.getTransaction = async (req, res) => {
  const { transactionAccountId } = req.params;
  try {
    const transaction = await transactionModel.find({
      transcactionId: transcationId,
    });
    return res.status(200).json(transaction);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

//forminput where transaction are made inte the frontend get a prefix with input
exports.createTransaction = async (req, res) => {
  const {
    transactionAccountId,
    transactionNote,
    transactionAmount,
    transactionImage,
    transactionReurring,
    transactionDate,
  } = req.body;

  try {
    const newTransaction = new transactionModel({
      transactionAccountId: transactionAccountId,
      transactionNote: transactionNote,
      transactionAmount: transactionAmount,
      transactionImage: transactionImage,
      transactionRecurring: transactionReurring,
      transactionDate: transactionDate,
    });
    const insertedTransaction = await newTransaction.save();
    return res.status(201).json(insertedTransaction);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

// update transction, ask jerry how to find  ref ID
exports.updateTransaction = async (req, res) => {
  const {
    transactionAccountId,
    transactionNote,
    transactionAmount,
    transactionImage,
    transactionReurring,
    transactionDate,
  } = req.body;

  try {
    await transactionModel.updateOne(
      { transactionAccountId: inputTransactionAccountId },
      {
        transactionNote: inputTransactionNote,
        transactionAmount: inputTransactionAmount,
        transactionImage: inputTransactionImage,
        transactionRecurring: inputRransactionRecurring,
        transactionDate: inputTransactionDate,
      }
    );
    const updatedTransaction = await transactionModel.find({
      transactionAccountId: inputTransactionAccountId,
    });
    return res.status(201).json(updatedTransaction);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

//delete transaction

exports.deleteTransaction = async (req, res) => {
  const { transactionAccountId } = req.params;
  try {
    const deletedBook = await transactionModel.deleteOne({
      transactionAccountId: inputTransactionAccountId,
    });
    return res.status(200).json(deletedTransaction);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

// get transaction with find-by-ID

exports.getTransactionById = async (req, res) => {
  const { transactionAccountId } = req.params;
  try {
    const transaction = await transactionModel.findById(transactionAccountId);
    return res.status(200).json(transaction);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

//alternative functions for create

exports.createTransactionVersionCreate = async (req, res) => {
  const {
    transactionAccountId,
    transactionNote,
    transactionAmount,
    transactionImage,
    transactionReurring,
    transactionDate,
  } = req.body;

  try {
    const newTransaction = await transactionModel.create({
      transactionAccountId: inputTransactionAccountId,
      transactionNote: inputTransactionNote,
      transactionAmount: inputTransactionAmount,
      transactionImage: inputTransactionImage,
      transactionRecurring: inputRransactionRecurring,
      transactionDate: inputTransactionDate,
    });
    return res.status(201).json(newTransaction);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

//alternative functions for find-by-id-and-delete

exports.deleteTransactionById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTransaction = await transacionModel.findByIdAndDelete(id);
    return res.status(200).json(deletedTransaction);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
