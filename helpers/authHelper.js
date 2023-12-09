const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword = async (password) => {
    try{
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword
    }
    catch(error){
        console.log(error)
    }
}

module.exports = {
    hashPassword,
}