import React, { useState } from "react";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

export default function BookTable() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    people: 1,
    specialRequest: "",
  });

  // Add ref for scroll functionality
  const reservationRef = React.useRef(null);

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.date ||
      !formData.time ||
      !formData.people
    ) {
      setErrorMsg("Please fill all required fields.");
      setLoading(false);
      return;
    }

    try {
      const res = await axiosInstance.post(
        "/reservations/add-reservation",
        formData,
        { withCredentials: true }
      );
      setSuccessMsg("Reservation successful!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        people: 1,
        specialRequest: "",
      });
    } catch (err) {
      console.error(err);
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div  className="min-h-screen bg-black text-white px-4 sm:px-8 py-24 font-serif">
      {/* Heading */}
      <div id="reservation" className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl text-amber-600 font-medium">
          Reserve Your Table
        </h1>
        <p className="mt-4 text-gray-300 max-w-xl mx-auto">
          Fill the form below to book your table. We look forward to serving
          you!
        </p>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto bg-black/70 p-8 rounded-xl shadow-lg border border-amber-500/40">
        {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}
        {successMsg && <p className="text-green-500 mb-4">{successMsg}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name *"
            value={formData.name}
            onChange={handleChange}
            className="px-4 py-2 rounded border border-amber-500/40 bg-black/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email *"
            value={formData.email}
            onChange={handleChange}
            className="px-4 py-2 rounded border border-amber-500/40 bg-black/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number *"
            value={formData.phone}
            onChange={handleChange}
            className="px-4 py-2 rounded border border-amber-500/40 bg-black/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
          <div className="flex gap-4">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="px-4 py-2 rounded border border-amber-500/40 bg-black/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 w-1/2"
              required
            />
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="px-4 py-2 rounded border border-amber-500/40 bg-black/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 w-1/2"
              required
            />
          </div>
          {/* Number of People */}
          <div className="flex flex-col">
            <label className="text-amber-400 font-medium mb-1">
              Number of People *
            </label>
            <input
              type="number"
              name="people"
              min="1"
              placeholder="Enter number of guests"
              value={formData.people}
              onChange={handleChange}
              className="px-4 py-2 rounded border border-amber-500/40 bg-black/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          <textarea
            name="specialRequest"
            placeholder="Special Request (Optional)"
            value={formData.specialRequest}
            onChange={handleChange}
            className="px-4 py-2 rounded border border-amber-500/40 bg-black/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            rows="4"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-xl text-lg sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            {loading ? "Submitting..." : "Book Now"}
          </button>
        </form>
      </div>
    </div>
  );
}
