const Transaction = require('../models/Transaction');
const Account = require('../models/Account');

const checkEditRestriction = (createdAt) => {
    const hoursSinceCreation = (new Date() - new Date(createdAt)) / (1000 * 60 * 60);
    return hoursSinceCreation < 12;
};

exports.getTransactions = async (req, res) => {
    try {
        const { division, category, dateFrom, dateTo, type } = req.query;
        let query = {};

        if (division) query.division = division;
        if (category) query.category = category;
        if (type) query.type = type;
        if (dateFrom || dateTo) {
            query.date = {};
            if (dateFrom) query.date.$gte = new Date(dateFrom);
            if (dateTo) query.date.$lte = new Date(dateTo);
        }

        const transactions = await Transaction.find(query).sort({ date: -1 });
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createTransaction = async (req, res) => {
    const transaction = new Transaction(req.body);
    try {
        const newTransaction = await transaction.save();

        // Update account balance
        if (req.body.type === 'income') {
            await Account.findByIdAndUpdate(req.body.accountId, { $inc: { balance: req.body.amount } });
        } else if (req.body.type === 'expense') {
            await Account.findByIdAndUpdate(req.body.accountId, { $inc: { balance: -req.body.amount } });
        } else if (req.body.type === 'transfer') {
            // Handle transfer logic if strictly needed, but simple for now
        }

        res.status(201).json(newTransaction);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

        if (!checkEditRestriction(transaction.createdAt)) {
            return res.status(403).json({ message: 'Editing restricted after 12 hours' });
        }

        const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTransaction);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

        if (!checkEditRestriction(transaction.createdAt)) {
            return res.status(403).json({ message: 'Deletion restricted after 12 hours' });
        }

        await Transaction.findByIdAndDelete(req.params.id);
        res.json({ message: 'Transaction deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
