import React from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react'
import HotelReg from '../components/HotelReg';

export default function Footer() {
  const [showHotelReg, setShowHotelReg] = useState(false);
  const year = new Date().getFullYear()

  const destinations = [
    { label: 'Karachi', href: '#' },
    { label: 'Lahore', href: '#' },
    { label: 'Islamabad', href: '#' },
    { label: 'Hyderabad', href: '#' },
  ]

  const support = [
    { label: "Help Center", href: "#" },
    { label: "Contact Us", href: "#" },
    { label: "Cancellation Options", href: "#" },
    // clickable item that opens the hotel registration modal
    { label: "Register your hotel", href: "#register", action: () => setShowHotelReg(true) },
  ];

  const company = [
    { label: 'About', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
  ]

  const legal = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Refund Policy', href: '#' },
  ]

  const social = [
    { name: 'Instagram', icon: assets.instagramIcon, href: '#' },
    { name: 'Facebook', icon: assets.facebookIcon, href: '#' },
    { name: 'Twitter', icon: assets.twitterIcon, href: '#' },
    { name: 'LinkedIn', icon: assets.linkendinIcon, href: '#' },
  ]

  const onSubscribe = (e) => {
    e.preventDefault()
    // handle subscription
  }

  return (
    <footer className="w-full bg-white text-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 gap-x-10 lg:gap-x-16">
          {/* Brand + newsletter */}
          <div className="lg:col-span-5 xl:col-span-5 flex">
            <div className="w-full flex flex-col items-center sm:items-start text-center sm:text-left gap-6">
              <a
                href="/"
                className="inline-flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-md"
              >
                <img
                  src={assets.logo}
                  alt="QuickStay Hotels logo"
                  className="h-10 w-auto transition-transform group-hover:scale-105"
                />
                <span className="text-2xl font-bold text-gray-900">QuickStay Hotels</span>
              </a>

              <p className="text-base text-gray-600 leading-relaxed max-w-md">
                Find and book hotels, resorts, and serviced apartments with secure payments, flexible cancellations, and 24/7 support.
              </p>

              {/* Newsletter */}
              <div className="w-full max-w-md">
                <form onSubmit={onSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <label htmlFor="newsletter" className="sr-only">
                    Email for deals
                  </label>
                  <input
                    id="newsletter"
                    type="email"
                    required
                    placeholder="Get deals in your inbox"
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 placeholder-gray-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  />
                  <button
                    type="submit"
                    className="shrink-0 rounded-md bg-gray-900 text-white px-4 py-2 text-sm hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  >
                    Subscribe
                  </button>
                </form>
                <p className="mt-2 text-xs text-gray-500">
                  By subscribing, you agree to our Privacy Policy and consent to receive updates.
                </p>
              </div>

              {/* Social */}
              <div className="flex items-center gap-3">
                {social.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    aria-label={s.name}
                    title={s.name}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-gray-100 hover:bg-gray-200 ring-1 ring-gray-200/60 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                    rel="noopener noreferrer"
                  >
                    <img src={s.icon} alt="" className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-7 xl:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-10">
              {/* Popular Destinations */}
              <div className="space-y-4 text-center sm:text-left">
                <h3 className="font-semibold text-gray-900 text-base tracking-wide uppercase">
                  Popular Destinations
                </h3>
                <ul className="space-y-3 list-none text-sm text-gray-600">
                  {destinations.map((d) => (
                    <li key={d.label}>
                      <a
                        href={d.href}
                        className="hover:text-gray-900 hover:underline underline-offset-4 decoration-gray-300 transition-colors"
                      >
                        {d.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

           {/* Support column */}
        <div className="space-y-4 text-center sm:text-left">
          <h3 className="font-semibold text-gray-900 text-base tracking-wide uppercase">Support</h3>
          <ul className="space-y-3 list-none text-sm text-gray-600">
            {support.map((s) => (
              <li key={s.label}>
                {s.action ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      s.action();
                    }}
                    className="hover:text-gray-900 hover:underline underline-offset-4 decoration-gray-300 transition-colors text-left"
                  >
                    {s.label}
                  </button>
                ) : (
                  <a
                    href={s.href}
                    className="hover:text-gray-900 hover:underline underline-offset-4 decoration-gray-300 transition-colors"
                  >
                    {s.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* render HotelReg modal (controlled mode) */}
        <HotelReg open={showHotelReg} onClose={() => setShowHotelReg(false)} autoShow={false} />

              {/* Company */}
              <div className="space-y-4 text-center sm:text-left">
                <h3 className="font-semibold text-gray-900 text-base tracking-wide uppercase">
                  Company
                </h3>
                <ul className="space-y-3 list-none text-sm text-gray-600">
                  {company.map((c) => (
                    <li key={c.label}>
                      <a
                        href={c.href}
                        className="hover:text-gray-900 hover:underline underline-offset-4 decoration-gray-300 transition-colors"
                      >
                        {c.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div className="space-y-4 text-center sm:text-left">
                <h3 className="font-semibold text-gray-900 text-base tracking-wide uppercase">
                  Legal
                </h3>
                <ul className="space-y-3 list-none text-sm text-gray-600">
                  {legal.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="hover:text-gray-900 hover:underline underline-offset-4 decoration-gray-300 transition-colors"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact strip */}
            <div className="mt-10 rounded-lg border border-gray-200/70 bg-gray-50 p-5">
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-sm text-gray-600">
                <li className="flex items-start gap-3 justify-center sm:justify-start">
                  <img
                    src={assets.locationFilledIcon}
                    alt=""
                    className="w-5 h-5 mt-0.5 opacity-80"
                  />
                  <span>123 Main Street, City, Country</span>
                </li>
                <li className="flex items-start gap-3 justify-center sm:justify-start">
                  <svg className="w-5 h-5 mt-0.5 text-gray-600" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M3 5.25C3 4.284 3.895 3.5 4.852 3.5h14.296C20.105 3.5 21 4.284 21 5.25V18.75C21 19.716 20.105 20.5 19.148 20.5H4.852C3.895 20.5 3 19.716 3 18.75V5.25Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <a
                    href="mailto:support@quickstay.com"
                    className="hover:text-gray-900 hover:underline underline-offset-4 decoration-gray-300 transition-colors"
                  >
                    support@quickstay.com
                  </a>
                </li>
                <li className="flex items-start gap-3 justify-center sm:justify-start">
                  <svg className="w-5 h-5 mt-0.5 text-gray-600" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.86 19.86 0 0 1-3.07-8.63A2 2 0 0 1 4.09 2h3a2 2 0 0 1 2 1.72c.12.9.38 1.78.77 2.59a2 2 0 0 1-.45 2.11L8.91 9.91a15.03 15.03 0 0 0 6 6l1.49-1.49a2 2 0 0 1 2.11-.45c.81.39 1.69.65 2.59.77A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <a
                    href="tel:+15551234567"
                    className="hover:text-gray-900 hover:underline underline-offset-4 decoration-gray-300 transition-colors"
                  >
                    +1 (555) 123-4567
                  </a>
                </li>
              </ul>
              <p className="mt-4 text-xs text-gray-500">
                24/7 customer support for urgent booking changes and assistance.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200/60">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500 text-center md:text-left">
              © {year} QuickStay Hotels. All rights reserved.
            </p>

            <div className="flex items-center gap-4">
              {/* Language / Currency */}
              <div className="flex items-center gap-2">
                <label htmlFor="lang" className="sr-only">Language</label>
                <select
                  id="lang"
                  className="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  defaultValue="en"
                >
                  <option value="en">EN</option>
                  <option value="ur">UR</option>
                </select>

                <label htmlFor="currency" className="sr-only">Currency</label>
                <select
                  id="currency"
                  className="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  defaultValue="pkr"
                >
                  <option value="pkr">PKR</option>
                  <option value="usd">USD</option>
                </select>
              </div>

              {/* Credit */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Made by</span>
                <img src={assets.heartIcon} alt="heart" className="w-4 h-4" />
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-900 hover:underline underline-offset-4 decoration-gray-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded"
                >
                  Gaurav Khatri
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
