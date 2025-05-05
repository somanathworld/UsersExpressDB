// server.js
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User"); // import the User model

const app = express();

// Middleware to parse JSON
app.use(express.json());

//mongo connect uri
const uri = "mongodb+srv://root:root@cluster0.spoizjd.mongodb.net/fakestore";

// Connect to MongoDB
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Route to add user
app.post("/add-user", async (req, res) => {
  const { name, email, phone, remarks } = req.body;

  try {
    const newUser = new User({ name, email, phone, remarks });
    await newUser.save();
    res.status(201).json({ message: "User added successfully", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to add user", details: error.message });
  }
});

app.get("/", (req, res) => res.status("200").json({ result: "Hello" }));

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
