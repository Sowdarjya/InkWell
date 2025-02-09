import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    postedBy: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    profileImg: {
      type: String,
    },
    coverImg: {
      type: String,
    },
    upvotes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("post", postSchema);
