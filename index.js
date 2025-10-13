import express from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import authRouter from "./routes/authRoutes.js"; // import our router

const app = express();
const prisma = new PrismaClient();
const port = 3000;

app.use(express.json());

// =========================
// Middleware: Logger
// =========================
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} at ${new Date().toISOString()}`);
  next();
});

// =========================
// Middleware: Authenticate JWT
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
app.use("/auth", authRouter); // Mount auth routes under /auth

// Protected route example
app.post("/memes", authenticateToken, async (req, res) => {
  const { title, url } = req.body;
  const meme = await prisma.meme.create({
    data: { title, url, userId: req.user.userId },
  });
  res.status(201).json(meme);
});

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Erica's awesome server" });
});

// Error test route
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
  console.log(`Server running on http://localhost:${port}`);
});
