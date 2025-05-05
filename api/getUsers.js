import express from "express";
import { connectDB } from "../config/db.js";
import User from "../models/User.js";
import { successResponse, errorResponse } from "../utils/response.js";

const app = express();

app.get("/api/getUsers", async (req, res) => {
  try {
    await connectDB();

    const users = await User.find().sort({ _id: -1 }); // optional: newest first
    return successResponse(res, users, "Users fetched successfully");
  } catch (error) {
    return errorResponse(res, error);
  }
});

export default app;
