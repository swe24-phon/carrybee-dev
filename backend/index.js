const express = require('express');
const { PrismaClient } = require ('@prisma/client');
const bcrypt = require('bcrypt');


const prisma = new PrismaClient();
// initialise the app 
const app = express();

let data = { name: 'carry bee'}

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

// API endpoints (non visual)
app.get('/api/data', (req, res) => {
    console.log('This one was for data')
    res.send(data)
});

app.post('/api/data', (req, res) => {
    const newEntry = req.body
    res.sendStatus(201)
})

//Server running
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));