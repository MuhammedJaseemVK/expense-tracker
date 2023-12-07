const express = require('express');
const dotenv=require('dotenv');
const connectDB =require('./config/db');

dotenv.config();
const app=express();
const PORT =process.env.PORT || 8080;
connectDB();

app.get('/',(req,res)=>{
    res.send('Hello world');
})

app.listen(PORT,()=>{
    console.log(`Server running on https:localhost:${PORT}`);
})