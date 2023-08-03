import express from "express";
import { addTask,deleteTask,getTasks,updateTask } from "../controllers/task.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/add", verifyToken,addTask);

router.delete("/delete/:id", verifyToken,deleteTask);

router.get("/get", verifyToken,getTasks);

router.patch("/update/:id", verifyToken,updateTask);

export default router;