const Transaction = require("../models/transaction");

const createTransactionController = async (req, res) => {
    try {

        const { user, amount, type, category } = req.body;
        const transaction = await new Transaction({ user, amount, type, category })
        const savedTransaction =await transaction.save();
        res.status(201).send({success:true,message:'A transaction is created',savedTransaction})
    }
    catch (error) {
        console.log(error);
    }

}
module.exports = {
    createTransactionController
}