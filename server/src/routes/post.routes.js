import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { createPost } from "../controllers/post.controller.js";

const router = Router();

router.post("/create", verifyToken, createPost);

export default router;
