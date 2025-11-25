import { useEffect, useRef } from 'react'
import DinoQRCode from './DinoQRCode'

/**
 * PreviewSection Component
 * 
 * Displays a real-time preview of the dinosaur-themed QR code.
 * The QR code includes visible dinosaur shapes integrated into the pattern.
 * Background patterns appear behind the QR code area.
 */
const PreviewSection = ({
  inputValue,
  selectedTemplate,
  customLogo,
  foregroundColor,
  backgroundColor,
  backgroundPattern,
  qrRef,
}) => {
  const hasInput = inputValue.trim().length > 0
  const containerRef = useRef(null)

  // Update qrRef for download functionality
  useEffect(() => {
    if (qrRef && containerRef.current) {
      qrRef.current = containerRef.current
    }
  }, [qrRef, hasInput])

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-[320px] sm:min-h-[380px] bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-orange-900/20 rounded-xl p-6 sm:p-8 border-2 border-dashed border-purple-200 dark:border-purple-800 relative overflow-hidden">
        <div className="absolute inset-0 shimmer opacity-20"></div>
        
        {/* Animated floating dinosaur elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-10 text-4xl opacity-10 animate-float particle" style={{ animationDelay: '0s' }}>🦖</div>
          <div className="absolute top-20 right-20 text-3xl opacity-10 animate-float particle" style={{ animationDelay: '1s' }}>🦕</div>
          <div className="absolute bottom-20 left-20 text-3xl opacity-10 animate-float particle" style={{ animationDelay: '2s' }}>🦏</div>
          <div className="absolute bottom-10 right-10 text-4xl opacity-10 animate-float particle" style={{ animationDelay: '1.5s' }}>🦅</div>
        </div>
        
        {hasInput ? (
          <div ref={containerRef} className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-2xl shadow-2xl border-4 border-purple-100 dark:border-purple-900 qr-container fade-in scale-in relative z-10 backdrop-blur-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
            <div className="relative inline-block" ref={qrRef}>
              {/* 
                DinoQRCode component generates QR code with dinosaur shapes
                integrated into the pattern itself, not just as an overlay.
                The shapes replace certain modules while maintaining scannability.
              */}
              <DinoQRCode
                value={inputValue}
                templateId={selectedTemplate.id}
                foregroundColor={foregroundColor}
                backgroundColor={backgroundColor}
                backgroundPattern={backgroundPattern}
                patternType={selectedTemplate.pattern}
                size={280}
              />
              {/* Optional: Small center logo/icon overlay */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
                {customLogo ? (
                  <div className="bg-white rounded-full p-2 sm:p-3 shadow-xl border-2 border-purple-200 flex items-center justify-center">
                    <img
                      src={customLogo}
                      alt="Custom logo"
                      className="w-12 h-12 sm:w-16 sm:h-16 object-contain rounded-full"
                      style={{ maxWidth: '64px', maxHeight: '64px' }}
                    />
                  </div>
                ) : (
                  <div className="bg-white rounded-full p-3 shadow-xl border-2 border-purple-200 animate-pulse-slow">
                    <span className="text-4xl select-none">
                      {selectedTemplate.emoji}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400">
            <div className="text-6xl sm:text-8xl mb-4 sm:mb-6 animate-float">🦖</div>
            <p className="text-lg sm:text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">Enter text or URL to see preview</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">Your amazing QR code will appear here</p>
          </div>
        )}
      </div>

      {hasInput && (
        <div className="mt-4 text-center">
          {customLogo ? (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full">
              <span className="text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300">
                Using: <span className="text-purple-600 dark:text-purple-400">Custom Logo</span>
              </span>
              <span className="text-xl sm:text-2xl">🎨</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full">
              <span className="text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300">
                Selected: <span className="text-purple-600 dark:text-purple-400">{selectedTemplate.name}</span>
              </span>
              <span className="text-xl sm:text-2xl">{selectedTemplate.emoji}</span>
            </div>
          )}
          <div className="mt-3 flex flex-col items-center justify-center gap-2">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-600 dark:text-gray-400 bg-green-50 dark:bg-green-900/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-green-200 dark:border-green-800 animate-pulse-slow">
              <svg className="w-4 h-4 text-green-500 dark:text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-semibold">Fully scannable with integrated shapes!</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span>High error correction (Level H)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PreviewSection

