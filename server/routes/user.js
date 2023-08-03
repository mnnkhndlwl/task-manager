import express from "express";
import { login,signin } from "../controllers/user.js";

const router = express.Router();

//CREATE A USER
router.post("/signin", signin);

//SIGN IN
router.post("/login", login);

export default router;