const InputField = ({ value, onChange, error, onValidate }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <label htmlFor="qr-input" className="block text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
        <span className="text-xl">🔗</span>
        <span>Enter URL or Text</span>
        <span className="text-red-500 ml-1">*</span>
      </label>
      <div className="relative">
        <input
          id="qr-input"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onValidate}
          placeholder="https://example.com or any text..."
          className={`w-full px-4 py-4 pr-12 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-opacity-20 transition-all duration-300 text-gray-800 placeholder-gray-400 ${
            error 
              ? 'border-red-400 focus:border-red-500 focus:ring-red-200' 
              : 'border-gray-300 hover:border-purple-300 focus:border-purple-500 focus:ring-purple-200'
          }`}
        />
        {value && !error && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>
      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600 flex items-center gap-2 font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </p>
        </div>
      )}
      <div className="mt-3 flex items-start gap-2 text-xs text-gray-500 bg-blue-50 p-3 rounded-lg border border-blue-100">
        <span className="text-base">💡</span>
        <span>Enter any URL or text to generate a scannable QR code with dinosaur shapes!</span>
      </div>
    </div>
  )
}

export default InputField

