const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connectDB");
const Hack = require("./models/hacksModel");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the College Hacks API");
});

app.get("/api/hacks", async (req, res) => {
  try {
    const category = req.query.category;
    const query = category ? { category: category } : {}; //
    const hacks = await Hack.find(query);
    res.status(200).json(hacks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hacks" });
  }
});

app.post("/api/hacks", async (req, res) => {
  const { title, description, category } = req.body;
  try {
    const newHack = new Hack({ title, description, category });
    await newHack.save();
    res.status(201).json(newHack);
  } catch (error) {
    res.status(500).json({ message: "Error creating hack" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
