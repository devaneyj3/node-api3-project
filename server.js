const express = require('express');

const moment = require('moment')
const path = require('path')

const server = express();
const cors = require('cors');

const userRouter = require('./users/userRouter');

server.use(express.json());

server.use(cors());
server.use('/api/users/', userRouter)


server.use(logger)

// Serve static files from the React frontend app
server.use(express.static(path.join(__dirname, 'client/build'))) 

server.get('/', (req, res) => {
  res.send("Welcome")
});

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})


//custom middleware

function logger(req, res, next) {
  console.log(`[${moment().format('lll')}] ${req.method} to ${req.url} from ${req.get('Origin')}`)
  next();
}

module.exports = server;
