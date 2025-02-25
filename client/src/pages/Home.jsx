import React, { useEffect, useState } from "react";
import api from "../services/axios.instance";
import toast from "react-hot-toast";
import Post from "../components/Post";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getPosts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.get("/posts/get-posts");
      const postsArray = Object.values(response.data);
      setPosts(postsArray);
    } catch (error) {
      setError("Error fetching posts");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl animate-pulse dark:text-purple-500">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className=" text-xl mb-4 text-red-500 dark:text-red-400">
          {error}
        </div>
        <button
          onClick={getPosts}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 min-h-screen">
      {posts.length > 0 ? (
        posts.map((post) => <Post key={post._id} post={post} />)
      ) : (
        <div className="text-center text-gray-500 text-xl col-span-full">
          No posts available
        </div>
      )}
    </div>
  );
};

export default Home;
