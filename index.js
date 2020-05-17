const express = require('express')
const server = require('./server')
const app = express();

app.use(server)

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
})