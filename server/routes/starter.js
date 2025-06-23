const express = require("express")
const bcrypt = require("bcrypt")
const prisma = require("../prisma/prisma-client.js")

const router = express.Router()

router.get("/", (req, res) => {
	res.send("Welcome to my app!")
})

router.post("/signup", async (req, res) => {
	const { username, password } = req.body
	if (!username || !password) {
		return res
			.status(400)
			.json({ error: "Username and password are required." })
	}

	if (password.length < 8) {
		return res
			.status(400)
			.json({ error: "Password must be at least 8 characters long." })
	}
	const existingUser = await prisma.user.findUnique({
		where: { username },
	})

	if (existingUser) {
		return res.status(400).json({ error: "Username already taken." })
	}
	const hashedPassword = await bcrypt.hash(password, 10)
	const newUser = await prisma.user.create({
		data: { username, password: hashedPassword },
	})
	res.status(201).json({ message: `User: ${newUser.username} created successfully!` })
})

router.post("/login", (req, res) => {
	res.send("Welcome to my app!")
})

router.post("/logout", (req, res) => {
	res.send("Welcome to my app!")
})

router.get("/sample-path", (req, res) => {
	res.send("This is a sample response.")
})

router.get("/hello-world", (req, res) => {
	res.send("Hello, World!")
})

router.get("/hello-pet", (req, res) => {
	res.send("Hello, Pet!")
})

module.exports = router
