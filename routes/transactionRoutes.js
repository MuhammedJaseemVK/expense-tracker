const express = require("express");
const router = express.Router();
const verifyUser =require("../middlewares/authMiddleware");
const { createTransactionController } = require("../controllers/transactionController");

router.post('/create',verifyUser, createTransactionController);

module.exports = router;