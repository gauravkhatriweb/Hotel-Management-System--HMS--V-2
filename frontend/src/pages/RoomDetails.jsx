import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { roomsDummyData, facilityIcons, roomCommonData, assets } from "../assets/assets";

/**
 * Improved RoomDetails
 * - Uses roomCommonData
 * - Host image fallback
 * - Safe top padding to avoid navbar overlap
 * - Responsive, sticky booking card with top offset
 * - Gallery with lightbox & keyboard controls
 * - Amenities + feature list
 */

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const formatPrice = (p) => (typeof p === "number" ? `$${p.toLocaleString()}` : p);

const deriveRating = (room) => {
  const base = room.pricePerNight ?? 300;
  const score = base > 500 ? 4.9 : base > 400 ? 4.7 : base > 300 ? 4.5 : 4.2;
  return Math.round(score * 10) / 10;
};

export default function RoomDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // booking form
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [formError, setFormError] = useState("");

  // load room by id
  useEffect(() => {
    const selected = roomsDummyData.find((r) => r._id === id);
    if (selected) {
      setRoom(selected);
      setMainImage(selected.images?.[0] ?? null);
      setLightboxIndex(0);
    } else {
      setRoom(null);
      setMainImage(null);
    }
  }, [id]);

  // lightbox keyboard
  const onKeyDown = useCallback(
    (e) => {
      if (!isLightboxOpen) return;
      if (e.key === "Escape") setIsLightboxOpen(false);
      if (e.key === "ArrowRight" && room) setLightboxIndex((i) => (i + 1) % room.images.length);
      if (e.key === "ArrowLeft" && room) setLightboxIndex((i) => (i - 1 + room.images.length) % room.images.length);
    },
    [isLightboxOpen, room]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  if (!room) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-20">
        <div className="max-w-xl text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Room not found</h2>
          <p className="text-gray-600 mb-6">
            We couldn't find that room. Try browsing other rooms or go back to the listings.
          </p>
          <div className="flex justify-center gap-3">
            <button onClick={() => navigate(-1)} className="px-4 py-2 rounded-full bg-gray-900 text-white text-sm hover:bg-black transition">
              Go Back
            </button>
            <button onClick={() => navigate("/")} className="px-4 py-2 rounded-full border border-gray-300 text-sm hover:bg-gray-50 transition">
              Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const rating = deriveRating(room);

  // host image fallback: if owner image missing, use regImage or userIcon
  const hostImage = room.hotel?.owner?.image || assets.regImage || assets.userIcon;

  // booking validation
  const handleBook = (e) => {
    e.preventDefault();
    setFormError("");
    if (!checkIn || !checkOut) {
      setFormError("Please select both check-in and check-out dates.");
      return;
    }
    if (new Date(checkOut) <= new Date(checkIn)) {
      setFormError("Check-out must be after check-in.");
      return;
    }
    const nights = (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);
    if (nights <= 0) {
      setFormError("Please choose at least one night.");
      return;
    }
    // placeholder action — replace with API call or navigation
    alert(`Reserved ${room.roomType} for ${guests} guest(s) • ${nights} night(s)\nEstimated: ${formatPrice(room.pricePerNight * nights)}`);
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };
  const closeLightbox = () => setIsLightboxOpen(false);
  const nextLightbox = () => setLightboxIndex((i) => (i + 1) % room.images.length);
  const prevLightbox = () => setLightboxIndex((i) => (i - 1 + room.images.length) % room.images.length);

  return (
    <main className="bg-gray-50 min-h-screen text-gray-800">
      {/* top padding prevents fixed navbar overlap — adjust as needed to match your navbar height */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 pt-28 md:pt-32 lg:pt-36">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 truncate">{room.hotel.name}</h1>
            <p className="text-sm text-gray-600 mt-1">
              {room.roomType} • {room.hotel.city ?? "Unknown city"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-200">
              <img src={assets.starIconFilled} alt="star" className="w-4 h-4" />
              <span className="text-sm font-medium text-gray-900">{rating}</span>
              <span className="text-xs text-gray-500">/ 5</span>
            </div>
            <div className="text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-full">{room.isAvailable ? "Available" : "Unavailable"}</div>
          </div>
        </div>

        {/* Gallery + right column */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Gallery */}
          <section className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl overflow-hidden bg-white shadow">
              <div
                className="w-full h-[420px] sm:h-[480px] md:h-[520px] bg-gray-100 flex items-center justify-center cursor-zoom-in"
                role="button"
                onClick={() => openLightbox(lightboxIndex)}
                aria-label="Open image viewer"
              >
                <img src={mainImage} alt={`${room.roomType} - ${room.hotel.name}`} className="w-full h-full object-cover" />
              </div>

              <div className="px-4 py-4">
                <div className="flex gap-3 overflow-x-auto md:overflow-visible">
                  {room.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setMainImage(img);
                        setLightboxIndex(i);
                      }}
                      className={`flex-shrink-0 rounded-lg overflow-hidden border-2 focus:outline-none transition ${mainImage === img ? "border-gray-900" : "border-transparent hover:border-gray-300"}`}
                    >
                      <img src={img} alt={`thumbnail-${i}`} className="w-28 h-20 md:w-32 md:h-24 object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* About + features */}
            <div className="bg-white rounded-2xl p-6 shadow space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">About this room</h2>
                <p className="text-gray-700 leading-relaxed">
                  Enjoy a delightful stay in this thoughtfully curated <strong>{room.roomType}</strong>. The space features modern furnishings, crisp bedding, and a selection of amenities designed to make your stay effortless and relaxing. Located near local attractions and dining options, {room.hotel.name} is an ideal base for business or leisure travelers.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">What makes this room special</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {roomCommonData.map((f, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-gray-50 p-3 rounded-md">
                      <img src={f.icon} alt="" className="w-6 h-6 mt-0.5" />
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{f.title}</div>
                        <div className="text-xs text-gray-600">{f.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Right column: booking, amenities, host */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="sticky top-28">
              <div className="bg-white rounded-2xl p-6 shadow">
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="text-2xl font-semibold text-gray-900">{formatPrice(room.pricePerNight)}</div>
                    <div className="text-sm text-gray-500">per night</div>
                  </div>
                  <div className="text-xs text-gray-500">Taxes & fees calculated later</div>
                </div>

                <form className="mt-4 space-y-3" onSubmit={handleBook}>
                  <div className="grid grid-cols-2 gap-2">
                    <label className="text-xs text-gray-600">Check-in</label>
                    <label className="text-xs text-gray-600">Check-out</label>

                    <input type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="col-span-1 px-3 py-2 border rounded text-sm text-gray-800"
                      min={new Date().toISOString().slice(0, 10)}
                      required
                    />
                    <input type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="col-span-1 px-3 py-2 border rounded text-sm text-gray-800"
                      min={checkIn || new Date().toISOString().slice(0, 10)}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-600 block mb-1">Guests</label>
                    <select value={guests} onChange={(e) => setGuests(clamp(Number(e.target.value), 1, 10))} className="w-full px-3 py-2 border rounded text-sm text-gray-800">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <option key={i} value={i + 1}>{i + 1} {i === 0 ? "guest" : "guests"}</option>
                      ))}
                    </select>
                  </div>

                  {formError && <p className="text-sm text-rose-500">{formError}</p>}

                  <button disabled={!room.isAvailable} type="submit" className={`w-full py-3 rounded-full text-white font-medium transition ${room.isAvailable ? "bg-gray-900 hover:bg-black" : "bg-gray-300 cursor-not-allowed"}`}>
                    {room.isAvailable ? "Reserve now" : "Unavailable"}
                  </button>
                </form>
              </div>

              {/* Amenities */}
              <div className="mt-4 bg-white rounded-2xl p-6 shadow">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">Amenities</h3>
                <ul className="grid grid-cols-2 gap-3 text-gray-700">
                  {room.amenities.map((a, idx) => {
                    const icon = facilityIcons?.[a] ?? assets.badgeIcon;
                    return (
                      <li key={idx} className="flex items-center gap-3 bg-gray-50 px-3 py-2 rounded-md">
                        <img src={icon} alt="" className="w-5 h-5 opacity-90" />
                        <span className="text-sm">{a}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Host */}
              <div className="mt-4 bg-white rounded-2xl p-4 shadow">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Host & Contact</h4>
                <div className="flex items-center gap-3">
                  <img src={hostImage} alt={room.hotel.owner?.username ?? "Host"} className="w-12 h-12 rounded-full object-cover border border-gray-100 shadow-sm" />
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-gray-900">{room.hotel.owner?.username ?? "Host"}</div>
                    <div className="text-xs text-gray-500">{room.hotel.city ?? "—"}</div>
                  </div>
                </div>

                <div className="mt-3 text-sm text-gray-600 space-y-2">
                  <div className="flex items-center gap-2"><img src={assets.locationFilledIcon} alt="" className="w-4 h-4"/> <span>{room.hotel.address}</span></div>
                  <div className="flex items-center gap-2"><img src={assets.userIcon} alt="" className="w-4 h-4"/> <span>{room.hotel.contact ?? "—"}</span></div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* About + Policies */}
        <section className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow">
            <h3 className="text-lg font-semibold mb-3">About {room.hotel.name}</h3>
            <p className="text-gray-700 leading-relaxed">
              {room.hotel.name} is a comfortable and trusted place to stay. With dedicated staff, carefully maintained rooms, and easy access to local attractions, it's a great base for families and business travelers.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow">
            <h3 className="text-lg font-semibold mb-3">Policies</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>Check-in: 2:00 PM — Check-out: 11:00 AM</li>
              <li>Free cancellation up to 48 hours before arrival (subject to rate rules)</li>
              <li>Pets allowed on request (extra charges may apply)</li>
              <li>Smoking is not permitted inside rooms</li>
            </ul>
          </div>
        </section>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={closeLightbox} role="dialog" aria-modal="true">
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeLightbox} aria-label="Close" className="absolute top-3 right-3 bg-white/90 rounded-full p-2 shadow">✕</button>

            <img src={room.images[lightboxIndex]} alt={`lightbox-${lightboxIndex}`} className="w-full h-[70vh] object-contain bg-black rounded" />

            <button onClick={prevLightbox} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2">‹</button>
            <button onClick={nextLightbox} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2">›</button>
          </div>
        </div>
      )}
    </main>
  );
}
