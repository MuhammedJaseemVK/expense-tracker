const express = require('express');
const dotenv=require('dotenv');
const connectDB =require('./config/db');
const authRoutes =require('./routes/authRoutes');
const transactionRoutes = require("./routes/transactionRoutes");
const cors=require('cors');

dotenv.config();
const app=express();
const PORT =process.env.PORT || 8080;
connectDB();

const corsOptions = {
    origin: ['https://expense-tracker-client-seven.vercel.app'],
    methods: ['GET,PUT,PATCH,POST,DELETE'],
    credentials: true
  };
  
app.use(cors(corsOptions));
  
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Hello world');
})

app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/transaction',transactionRoutes);

app.listen(PORT,()=>{
    console.log(`Server running on https:localhost:${PORT}`);
})