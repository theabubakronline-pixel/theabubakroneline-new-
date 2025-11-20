import React, { useState } from 'react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-2 sm:top-4 left-1/2 transform -translate-x-1/2 z-50 w-[calc(100%-16px)] sm:w-[calc(100%-32px)] max-w-6xl">
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-xl sm:rounded-2xl shadow-2xl border-2 border-white/30 backdrop-blur-md overflow-hidden relative">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1 left-2 sm:top-2 sm:left-4 text-xl sm:text-2xl animate-float">🦖</div>
          <div className="absolute top-1 right-2 sm:top-2 sm:right-4 text-lg sm:text-xl animate-float" style={{ animationDelay: '1s' }}>🦕</div>
          <div className="absolute bottom-1 left-1/4 text-base sm:text-lg animate-float" style={{ animationDelay: '2s' }}>🦏</div>
        </div>
        
        <div className="relative flex items-center justify-between h-14 sm:h-16 md:h-18 px-3 sm:px-4 md:px-6 lg:px-8">
          {/* Logo/Brand */}
          <div className="flex items-center flex-shrink-0">
            <a 
              href="https://theabubakronline.com/" 
              className="flex items-center gap-2 sm:gap-3 hover:scale-105 transition-transform group"
              title="The Abubakr Online | Muhammad Abubakr"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center flex-shrink-0 shadow-lg">
                <img 
                  src="https://theabubakronline.com/assets/images/the-abubakr-online-logo-muhammad-abubakr-ai-tech-marketing.png" 
                  alt="The Abubakr Online logo" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    if (e.target.nextSibling) {
                      e.target.nextSibling.style.display = 'flex'
                    }
                  }}
                />
                <div className="hidden items-center justify-center w-full h-full text-white font-bold text-xs sm:text-sm">
                  MA
                </div>
              </div>
              <span className="text-sm sm:text-base md:text-lg font-bold text-white drop-shadow-lg whitespace-nowrap">
                <span className="hidden sm:inline">Muhammad Abubakr</span>
                <span className="sm:hidden">M. Abubakr</span>
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex items-center gap-2 md:gap-3">
            <a 
              href="https://theabubakronline.com/tools" 
              className="text-sm md:text-base font-semibold text-white hover:text-yellow-200 transition-all px-3 md:px-5 py-2 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 hover:scale-105 shadow-lg whitespace-nowrap flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="hidden md:inline">Back to Tools</span>
              <span className="md:hidden">Tools</span>
            </a>
            <a 
              href="https://theabubakronline.com/" 
              className="inline-flex items-center gap-2 text-sm md:text-base font-semibold text-white hover:text-yellow-200 transition-all px-3 md:px-4 py-2 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 hover:scale-105 shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all"
            aria-label="Toggle menu"
          >
            <svg 
              className={`w-6 h-6 transition-transform ${isMenuOpen ? 'rotate-90' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="sm:hidden border-t border-white/20 bg-white/10 backdrop-blur-sm">
            <nav className="flex flex-col p-3 gap-2">
              <a 
                href="https://theabubakronline.com/tools" 
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-semibold text-white hover:text-yellow-200 transition-all px-4 py-2.5 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Tools
              </a>
              <a 
                href="https://theabubakronline.com/" 
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-semibold text-white hover:text-yellow-200 transition-all px-4 py-2.5 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header

