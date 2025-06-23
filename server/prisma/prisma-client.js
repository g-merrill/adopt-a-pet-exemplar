const { PrismaClient } = require("./generated/prisma-client/index.js")
const prisma = new PrismaClient()
module.exports = prisma
