import { BACKGROUND_PATTERNS } from '../utils/backgroundPatterns'

/**
 * BackgroundPatternSelector Component
 * 
 * Allows users to select from various dinosaur-themed background patterns
 * that appear behind the QR code area.
 */
const BackgroundPatternSelector = ({
  selectedPattern,
  onSelectPattern,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <label className="block text-sm font-bold text-gray-800 mb-5 flex items-center gap-2">
        <span className="text-xl">🖼️</span>
        <span>Choose Background Pattern</span>
      </label>
      
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {BACKGROUND_PATTERNS.map((pattern) => {
          const isSelected = selectedPattern === pattern.id
          return (
            <button
              key={pattern.id}
              onClick={() => onSelectPattern(pattern.id)}
              className={`dino-template-card relative p-4 rounded-xl border-2 transition-all duration-300 ${
                isSelected
                  ? 'border-purple-500 bg-gradient-to-br from-purple-100 to-pink-100 shadow-lg ring-2 ring-purple-200 scale-105'
                  : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-gray-50'
              }`}
              title={pattern.name}
            >
              <div className={`text-3xl mb-1 transition-transform duration-300 ${isSelected ? 'scale-110' : ''}`}>
                {pattern.emoji}
              </div>
              <div className={`text-xs font-bold ${
                isSelected ? 'text-purple-700' : 'text-gray-600'
              }`}>
                {pattern.name}
              </div>
              {isSelected && (
                <div className="absolute -top-1 -right-1">
                  <div className="bg-purple-600 rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              )}
            </button>
          )
        })}
      </div>
      
      <div className="mt-4 flex items-start gap-2 text-xs text-gray-500 bg-blue-50 p-3 rounded-lg border border-blue-100">
        <span className="text-base">💡</span>
        <span>Background patterns are subtle and won't interfere with QR code scannability</span>
      </div>
    </div>
  )
}

export default BackgroundPatternSelector

