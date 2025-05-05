const mongoose = require("mongoose");
const uri = "mongodb+srv://root:root@cluster0.spoizjd.mongodb.net/fakestore";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  remarks: String,
});

module.exports = mongoose.model("User", userSchema);
