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

  const navItems = [
    {
      id: 1,
      name: "Login",
      slug: "/signin",
    },
    {
      id: 2,
      name: "Register",
      slug: "/signup",
    },
  ];

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
            {navItems.map((item) => (
              <NavLink
                to={item.slug}
                key={item.id}
                className={({ isActive }) =>
                  isActive
                    ? "text-xl light:text-gray-700 dark:text-white underline dark:decoration-white light:decoration-gray-700 font-semibold"
                    : "text-xl light:text-gray-700 dark:text-white"
                }
              >
                {item.name}
              </NavLink>
            ))}
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
