import { Request, Response } from "express";
app.post("/memes", async (req, res) => {
    try {
        const { title, url, userId } = req.body;
        if (!title || !url) {
            res.status(400).json({ error: "Title and URL are required" });
            return;
        }
        const newMeme = {
            id: Date.now(),
            title,
            url,
            userId
        };
        // Example with Prisma:
        // const newMeme = await prisma.meme.create({ data: { title, url, userId } });
        res.status(201).json(newMeme);
    }
    catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});
//# sourceMappingURL=types.js.map