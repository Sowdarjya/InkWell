import { User } from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/utils.js";
import { Post } from "../models/post.model.js";

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

     const token = generateToken(newUser._id);

    if (newUser) {
      await newUser.save();
      return res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        username: newUser.username,
        profileImg: newUser.profileImg,
        token
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

    // Generate and return the token
    const token = generateToken(user._id);

    return res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      username: user.username,
      profileImg: user.profileImg,
      token, // Send token in response
    });
  } catch (error) {
    console.error("Error logging in user:", error.message);
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

export const getUser = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "No user found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { username, fullname, email, profileImg } = req.body;

    const user = await User.findById(req.user?._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let imageUrl = user.profileImg;

    if (profileImg && profileImg.startsWith("data:image")) {
      const response = await cloudinary.uploader.upload(profileImg, {
        resource_type: "image",
      });

      if (!response.secure_url) {
        return res.status(400).json({ message: "Error uploading image" });
      }
      imageUrl = response.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          username,
          fullname,
          email,
          profileImg: imageUrl,
        },
      },
      { new: true }
    ).select("-password");

    await Post.updateMany(
      { postedBy: user.username },
      { $set: { profileImg: imageUrl } }
    );

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user profile:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user?._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.clearCookie("jwt");

    await Post.deleteMany({ postedBy: user.username });

    await User.findByIdAndDelete(user._id);

    return res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    console.error("Error deleting account", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
