import React, { useEffect, useState } from "react";
import api from "../services/axios.instance";
import Post from "../components/Post";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

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

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        <div className="text-xl mb-4 text-red-500 dark:text-red-400">
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
    <div className="p-4 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentPosts.length > 0 ? (
          currentPosts.map((post) => <Post key={post._id} post={post} />)
        ) : (
          <div className="text-center text-gray-500 text-xl col-span-full">
            No posts available
          </div>
        )}
      </div>
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from(
          { length: Math.ceil(posts.length / postsPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-800"
              }`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Home;
