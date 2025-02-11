// Custom Prisma Client Wrapper to share the same Prisma client instance across the app
// and to interact with PostgreSQL database

const { PrismaClient, Prisma } = require ('@prisma/client');

const prisma = new PrismaClient()

module.exports = prisma;