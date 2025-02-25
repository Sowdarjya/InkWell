import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../services/axios.instance";
import { useParams } from "react-router-dom";
import Post from "./Post";

const UserPosts = () => {
  const [usersPosts, setUserPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const { username } = useParams();

  const getPosts = async () => {
    try {
      const { data } = await api.get(`/posts/get-user-posts/${username}`);
      setUserPosts(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getPosts();
  }, [username]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = usersPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="w-full min-h-screen md:flex-1 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {currentPosts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from(
          { length: Math.ceil(usersPosts.length / postsPerPage) },
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

export default UserPosts;
