import { User } from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { fullname, email, username, password, profileImg } = req.body;

    if (!fullname || !email || !username || !password || !profileImg) {
      return res.status(400).json({ message: "All fields are mandatory" });
    }

    const user = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const uploadResponse = await cloudinary.uploader.upload(profileImg);
    const imageUrl = uploadResponse.secure_url;

    const newUser = new User({
      fullname,
      email,
      username,
      password: hashedPassword,
      profileImg: imageUrl,
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
