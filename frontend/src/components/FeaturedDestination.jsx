import React from 'react'
import { roomsDummyData } from '../assets/assets'
import HotelCard from './HotelCard'
import { useNavigate } from 'react-router-dom'


const FeaturedDestination = () => {

  const navigate = useNavigate();
  return (
    <section className="flex flex-col items-center justify-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-3">
          Featured Destinations
        </h2>
        <p className="text-gray-500/90 max-w-lg mx-auto leading-relaxed">
          Discover our top-rated stays across Pakistan — curated for luxury, comfort, 
          and unforgettable experiences.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl">
        {roomsDummyData.slice(0, 4).map((room, index) => (
          <HotelCard key={room._id || index} room={room} index={index} />
        ))}
      </div>

  {/* Optional CTA */}
      <div className="mt-14">
        <button
          onClick={() => {
            window.scrollTo(0, 0);
            navigate('/rooms');
          }}
          className="border border-gray-300 text-gray-700 hover:text-black hover:border-gray-400 px-6 py-2 rounded-full font-medium transition-all duration-300"
        >
          View All Destinations
        </button>
      </div>
  
       
    </section>
  )
}

export default FeaturedDestination
