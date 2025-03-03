import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./db/db.js";
import userRouter from "../src/routes/user.routes.js";
import postRouter from "../src/routes/post.routes.js";

dotenv.config();

const port = process.env.PORT || 8000;

const app = express();

app.use(cors({ origin: "https://ink-well-tau.vercel.app", credentials: true }));
app.use(express.urlencoded({ limit: "999mb" }));
app.use(express.json({ limit: "999mb" }));
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

connectDB()
  .then(
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    })
  )
  .catch((err) => {
    console.log(`DB connection failed ${err}`);
  });
