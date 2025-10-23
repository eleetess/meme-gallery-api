import express from "express";
import { registerUser, userLogin } from "../controllers/authControllers.js";

const authRouter = express.Router();

// Register a user
authRouter.post("/register", registerUser);

// Login a user
authRouter.post("/login", userLogin);

export default authRouter;
