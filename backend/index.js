const express = require('express');
const { PrismaClient } = require ('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();
// initialise the app 
const app = express();

//middleware
app.use(express.json());

// avoid any cors problem
app.use(cors({
    origin: '*', // Allow all origins (use specific domains in production)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));



app.get('/', (req, res) => {
    res.send('Hello Carry Bee!');
});

//START the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));