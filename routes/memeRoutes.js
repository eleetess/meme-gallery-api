import express, { Router } from "express";
import {
  getAllMemes,
  getMemeById,
  updateMemeById,
  deleteMemeById,
  addMeme,
} from "../src/controllers/memeController.js";
const router = express.Router();

router.get("/", getAllMemes);

router.get("/:id", getMemeById);

router.post("/", authenticate, addMeme);

router.put("/:id", updateMemeById);

router.delete("/:id", deleteMemeById);

router.post("/:id", authenticate, userLikesMeme);

router.get("/memes", (req, res) => {
  res.json(memes);
});

router.post("/memes", async (req, res) => {
  const { title, url } = req.body; // destructuring
  if (!title || !url) {
    return res.status(400).json({ error: "title and url are required" });
  }
  const newMeme = { id: memes.length + 1, title, url };
  memes.push(newMeme);
  res.status(201).json(newMeme);
});

export default router;
