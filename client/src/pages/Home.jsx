import React, { useEffect, useState } from "react";
import api from "../services/axios.instance";
import toast from "react-hot-toast";
import Post from "../components/Post";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const response = await api.get("/posts/get-posts");
      const postsArray = Object.values(response.data);
      setPosts(postsArray);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 min-h-screen">
      {posts && posts.map((post) => <Post key={post._id} post={post} />)}
    </div>
  );
};

export default Home;
