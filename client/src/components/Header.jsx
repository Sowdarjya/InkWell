import React, { useEffect, useState } from "react";
import { Link, Moon, Sun } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import noUserImg from "../assets/noUserImg.jpeg";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode.toString());
    document.documentElement.classList.toggle("dark", newMode);
  };

  return (
    <nav className="bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink
              to="/"
              className="text-gray-900 dark:text-white font-bold text-4xl"
            >
              InkWell
            </NavLink>
          </div>
          <div className="w-1/4 flex items-center justify-center gap-8">
            {userInfo ? (
              <>
                {/* <button className="bg-red-500">Create Post</button> */}
                <div className="relative group">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 opacity-75 blur-sm group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative p-1 rounded-full bg-white dark:bg-gray-800 ring-2 ring-violet-500 dark:ring-violet-400 transition-all duration-300 transform group-hover:scale-105">
                    <NavLink to="/profile">
                      <img
                        src={userInfo.profileImg || noUserImg}
                        alt="profile img"
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-white dark:ring-gray-800"
                      />
                    </NavLink>
                  </div>
                </div>
              </>
            ) : (
              <button
                className="
                rounded-lg 
                px-4 
                py-2 
                text-lg 
                font-medium 
                transition-all 
                duration-300 
                ease-in-out 
                border 
                border-transparent
                bg-gray-200 
                text-gray-800 
                hover:bg-gray-300 
                dark:bg-gray-700 
                dark:text-gray-200 
                dark:hover:bg-gray-600
                focus:outline-none 
                focus:ring-2 
                focus:ring-offset-2 
                focus:ring-gray-500
              "
              >
                <NavLink to="/signin">Sign in</NavLink>
              </button>
            )}

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              {darkMode ? (
                <Sun className="text-yellow-500" />
              ) : (
                <Moon className="text-gray-800" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
