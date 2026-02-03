const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['income', 'expense', 'transfer'],
    },
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    division: {
        type: String,
        required: true,
        enum: ['office', 'personal'],
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    fromAccount: {
        type: String,
    },
    toAccount: {
        type: String,
    },
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Transaction', transactionSchema);
