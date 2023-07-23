const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const Database = require('./config/db')
const authRoute = require("./router/authRouter")
const User = require("./model/userModel")
const Message = require("./model/message")
const jwt = require('jsonwebtoken')
const ws = require('ws');
require('dotenv').config()

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use('/api/v1/auth', authRoute)

app.get('/messages/:userId', async (req, res) => {
    const { userId } = req.params;
    // console.log(userId, "idusers")
    const userData = req.headers.authorization.split(' ')[1];
    // console.log(userData, "user")
    const user = jwt.verify(userData, jwtSecret);
    let data = await User.findOne({ $or: [{ email: user.email }, { email: user }] });
    let myid = await data._id;
    myid = myid.toString();
    const messages = await Message.find({
      sender:{$in:[userId,myid]},
      recipient:{$in:[userId,myid]},
    }).sort({createdAt: 1});
    res.json(messages);
});

const jwtSecret = process.env.JWT_SECRET_KEY;
const port = process.env.PORT;
Database();
const server = app.listen(port, () => {
    console.log(port)
});

const wss = new ws.WebSocketServer({ server });


wss.on('connection', async (connection, req) => {
    console.log('connection')
    const cookies = req.headers.cookie

    if (cookies) {
        const tokenCookieString = cookies.split(';').find(str => str.startsWith('token=')) || cookies.split(';').find(str => str.startsWith(' token='));
        console.log(tokenCookieString);
        if (tokenCookieString) {
            const token = tokenCookieString.split('=')[1];
            if (token) {
                const user = jwt.verify(token, jwtSecret);
                let data = await User.findOne({ $or: [{ email: user.email }, { email: user }] });
                let id = await data._id;
                id = id.toString();
                let name = data.name;
                connection.userId = id;
                connection.username = name;
            }
        }
    }

    connection.on('message', async (message) => {
        const messageData = JSON.parse(message.toString());
        const { recipient, text } = messageData;
        if (recipient && text) {
            const messageDoc = await Message.create({
                sender: connection.userId,
                recipient,
                text,
            });
            [...wss.clients].filter(client => (client.userId == recipient))
                .forEach(client => client.send(JSON.stringify({ text, sender: connection.userId, id: messageDoc._id, recipient })))
        }
    });

    // console.log([...wss.clients].map(c=>c.username))
    [...wss.clients].forEach(client => {
        client.send(JSON.stringify({
            online: [...wss.clients].map(client => ({ userId: client.userId, username: client.username }))
        }))
    })
});