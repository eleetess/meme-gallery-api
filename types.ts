import { Request, Response } from "express";

app.post("/memes", async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, url, userId } = req.body as {
      title: string;
      url: string;
      userId: number;
    };

    if (!title || !url) {
      res.status(400).json({ error: "Title and URL are required" });
      return;
    }

    const newMeme: Meme = {
      id: Date.now(),
      title,
      url,
      userId
    };

    // Example with Prisma:
    // const newMeme = await prisma.meme.create({ data: { title, url, userId } });

    res.status(201).json(newMeme);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});




interface Meme {
  id: number;
  title: string;
  url: string;
  userId: number;
}
