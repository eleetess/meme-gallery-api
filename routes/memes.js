import express, { Router } from "express";
import {
  getAllMemes,
  getMemeById,
  updateMemeById,
  deleteMemeById,
  addMeme,
} from "../controllers/memeController";
const router = express.Router();

router.get("/:id", getMemeById);

router.post("/", createMeme);

router.put("/:id", updateMeme);

router.delete("/:id", deleteMeme);

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
