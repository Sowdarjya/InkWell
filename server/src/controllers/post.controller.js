import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";

export const createPost = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(400).json({ message: "Login first to create a post" });
    }

    const { title, description, coverImg } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description fields are mandatory" });
    }

    if (description.length > 500) {
      return res.status(400).json({
        message: "Description should not contain more than 500 characters",
      });
    }

    let imageUrl = "";
    if (coverImg && coverImg.startsWith("data:image")) {
      const uploadResponse = await cloudinary.uploader.upload(coverImg, {
        resource_type: "image",
      });

      if (!uploadResponse.secure_url) {
        return res.status(400).json({ message: "Error uploading image" });
      }

      imageUrl = uploadResponse.secure_url;
    }

    const newPost = new Post({
      postedBy: user.username,
      title,
      description,
      profileImg: user.profileImg || "",
      coverImg: imageUrl || "",
    });

    await newPost.save();

    return res.status(200).json({
      ...newPost._doc,
      message: "Post created successfully",
    });
  } catch (error) {
    console.error("Error creating post", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getPost = async (req, res) => {
  try {
    const { id: postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(400).json({ message: "Post not found" });
    }

    return res.status(200).json({ ...post._doc });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    if (!posts) {
      return res.status(400).json({ message: "No posts found" });
    }

    return res.status(200).json({ ...posts });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const upvotePost = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(400).json({ message: "Log in first to like a post" });
    }

    const { id: postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(400).json({ message: "Post not found" });
    }

    const upvotedByUser = post.upvotes.includes(user._id);

    if (upvotedByUser) {
      await Post.updateOne({ _id: postId }, { $pull: { upvotes: user._id } });
      return res.status(200).json({ message: "Removed upvote successfully" });
    } else {
      post.upvotes.push(user._id);
      await post.save();
      return res.status(200).json({ message: "Upvoted successfully" });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ message: "Internal server error" });
  }
};
