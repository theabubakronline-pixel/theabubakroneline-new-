import { useEffect, useRef } from 'react'
import DinoQRCode from './DinoQRCode'

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

  useEffect(() => {
    if (qrRef && containerRef.current) {
      qrRef.current = containerRef.current
    }
  }, [qrRef, hasInput])

  return (
    <div className="w-full">
      <div className={`flex flex-col items-center justify-center min-h-[240px] sm:min-h-[280px] rounded-lg p-4 sm:p-6 transition-all duration-300 ${
        hasInput 
          ? 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-200 dark:border-gray-700' 
          : 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-2 border-dashed border-gray-300 dark:border-gray-700'
      }`}>
        
        {hasInput ? (
          <div 
            ref={containerRef} 
            className="bg-white dark:bg-gray-900 p-4 sm:p-5 rounded-xl shadow-xl border-2 border-gray-200 dark:border-gray-800 relative z-10 transition-all duration-300"
            style={{ backgroundColor: backgroundColor }}
          >
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
              {(customLogo || !selectedTemplate.isSimple) && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
                  {customLogo ? (
                    <div className="bg-white rounded-full p-2 sm:p-3 shadow-xl border-2 border-purple-200 dark:border-purple-800 flex items-center justify-center">
                      <img
                        src={customLogo}
                        alt="Custom logo"
                        className="w-12 h-12 sm:w-16 sm:h-16 object-contain rounded-full"
                        style={{ maxWidth: '64px', maxHeight: '64px' }}
                      />
                    </div>
                  ) : (
                    !selectedTemplate.isSimple && (
                      <div className="bg-white dark:bg-gray-900 rounded-full p-3 shadow-xl border-2 border-purple-200 dark:border-purple-800">
                        <span className="text-4xl select-none">
                          {selectedTemplate.emoji}
                        </span>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400 dark:text-gray-500">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center">
              <span className="text-5xl animate-float">🦖</span>
            </div>
            <p className="text-base sm:text-lg font-semibold text-gray-500 dark:text-gray-400 mb-2">
              Enter text or URL to see preview
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Your custom QR code will appear here
            </p>
          </div>
        )}
      </div>

      {/* Status Info - Compact */}
      {hasInput && (
        <div className="mt-4 flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-semibold text-green-700 dark:text-green-400">
            Fully scannable
          </span>
        </div>
      )}
    </div>
  )
}

export default PreviewSection
