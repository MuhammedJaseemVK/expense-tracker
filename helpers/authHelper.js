const bcrypt = require('bcrypt');
const JWT = require("jsonwebtoken");
const dotenv=require("dotenv")
dotenv.config('../../');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const saltRounds = 10;

const hashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword
    }
    catch (error) {
        console.log(error)
    }
}

const comparePassword = async (password, hashedPassword) => {
    try {
        const match = await bcrypt.compare(password, hashedPassword);
        return match
    }
    catch (error) {
        console.error(error)
    }
}

const generateToken = async (user) => {
    try {
        const token = await JWT.sign({ _id: user }, JWT_SECRET_KEY, { expiresIn: '1h' })
        if(token){
            return token
        }
    }
    catch (error) {
        console.error(error);
    }
}

module.exports = {
    hashPassword,
    comparePassword,
    generateToken
}