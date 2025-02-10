import React from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Post = ({ post }) => {
  const defaultImage = "https://placehold.co/600x400?text=No+Image";
  const navigate = useNavigate();

  return (
    <div className="rounded-lg border border-gray-300 dark:border-gray-700 shadow-md overflow-hidden bg-white dark:bg-gray-900 transition-transform transform hover:scale-[1.02] duration-200">
      <div className="relative w-full aspect-[16/9] bg-gray-200 dark:bg-gray-700">
        <img
          src={post.coverImg || defaultImage}
          alt={post.title}
          className="w-full h-full object-cover"
          onError={(e) => (e.target.src = defaultImage)}
        />
      </div>

      <div className="p-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
            <img
              src={post.profileImg || "https://placehold.co/100?text=User"}
              alt={post.postedBy}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-sm sm:text-base font-medium text-gray-800 dark:text-gray-200">
            {post.postedBy}
          </span>
        </div>

        <h2 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900 dark:text-white line-clamp-2">
          {post.title}
        </h2>

        <div className="flex justify-between items-center mb-4 text-sm">
          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300">
            {post.category}
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            {post.upvotes?.length || 0} upvotes
          </span>
        </div>

        <button
          onClick={() => navigate(`/post/${post._id}`)}
          className="w-full mt-2 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-transform transform hover:scale-105 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <span>Read More</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Post;
