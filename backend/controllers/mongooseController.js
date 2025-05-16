const transactionModel = require("../models/transactionModel");

// fetches all transactions
exports.getTransactions = (async(req, res) => {
    try {
        const allTransaction = await transactionModel.find();
        return res.status(200).json(allTransaction ); //** successful fetch for all transactions */
    }
    catch (error) {
        return res.status(500).json({ //! 500 error - server error
            error: error.message
        });
    }
});

// fetches single transaction
exports.getTransaction  = (async(req, res) => {
    const { transactionId  } = req.params;
    try {
        const transaction  = await transactionModel.find({ transactionId : transactionId });
        return res.status(200).json(transaction );//** successful fetch for single transaction */
    }
    catch (error) {
        return res.status(500).json({//! 500 error - server error
            error: error.message
        });
    }
});

// creates new transaction
exports.createTransaction = (async(req, res) => {
    const { transactionId, transactionNote, transactionImage } = req.body;

    try {
        const newTransaction = new transactionModel({
           id: transactionId,
           image: transactionImage,
           note:  transactionNote

        });
        const insertedTransaction= await newTransaction.save();
        return res.status(201).json(insertedTransaction);//** successful create for new transaction*/
    }
    catch (error) {
        return res.status(500).json({//! 500 error - server error
            error: error.message
        });
    }
});

// deletes single transaction by ID
exports.deleteTransaction = (async(req, res) => {
    const { id } = req.params;
    try {
        const deletedTransaction = await transactionModel.deleteOne({transactionId: id});
        return res.status(200).json(deletedTransaction) //** successful delete of transaction*/
    }
    catch (error) {
        return res.status(500).json({//! 500 error - server error
            error: error.message
        });
    }
});

// here we use findById which is only available in mongoose
exports.getTransactionById = (async(req, res) => {
    const { id } = req.params;
    try {
        const transaction = await transactionModel.findById(id);
        return res.status(200).json(transaction);//** successful fetch by ID*/
    }
    catch (error) {
        return res.status(500).json({//! 500 error - server error
            error: error.message
        });
    }
});
