import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import {
  createPost,
  getPost,
  getPosts,
  upvotePost,
} from "../controllers/post.controller.js";

const router = Router();

router.get("/get-posts", getPosts);
router.get("/get-post/:id", getPost);
router.post("/create", verifyToken, createPost);
router.put("/upvote-post/:id", verifyToken, upvotePost);

export default router;
