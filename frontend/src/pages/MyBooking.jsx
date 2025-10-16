import React from "react";
import { userBookingsDummyData, assets } from "../assets/assets";

const formatDate = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
};

const currency = (value) =>
  typeof value === "number" ? `$${value.toLocaleString()}` : value || "—";

export default function MyBooking() {
  const bookings = userBookingsDummyData || [];

  if (!bookings.length) {
    return (
      <main className="min-h-[60vh] px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-semibold text-gray-900 mb-3">My Bookings</h1>
          <p className="text-gray-600">You have no bookings yet. Search and book your first stay!</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">My Bookings</h1>
          <p className="mt-2 text-gray-600 max-w-3xl">
            Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks.
          </p>
        </header>

        {/* Table header for md+ */}
        <div className="hidden md:grid grid-cols-12 gap-4 text-sm text-gray-500 border-b pb-3 mb-4">
          <div className="col-span-6">Hotels</div>
          <div className="col-span-3">Date & Timings</div>
          <div className="col-span-3 text-right">Payment</div>
        </div>

        {/* Bookings */}
        <section className="space-y-4">
          {bookings.map((b) => {
            const room = b.room || {};
            const hotel = b.hotel || room.hotel || {};
            const img = room.images?.[0] || hotel?.images?.[0] || assets.regImage;
            const isPaid = b.isPaid;

            return (
              <article
                key={b._id}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => (e.key === "Enter" ? alert(`Open booking ${b._id}`) : null)}
                onClick={() => {}}
                className="flex flex-col md:grid md:grid-cols-12 gap-4 p-4 md:p-6 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-lg transition transform hover:-translate-y-0.5"
                aria-label={`Booking ${hotel.name || room.roomType}`}
              >
                {/* LEFT: hotel / room */}
                <div className="md:col-span-6 flex gap-4 items-start md:items-center">
                  <img
                    src={img}
                    alt={hotel.name || room.roomType}
                    className="w-28 h-20 md:w-32 md:h-24 object-cover rounded-md flex-shrink-0"
                  />

                  <div className="min-w-0">
                    <h3 className="text-lg font-medium text-gray-900 truncate">
                      {hotel.name || "Unknown Hotel"}
                      <span className="text-sm font-normal text-gray-500">{" "}({room.roomType ?? "Room"})</span>
                    </h3>

                    <div className="mt-2 text-sm text-gray-600 flex flex-col sm:flex-row sm:items-center sm:gap-4">
                      <div className="flex items-center gap-2 min-w-0">
                        <img src={assets.locationFilledIcon} alt="" className="w-4 h-4 opacity-80 flex-shrink-0" />
                        <p className="truncate text-xs sm:text-sm">{hotel.address ?? "Address not available"}</p>
                      </div>

                      <div className="flex items-center gap-2 mt-2 sm:mt-0">
                        <img src={assets.guestsIcon} alt="guests" className="w-4 h-4 opacity-80 flex-shrink-0" />
                        <p className="text-xs sm:text-sm">Guests: <span className="font-medium">{b.guests ?? 1}</span></p>
                      </div>

                      <div className="mt-2 sm:mt-0 sm:ml-4 text-sm text-gray-700">
                        <div className="text-xs text-gray-500">Total</div>
                        <div className="font-medium">{currency(b.totalPrice)}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* MIDDLE: dates */}
                <div className="md:col-span-3 flex flex-col md:flex-row md:items-center gap-3 md:gap-6 mt-2 md:mt-0 text-sm text-gray-700">
                  <div className="min-w-0">
                    <div className="text-xs text-gray-500">Check-In</div>
                    <div className="mt-1 font-medium">{formatDate(b.checkInDate)}</div>
                  </div>

                  <div className="min-w-0">
                    <div className="text-xs text-gray-500">Check-Out</div>
                    <div className="mt-1 font-medium">{formatDate(b.checkOutDate)}</div>
                  </div>
                </div>

                {/* RIGHT: payment / actions */}
                <div className="md:col-span-3 flex flex-col items-start md:items-end justify-between gap-3 mt-3 md:mt-0">
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <span
                      className={`inline-block w-3 h-3 rounded-full ${isPaid ? "bg-green-500" : "bg-red-500"}`}
                      aria-hidden
                    />
                    <span className={`text-sm font-medium ${isPaid ? "text-green-700" : "text-red-600"}`}>
                      {isPaid ? "Paid" : "Unpaid"}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto">
                    {isPaid ? (
                      <button
                        onClick={() => alert(`View receipt for ${b._id}`)}
                        className="px-3 py-1.5 rounded-full border border-gray-200 text-sm bg-white hover:bg-gray-50 transition"
                        aria-label={`View receipt for booking ${b._id}`}
                      >
                        View receipt
                      </button>
                    ) : (
                      <button
                        onClick={() => alert(`Proceed to pay for booking ${b._id}`)}
                        className="px-4 py-2 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-black transition"
                        aria-label={`Pay for booking ${b._id}`}
                      >
                        Pay now
                      </button>
                    )}

                    <button
                      onClick={() => alert(`Open details for ${b._id}`)}
                      className="px-3 py-1.5 rounded-full border border-gray-200 text-sm bg-white hover:bg-gray-50 transition hidden sm:inline-block"
                      aria-label={`Open booking ${b._id}`}
                    >
                      Details
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}
