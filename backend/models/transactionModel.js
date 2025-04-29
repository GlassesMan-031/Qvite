const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    transactionNote: {
        type: String,
        required: true,
    },
    transactionId: {
        type: Number,
        required: true,
        unique: true
    },
    transactionImage: {
        type: String
    }
});

module.exports =  mongoose.model("transaction", BookSchema)