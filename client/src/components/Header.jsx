import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

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
          <div className="w-1/4 flex items-center justify-around">
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
