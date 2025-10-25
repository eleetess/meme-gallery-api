import express, { Router } from "express";
import {
  getAllMemes,
  getMemeById,
  updateMemeById,
  deleteMemeById,
  addMeme,
  userLikesMeme,
} from "../controllers/memeController.js";
// middleware to authenticate users
export const authenticate = (request, response, next) => {
  const authHeader = request.headers.authorization;

  const token = authHeader.split(" ")[1];

  // verify a token symmetric
  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err)
      response.status(401).json({ error: "invalid credentials. JWT missing" });

    // add user information from JWT
    request.user = decoded; // create user property in request object

    next();
  });
};
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
