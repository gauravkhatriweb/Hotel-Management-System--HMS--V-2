import React from 'react'
import { assets, testimonials } from '../assets/assets'

export default function Testimonial() {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => {
      const isFilled = i < rating
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

  return (
    <section className="px-6 md:px-16 lg:px-24 py-16 bg-slate-50">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
            What Guests Say
          </h2>
          <p className="text-gray-500 mt-2 max-w-xl">
            Real reviews from guests — curated to help you choose the perfect stay.
          </p>
        </div>

        <div className="hidden md:block">
          <button className="group inline-flex items-center gap-2 text-gray-800 font-medium hover:text-black transition">
            View All Reviews
            <img
              src={assets.arrowIcon}
              alt="arrow"
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
          {testimonials.map((t) => (
            <article
              key={t.id}
              className="relative w-full max-w-sm bg-white rounded-2xl border border-gray-100 shadow-[0px_6px_18px_rgba(0,0,0,0.06)] overflow-visible transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="px-6 pt-8 pb-6 flex flex-col items-center">
                {/* Avatar */}
                <div className="relative w-full flex justify-center">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="h-24 w-24 rounded-full object-cover object-center absolute -top-12 border-4 border-white shadow-md z-10"
                  />
                </div>

                {/* Name / Role */}
                <div className="pt-14 text-center">
                  <h3 className="text-lg font-medium text-gray-800">{t.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{t.address}</p>
                </div>

                {/* Review */}
                <p className="text-gray-500 text-sm text-center mt-4 px-4 leading-relaxed">
                  {t.review}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-4">
                  <div className="flex">{renderStars(t.rating)}</div>
                  <span className="text-sm text-gray-500">· {t.rating}.0</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Mobile CTA */}
      <div className="mt-8 flex justify-center md:hidden">
        <button className="group inline-flex items-center gap-2 text-gray-800 font-medium hover:text-black transition">
          View All Reviews
          <img
            src={assets.arrowIcon}
            alt="arrow"
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </div>
    </section>
  )
}
