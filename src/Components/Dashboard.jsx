import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

function Dashboard() {
  const [reservationsCount, setReservationsCount] = useState(0);
  const [menuItemsCount, setMenuItemsCount] = useState(0);
  const [revenue, setRevenue] = useState(0); // optional if you want dynamic revenue
  const [growth, setGrowth] = useState("0%"); // optional

  useEffect(() => {
    // Fetch reservations
    const fetchReservations = async () => {
      try {
        const res = await axiosInstance.get("/reservations/show-reservation", { withCredentials: true }  );
        setReservationsCount(res.data.length);
      } catch (err) {
        console.error("Error fetching reservations:", err);
      }
    };

    // Fetch menu items
    const fetchMenuItems = async () => {
      try {
        const res = await axiosInstance.get("/menu/all", { withCredentials: true }  );
        setMenuItemsCount(res.data.length);
      } catch (err) {
        console.error("Error fetching menu items:", err);
      }
    };

    fetchReservations();
    fetchMenuItems();
  }, []);

  return (
    <div className="md:ml-64 min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold text-amber-400">Dashboard Overview</h1>
      <p className="mt-2 text-gray-400">Welcome back! Here's what's happening today.</p>

      <div className="grid md:grid-cols-4 grid-cols-2 gap-6 mt-10">
        {/* Total Revenue */}
        <div className="bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-amber-400 font-semibold">Total Revenue</h3>
          <p className="text-3xl font-bold mt-2">${revenue}</p>
          <p className="text-sm text-gray-400 mt-1">{growth} growth</p>
        </div>

        {/* Reservations */}
        <div className="bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-amber-400 font-semibold">Reservations</h3>
          <p className="text-3xl font-bold mt-2">{reservationsCount}</p>
          <p className="text-sm text-gray-400 mt-1">All reservations</p>
        </div>

        {/* Menu Items */}
        <div className="bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-amber-400 font-semibold">Menu Items</h3>
          <p className="text-3xl font-bold mt-2">{menuItemsCount}</p>
          <p className="text-sm text-gray-400 mt-1">Active items</p>
        </div>

        {/* Growth */}
        <div className="bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-amber-400 font-semibold">Growth</h3>
          <p className="text-3xl font-bold mt-2">{growth}</p>
          <p className="text-sm text-gray-400 mt-1">This month</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
