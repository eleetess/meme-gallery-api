import express from "express";
import jwt from "jsonwebtoken";
import {
  getAllMemes,
  getMemeById,
  updateMemeById,
  deleteMemeById,
  addMeme,
  userLikesMeme,
} from "../controllers/memeController.js";

const router = express.Router();

// ===============================
// Middleware: Authenticate users
// ===============================
export const authenticate = (request, response, next) => {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return response.status(401).json({ error: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      return response
        .status(401)
        .json({ error: "Invalid credentials. JWT missing or invalid." });
    }

    request.user = decoded;
    next();
  });
};

// ===============================
// Meme Routes
// ===============================
router.get("/", getAllMemes); // GET /memes
router.get("/:id", getMemeById); // GET /memes/:id
router.post("/", authenticate, addMeme); // POST /memes
router.put("/:id", updateMemeById); // PUT /memes/:id
router.delete("/:id", deleteMemeById); // DELETE /memes/:id
router.post("/:id/like", authenticate, userLikesMeme); // POST /memes/:id/like

export default router;
