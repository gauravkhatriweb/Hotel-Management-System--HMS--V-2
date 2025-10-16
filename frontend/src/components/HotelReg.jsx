import React, { useEffect, useState, useRef } from "react";
import { assets, cities as CITY_LIST } from "../assets/assets";

const LOCAL_KEY = "quickstay_hotelReg_shown";
const SHOW_DELAY_MS = 3500;

export default function HotelReg({
  open, // optional controlled prop (boolean)
  onClose, // optional callback when modal closes
  autoShow = true, // if true, will auto-show once after delay (uses localStorage)
}) {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const overlayRef = useRef(null);

  // form state
  const [hotelName, setHotelName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // sync with controlled prop (if provided)
  useEffect(() => {
    setMounted(true);
    if (typeof open === "boolean") {
      setVisible(open);
      return;
    }

    // uncontrolled behavior: auto show once (if autoShow true)
    if (!autoShow) return;
    try {
      const hasShown = localStorage.getItem(LOCAL_KEY);
      if (!hasShown) {
        const t = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
        return () => clearTimeout(t);
      }
    } catch {
      // fallback if localStorage not available
      const t = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
      return () => clearTimeout(t);
    }
  }, [open, autoShow]);

  // close + mark shown
  const markShownAndClose = () => {
    try {
      localStorage.setItem(LOCAL_KEY, "1");
    } catch {}
    setVisible(false);
    if (typeof onClose === "function") onClose();
  };

  // ESC to close
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && visible) markShownAndClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible]);

  // click outside to close
  const onOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      markShownAndClose();
    }
  };

  const isValidPhone = (v) => /^\+?\d{7,15}$/.test(v.trim());

  const validate = () => {
    const errs = {};
    if (!hotelName.trim()) errs.hotelName = "Hotel name is required.";
    if (!phone.trim()) errs.phone = "Phone number is required.";
    else if (!isValidPhone(phone)) errs.phone = "Enter valid phone (digits, optional +).";
    if (!address.trim() || address.trim().length < 5) errs.address = "Address must be at least 5 characters.";
    if (!city.trim()) errs.city = "Please select a city.";
    else if (Array.isArray(CITY_LIST) && CITY_LIST.length && !CITY_LIST.includes(city)) {
      errs.city = "Please choose a valid city from the list.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const payload = { hotelName, phone, address, city, createdAt: new Date().toISOString() };
      console.log("Register hotel payload:", payload);
      await new Promise((res) => setTimeout(res, 800));
      markShownAndClose();
      alert("Thanks — your hotel registration request has been submitted.");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Avoid SSR mismatch
  if (!mounted) return null;
  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      onClick={onOverlayClick}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="hotelRegTitle"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-xl"
        aria-describedby="hotelRegDesc"
      >
        {/* Left image (hidden on small screens) */}
        <div className="hidden md:block">
          <img src={assets.regImage} alt="Register your hotel" className="w-full h-full object-cover" />
        </div>

        {/* Right: form */}
        <div className="p-6 md:p-8 relative">
          <button
            type="button"
            onClick={markShownAndClose}
            aria-label="Close registration form"
            className="absolute top-4 right-4 p-1 rounded-md hover:bg-gray-100 transition"
          >
            <img src={assets.closeIcon} alt="close" className="w-4 h-4" />
          </button>

          <h2 id="hotelRegTitle" className="text-2xl font-semibold text-gray-900 mb-1">
            Register Your Hotel
          </h2>
          <p id="hotelRegDesc" className="text-sm text-gray-600 mb-6">
            Submit your property to QuickStay — we'll review and get in touch to complete your listing.
          </p>

          <div className="space-y-4">
            <div>
              <label htmlFor="hotelName" className="text-sm font-medium text-gray-700 block mb-1">
                Hotel name <span className="text-rose-500">*</span>
              </label>
              <input
                id="hotelName"
                value={hotelName}
                onChange={(e) => setHotelName(e.target.value)}
                className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 ${errors.hotelName ? "border-rose-500" : "border-gray-200"}`}
                placeholder="e.g. Oceanview Resort"
                aria-invalid={errors.hotelName ? "true" : "false"}
                aria-describedby={errors.hotelName ? "err-hotelName" : undefined}
              />
              {errors.hotelName && (
                <p id="err-hotelName" className="mt-1 text-xs text-rose-600" role="alert">
                  {errors.hotelName}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="text-sm font-medium text-gray-700 block mb-1">
                Phone number <span className="text-rose-500">*</span>
              </label>
              <input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 ${errors.phone ? "border-rose-500" : "border-gray-200"}`}
                placeholder="+1234567890"
                aria-invalid={errors.phone ? "true" : "false"}
                aria-describedby={errors.phone ? "err-phone" : undefined}
              />
              {errors.phone && (
                <p id="err-phone" className="mt-1 text-xs text-rose-600" role="alert">
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="address" className="text-sm font-medium text-gray-700 block mb-1">
                Address <span className="text-rose-500">*</span>
              </label>
              <input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 ${errors.address ? "border-rose-500" : "border-gray-200"}`}
                placeholder="Street address, building, area"
                aria-invalid={errors.address ? "true" : "false"}
                aria-describedby={errors.address ? "err-address" : undefined}
              />
              {errors.address && (
                <p id="err-address" className="mt-1 text-xs text-rose-600" role="alert">
                  {errors.address}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="city" className="text-sm font-medium text-gray-700 block mb-1">
                City <span className="text-rose-500">*</span>
              </label>

              <div className="relative">
                <input
                  list="city-list"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Choose city"
                  className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 ${errors.city ? "border-rose-500" : "border-gray-200"}`}
                  aria-invalid={errors.city ? "true" : "false"}
                  aria-describedby={errors.city ? "err-city" : undefined}
                />
                <datalist id="city-list">
                  {(Array.isArray(CITY_LIST) ? CITY_LIST : []).map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>

                <button
                  type="button"
                  title="Open map (placeholder)"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-gray-100 transition"
                  onClick={() => alert("Map selector coming soon")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 10c0 6-9 11-9 11S3 16 3 10a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="2" />
                  </svg>
                </button>
              </div>

              {errors.city && (
                <p id="err-city" className="mt-1 text-xs text-rose-600" role="alert">
                  {errors.city}
                </p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-2 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-black transition"
              >
                {submitting ? "Submitting..." : "Register my hotel"}
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-2">
              By submitting, you agree to QuickStay's terms. We'll contact you to complete the onboarding.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
