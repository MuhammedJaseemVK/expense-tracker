const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema =new Schema({
    name:{
        type:String,
        required:true,
        minLength:3,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:8
    }
},{timestamps:true});

const User = mongoose.model('User',userSchema);

module.exports = User;
