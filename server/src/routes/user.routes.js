import { Router } from "express";
import {
  deleteProfile,
  getUser,
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
router.get("/get-user/:username", getUser);
router.put("/update-profile", verifyToken, updateProfile);
router.delete("/delete", verifyToken, deleteProfile);

export default router;
