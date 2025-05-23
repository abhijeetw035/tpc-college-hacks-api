const express = require("express")
const cors = require("cors")
const connectDB = require("./db/connectDB")
const Hack = require("./models/hacksModel")
const dotenv = require("dotenv")
dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connectDB()

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the College Hacks API")
})

app.get("/api/hacks", async (req, res) => {
  try {
    const category = req.query.category
    const query = category ? { category: category } : {}
    const hacks = await Hack.find(query)
    res.status(200).json(hacks)
  } catch (error) {
    res.status(500).json({ message: "Error fetching hacks" })
  }
})

app.post("/api/hacks", async (req, res) => {
  const { title, description, category } = req.body
  try {
    const newHack = new Hack({ title, description, category })
    await newHack.save()
    res.status(201).json(newHack)
  } catch (error) {
    res.status(500).json({ message: "Error creating hack" })
  }
})

const BEARER_TOKEN = process.env.BEARER_TOKEN

function authenticateToken(req, res, next) {
  console.log(req.headers)
  const authHeader = req.headers["authorization"]
  console.log("Auth Header:", authHeader)

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or malformed token" })
  }

  const token = authHeader.split(" ")[1]

  if (token !== BEARER_TOKEN) {
    return res.status(403).json({ message: "Invalid token" })
  }

  next()
}

app.get("/api/hacks/protected", authenticateToken, (req, res) => {
  res.json({ message: "This is a protected route. Valid token provided." })
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`)
})
