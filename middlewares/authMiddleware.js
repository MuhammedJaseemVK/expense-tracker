const JWT = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config('../../');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const verifyUser = async (req, res, next) => {
    const token = req.header('authToken');
    if (!token) {
        return res.status(401).send({ success: false, message: "Unauthorized.Token not found" });
    }

    try {
        const data = JWT.verify(token, JWT_SECRET_KEY);
        req.body.user = data._id
        next();
    }
    catch (error) {
        console.error(error);
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
}

module.exports = verifyUser