const express=require('express');
const cors=require('cors');
const morgan=require('morgan');
const Database=require('./config/db')
const authRoute = require("./router/authRouter")
const ws = require('ws');
require('dotenv').config()

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(morgan("dev"));
app.use('/api/v1/auth',authRoute)


const port =process.env.PORT;
Database();
const server=app.listen(port,()=>{
    console.log(port)
});

const wss=new ws.WebSocketServer({server});


wss.on('connection',(connection)=>{
    console.log('connection')
})