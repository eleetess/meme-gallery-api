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
//logging middleware
function logger(req, res, next) {
  console.log(`${req.method} ${req.url} at ${new Date().toISOString()}`);
  next();
}
app.use(logger);

//routes
//root route
app.get("/", (req, res) => {
  res.json({ message: "welcome to erica awesome server" });
});

app.get("/memes", (req, res) => {
  res.json(memes);
});

//test error route
app.get("/error-test", (req, res) => {
  throw new Error("Test error");
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
//error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
}); // soul of the app what makes it work
