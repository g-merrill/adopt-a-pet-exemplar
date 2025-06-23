const express = require("express")
const bcrypt = require("bcrypt")
const prisma = require("../prisma/prisma-client.js")
const rateLimit = require("express-rate-limit");

const router = express.Router()

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login attempts per windowMs
    message: { error: "Too many failed login attempts. Try again later." },
});

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
	res
		.status(201)
		.json({ message: `User: ${newUser.username} created successfully!` })
})

router.post("/login", loginLimiter, async (req, res) => {
	const { username, password } = req.body
	if (!username || !password) {
		return res
			.status(400)
			.json({ error: "Username and password are required." })
	}
	const user = await prisma.user.findUnique({
		where: { username },
	})
	if (!user) {
		return res.status(400).json({ error: "Invalid username or password." })
	}
	const isValidPassword = await bcrypt.compare(password, user.password)
	if (!isValidPassword) {
		return res.status(400).json({ error: "Invalid username or password." })
	}
	res.json({ message: "Login successful!" })
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
