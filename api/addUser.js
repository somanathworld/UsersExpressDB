import express from "express";
import cors from "cors"; // ← import cors
import { connectDB } from "../config/db.js";
import User from "../models/User.js";
import { successResponse, errorResponse } from "../utils/response.js";

const app = express();

app.use(cors());
app.options("*", cors()); // allow OPTIONS preflight
app.use(express.json());

app.post("/api/addUser", async (req, res) => {
  try {
    await connectDB();

    const { name, email, phone, remarks } = req.body;
    const newUser = new User({ name, email, phone, remarks });
    await newUser.save();

    return successResponse(res, newUser, "User added successfully", 201);
  } catch (error) {
    return errorResponse(res, error);
  }
});

export default app;
