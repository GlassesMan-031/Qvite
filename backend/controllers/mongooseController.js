const transactionModel = require("../models/transactionModel");

exports.getTransactions = (async(req, res) => {
    try {
        const allTransaction = await transactionModel.find();
        return res.status(200).json(allTransaction );
    }
    catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
});

exports.getTransaction  = (async(req, res) => {
    const { transactionId  } = req.params;
    try {
        const transaction  = await transactionModel.find({ transactionId : transactionId });
        return res.status(200).json(transaction );
    }
    catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
});

exports.createTransaction = (async(req, res) => {
    const { transactionId, transactionNote, transactionImage } = req.body;

    try {
        const newTransaction = new transactionModel({
           id: transactionId,
           image: transactionImage,
           note:  transactionNote

        });
        const insertedTransaction= await newTransaction.save();
        return res.status(201).json(insertedTransaction);
    }
    catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
});


// exports.updateBook = (async(req, res) => {
//     const { bookAuthor, bookTitle, bookIsbn, bookPrice, bookCategory1, bookCategory2 } = req.body;

//     try {
//         await transactionModel.updateOne({isbn: bookIsbn}, {
//             author: bookAuthor,
//             book: bookTitle,
//             isbn: bookIsbn,
//             price: bookPrice,
//             categories: [bookCategory1, bookCategory2]
//         });
//         const updatedBook = await transactionModel.find({isbn: bookIsbn});
//         return res.status(200).json(updatedBook);
//     }
//     catch (error) {
//         return res.status(500).json({
//             error: error.message
//         });
//     }
// });

exports.deleteTransaction = (async(req, res) => {
    const { id } = req.params;
    try {
        const deletedTransaction = await transactionModel.deleteOne({transactionId: id});
        return res.status(200).json(deletedTransaction)
    }
    catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
});

// Här använder vi findById som är ett tillägg enbart i mongoose
exports.getTransactionById = (async(req, res) => {
    const { id } = req.params;
    try {
        const transaction = await transactionModel.findById(id);
        return res.status(200).json(transaction);
    }
    catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
});

// Här använder vi findByIdAndDelete som är ett tillägg enbart i mongoose
// exports.deleteBookById = (async(req, res) => {
//     const { id } = req.params;
//     try {
//         const deletedBook = await transactionModel.findByIdAndDelete(id);
//         return res.status(200).json(deletedBook);
//     }
//     catch (error) {
//         return res.status(500).json({
//             error: error.message
//         });
//     }
// });