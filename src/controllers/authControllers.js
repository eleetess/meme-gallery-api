import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Register Controller
// =========================
export const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const user = await prisma.user.create({
      data: { username, password: hashedPassword },
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: "User already exists or invalid data" });
  }
};

// =========================
// Login Controller
// =========================
export const userLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    // Compare password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    // Create JWT token
    const token = jwt.sign({ userId: user.id, role: "regular" }, "secretkey", {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
