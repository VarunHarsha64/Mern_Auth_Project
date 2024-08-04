import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/UserRoute.js";
import authRoutes from "./routes/authRoute.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log("Server is listening on port 3000");
});

app.get("/", (req, res) => {
  res.json({
    message: "working!",
  });
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: message,
    stack: err.stack,
  });
});
