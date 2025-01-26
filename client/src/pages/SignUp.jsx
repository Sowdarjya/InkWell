import { ContactRound } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
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
            className="border-none outline-none p-2 w-full rounded-md bg-[#FFFFFF] dark:bg-[#32324E] text-[#333333] dark:text-[#E0E0E0]"
          />
        </div>
        <div className="my-4">
          <p className="text-[#333333] dark:text-[#E0E0E0]">Email</p>
          <input
            type="text"
            placeholder="Email"
            className="border-none outline-none p-2 w-full rounded-md bg-[#FFFFFF] dark:bg-[#32324E] text-[#333333] dark:text-[#E0E0E0]"
          />
        </div>
        <div className="my-4">
          <p className="text-[#333333] dark:text-[#E0E0E0]">Username</p>
          <input
            type="text"
            placeholder="Username"
            className="border-none outline-none p-2 w-full rounded-md bg-[#FFFFFF] dark:bg-[#32324E] text-[#333333] dark:text-[#E0E0E0]"
          />
        </div>
        <div className="my-4">
          <p className="text-[#333333] dark:text-[#E0E0E0]">Password</p>
          <input
            type="text"
            placeholder="Password"
            className="border-none outline-none p-2 w-full rounded-md bg-[#FFFFFF] dark:bg-[#32324E] text-[#333333] dark:text-[#E0E0E0]"
          />
        </div>
        <div className="my-4">
          <p className="text-[#333333] dark:text-[#E0E0E0]">Confirm Password</p>
          <input
            type="text"
            placeholder="Confirm Password"
            className="border-none outline-none p-2 w-full rounded-md bg-[#FFFFFF] dark:bg-[#32324E] text-[#333333] dark:text-[#E0E0E0]"
          />
        </div>

        <div className="flex justify-center my-3">
          <button
            type="submit"
            className="dark:bg-slate-500 bg-gray-400 p-2 rounded-md text-[#333333] dark:text-[#E0E0E0] w-4/5"
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
