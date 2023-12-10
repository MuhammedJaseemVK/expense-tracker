const express = require("express");
const router = express.Router();
const verifyUser = require("../middlewares/authMiddleware");
const { createTransactionController, getAllTransactionsController } = require("../controllers/transactionController");

router.post('/create', verifyUser, createTransactionController);
router.get('/', verifyUser, getAllTransactionsController)

module.exports = router;