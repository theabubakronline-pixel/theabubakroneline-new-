const InputField = ({ value, onChange, error, onValidate }) => {
  return (
    <div className="space-y-2">
      <div className="relative">
        <input
          id="qr-input"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onValidate}
          placeholder="https://example.com or any text..."
          className={`w-full px-4 py-2.5 pr-10 bg-white dark:bg-gray-800 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
            error 
              ? 'border-red-400 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-900/30' 
              : value
              ? 'border-green-400 focus:border-green-500 focus:ring-green-200 dark:focus:ring-green-900/30'
              : 'border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-blue-200 dark:focus:ring-blue-900/30'
          }`}
        />
        {value && !error && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
        {error && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </p>
      )}
    </div>
  )
}

export default InputField
