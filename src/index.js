import express from "express";
import jwt from "jsonwebtoken";
import router from "./routes/memeRoutes.js";
import authRouter from "./routes/authRoutes.js";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

app.use(express.json());

// =========================
// Logger Middleware
// =========================
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} at ${new Date().toISOString()}`);
  next();
});

// =========================
// Authenticate JWT Middleware
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

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Erica's awesome server" });
});

app.get("/error-test", (req, res) => {
  throw new Error("Test error");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
