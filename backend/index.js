const express = require('express');
const { PrismaClient } = require ('@prisma/client');
const bcrypt = require('bcrypt');
const userRoutes = require ('./src/routes/userRoutes.js')


const prisma = new PrismaClient();
// initialise the app 
const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());

// avoid any cors problem
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get('/', (req, res) => {
    res.send('Hello Carry Bee!');
});

// Routes

app.use('/api', userRoutes);

//Server running

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));