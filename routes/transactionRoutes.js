const express = require("express");
const router = express.Router();
const verifyUser = require("../middlewares/authMiddleware");
const { createTransactionController, getAllTransactionsController, updateTransactionController,deleteTransactionController } = require("../controllers/transactionController");

router.post('/create', verifyUser, createTransactionController);
router.get('/', verifyUser, getAllTransactionsController);
router.put('/update/:id', verifyUser, updateTransactionController);
router.delete('/delete/:id',verifyUser,deleteTransactionController);

module.exports = router;