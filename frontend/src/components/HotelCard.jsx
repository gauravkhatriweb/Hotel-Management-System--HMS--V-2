import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const HotelCard = ({ room, index }) => {
  const imageSrc = room?.images?.[0] ?? assets.regImage

  return (
    <Link
      to={`/rooms/${room._id}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label={`View details for ${room.hotel?.name ?? 'room'}`}
      className="group relative w-full sm:max-w-[320px] md:max-w-[360px] lg:max-w-[320px] rounded-2xl overflow-hidden bg-white text-gray-500/90 shadow-md hover:shadow-lg transition-all duration-500"
    >
      {/* Image Section */}
      <div className="relative overflow-hidden h-44 sm:h-52 md:h-56 lg:h-64">
        <img
          src={imageSrc}
          alt={room.hotel?.name ?? 'hotel image'}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />

        {index % 2 === 0 && (
          <p className="absolute top-3 left-3 px-3 py-1 text-xs bg-white text-gray-800 font-medium rounded-full shadow-sm flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-amber-400 rounded-full" />
            Best Seller
          </p>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 md:p-6">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="min-w-0">
            <p className="text-base md:text-lg font-semibold text-gray-800 truncate">
              {room.hotel?.name}
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
              <img src={assets.locationIcon} alt="" className="w-4 h-4 opacity-70 flex-shrink-0" />
              <span className="truncate block">{room.hotel?.address}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm whitespace-nowrap">
            <img src={assets.starIconFilled} alt="rating" className="w-4 h-4" />
            <span className="text-sm text-gray-700">4.5</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-3">
          <div>
            <span className="text-xl text-gray-800 font-semibold">
              ${room.pricePerNight}
            </span>
            <span className="text-sm text-gray-500"> / night</span>
          </div>

          <button
            type="button"
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium border border-gray-300 rounded-full hover:bg-gray-50 transition-all duration-300"
            onClick={(e) => {
              /* prevent Link double-trigger interfering with navigation — still allow link to work */
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
              // programmatic navigation handled by wrapping Link — simulate user click by updating location
              window.location.href = `/rooms/${room._id}`
            }}
          >
            Book Now
          </button>
        </div>
      </div>
    </Link>
  )
}

export default HotelCard
