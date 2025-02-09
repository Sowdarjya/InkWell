import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import {
  createPost,
  getPosts,
  upvotePost,
} from "../controllers/post.controller.js";

const router = Router();

router.get("/get-posts", getPosts);
router.post("/create", verifyToken, createPost);
router.put("/upvote-post/:id", verifyToken, upvotePost);

export default router;
