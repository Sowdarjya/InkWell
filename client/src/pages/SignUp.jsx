import { ContactRound } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/axios.instance";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../slices/userSlice";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo, isLoading, isError } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo) navigate("/");
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
      dispatch(signInFailure("All fields are mandatory"));
      return false;
    } else if (password !== confirmPassword) {
      toast.error("Passwords must be the same");
      dispatch(signInFailure("Passwords must be the same"));
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
      const { data } = await api.post("/users/signup", {
        fullname,
        email,
        username,
        password,
      });

      sessionStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("Account created successfully");
      setFormData({
        fullname: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      });
      dispatch(signInSuccess(data));
      navigate("/signin");
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Error creating account";
      toast.error(errorMsg);
      dispatch(signInFailure(errorMsg));
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <form className="bg-[#FFE4F2] dark:bg-[#1E1E32] w-full max-w-md p-8 rounded-lg drop-shadow-2xl">
        <div className="flex items-center justify-center gap-3 text-4xl font-semibold text-[#333333] dark:text-[#E0E0E0]">
          <ContactRound size={45} /> Register
        </div>
        {isError && (
          <p className="text-center text-xl text-red-600 mt-2">{isError}</p>
        )}
        <div className="my-4">
          <p>Full name</p>
          <input
            type="text"
            name="fullname"
            value={fullname}
            onChange={handleChange}
            className="w-full p-2 rounded-md"
          />
        </div>
        <div className="my-4">
          <p>Email</p>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            className="w-full p-2 rounded-md"
          />
        </div>
        <div className="my-4">
          <p>Username</p>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            className="w-full p-2 rounded-md"
          />
        </div>
        <div className="my-4">
          <p>Password</p>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={handleChange}
            className="w-full p-2 rounded-md"
          />
        </div>
        <div className="my-4">
          <p>Confirm Password</p>
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            className="w-full p-2 rounded-md"
          />
        </div>
        <p>
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
            {isLoading ? "Loading..." : "Create account"}
          </button>
        </div>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-400">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
