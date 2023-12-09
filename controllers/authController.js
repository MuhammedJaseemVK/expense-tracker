const User = require('../models/user');
const { hashPassword } = require("../helpers/authHelper");

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (name.length < 3 || password.length < 8 || email.match(/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/)) {
        return res.status(400).send({ success: 'fasle', message: 'Invalid request' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).send({ success: false, message: 'Email is already registered' });
    }

    try {
        const hashedPassword = await hashPassword(password);
        const newUser = new User({ name, email, password });
        newUser.save()
        res.status(201).json({ success: true, message: 'new user created', name, email, hashedPassword })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Internal Server Error' });
    }
}


module.exports = {
    registerUser
}