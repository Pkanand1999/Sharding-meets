const express=require('express');
const cors=require('cors');
const morgan=require('morgan');
const Database=require('./config/db')
require('dotenv').config()

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(morgan("dev"));



const port =process.env.PORT;
Database();
app.listen(port,()=>{
    console.log(port)
});