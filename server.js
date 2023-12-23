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
    origin: 'the-expense-tracker-web.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
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