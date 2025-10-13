import React from 'react'
import { assets, exclusiveOffers } from '../assets/assets'

const ExclusiveOffers = () => {
    return (
        <section className="px-6 md:px-16 lg:px-24 py-20 bg-slate-50">
            {/* Header */}
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
                        Exclusive Offers
                    </h2>
                    <p className="text-gray-500 mt-2 max-w-lg">
                        Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.
                    </p>
                </div>

                <button className="group flex items-center gap-2 text-gray-800 font-medium hover:text-black transition-all">
                    View All Offers
                    <img
                        src={assets.arrowIcon}
                        alt="arrow-icon"
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    />
                </button>
            </div>

            {/* Offer Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {exclusiveOffers.map((offer) => (
                    <div
                        key={offer._id}
                        className="relative rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
                    >
                        {/* Offer Image */}
                        <img
                            src={offer.image}
                            alt={offer.title}
                            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-6 text-white">
                            {/* Discount Tag */}
                            <span className="absolute top-4 left-4 bg-indigo-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                                {offer.priceOff}% OFF
                            </span>

                            {/* Content */}
                            <h3 className="text-xl font-semibold mb-1">{offer.title}</h3>
                            <p className="text-sm text-gray-200 mb-3">{offer.description}</p>
                            <p className="text-xs text-gray-300 mb-4">Expires {offer.expiryDate}</p>

                            {/* Button */}
                            <button className="flex items-center gap-2 text-sm font-medium text-white-900 group-hover:text-white transition">
                                View Offer
                                <img
                                    src={assets.arrowIcon}
                                    alt="arrow"
                                    className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1"
                                />
                            </button>

                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default ExclusiveOffers
