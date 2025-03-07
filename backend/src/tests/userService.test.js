const { expect, describe, beforeAll, test, afterAll } = require('@jest/globals');
const userService = require('../services/userService')
const prisma = require('../../prismaClient');
const jwt = require ('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcrypt')

jest.mock('jsonwebtoken')

jest.mock('bcrypt')

// Don't want to actually create a payment
// So we create a mock to get an expected result.
jest.mock('../../prismaClient', () => ({
  user: {
    create:jest.fn(),
    findMany:jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  },
}));

// Test how mocking works
test("Create User", async () => {
  const mockUserData = {
    first_name: "Bob",
    last_name: "Bobinsky",
    phone: "1239120931",
    email: "bob@lobmail.com",
    password: "bobert",
    address: "098 lobcorp street"
  };
  
  bcrypt.hash.mockResolvedValue("bobert")

  prisma.user.findUnique.mockResolvedValue(undefined)
  prisma.user.create.mockResolvedValue({id: 123, ...mockUserData})
  
  const res = await userService.createUser(mockUserData)
  console.log(res)
} )

// Test sign-in
// If it doesn't work
// just ignore
test("Login User", async () => {

  const userCredentials = 
  {
    body: {
      email: "hob@damail.com",
      password: "123"
    }
  }
  jwt.sign.mockReturnValue("SomeToken-IDK")
  bcrypt.compare.mockResolvedValue(true)
  prisma.user.findUnique.mockResolvedValue(
    {
      user: "Hob",
      password: "123"
    }
  )

  const res = await userService.loginUser(userCredentials)

    console.log(res)
})


test("Get all Users", async () => {
  const mockUserList = [
    {
      id: 312,
      first_name: "Bob",
      last_name: "Bobinsky",
      phone: "1239120931",
      email: "bob@lobmail.com",
      password: "bobert",
      address: "098 lobcorp street"
    },
    {
      id: 21378912,
      first_name: "Lop",
      last_name: "Lopinsky",
      phone: "1441235234523",
      email: "lop@lobmail.com",
      password: "lopert",
      address: "092 lobcorp street"
    },
    {
      id: 54145,
      first_name: "Rob",
      last_name: "Robinsky",
      phone: "12312451512",
      email: "rob@lobmail.com",
      password: "robert",
      address: "095 lobcorp street"
    }
  ]

  prisma.user.findMany.mockResolvedValue(mockUserList)

  const res = await userService.getAllUsers()
  console.log(res)
})

test("Get user by ID", async () => {
  const mockUser = {
    id: 54145,
    first_name: "Rob",
    last_name: "Robinsky",
    phone: "12312451512",
    email: "rob@lobmail.com",
    password: "robert",
    address: "095 lobcorp street",
    created_at: 9999,
    updated_at: 9999,
  }

  prisma.user.findUnique.mockResolvedValue(mockUser)

  const res = await userService.getUserById(54145)
  console.log(res)
})

test("Update user", async () => {
  const mockUpdatedUser = {
    id: 54145,
    first_name: "Cob",
    last_name: "Cobinsky",
    phone: "12312451512",
    email: "cob@lobmail.com",
    address: "091 lobcorp street",
    created_at: 9999,
    updated_at: 9999,
  }

  const updateData = {
    first_name: "Cob",
    last_name: "Cobinsky",
    phone: "12312451512",
    email: "cob@lobmail.com",
    address: "091 lobcorp street"
  };

  prisma.user.update.mockResolvedValue(mockUpdatedUser)

  // Might need to refactor the mock update
  // function.
  const res = await userService.updateUser(54145, updateData)
  console.log(res)

})

test("Delete user", async () => {
  prisma.user.delete.mockResolvedValue('User deleted successfully')

  const res = await userService.deleteUser(3)
  console.log(res)
})
