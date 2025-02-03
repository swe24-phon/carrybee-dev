const express = require('express');
const { PrismaClient } = require ('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();
// initialise the app 
const app = express();

//parse the requests to json 
app.use(express.json());

// avoid any cors problem
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
})

// test API
app.get('/test', (req, res) => {
    try {
        res.status(200).json({ message: 'Api is working' });
    } catch {
        res.status(500).json({ message: error.message });
    }
});