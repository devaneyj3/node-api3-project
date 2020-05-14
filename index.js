const express = require('express')
const server = require('./server')
const app = express();
const path = require('path')
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

app.use(server)

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
})