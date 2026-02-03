const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Account = require('./src/models/Account');

dotenv.config();

const seedAccounts = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        const count = await Account.countDocuments();
        if (count === 0) {
            const initialAccounts = [
                { name: 'Cash', balance: 500, type: 'cash' },
                { name: 'Main Bank', balance: 8500, type: 'bank' },
                { name: 'Savings', balance: 15000, type: 'savings' },
                { name: 'Credit Card', balance: -1200, type: 'credit' },
            ];
            await Account.insertMany(initialAccounts);
            console.log('Initial accounts seeded successfully!');
        } else {
            console.log('Database already has accounts, skipping seed.');
        }
        process.exit();
    } catch (err) {
        console.error('Error seeding accounts:', err);
        process.exit(1);
    }
};

seedAccounts();
