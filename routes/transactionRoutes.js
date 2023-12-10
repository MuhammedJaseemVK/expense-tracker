const express = require("express");
const router = express.Router();
const verifyUser = require("../middlewares/authMiddleware");
const { createTransactionController, getAllTransactionsController, updateTransactionController,deleteTransaction } = require("../controllers/transactionController");

router.post('/create', verifyUser, createTransactionController);
router.get('/', verifyUser, getAllTransactionsController);
router.put('/update/:id', verifyUser, updateTransactionController);
router.delete('/delete/:id',verifyUser,deleteTransaction)

module.exports = router;