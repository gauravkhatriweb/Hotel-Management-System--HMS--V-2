import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/assets';
import { dashboardDummyData } from '../../assets/assets'; // <-- adjust path as needed

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    bookings: [],
  });

  useEffect(() => {
    // Simulate fetching data (from dummy)
    setDashboardData(dashboardDummyData);
  }, []);

  return (
    <div className="p-6">
      {/* Title Section */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Hotel Owner Dashboard
      </h1>

      {/* Subtitle Section */}
      <p className="text-gray-500 text-lg mb-6">
        Manage your hotels, rooms, and bookings — all in one place.
      </p>

      {/* -------- Summary Cards -------- */}
      <div className="flex flex-wrap gap-4 my-8">
        {/* Total Bookings */}
        <div className="bg-primary/3 border border-primary/10 rounded flex p-4 pr-8">
          <img
            src={assets.totalBookingIcon}
            alt="Total Bookings Icon"
            className="max-sm:hidden"
          />
          <div className="flex flex-col sm:ml-4 font-medium">
            <p className="text-blue-500 text-lg">Total Bookings</p>
            <p className="text-neutral-400 text-base">
              {dashboardData.totalBookings}
            </p>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-primary/3 border border-primary/10 rounded flex p-4 pr-8">
          <img
            src={assets.totalRevenueIcon}
            alt="Total Revenue Icon"
            className="max-sm:hidden"
          />
          <div className="flex flex-col sm:ml-4 font-medium">
            <p className="text-blue-500 text-lg">Total Revenue</p>
            <p className="text-neutral-400 text-base">
              PKR {dashboardData.totalRevenue}/-
            </p>
          </div>
        </div>
      </div>

      {/* -------- Recent Bookings -------- */}
<h2 className="text-xl text-blue-950/70 font-medium mb-5">Recent Bookings</h2>

<div className="w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll">
  <table className="w-full">
    <thead className="bg-gray-50">
      <tr>
        <th className="py-3 px-4 text-gray-800 font-medium">User Name</th>
        <th className="py-3 px-4 text-gray-800 font-medium">Room Name</th>
        <th className="py-3 px-4 text-gray-800 font-medium">Total Amount</th>
        <th className="py-3 px-4 text-gray-800 font-medium">Payment Status</th>
        <th className="py-3 px-4 text-gray-800 font-medium">Booking Status</th>
      </tr>
    </thead>
    <tbody>
      {dashboardData.bookings && dashboardData.bookings.length > 0 ? (
        dashboardData.bookings.map((booking, index) => (
          <tr key={index} className="border-t hover:bg-gray-50 transition">
            <td className="py-3 px-4 text-gray-700">
              {booking.user?.username || "Unknown"}
            </td>
            <td className="py-3 px-4 text-gray-700">
              {booking.room?.roomType || "N/A"}
            </td>
            <td className="py-3 px-4 text-gray-700">
              ${booking.totalPrice}
            </td>

            {/* Payment Status */}
            <td className="py-3 px-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  booking.isPaid
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : "bg-yellow-100 text-yellow-700 border border-yellow-300"
                }`}
              >
                {booking.isPaid ? "Paid" : "Pending"}
              </span>
            </td>

            {/* Booking Status */}
            <td className="py-3 px-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  booking.status === "completed"
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : booking.status === "pending"
                    ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
                    : "bg-gray-100 text-gray-600 border border-gray-300"
                }`}
              >
                {booking.status.charAt(0).toUpperCase() +
                  booking.status.slice(1)}
              </span>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="5" className="text-center text-gray-500 py-4">
            No recent bookings found.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default Dashboard;
