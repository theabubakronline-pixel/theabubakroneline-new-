const DinoTemplateSelector = ({ templates, selectedTemplate, onSelectTemplate, disabled = false }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 border border-gray-100 ${disabled ? 'opacity-60' : ''}`}>
      <label className="block text-sm font-bold text-gray-800 mb-5 flex items-center gap-2">
        <span className="text-xl">🦖</span>
        <span>Choose Your Dinosaur</span>
      </label>
      {disabled && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
          <span className="font-semibold">⚠️ Custom logo is active.</span> Remove custom logo to use dinosaur templates.
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {templates.map((template) => {
          const isSelected = selectedTemplate.id === template.id
          return (
                <button
                  key={template.id}
                  onClick={() => !disabled && onSelectTemplate(template)}
                  disabled={disabled}
                  className={`dino-template-card relative p-5 rounded-xl border-2 transition-all ${
                    disabled
                      ? 'cursor-not-allowed opacity-50'
                      : isSelected
                      ? 'border-purple-500 bg-gradient-to-br ' + template.color + ' shadow-xl ring-4 ring-purple-200 scale-105 glow-selected'
                      : 'border-gray-200 bg-gradient-to-br from-gray-50 to-white hover:border-purple-300'
                  }`}
                >
              <div className={`text-5xl mb-2 transition-transform duration-300 ${isSelected ? 'scale-110' : ''}`}>
                {template.emoji}
              </div>
              <div className={`text-xs font-bold ${
                isSelected ? 'text-white' : 'text-gray-700'
              }`}>
                {template.name}
              </div>
              {isSelected && (
                <div className="absolute -top-2 -right-2">
                  <div className="bg-purple-600 rounded-full w-6 h-6 flex items-center justify-center shadow-lg animate-pulse">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              )}
              {!isSelected && (
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                </div>
              )}
            </button>
          )
        })}
      </div>
      <div className="mt-5 flex items-start gap-2 text-xs text-gray-500 bg-purple-50 p-3 rounded-lg border border-purple-100">
        <span className="text-base">💡</span>
        <span>Each dinosaur has unique shapes integrated into the QR code pattern!</span>
      </div>
    </div>
  )
}

export default DinoTemplateSelector

