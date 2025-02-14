const express = require('express');
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/authMiddleware'); //add by phon
const router = express.Router();

router.post('/users', userController.createUser);
router.get('/users/:email', userController.getUserByEmail);
//router.get('/users', userController.getAllUsers);
//router.put('/users/:id', userController.updateUser);
//router.delete('/users/:id', userController.deleteUser);
router.post('/login', userController.loginUser);//add by phon
router.get('/users', authenticate, userController.getAllUsers); // Protect this route
router.put('/users/:id', authenticate, userController.updateUser); // Protect this route
router.delete('/users/:id', authenticate, userController.deleteUser); // Protect this route

module.exports = router;

//read this: how to add authentication to make route protected
//router.get('/users', userController.getAllUsers); unprotected route
//router.get('/users', authenticate, userController.getAllUsers); protected route
//just add authenticate as above