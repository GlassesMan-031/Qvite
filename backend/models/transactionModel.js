const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    transactionAccountId: {
        type: Number,
        required: true,
    },
    transactionNote: {
        type: String,
        required: true,
    },
    transactionAmount: {
        type: Number,
        required: true,
    },
    transactionImage: {
        type: String
    },
    transactionRecurring: {
        type: Boolean,
        default: false
    },
    transactionDate: {
        type: Date,
        required: true,
    }
    
   
});

module.exports =  mongoose.model("transaction", transactionSchema)