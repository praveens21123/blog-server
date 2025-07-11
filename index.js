import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import blogRoutes from "./Routes/blog.routes.js";
import authRoutes from "./Routes/auth.routes.js";
import userRoutes from "./Routes/user.routes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected");
  } catch (error) {
    console.log(error);
  }
};

// Middlewares
app.use(
  cors({
    origin: ["*", "http://localhost:5173", "https://blog-client-self.vercel.app"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/blog", blogRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running in port ${port}`);
  });
});
