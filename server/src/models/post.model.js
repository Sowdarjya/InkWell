import mongoose, { Schema } from "mongoose";

const postSchema = new mongoose.Schema(
  {
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    coverImg: {
      type: String,
      required: true,
      default:
        "https://cdn2.domestika.org/assets/projects/project-default-cover-1248c9d991d3ef88af5464656840f5534df2ae815032af0fdf39562fee08f0a6.svg",
    },
    upvotes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("post", postSchema);
