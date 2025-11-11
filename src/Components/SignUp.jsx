import { motion } from "framer-motion";
import SignIn from "./Signin";
import { useState } from "react";
import axios from 'axios';
import axiosInstance from "../utils/axiosInstance";

function SignUp({ onClose }) {
  const [showSignIn, setShowSignIn] = useState(false);
  const [formData,setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [message,setMessage]=useState('');
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]: e.target.value});
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();

    try{
      const res=await axiosInstance.post('/auth/signup',formData,
      {withCredentials: true}
      );
      setMessage("User registered successfully");
      setFormData({name:'',email:'',password:''})
    }catch(err){
     setMessage("Error registering user");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[3000]">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="bg-black/70 border border-amber-500/30 backdrop-blur-xl rounded-2xl w-full max-w-md p-8 shadow-[0_0_50px_rgba(255,193,7,0.35)] relative"
      >
      
        {/* close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white text-2xl"
        >
          ✕
        </button>

        <h1 className="text-3xl font-serif text-center text-amber-400 mb-4">
          Create Account
        </h1>
               {message && <p className="mb-2 text-green-600">{message}</p>}
        <form className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">Full Name</label>
            <input
              className="bg-black/40 border border-amber-500/40 rounded-md px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
              placeholder="eg. Sarah Ahmed"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">Email Address</label>
            <input
              className="bg-black/40 border border-amber-500/40 rounded-md px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
              placeholder="example@gmail.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              className="bg-black/40 border border-amber-500/40 rounded-md px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
              placeholder="8+ characters"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button className="mt-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 transition-all py-2 rounded-md font-semibold text-black hover:text-white shadow-lg shadow-amber-500/30 hover:shadow-amber-600/40" 
          onClick={handleSubmit}>
            Create Account
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-5">
          Already have an account?{" "}
          <span onClick={()=>setShowSignIn(true)} className="text-amber-400 hover:text-amber-300 cursor-pointer">
            Sign In
          </span>
        </p>
      </motion.div>
      {showSignIn && <SignIn onClose={() => setShowSignIn(false)} />}
    </div>
  );
}

export default SignUp;
