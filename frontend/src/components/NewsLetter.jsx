import React from 'react'

export default function NewsLetter() {
  const [email, setEmail] = React.useState('')
  const [status, setStatus] = React.useState('idle') // 'idle' | 'error' | 'success'
  const [errorMsg, setErrorMsg] = React.useState('')

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMsg('')
    if (!email.trim()) {
      setStatus('error')
      setErrorMsg('Please enter your email address.')
      return
    }
    if (!validateEmail(email)) {
      setStatus('error')
      setErrorMsg('That doesn’t look like a valid email.')
      return
    }

    // simulate success (replace with real API call)
    setStatus('success')
    setTimeout(() => {
      setEmail('')
      setStatus('idle')
    }, 2000)
  }

  return (
    <>
      {/* optional font — remove if you import fonts globally */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>

      <section className="w-full">
        {/* full-width dark/gray background */}
        <div className="w-full bg-gradient-to-b from-[#0b0b0b] via-gray-900 to-black text-white py-12 px-4">
          <div className="mx-auto w-full max-w-6xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8">

            {/* Left: copy */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-400">Trusted by 12k+ developers</p>

              <div className="flex items-center gap-3 mt-3">
                {/* small stars SVG — keeps grayscale feel */}
                <svg width="86" height="16" viewBox="0 0 86 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M8.52 1.46c.15-.46.8-.46.95 0l1.43 4.41c.07.21.27.34.48.34h4.64c.48 0 .68.62.29.9L9.29 12.65c-.18.12-.25.35-.18.56l1.43 4.41c.15.46-.37.84-.76.56L4.66 13.25c-.39-.28-.91.1-.76-.36l1.43-4.41c.07-.21.01-.44-.18-.56L.83 7.12c-.39-.28-.19-.9.29-.9H6.62c.22 0 .41-.12.48-.34L8.52 1.46z" fill="#D1D5DB"/>
                  {/* you can repeat or simplify as needed; color is gray */}
                </svg>

                <span className="text-sm text-gray-400">4.5/5 • 2300+ Reviews</span>
              </div>

              <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight max-w-md bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
                Join our newsletter &amp; stay updated
              </h2>

              <p className="mt-3 text-sm text-gray-300 max-w-lg leading-relaxed">
                Be the first to know about exclusive offers, launches, and travel tips — curated for unforgettable stays.
              </p>
            </div>

            {/* Right: form */}
            <form
              onSubmit={handleSubmit}
              className="w-full md:w-[48%] lg:w-[40%] flex-shrink-0"
              aria-label="Subscribe to newsletter"
            >
              <div className="flex items-center gap-3 bg-white/6 border border-white/10 rounded-full px-3 py-2 md:px-4 md:py-3 h-12 md:h-12">
                {/* envelope icon */}
                <svg className="flex-none" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M16.5 5.25L9.756 9.545c-.229.132-.489.202-.753.202-.265 0-.525-.07-.754-.202L1.5 5.25" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 3H3C2.17 3 1.5 3.67 1.5 4.5V13.5C1.5 14.33 2.17 15 3 15H15C15.83 15 16.5 14.33 16.5 13.5V4.5C16.5 3.67 15.83 3 15 3Z" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (status !== 'idle') {
                      setStatus('idle')
                      setErrorMsg('')
                    }
                  }}
                  placeholder="Enter your email..."
                  className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-gray-400"
                  aria-invalid={status === 'error'}
                />

                <button
                  type="submit"
                  className="ml-1 inline-flex items-center gap-2 px-4 py-2 h-9 md:h-10 rounded-full bg-white text-black font-medium hover:bg-gray-100 transition-colors text-sm"
                >
                  Subscribe
                </button>
              </div>

              {/* feedback */}
              <div className="mt-3 min-h-[1.25rem]">
                {status === 'error' && (
                  <p className="text-sm text-rose-300">{errorMsg}</p>
                )}
                {status === 'success' && (
                  <p className="text-sm text-emerald-200">Thanks — you’re subscribed!</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
