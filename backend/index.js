require('dotenv').config();

const express = require('express');
const prisma = require('./prismaClient');
const cors = require('cors');

const userRoutes = require ('./src/routes/userRoutes.js')
const parcelRoutes = require('./src/routes/parcelRoutes.js');
const orderRoutes = require('./src/routes/orderRoutes.js')

// initialise the app 
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Middleware to allow cross-origin requests
app.use(express.json()); //middleware to parse Json requests

// Check if .env variables are loaded
console.log('JWT_SECRET:', process.env.JWT_SECRET); 

app.get('/', async (req, res) => {
    try {
        // Test if Prisma can fetch something from the database, for example, the User model
        const users = await prisma.user.findMany();
        console.log('Connected to the database and fetched users:', users);
        res.send('Hello Carry Bee!');
    } catch (error) {
        console.error('Error with Prisma:', error);
        res.status(500).send('Error with database connection');
    }
});

// Routes
app.use('/api', userRoutes);
app.use('/api', parcelRoutes); 
app.use('/api', orderRoutes);

//Server running

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));