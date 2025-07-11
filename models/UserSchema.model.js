import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    requried: true,
  },
  email: {
    type: String,
    requried: true,
  },
  password: {
    type: String,
    requried: true,
  },
  phone: {
    type: Number,
    requried: true,
  },
  role: {
    type: String,
    enum: ["user", "admin", "superadmin"],
    default: "user",
  },
  profilePicture: String,
});

export default mongoose.model("User", userSchema);
