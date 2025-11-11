import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

export default function ReservationsList() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await axiosInstance.get(
          "/reservations/show-reservation",
          { withCredentials: true }
        );
        setReservations(res.data);
      } catch (err) {
        console.error("Error fetching reservations:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, []);

  // Function to format the date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen overflow-x-auto flex bg-gray-900 text-white">
      {/* Leave space for sidebar */}
      <div  /> 

      {/* Main Content */}
      <main className="flex-1 p-8 md:ml-64">
        <h1 className="text-3xl font-bold text-amber-500 mb-2 text-center">
          Reservations
        </h1>
        <p className="text-gray-300 mb-6 text-center">
          Manage all table bookings from customers
        </p>

        {loading ? (
          <p className="text-center mt-10">Loading...</p>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="min-w-full border border-amber-500/40">
              <thead className="bg-black/70">
                <tr className="text-center">
                  <th className="border border-amber-500/40 px-4 py-2">Name</th>
                  <th className="border border-amber-500/40 px-4 py-2">Email</th>
                  <th className="border border-amber-500/40 px-4 py-2">Phone</th>
                  <th className="border border-amber-500/40 px-4 py-2">Date</th>
                  <th className="border border-amber-500/40 px-4 py-2">Time</th>
                  <th className="border border-amber-500/40 px-4 py-2">People</th>
                  <th className="border border-amber-500/40 px-4 py-2">
                    Special Request
                  </th>
                </tr>
              </thead>
              <tbody className="text-center">
                {reservations.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="py-6 text-gray-400 font-medium"
                    >
                      No reservations found
                    </td>
                  </tr>
                ) : (
                  reservations.map((r) => (
                    <tr key={r._id} className="hover:bg-amber-500/10 transition">
                      <td className="border border-amber-500/40 px-4 py-2">
                        {r.name}
                      </td>
                      <td className="border border-amber-500/40 px-4 py-2">
                        {r.email}
                      </td>
                      <td className="border border-amber-500/40 px-4 py-2">
                        {r.phone}
                      </td>
                      <td className="border border-amber-500/40 px-4 py-2">
                        {formatDate(r.date)}
                      </td>
                      <td className="border border-amber-500/40 px-4 py-2">
                        {r.time}
                      </td>
                      <td className="border border-amber-500/40 px-4 py-2">
                        {r.people}
                      </td>
                      <td className="border border-amber-500/40 px-4 py-2">
                        {r.specialRequest || "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
