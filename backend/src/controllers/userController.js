const userService = require('../services/userService');

//add by phon start here*************
// Register User
const registerUser = async (req, res) => {
  try {
    const newUser = await userService.registerUser(req, res);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login User
// const loginUser = async (req, res) => {
//   try {
//     const token = await userService.loginUser(req, res);
//     res.status(200).json({ token });
//   } catch (error) {
//     res.status(401).json({ error: error.message });
//   }
// };

const loginUser = async (req, res) => {
  try {
    const token = await userService.loginUser(req); // Pass only req
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
//add by phon end here*************

// Create User
const createUser = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Get user by Email

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json(user); // Ensure this is the modified user object
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};


// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update user
const updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Delete user
const deleteUser = async (req, res) => {
  try {
    const deletedMessage = await userService.deleteUser(req.params.id);
    res.status(200).json(deletedMessage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
    createUser,
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser,
    registerUser,//add by phon
    loginUser,//add by phon
  };