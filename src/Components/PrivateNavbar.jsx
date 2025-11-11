

import React, { useState } from "react";
import { useUser } from "../Components/UserContext";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

export default function Navbar() {
  const { user, setUser } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

 const handleLogout = async () => {
  try {
    await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
    setUser(null);
    navigate("/");
  } catch (err) {
    console.log(err);
  }
};


  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-8 py-4 flex justify-between items-center bg-black/30 backdrop-blur-sm">
      
      <div className="text-amber-400 font-bold text-2xl cursor-pointer">
        La Cuisine
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6 text-white font-medium">
        <li className="hover:text-amber-400 cursor-pointer">
          <Link to="/user-dashboard#home" className="hover:text-amber-400">Home</Link>
        </li>
        <li className="hover:text-amber-400 cursor-pointer">
          <Link to="/user-dashboard#menu" className="hover:text-amber-400">Menu</Link>
        </li>
        <li className="hover:text-amber-400 cursor-pointer">
          <Link to="/user-dashboard#reservation" className="hover:text-amber-400">Reservation</Link>
        </li>
        <li className="hover:text-amber-400 cursor-pointer">
          <Link to="/user-dashboard#story" className="hover:text-amber-400">Story</Link>
        </li>
      </ul>

      {/* Desktop Logout */}
      <div className="hidden md:flex items-center gap-4">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Mobile Menu Icon */}
      <button
        className="md:hidden text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <span className="text-3xl">×</span>
        ) : (
          <img src="/menu.svg" alt="menu" className="w-8" />
        )}
      </button>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-black/80 backdrop-blur-md flex flex-col items-center text-white py-6 gap-4 md:hidden">
          <Link onClick={() => setIsOpen(false)} to="/user-dashboard" className="hover:text-amber-400">Home</Link>
          <Link onClick={() => setIsOpen(false)} to="/user-dashboard#menu" className="hover:text-amber-400">Menu</Link>
          <Link onClick={() => setIsOpen(false)} to="/user-dashboard#reservation" className="hover:text-amber-400">Reservation</Link>
          <Link onClick={() => setIsOpen(false)} to="/user-dashboard#story" className="hover:text-amber-400">Story</Link>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

