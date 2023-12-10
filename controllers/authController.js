const User = require('../models/user');
const { hashPassword, comparePassword, generateToken } = require("../helpers/authHelper");

const signupController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (name.length < 3 || password.length < 8 || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            return res.status(400).send({ success: false, message: 'some fields are invalid ' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ success: false, message: 'Email is already registered' });
        }

        const hashedPassword = await hashPassword(password);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save()
        res.status(201).json({ success: true, message: 'new user created', user: newUser })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Internal Server Error' });
    }
}

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) || password.length < 8) {
            return res.status(400).send({ success: false, message: 'email or password is invalid' })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.send(404).send({ success: false, message: 'Invalid email or password' });
        }

        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({ success: false, message: 'Invalid email or password' })
        }
        const token = await generateToken(user._id);
        if (token) {
            res.status(201).send({ success: true, message: 'User logined', token })
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Internal Server Error' });
    }
}


module.exports = {
    signupController,
    loginController
}