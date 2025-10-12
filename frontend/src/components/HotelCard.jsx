import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const HotelCard = ({ room, index }) => {
  return (
    <Link
      to={`/rooms/${room._id}`}
      onClick={() => scrollTo(0, 0)}
      key={room._id}
      className="group relative w-full max-w-[320px] rounded-2xl overflow-hidden bg-white text-gray-500/90 shadow-md hover:shadow-lg transition-all duration-500"
    >
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <img
          src={room.images[0]}
          alt={room.hotel.name}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {index % 2 === 0 && (
          <p className="absolute top-3 left-3 px-3 py-1 text-xs bg-white text-gray-800 font-medium rounded-full shadow-sm">
            Best Seller
          </p>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-lg font-semibold text-gray-800 truncate">
            {room.hotel.name}
          </p>
          <div className="flex items-center gap-1 text-sm">
            <img src={assets.starIconFilled} alt="star" className="w-4 h-4" />
            4.5
          </div>
        </div>

        <div className="flex items-center gap-1 text-sm mb-4">
          <img
            src={assets.locationIcon}
            alt="location"
            className="w-4 h-4 opacity-70"
          />
          <span className="truncate">{room.hotel.address}</span>
        </div>

        <div className="flex items-center justify-between">
          <p>
            <span className="text-xl text-gray-800 font-semibold">
              ${room.pricePerNight}
            </span>
            <span className="text-sm"> / night</span>
          </p>
          <button className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-full hover:bg-gray-50 transition-all duration-300">
            Book Now
          </button>
        </div>
      </div>
    </Link>
  )
}

export default HotelCard
