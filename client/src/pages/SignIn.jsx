import { LogIn } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signInStart, signInSuccess, signInFailure } from "../slices/userSlice";
import api from "../services/axios.instance";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { userInfo, isLoading, isError } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (userInfo) navigate("/");
  });

  const { email, username, password } = formData;

  const validateForm = () => {
    if (!email || !username || !password) {
      toast.error("All fields are mandatory");
      dispatch(signInFailure("All fields are mandatory"));
      return false;
    } else if (password.length < 6) {
      toast.error("Password must contain at least 6 characters");
      dispatch(signInFailure("Password must contain at least 6 characters"));
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    dispatch(signInStart());
    try {
      const { data } = await api.post("/users/login", {
        email,
        username,
        password,
      });

      dispatch(signInSuccess(data));
      toast.success("Logged in successfully");

      // Store user info & token in sessionStorage
      sessionStorage.setItem("userInfo", JSON.stringify(data));
      sessionStorage.setItem("token", data.token); // Store JWT Token

      setFormData({ email: "", username: "", password: "" });

      navigate("/");
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong";
      toast.error(errorMsg);
      dispatch(signInFailure(errorMsg));
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <form className="bg-[#FFE4F2] dark:bg-[#1E1E32] w-full max-w-md p-8 rounded-lg drop-shadow-2xl">
        <div className="flex items-center justify-center gap-3 text-4xl font-semibold text-[#333333] dark:text-[#E0E0E0]">
          <LogIn size={45} /> Login
        </div>
        {isError && (
          <p className="text-center text-xl text-red-600 mt-2">{isError}</p>
        )}
        <div className="my-4">
          <p className="text-[#333333] dark:text-[#E0E0E0]">Email</p>
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Email"
            className="border-none outline-none p-2 w-full rounded-md"
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
            className="border-none outline-none p-2 w-full rounded-md"
          />
        </div>
        <div className="my-4">
          <p className="text-[#333333] dark:text-[#E0E0E0]">Password</p>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Password"
            className="border-none outline-none p-2 w-full rounded-md"
          />
        </div>
        <p className="text-[#333333] dark:text-[#E0E0E0]">
          Show password
          <input
            type="checkbox"
            value={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            className="mx-2"
          />
        </p>
        <div className="flex justify-center my-3">
          <button
            type="submit"
            className="bg-gray-400 p-2 rounded-md w-full"
            onClick={handleSubmit}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </div>
        <p className="text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
