import express from "express";
import mongoose from "mongoose";

// Create a new Express app
const app = express();
app.use(express.json()); // For parsing application/json

// MongoDB connection URI (Use environment variable in production)
const mongoURI = "mongodb+srv://root:root@cluster0.spoizjd.mongodb.net/practicedb";

// Ensure DB is connected only once
let isConnected = false;
async function connectDB() {
  if (!isConnected) {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("MongoDB connected");
  }
}

// Define schema and model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  remarks: String,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

// Handle POST request
app.post("/api/addUser", async (req, res) => {
  try {
    await connectDB();

    const { name, email, phone, remarks } = req.body;
    const newUser = new User({ name, email, phone, remarks });

    await newUser.save();
    res.status(201).json({ message: "User added successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default app;
