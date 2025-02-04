import React, { useState } from "react";
import { X, Camera, Upload } from "lucide-react";
import { useSelector } from "react-redux";
import noUserImg from "../assets/noUserImg.jpeg";

const UpdateProfileModal = ({ isOpen, onClose }) => {
  const { userInfo } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    username: userInfo?.username,
    fullname: userInfo?.fullname,
    email: userInfo?.email,
    profileImg: userInfo?.profileImg || noUserImg,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profileImg: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6 pb-0">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Update Profile
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Update your profile information
          </p>
        </div>

        <form className="p-6 space-y-4">
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 rounded-full border-4 border-violet-600 dark:border-violet-400 overflow-hidden mb-4">
              <img
                src={formData.profileImg || userInfo.profileImg}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <label className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="w-8 h-8 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-3 py-2 
                border border-gray-300 dark:border-gray-600 
                bg-white dark:bg-gray-700 
                text-gray-900 dark:text-gray-100
                rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
              className="w-full px-3 py-2 
                border border-gray-300 dark:border-gray-600 
                bg-white dark:bg-gray-700 
                text-gray-900 dark:text-gray-100
                rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 
                border border-gray-300 dark:border-gray-600 
                bg-white dark:bg-gray-700 
                text-gray-900 dark:text-gray-100
                rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 
              bg-violet-600 hover:bg-violet-700 
              dark:bg-violet-500 dark:hover:bg-violet-600 
              text-white font-medium py-2.5 rounded-lg 
              transition-colors duration-200 
              hover:-translate-y-0.5 
              shadow-md hover:shadow-lg"
            onClick={handleSubmit}
          >
            <Upload className="w-5 h-5" />
            <span>Update Profile</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
