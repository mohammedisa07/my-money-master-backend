const Account = require('../models/Account');
const Transaction = require('../models/Transaction');

exports.getAccounts = async (req, res) => {
    try {
        const accounts = await Account.find();
        res.json(accounts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createAccount = async (req, res) => {
    const account = new Account(req.body);
    try {
        const newAccount = await account.save();
        res.status(201).json(newAccount);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getStats = async (req, res) => {
    try {
        // Basic stats calculation logic
        const transactions = await Transaction.find();
        const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
        const expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

        res.json({
            income,
            expense,
            balance: income - expense,
            transactionCount: transactions.length
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
