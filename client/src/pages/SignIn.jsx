import { LogIn } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const { email, username, password } = formData;

  return (
    <div className="min-h-screen mx-auto w-full flex justify-center items-center">
      <form className="bg-[#FFE4F2] dark:bg-[#1E1E32] w-[40%] p-8 rounded-lg drop-shadow-2xl dark:drop-shadow-[0_35px_35px_rgba(85,100,146,0.25)]">
        <div className="flex items-center justify-center gap-3 text-4xl font-semibold text-[#333333] dark:text-[#E0E0E0]">
          <LogIn size={45} /> Login
        </div>
        <div className="my-4">
          <p className="text-[#333333] dark:text-[#E0E0E0]">Email</p>
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Email"
            className="border-none outline-none p-2 w-full rounded-md bg-[#FFFFFF] dark:bg-[#32324E] text-[#333333] dark:text-[#E0E0E0]"
          />
        </div>
        <div className="my-4">
          <p className="text-[#333333] dark:text-[#E0E0E0]">Username</p>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            placeholder="Username"
            className="border-none outline-none p-2 w-full rounded-md bg-[#FFFFFF] dark:bg-[#32324E] text-[#333333] dark:text-[#E0E0E0]"
          />
        </div>
        <div className="my-4">
          <p className="text-[#333333] dark:text-[#E0E0E0]">Password</p>
          <input
            type="text"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Password"
            className="border-none outline-none p-2 w-full rounded-md bg-[#FFFFFF] dark:bg-[#32324E] text-[#333333] dark:text-[#E0E0E0]"
          />
        </div>
        <div className="flex justify-center my-3">
          <button
            type="submit"
            className="dark:bg-slate-500 bg-gray-400 p-2 rounded-md text-[#333333] dark:text-[#E0E0E0] w-4/5"
          >
            Login
          </button>
        </div>
        <p className="text-center text-[#333333] dark:text-[#E0E0E0]">
          Don't have an account ?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
