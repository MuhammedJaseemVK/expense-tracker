const express = require('express');
const router = express.Router();
const { signupController, loginController, getUserInfoController } = require('../controllers/authController');
const verifyUser = require('../middlewares/authMiddleware');

router.post('/register', signupController);
router.post('/login', loginController);
router.get('/getUserInfo/',verifyUser, getUserInfoController);


module.exports = router
