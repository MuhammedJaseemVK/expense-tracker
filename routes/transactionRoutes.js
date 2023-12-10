const express = require("express");
const router = express.Router();
const verifyUser = require("../middlewares/authMiddleware");
const { createTransactionController, getAllTransactionsController, updateTransactionController } = require("../controllers/transactionController");

router.post('/create', verifyUser, createTransactionController);
router.get('/', verifyUser, getAllTransactionsController);
router.put('/update/:id', verifyUser, updateTransactionController)

module.exports = router;