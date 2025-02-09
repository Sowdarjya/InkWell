import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { createPost, getPosts } from "../controllers/post.controller.js";

const router = Router();

router.get("/get-posts", getPosts);
router.post("/create", verifyToken, createPost);

export default router;
