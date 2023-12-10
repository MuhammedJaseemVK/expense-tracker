const Transaction = require("../models/transaction");

const createTransactionController = async (req, res) => {
    try {
        const { user, amount, type, category } = req.body;
        if (!user || amount < 0 || !(type === 'income' || type === 'expense')) {
            return res.status(400).send({ success: false, message: 'some fields are invalid' });
        }

        const transaction = await new Transaction({ user, amount, type, category })
        const savedTransaction = await transaction.save();
        res.status(201).send({ success: true, message: 'A transaction is created', savedTransaction })
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: 'Internal server error' });
    }
}

const getAllTransactionsController = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.body.user })
        return res.status(200).send({ success: true, transactions });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: 'Internal server error' });
    }
}

const updateTransactionController = async (req, res) => {
    try {
        const id = req.params.id;
        const { amount, type, category } = req.body;
        const updatedTransaction = { type, amount, category }
        let transaction = await Transaction.findById(id)
        if (!transaction) {
            return res.status(404).send({ success: false, message: 'No transaction found' });
        }

        if (transaction.user.toString() !== req.body.user) {
            return res.status(401).send({ success: false, message: 'Unauthorized access' });
        }

        transaction = await Transaction.findByIdAndUpdate(id, { $set: updatedTransaction }, { new: true })
        res.send({ transaction })

    }
    catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: 'Internal server error' });
    }
}

const deleteTransaction = async (req, res) => {
    try {
        const id = req.params.id;
        let transaction = await Transaction.findById(id);
        if (!transaction) {
            return res.status(404).send({ success: false, message: 'Transaction is not found' });
        }

        if (transaction.user.toString() !== req.body.user) {
            return res.status(404).send({ success: false, message: 'Unauthorized access' });
        }

        transaction = await Transaction.findByIdAndDelete(id);
        res.status(200).send({ success: true, message: 'Transaction is deleted', transaction });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: 'Internal server error' });
    }
}


module.exports = {
    createTransactionController,
    getAllTransactionsController,
    updateTransactionController,
    deleteTransaction
}