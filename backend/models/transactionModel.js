const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    transactionId: {
        type: Number,
        required: true,
        unique: true
    },
    transactionNote: {
        type: String,
        required: true,
    },
    transactionImage: {
        type: String
    }
});

module.exports =  mongoose.model("transaction", BookSchema)