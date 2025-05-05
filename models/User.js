import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  remarks: String,
});

export default mongoose.models.User || mongoose.model("User", userSchema);
