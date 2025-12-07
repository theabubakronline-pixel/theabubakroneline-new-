const ColorCustomizer = ({
  foregroundColor,
  backgroundColor,
  onForegroundChange,
  onBackgroundChange,
}) => {
  const presetColors = [
    { name: 'Black', value: '#000000' },
    { name: 'Midnight', value: '#0f172a' },
    { name: 'Lagoon', value: '#0f766e' },
    { name: 'Cobalt', value: '#2563EB' },
    { name: 'Jungle', value: '#15803d' },
    { name: 'Aurora', value: '#9333EA' },
    { name: 'Sunset', value: '#EA580C' },
  ]

  const presetBgColors = [
    { name: 'Paper', value: '#FFFFFF' },
    { name: 'Dawn Mist', value: '#F8FAFC' },
    { name: 'Sky Milk', value: '#E0F2FE' },
    { name: 'Mint Frost', value: '#DCFCE7' },
    { name: 'Rose Quartz', value: '#FCE7F3' },
    { name: 'Amber Glow', value: '#FEF3C7' },
    { name: 'Stone', value: '#E5E7EB' },
  ]

  const swapColors = () => {
    const prevFg = foregroundColor
    onForegroundChange(backgroundColor)
    onBackgroundChange(prevFg)
  }

  const resetColors = () => {
    onForegroundChange('#000000')
    onBackgroundChange('#FFFFFF')
  }

  const hexToLuminance = (hex) => {
    const sanitized = hex.replace('#', '')
    const bigint = parseInt(sanitized, 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255
    const srgb = [r, g, b].map((channel) => {
      const c = channel / 255
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2]
  }

  const contrastRatio = (() => {
    try {
      const L1 = hexToLuminance(foregroundColor)
      const L2 = hexToLuminance(backgroundColor)
      const lighter = Math.max(L1, L2)
      const darker = Math.min(L1, L2)
      return ((lighter + 0.05) / (darker + 0.05)).toFixed(2)
    } catch {
      return null
    }
  })()

  const contrastMessage = contrastRatio
    ? contrastRatio >= 4.5
      ? '✓ Excellent contrast for readability'
      : contrastRatio >= 3.0
      ? '⚠️ Good contrast, could be better'
      : '✗ Low contrast - may affect scannability'
    : 'Adjust colors to see contrast rating'

  const contrastLevel = contrastRatio 
    ? contrastRatio >= 4.5 ? 'excellent' 
    : contrastRatio >= 3.0 ? 'good' 
    : 'poor'
    : null

  return (
    <div className="space-y-3">
      {/* Foreground Color Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-semibold text-gray-900 dark:text-white">
            QR Code Color
          </label>
          <div className="flex gap-2">
            <button 
              onClick={swapColors} 
              className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-purple-400 dark:hover:border-purple-500 transition-colors"
              title="Swap colors"
            >
              ↔️ Swap
            </button>
            <button 
              onClick={resetColors} 
              className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              title="Reset to default"
            >
              ↺ Reset
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-2">
          <div className="relative">
            <input
              type="color"
              value={foregroundColor}
              onChange={(e) => onForegroundChange(e.target.value)}
              className="w-10 h-10 rounded-lg cursor-pointer border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-purple-500 rounded-full border-3 border-white dark:border-gray-900 shadow-lg"></div>
          </div>
          <input
            type="text"
            value={foregroundColor}
            onChange={(e) => onForegroundChange(e.target.value)}
            className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900/30 focus:border-purple-500 dark:focus:border-purple-500 transition-all font-mono text-xs text-gray-900 dark:text-white"
            placeholder="#000000"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {presetColors.map((color) => (
            <button
              key={color.value}
              onClick={() => onForegroundChange(color.value)}
              className={`w-8 h-8 rounded-lg border-2 transition-all duration-200 hover:scale-110 ${
                foregroundColor.toLowerCase() === color.value.toLowerCase()
                  ? 'border-purple-500 dark:border-purple-400 ring-4 ring-purple-200 dark:ring-purple-900/30 scale-110 shadow-lg'
                  : 'border-gray-300 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600'
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Background Color Section */}
      <div>
        <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-2">
          Background Color
        </label>
        
        <div className="flex items-center gap-2 mb-2">
          <div className="relative">
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => onBackgroundChange(e.target.value)}
              className="w-10 h-10 rounded-lg cursor-pointer border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-pink-500 rounded-full border-3 border-white dark:border-gray-900 shadow-lg"></div>
          </div>
          <input
            type="text"
            value={backgroundColor}
            onChange={(e) => onBackgroundChange(e.target.value)}
            className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200 dark:focus:ring-pink-900/30 focus:border-pink-500 dark:focus:border-pink-500 transition-all font-mono text-xs text-gray-900 dark:text-white"
            placeholder="#FFFFFF"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {presetBgColors.map((color) => (
            <button
              key={color.value}
              onClick={() => onBackgroundChange(color.value)}
              className={`w-8 h-8 rounded-lg border-2 transition-all duration-200 hover:scale-110 ${
                backgroundColor.toLowerCase() === color.value.toLowerCase()
                  ? 'border-pink-500 dark:border-pink-400 ring-4 ring-pink-200 dark:ring-pink-900/30 scale-110 shadow-lg'
                  : 'border-gray-300 dark:border-gray-700 hover:border-pink-300 dark:hover:border-pink-600'
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Contrast Helper - Very Compact */}
      <div className="p-2 rounded-lg border bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <div className={`w-1.5 h-1.5 rounded-full ${
              contrastLevel === 'excellent' ? 'bg-green-500' :
              contrastLevel === 'good' ? 'bg-yellow-500' :
              contrastLevel === 'poor' ? 'bg-red-500' :
              'bg-gray-400'
            } ${contrastRatio && contrastLevel !== null ? 'animate-pulse' : ''}`}></div>
            <p className="text-[10px] font-semibold text-gray-900 dark:text-white">Contrast</p>
          </div>
          {contrastRatio && (
            <p className="text-[10px] font-bold text-gray-700 dark:text-gray-300">
              {contrastRatio}:1
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ColorCustomizer
