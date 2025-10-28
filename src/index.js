import express from "express";
import jwt from "jsonwebtoken";
import router from "./routes/memeRoutes.js";
import authRouter from "./routes/authRoutes.js";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

// =========================
// Middleware
// =========================
app.use(express.json());

// CORS middleware — fixed
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} at ${new Date().toISOString()}`);
  next();
});

// =========================
// JWT Authentication Middleware
// =========================
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, "secretkey", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// =========================
// Routes
// =========================
app.use("/auth", authRouter);
app.use("/memes", router);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Erica's awesome server" });
});

app.get("/error-test", (req, res) => {
  throw new Error("Test error");
});

// =========================
// Global error handler
// =========================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// =========================
// Start server
// =========================
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
