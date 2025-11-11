import { motion } from "framer-motion";
import SignUp from "./SignUp";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "./UserContext";
import axiosInstance from "../utils/axiosInstance";

function Signin({ onClose }) {
  const [showSignUp, setShowSignUp] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUser();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const res = await axiosInstance.post(
        "/auth/signin",
        {
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );
      
      // Update user context first
      setUser(res.data.user);
      
      // Then navigate based on role
      const targetPath = res.data.user.role === "admin" ? "/admin-dashboard" : "/user-dashboard";
      navigate(targetPath, { replace: true });

    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setMessage(err.response.data.message);   // show exact backend message
      } else {
        setMessage("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="border border-amber-500/40 bg-black/50 backdrop-blur-xl p-8 rounded-2xl w-full max-w-md shadow-[0_0_45px_rgba(255,193,7,0.3)] relative"
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-gray-400 hover:text-white text-xl"
        >
          ✕
        </button>

        <h1 className="text-3xl font-serif text-center text-amber-500 mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-gray-400 text-sm mb-6">
          Sign in to your account to continue
        </p>

        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-gray-300 text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="bg-black/40 border border-amber-500/40 rounded-md px-4 py-2 text-white"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-300 text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="bg-black/40 border border-amber-500/40 rounded-md px-4 py-2 text-white"
            />
          </div>

          <button
            disabled={isLoading}
            className="bg-gradient-to-r from-amber-500 to-orange-600 py-2 rounded-md font-semibold text-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSubmit}
          >
            {isLoading ? "Signing in..." : "Sign In"}
           
          </button>
        </form>

        {message && (
          <p className="text-red-500 text-center mt-3">{message}</p>
        )}

        <p className="text-gray-400 text-center text-sm mt-5">
          Don't have an account?{" "}
          <span
            onClick={() => setShowSignUp(true)}
            className="text-amber-500 cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </motion.div>

      {showSignUp && <SignUp onClose={() => setShowSignUp(false)} />}
    </div>
  );
}

export default Signin;
