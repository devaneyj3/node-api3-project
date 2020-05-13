const express = require('express');

const moment = require('moment')

const server = express();

const userRouter = require('./users/userRouter');

server.use(express.json());

server.use('/api/users/', userRouter)


server.use(logger)

server.get('/', (req, res) => {
  res.send("Welcome")
});


//custom middleware

function logger(req, res, next) {
  console.log(`[${moment().format('lll')}] ${req.method} to ${req.url} from ${req.get('Origin')}`)
  next();
}

module.exports = server;
