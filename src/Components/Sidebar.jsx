


import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Components/UserContext";
import axiosInstance from "../utils/axiosInstance";

const menuItems = [
  { name: "Dashboard", path: "/admin-dashboard" },
  { name: "Menu Management", path: "/menu-management" },
  { name: "Reservations", path: "/reservations" },
];

export default function Sidebar() {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

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
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block fixed left-0 top-0 w-64 h-screen bg-gray-900 border-r border-gray-800 shadow-lg z-30">
        <div className="h-full flex flex-col justify-between p-6">
          <div>
            <div className="mb-8">
              <h1 className="text-2xl font-extrabold text-amber-400">La Cuisine</h1>
              <p className="text-xs text-gray-400 mt-1">Admin Panel</p>
            </div>

            <nav className="flex flex-col gap-2">
              {menuItems.map((m) => (
                <NavLink
                  key={m.path}
                  to={m.path}
                  end
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-r-lg transition-all ${
                      isActive
                        ? "bg-gray-800 border-l-4 border-amber-400 text-amber-400 font-semibold"
                        : "text-gray-100 hover:bg-gray-800 hover:border-l-4 hover:border-amber-400"
                    }`
                  }
                >
                  <span className="ml-1">{m.name}</span>
                </NavLink>
              ))}
            </nav>
          </div>

          <button
            className="w-full text-left px-3 py-2 rounded-r-lg text-gray-100 hover:bg-gray-800 hover:border-l-4 hover:border-amber-400 transition-all"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile top bar with menu icon */}
      <div className="md:hidden bg-black p-4 flex items-center justify-between border-b border-gray-700">
        <h1 className="text-xl font-extrabold text-amber-400">La Cuisine</h1>
        <img
          src="menu.svg"
          alt="menu"
          className="w-7 cursor-pointer"
          onClick={() => setMobileOpen(true)}
        />
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex">
          <div className="w-64 bg-gray-900 h-full p-6 flex flex-col justify-between">
            <div>
              <img
                src="menu.svg"
                alt="close"
                className="w-7 mb-6 cursor-pointer"
                onClick={() => setMobileOpen(false)}
              />
              <nav className="flex flex-col gap-2">
                {menuItems.map((m) => (
                  <NavLink
                    key={m.path}
                    to={m.path}
                    end
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                        isActive
                          ? "bg-gray-800 border-l-4 border-amber-400 text-amber-400 font-semibold"
                          : "text-gray-100 hover:bg-gray-800 hover:border-l-4 hover:border-amber-400"
                      }`
                    }
                  >
                    {m.name}
                  </NavLink>
                ))}
              </nav>
            </div>

            <button
              className="text-left px-3 py-2 rounded-lg text-gray-100 hover:bg-gray-800 hover:border-l-4 hover:border-amber-400 transition-all"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>

          <div
            className="flex-1"
            onClick={() => setMobileOpen(false)}
          />
        </div>
      )}
    </>
  );
}
