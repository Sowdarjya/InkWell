import { Router } from "express";
import {
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", verifyToken, logout);
router.put("/update-profile", verifyToken, updateProfile);

export default router;
