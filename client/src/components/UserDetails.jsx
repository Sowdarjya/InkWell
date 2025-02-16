import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FilePen, LogOut, Mail, Trash2Icon, UserRoundPen } from "lucide-react";
import noUserImg from "../assets/noUserImg.jpeg";
import toast from "react-hot-toast";
import api from "../services/axios.instance";
import {
  logOutSuccess,
  logOutStart,
  logOutFailure,
  deleteFailure,
  deleteStart,
  deleteSuccess,
} from "../slices/userSlice";
import Modal from "../components/Modal";

const UserDetails = () => {
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userInfo, isLoading } = useSelector((state) => state.user);
  const { username } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getUserDetails = async () => {
    try {
      const response = await api.get(`/users/get-user/${username}`);
      console.log(response);
      setUserData(response.data);
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!username) {
      setUserData(userInfo);
      return;
    }

    getUserDetails();
  }, []);

  const handleLogOut = async () => {
    dispatch(logOutStart());
    try {
      await api.post("/users/logout");
      sessionStorage.removeItem("userInfo");
      dispatch(logOutSuccess());
      navigate("/");
      toast.success("Logged out successfully");
    } catch (error) {
      const errorMsg = error.message;
      toast.error(errorMsg);
      dispatch(logOutFailure(errorMsg));
    }
  };

  const handleDeleteAccount = async () => {
    dispatch(deleteStart());
    try {
      await api.delete("/users/delete");
      dispatch(deleteSuccess());
      navigate("/");
      toast.success("Account deleted successfully");
    } catch (error) {
      errorMsg = error.message;
      toast.error(errorMsg);
      dispatch(deleteFailure(errorMsg));
    }
  };

  return (
    <div className="w-1/3 min-h-screen p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="relative flex justify-center">
        <div
          className="w-40 h-40 rounded-full 
          border-4 border-violet-600 dark:border-violet-400 
          bg-white dark:bg-gray-800 
          shadow-lg dark:shadow-violet-400/20
          overflow-hidden"
        >
          <img
            src={userData?.profileImg || noUserImg}
            alt="Profile"
            className="w-full h-full object-cover rounded-full 
              transition-all duration-300 
              hover:scale-105
              opacity-100 dark:opacity-90"
          />
        </div>
      </div>

      <h2
        className="text-center mt-4 text-2xl font-bold tracking-wide 
        text-gray-800 dark:text-gray-100"
      >
        {userData?.username}
      </h2>

      <div className="space-y-4 py-6 my-6 border-y border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center gap-3 text-gray-700 dark:text-gray-300">
          <UserRoundPen className="w-5 h-5" />
          <span className="text-lg">{userData?.fullname}</span>
        </div>

        <div className="flex items-center justify-center gap-3 text-gray-700 dark:text-gray-300">
          <Mail className="w-5 h-5" />
          <span className="text-lg">{userData?.email}</span>
        </div>
      </div>

      {userInfo.username === username ? (
        <>
          <div className="flex justify-center">
            <button
              className="
          flex items-center justify-center gap-2
          px-6 py-2.5 w-2/3
          bg-violet-600 hover:bg-violet-700
          dark:bg-violet-500 dark:hover:bg-violet-600
          text-white font-medium
          rounded-lg
          transition-all duration-200
          shadow-md hover:shadow-lg
          hover:-translate-y-0.5"
              onClick={() => setIsModalOpen(!isModalOpen)}
            >
              <span>Update profile</span>
              <FilePen className="w-5 h-5" />
            </button>
          </div>
          <div className="flex justify-center">
            <button
              className="
            mt-4
            flex items-center justify-center gap-2
            px-6 py-2.5 w-2/3
            bg-red-500 hover:bg-red-600
            dark:bg-red-600 dark:hover:bg-red-700
            text-white font-medium
            rounded-lg
            transition-all duration-200
            shadow-md hover:shadow-lg
            hover:-translate-y-0.5"
              onClick={handleLogOut}
            >
              <span> {isLoading ? "loading" : "Logout"} </span>
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="text-gray-700 dark:text-gray-300 text-center text-lg mb-2">
            Joined on: {new Date(userData?.createdAt).toLocaleString()}
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-center text-lg mb-2">
            Last updated: {new Date(userData?.updatedAt).toLocaleString()}
          </p>
        </>
      )}

      {userInfo.username === username && (
        <>
          <div className="flex justify-center"></div>
          <div className="flex justify-center">
            <button
              className="
            mt-4
            flex items-center justify-center gap-2
            px-6 py-2.5 w-2/3
            bg-red-500 hover:bg-red-600
            dark:bg-red-600 dark:hover:bg-red-700
            text-white font-medium
            rounded-lg
            transition-all duration-200
            shadow-md hover:shadow-lg
            hover:-translate-y-0.5"
              onClick={handleDeleteAccount}
            >
              <span> {isLoading ? "loading" : "Delete"} </span>
              <Trash2Icon className="w-5 h-5" />
            </button>
          </div>
        </>
      )}

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default UserDetails;
