import React from "react";

const Footer = () => {
  return (
    <footer className="w-full py-6 px-4 text-center transition-colors duration-300 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-center items-center">
        <p>&copy; {new Date().getFullYear()} InkWell. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
