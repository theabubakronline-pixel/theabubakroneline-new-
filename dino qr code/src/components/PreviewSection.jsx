import { useEffect, useRef } from 'react'
import DinoQRCode from './DinoQRCode'

const PreviewSection = ({
  inputValue,
  selectedTemplate,
  customLogo,
  foregroundColor,
  backgroundColor,
  backgroundPattern,
  scanText = 'SCAN ME!',
  scanTextColor = '#9333EA',
  qrRef,
}) => {
  const hasInput = inputValue.trim().length > 0
  const containerRef = useRef(null)

  useEffect(() => {
    if (qrRef && containerRef.current) {
      qrRef.current = containerRef.current
    }
  }, [qrRef, hasInput])

  return (
    <div className="w-full">
      <div className={`flex flex-col items-center justify-center min-h-[240px] sm:min-h-[280px] rounded-lg p-4 sm:p-6 transition-all duration-300 ${
        hasInput 
          ? 'bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200' 
          : 'bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300'
      }`}>
        
        {hasInput ? (
          <div 
            ref={containerRef} 
            className="bg-white p-4 sm:p-5 rounded-xl shadow-xl border-2 border-gray-200 relative z-10 transition-all duration-300"
            style={{ backgroundColor: backgroundColor }}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="relative inline-block" ref={qrRef}>
                <DinoQRCode
                  value={inputValue}
                  templateId={selectedTemplate.id}
                  foregroundColor={foregroundColor}
                  backgroundColor={backgroundColor}
                  backgroundPattern={backgroundPattern}
                  patternType={selectedTemplate.pattern}
                  size={220}
                />
                {/* Center Logo/Icon Overlay - Show logo if uploaded, or emoji if not simple */}
                {/* Logo must be small enough to not block critical QR code data */}
                {(customLogo || !selectedTemplate.isSimple) && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
                    {customLogo ? (
                      <div className="bg-white rounded-full p-2 shadow-xl border-2 border-purple-200 flex items-center justify-center" style={{ width: '44px', height: '44px', minWidth: '44px', minHeight: '44px' }}>
                        <img
                          src={customLogo}
                          alt="Custom logo"
                          className="object-contain rounded-full"
                          style={{ 
                            width: '36px', 
                            height: '36px',
                            maxWidth: '36px', 
                            maxHeight: '36px',
                            display: 'block',
                            borderRadius: '50%'
                          }}
                        />
                      </div>
                    ) : (
                      !selectedTemplate.isSimple && (
                        <div className="bg-white rounded-full p-2 shadow-xl border border-purple-200">
                          <span className="text-2xl select-none">
                            {selectedTemplate.emoji}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
              
              {/* Creative "Scan Me!" Text */}
              {scanText && scanText.trim() && (
                <div className="flex items-center justify-center gap-3 mt-2 pt-3 border-t-2 border-gray-200 w-full">
                  {/* Left Arrow Icon */}
                  <div className="flex items-center" style={{ color: scanTextColor }}>
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ animationDelay: '0s' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                  
                  {/* Main Scan Text with Custom Color */}
                  <div className="relative">
                    <span 
                      className="text-2xl sm:text-3xl font-extrabold tracking-wider drop-shadow-sm"
                      style={{ color: scanTextColor }}
                    >
                      {scanText}
                    </span>
                    {/* Subtle glow effect */}
                    <span 
                      className="absolute inset-0 text-2xl sm:text-3xl font-extrabold tracking-wider blur-sm opacity-50 -z-10"
                      style={{ color: scanTextColor }}
                    >
                      {scanText}
                    </span>
                  </div>
                  
                  {/* Right Arrow Icon */}
                  <div className="flex items-center" style={{ color: scanTextColor }}>
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ animationDelay: '0.3s' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <span className="text-5xl animate-float">🦖</span>
            </div>
            <p className="text-base sm:text-lg font-semibold text-gray-500 mb-2">
              Enter text or URL to see preview
            </p>
            <p className="text-sm text-gray-400">
              Your custom QR code will appear here
            </p>
          </div>
        )}
      </div>

      {/* Status Info - Compact */}
      {hasInput && (
        <div className="mt-4 flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-semibold text-green-700">
            Fully scannable
          </span>
        </div>
      )}
    </div>
  )
}

export default PreviewSection
