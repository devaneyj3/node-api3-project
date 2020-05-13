const express = require('express')
const server = require('./server')
const app = express();
const cors = require('cors');

// const blogRoutes = require('./blogRoutes');
app.use(server)
app.use(express.json());
app.use(cors());

// server.use('/api/users', usersRoutes);

const PORT = 7000;

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
})