import { createRequire } from "module"
const require = createRequire(import.meta.url)

const { PrismaClient } = require("./generated/prisma-client/index")
const bcrypt = require("bcrypt")

const prisma = new PrismaClient()

const hashedPassword = await bcrypt.hash("password1234", 10)

const users = [
	{
		username: "gmerrill",
		password: hashedPassword,
	},
]

const pets = [
	{ id: 1, name: "tycho", type: "dog", age: 2 },
	{ id: 2, name: "mika", type: "dog", age: 1 },
	{ id: 3, name: "stringer", type: "dog", age: 10 },
]

async function main() {
	console.log(`Start seeding ...`)

	// Clear the table first
	await prisma.pet.deleteMany()
	await prisma.user.deleteMany()

	let userId

	for (const user of users) {
		const userRecord = await prisma.user.create({
			data: user,
		})
		userId = userRecord.id
		console.log(`Created user with id: ${userRecord.id}`)
	}

	for (const pet of pets) {
		const petRecord = await prisma.pet.create({
			data: { ...pet, userId },
		})
		console.log(`Created pet with id: ${petRecord.id}`)
	}
	console.log(`Seeding finished.`)
}

main()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
