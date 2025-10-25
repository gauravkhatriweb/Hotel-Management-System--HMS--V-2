import React, { useState } from "react";
import { PlusCircle } from "lucide-react";

const AddRoom = () => {
  const [images, setImages] = useState({});
  const [inputs, setInputs] = useState({
    roomType: "",
    pricePerNight: "",
    amenities: {
      "Free WiFi": false,
      "Free Breakfast": false,
      "Room Service": false,
      "Mountain View": false,
      "Pool Access": false,
    },
  });

  const handleImageChange = (e, key) => {
    const file = e.target.files[0];
    setImages((prev) => ({
      ...prev,
      [key]: file,
    }));
  };

  const handleAmenityChange = (amenity) => {
    setInputs((prev) => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [amenity]: !prev.amenities[amenity],
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Room Data:", inputs);
    console.log("Images:", images);
    // TODO: Upload images and room data to API
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-md rounded-2xl p-8 transition-all duration-300">
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6 text-center">
        Add New Room
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Room Type */}
        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
            Room Type
          </label>
          <input
            type="text"
            placeholder="e.g., Deluxe Suite"
            value={inputs.roomType}
            onChange={(e) => setInputs({ ...inputs, roomType: e.target.value })}
            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Price Per Night */}
        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
            Price Per Night
          </label>
          <input
            type="number"
            placeholder="e.g., 120"
            value={inputs.pricePerNight}
            onChange={(e) =>
              setInputs({ ...inputs, pricePerNight: e.target.value })
            }
            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Amenities */}
        <div>
          <p className="mb-3 font-medium text-gray-700 dark:text-gray-300">
            Amenities
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {Object.keys(inputs.amenities).map((amenity) => (
              <label
                key={amenity}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-400 cursor-pointer transition"
              >
                <input
                  type="checkbox"
                  checked={inputs.amenities[amenity]}
                  onChange={() => handleAmenityChange(amenity)}
                  className="accent-blue-600 w-4 h-4"
                />
                <span className="text-sm">{amenity}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Upload Images */}
        <div>
          <p className="mb-3 font-medium text-gray-700 dark:text-gray-300">
            Room Images
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {[0, 1, 2, 3, 4].map((key) => (
              <label
                key={key}
                htmlFor={`roomImage${key}`}
                className="group relative border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl flex flex-col items-center justify-center h-28 cursor-pointer bg-gray-50 dark:bg-gray-800 hover:border-blue-400 hover:bg-blue-50/30 transition"
              >
                {images[key] ? (
                  <img
                    src={URL.createObjectURL(images[key])}
                    alt={`Preview ${key}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-400 group-hover:text-blue-500 transition">
                    <PlusCircle className="w-6 h-6 mb-1" />
                    <span className="text-xs">Upload</span>
                  </div>
                )}
                <input
                  type="file"
                  id={`roomImage${key}`}
                  accept="image/*"
                  hidden
                  onChange={(e) => handleImageChange(e, key)}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl shadow-sm transition-all active:scale-95"
          >
            Add Room
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRoom;
