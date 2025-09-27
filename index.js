import express from "express";
const app = express(); //creates express app
app.use(express.json()); // JSON body parsing
const port = 3000; //makes the url?

//middleware
let memes = [
  {
    id: 1,
    title: "Distracted Boyfriend",
    url: "https://i.imgur.com/example1.jpg",
  },
  { id: 2, title: "Success Kid", url: "https://i.imgur.com/example2.jpg" },
];
//routes
app.get("/", (req, res) => {
  res.json({ message: "welcome to erica awesome server" });
});
app.get("/memes", (req, res) => {
  res.json(memes);
});

app.post("/memes", async (req, res) => {
  const { title, url } = req.body; // destructuring
  if (!title || !url) {
    return res.status(400).json({ error: "title and url are required" });
  }
  const newMeme = { id: memes.length + 1, title, url };
  memes.push(newMeme);
  res.status(201).json(newMeme);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
}); // soul of the app what makes it work
