const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
        default: 0,
    },
    type: {
        type: String,
        required: true,
        enum: ['cash', 'bank', 'credit', 'savings'],
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Account', accountSchema);
