import React, { useState } from "react";
import { roomsDummyData } from "../../assets/assets"; // adjust path if needed

const ListRoom = () => {
  const [rooms, setRooms] = useState(roomsDummyData);

  const toggleAvailability = (id) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room._id === id ? { ...room, isAvailable: !room.isAvailable } : room
      )
    );
  };

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Room Listings</h2>

      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Room Type
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Facility
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Price / Night
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {rooms.map((room) => (
              <tr key={room._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-800">{room.roomType}</td>
                <td className="px-6 py-4 text-gray-500">
                  {room.amenities.join(", ")}
                </td>
                <td className="px-6 py-4 text-gray-700 font-medium">
                  ${room.pricePerNight}
                </td>
                <td className="px-6 py-4">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={room.isAvailable}
                      onChange={() => toggleAvailability(room._id)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 relative transition">
                      <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></span>
                    </div>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListRoom;
