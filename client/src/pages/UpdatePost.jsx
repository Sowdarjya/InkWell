import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import api from "../services/axios.instance";

const UpdatePost = () => {
  const [postDetails, setPostDetails] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    coverImg: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const getPost = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get(`/posts/get-post/${id}`);
      setPostDetails(data);

      setFormData({
        title: data.title || "",
        description: data.description || "",
        category: data.category || "",
        coverImg: data.coverImg || "",
      });

      if (data.coverImg) {
        setImagePreview(data.coverImg);
      }

      setError(null);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error fetching post";
      toast.error(errorMessage);
      setError(errorMessage);
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          coverImg: reader.result,
        });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.category) {
      toast.error("Title, description and category are required");
      return;
    }

    if (formData.description.length > 500) {
      toast.error("Description should not exceed 500 characters");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await api.put(`/posts/update-post/${id}`, formData);
      toast.success(response.data.message || "Post updated successfully");
      navigate(`/post/${id}`);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error updating post";
      toast.error(errorMessage);
      console.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveImage = () => {
    setFormData({
      ...formData,
      coverImg: "",
    });
    setImagePreview("");
  };

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

  return (
    <div className="min-h-screen py-8 px-4 md:px-8 transition-colors duration-200">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-6"
        >
          <ArrowLeft size={20} />
          Back to Post
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8 transition-colors duration-200">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Update Post
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter post title"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Description * ({formData.description.length}/500)
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter post content"
                rows="6"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
              {formData.description.length > 500 && (
                <p className="text-red-500 text-sm mt-1">
                  Description exceeds 500 character limit
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              >
                <option value="">Select a category</option>
                <option value="Technology">Technology</option>
                <option value="Science">Science</option>
                <option value="Health">Health</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Sports">Sports</option>
                <option value="Business">Business</option>
                <option value="Travel">Travel</option>
                <option value="Food">Food</option>
                <option value="Art">Art</option>
                <option value="Education">Education</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-6">
              <label
                htmlFor="coverImg"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Cover Image (Optional)
              </label>

              <div className="flex items-center space-x-4">
                <label className="cursor-pointer flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <span>Choose File</span>
                  <input
                    type="file"
                    id="coverImg"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                {imagePreview && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove Image
                  </button>
                )}
              </div>

              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Cover preview"
                    className="w-full max-h-64 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Updating..." : "Update Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePost;
