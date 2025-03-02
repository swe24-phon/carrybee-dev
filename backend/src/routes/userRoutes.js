const express = require('express');
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/authMiddleware'); //add by phon
const router = express.Router();

router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.post('/api/users', userController.registerUser); // Register user
//router.get('/users', userController.getAllUsers);
//router.put('/users/:id', userController.updateUser);
//router.delete('/users/:id', userController.deleteUser);
router.post('/login', userController.loginUser);//add by phon
router.get('/', authenticate, userController.getAllUsers); // Protect this route
router.put('/:id', authenticate, userController.updateUser); // Protect this route
router.delete('/:id', authenticate, userController.deleteUser); // Protect this route

module.exports = router;

//read this: how to add authentication to make route protected
//router.get('/users', userController.getAllUsers); unprotected route
//router.get('/users', authenticate, userController.getAllUsers); protected route
//just add authenticate as above