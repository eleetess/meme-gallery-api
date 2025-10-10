import express from "express";
const app = express(); //creates express app
app.use(express.json()); // JSON body parsing
const port = 3000; //makes the url?
import bcrypt from bcrypt;

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
// register a user
app.post("/auth/register",async (request, response) =>{
 const { username, password } = request.body;
 const user= await Prisma.user.create({
  data:{
    username: username,
    password: hashedPassword,
  },
 })
});

//login a user
app.post("auth/login", (request, response) =>{
 const =
})



//test error route
app.get("/error-test", (req, res) => {
  throw new Error("Test error");
});

//error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
}); // soul of the app what makes it work
