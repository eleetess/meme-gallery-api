import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { memes } from "../model/memeData.js";
export const getAllMemes = (request, response) => {
  response.json(memes);
};

export const getMemeById = (request, response) => {
  const { id } = request.params;

  const foundMeme = memes.find((meme) => {
    return meme.id === parseInt(id);
  });

  if (!foundMeme) {
    throw new Error({
      error: "The meme with an id of " + id + " does not exist",
    });
  }

  response.json(foundMeme);
};

export const addMeme = (request, response) => {
  const { title, url } = request.body;

  if (!title || !url) {
    throw new Error("Title and url are required");
  }

  const newMeme = { id: memes.length + 1, title, url };
  memes.push(newMeme);

  console.log(memes);

  response.status(201).json(newMeme);
};

export const updateMemeById = (request, response) => {
  const { id } = request.params;
  const { title, url } = request.body;

  const foundMeme = memes.find((meme) => {
    return meme.id === parseInt(id);
  });

  if (!foundMeme) {
    throw new Error(`The meme with an id of ${id} does not exist`);
  }

  // update the found meme
  foundMeme.title = title;
  foundMeme.url = url;

  console.log(memes);

  response.json(foundMeme);
};

export const deleteMemeById = (request, response) => {
  const { id } = request.params;

  const index = memes.findIndex((meme) => {
    return meme.id === parseInt(id);
  });

  const deletedMeme = memes.splice(index, 1);

  response.json(deletedMeme);
};
//like meme
app.post("/memes/:id/like", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { error } = likeSchema.validate({ userId: req.user.userId }); // *optional
  if (error) return res.status(400).json({ error: error.details[0].message }); // *optional

  try {
    const existing = await prisma.userLikesMeme.findUnique({
      where: {
        userId_memeId: { userId: req.user.userId, memeId: parseInt(id) },
      },
    });

    if (existing) {
      await prisma.userLikesMeme.delete({ where: { id: existing.id } });
      return res.json({ message: "Meme unliked" });
    } else {
      await prisma.userLikesMeme.create({
        data: { userId: req.user.userId, memeId: parseInt(id) },
      });
      return res.json({ message: "Meme liked" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
