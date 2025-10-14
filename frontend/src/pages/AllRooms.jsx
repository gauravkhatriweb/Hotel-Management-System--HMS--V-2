import React from 'react'
import { assets, roomsDummyData, facilityIcons } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

/* Star rating renderer (as provided, with small safety tweaks) */
const renderStars = (rating) => {
  const safe = Math.max(0, Math.min(5, Math.round(Number(rating) || 0)))
  return Array.from({ length: 5 }).map((_, i) => {
    const isFilled = i < safe
    const src = isFilled ? assets.starIconFilled : assets.starIconOutlined
    return (
      <img
        key={i}
        src={src}
        alt={isFilled ? 'star filled' : 'star outline'}
        className="w-4 h-4"
        aria-hidden
      />
    )
  })
}
const getAmenityIcon = (amenity) => {
  const key = (amenity || '').trim()
  const aliases = {
    'Wifi': 'Free WiFi',
    'WiFi': 'Free WiFi',
    'Breakfast Included': 'Free Breakfast',
    'Pool': 'Pool Access',
  }
  const resolved = aliases[key] || key
  return facilityIcons?.[resolved] || null
}

const AllRooms = () => {
  const navigate = useNavigate()

  const handleOpenRoom = (id) => {
    navigate(`/rooms/${id}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section className="w-full bg-white text-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 md:pt-28">
        {/* Heading */}
        <header className="mb-8 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
            Hotel Rooms
          </h1>
          <p className="mt-2 text-sm md:text-base text-gray-500/90 max-w-xl">
            Take advantage of our limited-time offers
          </p>
        </header>

        {/* Layout: list + filters */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Rooms list */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="flex flex-col">
              {roomsDummyData.map((room) => {
                const key = room.id ?? room._id
                const rating =
                  room.rating ?? room.hotel?.rating ?? 0
                const reviewsCount =
                  room.reviewsCount ?? room.hotel?.reviewsCount ?? 200

                return (
                  <article
                    key={key}
                    className="group mt-6 first:mt-0 rounded-xl ring-1 ring-gray-200/70 hover:ring-gray-300 transition-shadow hover:shadow-md"
                  >
                    <div className="p-4 md:p-5">
                      <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8">
                        {/* Image */}
                        <button
                          type="button"
                          onClick={() => handleOpenRoom(room._id ?? room.id)}
                          className="relative w-full md:w-1/2 overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                          title="View Room Details"
                          aria-label={`Open ${room.hotel?.name ?? room.name}`}
                        >
                          <img
                            src={room.images?.[0]}
                            alt={room.name}
                            className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          />
                        </button>

                        {/* Content */}
                        <div className="md:w-1/2 flex flex-col gap-3">
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">
                              {room.hotel?.city}
                            </p>
                          </div>

                          <h2
                            onClick={() => handleOpenRoom(room._id ?? room.id)}
                            className="text-gray-900 text-2xl md:text-3xl font-semibold cursor-pointer hover:underline underline-offset-4 decoration-gray-300"
                          >
                            {room.hotel?.name ?? room.name}
                          </h2>

                          {/* Rating */}
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1" aria-hidden>
                              {renderStars(rating)}
                            </div>
                            <span className="text-sm text-gray-700">
                              {Math.max(0, Math.min(5, Math.round(Number(rating) || 0)))} / 5
                            </span>
                            <span className="text-sm text-gray-500">
                              • {reviewsCount}+ reviews
                            </span>
                            <span className="sr-only">
                              Rated {rating} out of 5
                            </span>
                          </div>

                          {/* Address */}
                          <div className="mt-1 flex items-start gap-2 text-sm text-gray-600">
                            <img
                              src={assets.locationIcon}
                              alt=""
                              className="mt-0.5 w-4 h-4 opacity-80"
                              aria-hidden
                            />
                            <span className="line-clamp-2">
                              {room.hotel?.address}
                            </span>
                          </div>
                       {/* Room Amenities */}
{Array.isArray(room.amenities) && room.amenities.length > 0 ? (
  <div className="mt-3">
    <h3 className="text-sm font-semibold text-gray-900">Amenities</h3>
    <ul className="mt-2 flex flex-wrap gap-2">
      {room.amenities.map((amenity) => {
        const iconSrc = getAmenityIcon(amenity)
        return (
          <li
            key={amenity}
            className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs text-gray-700"
            title={amenity}
          >
            {iconSrc ? (
              <img src={iconSrc} alt={`${amenity} icon`} className="h-4 w-4" />
            ) : (
              <svg
                className="h-4 w-4 text-gray-600"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M16.667 10a6.667 6.667 0 1 1-13.334 0 6.667 6.667 0 0 1 13.334 0Z"
                  stroke="currentColor"
                  strokeWidth="1.3"
                />
                <path
                  d="m7.25 10.167 1.917 1.916 3.583-3.583"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            <span className="truncate">{amenity}</span>
          </li>
        )
      })}
    </ul>
  </div>
) : (
  <p className="mt-3 text-sm text-gray-500">No amenities listed</p>
)}



                            
                         


                          {/* Actions */}
                          <div className="mt-3 flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() =>
                                handleOpenRoom(room._id ?? room.id)
                              }
                              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                            >
                              View details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>

          {/* Filters */}
          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="lg:sticky lg:top-24 rounded-xl border border-gray-200/70 bg-gray-50 p-5">
              <h3 className="text-base font-semibold text-gray-900">
                Filters
              </h3>

              <form className="mt-4 space-y-5 text-sm text-gray-700">
                {/* Price */}
                <fieldset>
                  <legend className="mb-2 font-medium text-gray-800">
                    Price per night
                  </legend>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      inputMode="numeric"
                      min="0"
                      placeholder="Min"
                      className="w-24 rounded-md border border-gray-300 bg-white px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50"
                    />
                    <span className="text-gray-500">—</span>
                    <input
                      type="number"
                      inputMode="numeric"
                      min="0"
                      placeholder="Max"
                      className="w-24 rounded-md border border-gray-300 bg-white px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50"
                    />
                  </div>
                </fieldset>

                {/* Rating */}
                <fieldset>
                  <legend className="mb-2 font-medium text-gray-800">
                    Minimum rating
                  </legend>
                  <div className="flex items-center gap-3">
                    {[5, 4, 3].map((r) => (
                      <label
                        key={r}
                        className="inline-flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="minRating"
                          value={r}
                          className="h-4 w-4 text-gray-900 accent-gray-900"
                        />
                        <span className="text-gray-700">{r}+</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                {/* Amenities */}
                <fieldset>
                  <legend className="mb-2 font-medium text-gray-800">
                    Amenities
                  </legend>
                  <div className="grid grid-cols-1 gap-2">
                    {['Free Wi‑Fi', 'Breakfast', 'Parking', 'Pool'].map((a) => (
                      <label
                        key={a}
                        className="inline-flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-gray-900 accent-gray-900"
                        />
                        <span>{a}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50"
                  >
                    Apply
                  </button>
                  <button
                    type="button"
                    className="rounded-md px-3 py-2 text-sm text-gray-600 hover:underline underline-offset-4 decoration-gray-300"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </aside>
        </div>

        {/* Footer spacing under list */}
        <div className="h-8" />
      </div>
    </section>
  )
}

export default AllRooms
