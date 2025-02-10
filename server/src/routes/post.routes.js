import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
  upvotePost,
} from "../controllers/post.controller.js";

const router = Router();

router.get("/get-posts", getPosts);
router.get("/get-post/:id", getPost);
router.post("/create", verifyToken, createPost);
router.put("/upvote-post/:id", verifyToken, upvotePost);
router.put("/update-post/:id", verifyToken, updatePost);
router.delete("/delete-post/:id", verifyToken, deletePost);

export default router;
