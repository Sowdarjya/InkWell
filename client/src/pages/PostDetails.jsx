import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ThumbsUp, Trash2, Edit, ArrowLeft } from "lucide-react";
import api from "../services/axios.instance";

const PostDetails = () => {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("userInfo"))
  );

  const getPostDetails = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/posts/get-post/${id}`);
      setPost(response.data);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || "Error fetching post details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpvote = async () => {
    try {
      if (!user) {
        navigate("/signin");
        return;
      }

      const response = await api.put(`/posts/upvote-post/${id}`);
      const updatedPost = {
        ...post,
        upvotes: post.upvotes.includes(user._id)
          ? post.upvotes.filter((id) => id !== user._id)
          : [...post.upvotes, user._id],
      };
      setPost(updatedPost);
    } catch (error) {
      console.error("Error upvoting post:", error);
    }
  };

  useEffect(() => {
    getPostDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-500 dark:text-red-400 text-xl mb-4">
          {error}
        </div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          <ArrowLeft size={20} />
          Go Back
        </button>
      </div>
    );
  }

  if (!post) return null;

  const isUpvoted = user && post.upvotes.includes(user._id);
  const isAuthor = user && user.username === post.postedBy;

  return (
    <div className="min-h-screen py-8 px-4 transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-6"
        >
          <ArrowLeft size={20} />
          Back to Posts
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-colors duration-200">
          {post.coverImg && (
            <img
              src={post.coverImg}
              alt={post.title}
              className="w-full h-64 object-cover"
            />
          )}

          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={post.profileImg || "https://placehold.co/100?text=User"}
                  alt={post.postedBy}
                  className="w-10 h-10 rounded-full object-cover bg-gray-200 dark:bg-gray-700"
                />
                <div>
                  <h3 className="font-medium dark:text-gray-100">
                    {post.postedBy}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={handleUpvote}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full transition-colors duration-200 ${
                    isUpvoted
                      ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                      : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300"
                  }`}
                >
                  <ThumbsUp size={18} />
                  <span>{post.upvotes.length}</span>
                </button>

                {isAuthor && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/edit-post/${post._id}`)}
                      className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <Edit size={18} />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              {post.title}
            </h1>

            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 rounded-full text-sm">
                {post.category}
              </span>
            </div>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
              {post.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
