import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";

export const createPost = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(400).json({ message: "Login first to create a post" });
    }

    const { title, description, category, coverImg } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({
        message: "Title,description and category fields are mandatory",
      });
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
      category,
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

export const getPostsByUser = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const posts = await Post.find({ postedBy: user.username });

    if (!posts) {
      return res.status(400).json({ message: "No posts not found" });
    }

    return res.status(200).json(posts);
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({ message: "Internal server error" });
  }
};

export const upvotePost = async (req, res) => {
  try {
    const user = req.user;

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

export const deletePost = async (req, res) => {
  try {
    const { id: postId } = req.params;

    const user = req.user;

    if (!user) {
      return res
        .status(400)
        .json({ message: "Log in first to delete the post" });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(400).json({ message: "Post not found" });
    }

    if (user.username !== post.postedBy) {
      return res.status(400).json({ message: "You can't delete this post" });
    }

    await Post.findByIdAndDelete(postId);

    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id: postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(400).json({ message: "Post not found" });
    }

    const user = req.user;

    if (!user) {
      return res.status(400).json({ message: "Log in first to update post" });
    }

    if (user.username !== post.postedBy) {
      return res.status(400).json({ message: "You cannot update this post" });
    }

    const { title, description, category, coverImg } = req.body;

    let imageUrl = post.coverImg;
    if (coverImg && coverImg.startsWith("data:image")) {
      const uploadResponse = await cloudinary.uploader.upload(coverImg, {
        resource_type: "image",
      });

      if (!uploadResponse.secure_url) {
        return res.status(400).json({ message: "Error uploading image" });
      }

      imageUrl = uploadResponse.secure_url;
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $set: {
          title,
          description,
          category,
          coverImg,
        },
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ ...updatedPost._doc, message: "Post updated successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
