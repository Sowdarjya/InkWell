import { User } from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/utils.js";

export const signup = async (req, res) => {
  const { fullname, email, username, password } = req.body;
  try {
    if (!fullname || !email || !username || !password) {
      return res.status(400).json({ message: "All fields are mandatory" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const user = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullname,
      email,
      username,
      password: hashedPassword,
    });

    if (newUser) {
      await newUser.save();
      return res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        username: newUser.username,
        password: newUser.password,
        profileImg: newUser.profileImg,
      });
    } else {
      res.status(401).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error signing up user", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    if (!email || !username || !password) {
      return res.status(400).json({ message: "All fields are mandatory" });
    }

    const user = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res);

    return res.status(201).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      username: user.username,
      password: user.password,
      profileImg: user.profileImg,
    });
  } catch (error) {
    console.log("Error logging in user", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({ message: "logged out successfully" });
  } catch (error) {
    console.log("Error logging out user", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
