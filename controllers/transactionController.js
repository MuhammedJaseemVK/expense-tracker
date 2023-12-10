const Transaction = require("../models/transaction");

const createTransactionController = async (req, res) => {
    try {
        const { user, amount, type, category } = req.body;
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
            const transactions= await Transaction.find({user:req.body.user})
            res.status(200).send({success:true,transactions});
        }
        catch (error) {
            console.error(error);
            res.status(500).send({ success: false, message: 'Internal server error' });
        }
    }


module.exports = {
    createTransactionController,getAllTransactionsController
}