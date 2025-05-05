import express from "express";
import cors from "cors"; // ← import cors
import { connectDB } from "../config/db.js";
import User from "../models/User.js";
import { successResponse, errorResponse } from "../utils/response.js";

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // or restrict to a specific domain
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

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
