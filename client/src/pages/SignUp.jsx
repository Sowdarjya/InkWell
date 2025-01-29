import { ContactRound } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/axios.instance";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const { fullname, email, username, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    if (!fullname || !email || !username || !password || !confirmPassword) {
      toast.error("All fields are mandatory");
      return false;
    } else if (password !== confirmPassword) {
      toast.error("Password and confirm password must be same");
      return false;
    } else if (password.length < 6) {
      toast.error("Password must contain atleast 6 characters");
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const response = await api.post("/users/signup", {
        fullname,
        email,
        username,
        password,
      });

      console.log(response);

      toast.success("Account created successfully");

      setFormData({
        fullname: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "error creating account");
    }
  };

  return (
    <div className="min-h-screen mx-auto w-full flex justify-center items-center">
      <form className="bg-[#FFE4F2] dark:bg-[#1E1E32] w-[40%] p-8 rounded-lg drop-shadow-2xl dark:drop-shadow-[0_35px_35px_rgba(85,100,146,0.25)]">
        <div className="flex items-center justify-center gap-3 text-4xl font-semibold text-[#333333] dark:text-[#E0E0E0]">
          <ContactRound size={45} /> Register
        </div>
        <div className="my-4">
          <p className="text-[#333333] dark:text-[#E0E0E0]">Full name</p>
          <input
            type="text"
            placeholder="Full name"
            name="fullname"
            value={fullname}
            onChange={handleChange}
            className="border-none outline-none p-2 w-full rounded-md bg-[#FFFFFF] dark:bg-[#32324E] text-[#333333] dark:text-[#E0E0E0]"
          />
        </div>
        <div className="my-4">
          <p className="text-[#333333] dark:text-[#E0E0E0]">Email</p>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleChange}
            className="border-none outline-none p-2 w-full rounded-md bg-[#FFFFFF] dark:bg-[#32324E] text-[#333333] dark:text-[#E0E0E0]"
          />
        </div>
        <div className="my-4">
          <p className="text-[#333333] dark:text-[#E0E0E0]">Username</p>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={handleChange}
            className="border-none outline-none p-2 w-full rounded-md bg-[#FFFFFF] dark:bg-[#32324E] text-[#333333] dark:text-[#E0E0E0]"
          />
        </div>
        <div className="my-4">
          <p className="text-[#333333] dark:text-[#E0E0E0]">Password</p>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
            className="border-none outline-none p-2 w-full rounded-md bg-[#FFFFFF] dark:bg-[#32324E] text-[#333333] dark:text-[#E0E0E0]"
          />
        </div>
        <div className="my-4">
          <p className="text-[#333333] dark:text-[#E0E0E0]">Confirm Password</p>
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            className="border-none outline-none p-2 w-full rounded-md bg-[#FFFFFF] dark:bg-[#32324E] text-[#333333] dark:text-[#E0E0E0]"
          />
        </div>

        <div className="flex justify-center my-3">
          <button
            type="submit"
            className="dark:bg-slate-500 bg-gray-400 p-2 rounded-md text-[#333333] dark:text-[#E0E0E0] w-4/5"
            onClick={handleSubmit}
          >
            Create Account
          </button>
        </div>
        <p className="text-center text-[#333333] dark:text-[#E0E0E0]">
          Already have an account ?{" "}
          <Link to="/signin" className="text-blue-400 hover:underline">
            Login
          </Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default SignUp;
