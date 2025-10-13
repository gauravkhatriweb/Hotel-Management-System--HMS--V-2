import React from 'react'
import { assets } from '../assets/assets'

export default function Footer() {
  const year = new Date().getFullYear()

  const resources = [
    { label: 'Documentation', href: '#' },
    { label: 'Tutorials', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Community', href: '#' },
  ]

  const company = [
    { label: 'About', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
  ]

  const social = [
    { name: 'Instagram', icon: assets.instagramIcon, href: '#' },
    { name: 'Facebook', icon: assets.facebookIcon, href: '#' },
    { name: 'Twitter', icon: assets.twitterIcon, href: '#' },
    { name: 'LinkedIn', icon: assets.linkendinIcon, href: '#' },
  ]

  return (
    <footer className="w-full bg-white/95 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-4 xl:col-span-5">
            <div className="flex flex-col space-y-6">
              <a href="/" className="inline-flex items-center gap-3 group">
                <img 
                  src={assets.logo} 
                  alt="QuickStay logo" 
                  className="h-10 w-auto transition-transform group-hover:scale-105" 
                />
                <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  QuickStay
                </span>
              </a>

              <p className="text-base text-gray-600 leading-relaxed max-w-md">
                QuickStay helps you discover and book the best stays — from cozy rooms to luxury suites. 
                Simple booking, trusted hosts, and exceptional experiences.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {social.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    aria-label={s.name}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all duration-300 hover:scale-110 hover:shadow-md"
                    rel="noopener noreferrer"
                  >
                    <img src={s.icon} alt={`${s.name} icon`} className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-8 xl:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {/* RESOURCES */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 text-lg mb-4 tracking-wide">Resources</h3>
                <ul className="space-y-3">
                  {resources.map((r) => (
                    <li key={r.label}>
                      <a
                        href={r.href}
                        className="text-gray-600 hover:text-gray-900 transition-all duration-300 hover:translate-x-1 inline-block"
                      >
                        {r.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* COMPANY */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 text-lg mb-4 tracking-wide">Company</h3>
                <ul className="space-y-3">
                  {company.map((c) => (
                    <li key={c.label}>
                      <a
                        href={c.href}
                        className="text-gray-600 hover:text-gray-900 transition-all duration-300 hover:translate-x-1 inline-block"
                      >
                        {c.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CONTACT */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 text-lg mb-4 tracking-wide">Contact</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 group">
                    <img
                      src={assets.locationFilledIcon}
                      alt=""
                      className="w-5 h-5 mt-0.5 opacity-80 group-hover:scale-110 transition-transform"
                    />
                    <span className="text-gray-600 group-hover:text-gray-900 transition-colors">
                      123 Main Street, City, Country
                    </span>
                  </li>
                  <li className="flex items-start gap-3 group">
                    <svg
                      className="w-5 h-5 mt-0.5 text-gray-600 group-hover:scale-110 transition-transform"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 5.25C3 4.284 3.895 3.5 4.852 3.5h14.296C20.105 3.5 21 4.284 21 5.25V18.75C21 19.716 20.105 20.5 19.148 20.5H4.852C3.895 20.5 3 19.716 3 18.75V5.25Z"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <a href="mailto:support@quickstay.com" className="text-gray-600 hover:text-gray-900 transition-colors">
                      support@quickstay.com
                    </a>
                  </li>
                  <li className="flex items-start gap-3 group">
                    <svg
                      className="w-5 h-5 mt-0.5 text-gray-600 group-hover:scale-110 transition-transform"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.86 19.86 0 0 1-3.07-8.63A2 2 0 0 1 4.09 2h3a2 2 0 0 1 2 1.72c.12.9.38 1.78.77 2.59a2 2 0 0 1-.45 2.11L8.91 9.91a15.03 15.03 0 0 0 6 6l1.49-1.49a2 2 0 0 1 2.11-.45c.81.39 1.69.65 2.59.77A2 2 0 0 1 22 16.92z"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <a href="tel:+15551234567" className="text-gray-600 hover:text-gray-900 transition-colors">
                      +1 (555) 123-4567
                    </a>
                  </li>
                </ul>
              </div>

              {/* LEGAL */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 text-lg mb-4 tracking-wide">Legal</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-gray-600 hover:text-gray-900 transition-all duration-300 hover:translate-x-1 inline-block">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-gray-900 transition-all duration-300 hover:translate-x-1 inline-block">
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-gray-900 transition-all duration-300 hover:translate-x-1 inline-block">
                      Refund Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-gray-200/60">
          <p className="text-sm text-gray-500 text-center md:text-left">
            © {year} QuickStay. All rights reserved.
          </p>

          <div className="flex items-center gap-3 group">
            <span className="text-sm text-gray-500">Made by</span>
            <img 
              src={assets.heartIcon} 
              alt="heart" 
              className="w-4 h-4 transition-transform group-hover:scale-125" 
            />
            <a 
              href="https://gauravkhatriweb.bio/" 
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors hover:underline"
            >
              Gaurav Khatri
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}