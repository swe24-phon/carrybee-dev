const prisma = require('../../prismaClient');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  return createUser(req, res); // No need to duplicate logic
};

//cause error by phon
// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Retrieve user by email
//     const user = await prisma.user.findUnique({ where: { email } });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.status(200).json({ token });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };
// end by phon*************
// const loginUser = async (req) => {
//   const { email, password } = req.body;

//   // Retrieve user by email
//   const user = await prisma.user.findUnique({ where: { email } });
//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     throw new Error('Invalid credentials');
//   }

//   // Generate JWT token
//   const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//   return token; // Return** the token instead of sending a response
// };

const loginUser = async (req) => {
  const { email, password } = req.body;

  // Retrieve user by email
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }

  // Generate JWT token with email included in the payload
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  console.log({ token, user });
  return { 
    token, 
    user: {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email
    }
  };
};
//add by phon end here*************
// Create User
const createUser = async (userData) => {
  try {
    const { first_name, last_name, phone, email, password, address } = userData
    
    // Validate email format
    if (!validator.isEmail(email)) {
      throw new Error('Invalid email address');
    }
    // Check if email already exists
    const existingUser = await prisma.user.findUnique({ where: { email }});
    if (existingUser) {
      throw new Error ('Email already registered');
    }
    // Check if phone number already exists
    const existingPhone = await prisma.user.findUnique({ where: { phone }});
    if (existingPhone) {
      throw new Error ('Phone number already registered');
    }
    //Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
        data: {
            first_name,
            last_name,
            phone,
            email,
            password: hashedPassword,
            address,
            },
      });
    // Return the result to controller
    return { message: 'User registered successfully', user: newUser };
    } catch (error) {
        throw new Error(error.message);
    }
};

//add by  phon
// Get user by id
const getUserById = async (id) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: id, } });
    if (!user) {
      throw new Error('User not found');
    }
    // Create a new object excluding the password
    const userWithoutPassword = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      email: user.email,
      address: user.address,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
    return { user: userWithoutPassword }; // Return the new object
  } catch (error) {
    throw new Error(error.message);
  }
};

//add by phon
// Get All Users
const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    // Map through users to exclude passwords
    return users.map(({ password, ...userWithoutPassword }) => userWithoutPassword);
  } catch (error) {
    throw new Error('Failed to get all users');
  }
};
//add by phon end here
// Update user
const updateUser = async (id, updateData) => {
  try {
    const { first_name, last_name, phone, email, address } = updateData;
    
    //Validate email format if it's provided
    if (email && !validator.isEmail(email)) {
        throw new Error('Invalid email address');
    }
    //Check if email is being updated and if it is already taken 
    if (email) {
      const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail && existingEmail.id !== id) { // Make sure is not the same user
      throw new Error('Email already registered');
      }
    }
    // Check if phone number is being updated and if it's already taken by another user
    if (phone) {
      const existingPhone = await prisma.user.findUnique({ where: { phone }});
      if (existingPhone && existingPhone.id !== id) { //Make sure is not the same user
        throw new Error('Phone number already registered');
      }
    }
    
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        first_name: first_name || undefined, // If the value is provided, use it, otherwise skip it
        last_name: last_name || undefined,
        phone: phone || undefined,
        email: email || undefined,            
        address: address || undefined,
        },
    });
    
    return updatedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete user
const deleteUser = async (id) => {
  try {
    await prisma.user.delete({ where: { id }});
    return {message: 'User deleted successfully'};
  } catch (error) {
    throw new Error('Failed to delete user');
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