import React from 'react'
import { assets, cities } from '../assets/assets'
import heroImage from '../assets/heroImage.png'

const Hero = () => {
  return (
    <section
      className="relative flex flex-col items-start justify-center px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 text-white h-[90vh] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

      {/* Content */}
      <div className="relative z-10 max-w-2xl">
        <p className="bg-[#49B9FF]/50 px-4 py-1 rounded-full inline-block text-sm md:text-base tracking-wide">
          The Ultimate Hotel Experience
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-extrabold leading-tight mt-4">
          Discover Your Perfect Getaway Destination
        </h1>

        <p className="mt-3 text-sm md:text-base text-gray-200 max-w-md">
          Experience luxury and comfort like never before. Find your ideal stay in seconds.
        </p>
      </div>

      {/* Search Form */}
      <form
        className="relative z-10 mt-8 bg-white/90 text-gray-600 backdrop-blur-md rounded-2xl px-6 py-5 flex flex-col sm:flex-wrap sm:flex-row gap-4 shadow-lg w-full max-w-4xl"
      >
        {/* Destination */}
        <div className="flex-1 min-w-[180px]">
          <label htmlFor="destinationInput" className="flex items-center gap-2 text-sm font-medium mb-1">
            <img src={assets.locationIcon} alt="Location" className="h-4" />
            Destination
          </label>
          <input
            list="destinations"
            id="destinationInput"
            type="text"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#49B9FF] transition-all"
            placeholder="Type city name"
            required
          />
          <datalist id="destinations">
            {cities.map((city, i) => (
              <option key={i} value={city} />
            ))}
          </datalist>
        </div>

        {/* Check In */}
        <div className="flex-1 min-w-[160px]">
          <label htmlFor="checkIn" className="flex items-center gap-2 text-sm font-medium mb-1">
            <img src={assets.calenderIcon} alt="Calender" className="h-4" />
            Check-in
          </label>
          <input
            id="checkIn"
            type="date"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#49B9FF] transition-all"
          />
        </div>

        {/* Check Out */}
        <div className="flex-1 min-w-[160px]">
          <label htmlFor="checkOut" className="flex items-center gap-2 text-sm font-medium mb-1">
            <img src={assets.calenderIcon} alt="Calender" className="h-4" />
            Check-out
          </label>
          <input
            id="checkOut"
            type="date"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#49B9FF] transition-all"
          />
        </div>

        {/* Guests */}
        <div className="min-w-[100px]">
          <label htmlFor="guests" className="text-sm font-medium mb-1 block">
            Guests
          </label>
          <input
            min={1}
            max={10}
            id="guests"
            type="number"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#49B9FF] transition-all"
            placeholder="2"
          />
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-black text-white font-medium px-6 py-3 rounded-lg hover:bg-gray-900 transition-all w-full sm:w-auto"
        >
          <img src={assets.searchIcon} alt="Search" className="h-5" />
          <span>Search</span>
        </button>
      </form>
    </section>
  )
}

export default Hero
