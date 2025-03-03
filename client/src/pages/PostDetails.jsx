import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ThumbsUp, Trash2, Edit, ArrowLeft } from "lucide-react";
import api from "../services/axios.instance";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const PostDetails = () => {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);

  const getPostDetails = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.get(`/posts/get-post/${id}`);
      setPost(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "Error fetching post details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpvote = async () => {
    try {
      if (!userInfo) {
        navigate("/signin");
        return;
      }

      const response = await api.put(`/posts/upvote-post/${id}`);
      const updatedPost = {
        ...post,
        upvotes: post.upvotes.includes(userInfo._id)
          ? post.upvotes.filter((id) => id !== userInfo._id)
          : [...post.upvotes, userInfo._id],
      };
      setPost(updatedPost);
    } catch (error) {
      setError("Error upvoting post");
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/posts/delete-post/${post._id}`);
      toast.success("Post deleted successfully");
      navigate("/");
    } catch (error) {
      setError("Error deleting post");
    }
  };

  useEffect(() => {
    getPostDetails();
  }, [id]);

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
        <div className="text-red-500 dark:text-red-400 text-xl mb-4">
          {error}
        </div>
        <button
          onClick={() => getPostDetails()}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Retry
        </button>
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

  const isUpvoted = userInfo && post.upvotes.includes(userInfo._id);
  const isAuthor = userInfo && userInfo.username === post.postedBy;

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
                    <Link
                      to={`/update-post/${post._id}`}
                      className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <Edit size={18} />
                    </Link>
                    <button
                      onClick={handleDelete}
                      className="p-2 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {post.title}
            </h1>

            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {post.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
