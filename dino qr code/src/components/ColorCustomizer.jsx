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

  const themeCombos = [
    {
      id: 'studio',
      name: 'Studio Glow',
      description: 'Bold ink on a frosted background',
      foreground: '#2D1B69',
      background: '#F7F1FF',
      accent: '✨',
    },
    {
      id: 'forest',
      name: 'Forest Canopy',
      description: 'Deep green on parchment',
      foreground: '#065F46',
      background: '#F0FDF4',
      accent: '🌿',
    },
    {
      id: 'noir',
      name: 'Noir Neon',
      description: 'Near-black with neon cyan',
      foreground: '#0F172A',
      background: '#E0F2FF',
      accent: '💡',
    },
    {
      id: 'sunset',
      name: 'Sunset Social',
      description: 'Warm gradient-ready palette',
      foreground: '#BE123C',
      background: '#FFF7ED',
      accent: '🌅',
    },
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
      ? 'Great contrast for most use cases'
      : 'Try increasing contrast for better readability'
    : 'Adjust colors to see contrast tips'

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
        <span className="text-xl">🎨</span>
        <span>Customization Lab</span>
      </label>
      <p className="text-xs text-gray-500 mb-4">
        Apply a curated palette or dial in precise brand colors for your QR foreground and background.
      </p>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Curated themes</p>
          <div className="flex gap-2 text-xs">
            <button onClick={swapColors} className="px-3 py-1 rounded-full border border-gray-200 text-gray-700 hover:border-purple-300 hover:text-purple-600 transition text-[11px]">
              Swap colors
            </button>
            <button onClick={resetColors} className="px-3 py-1 rounded-full border border-gray-200 text-gray-500 hover:border-gray-400 transition text-[11px]">
              Reset
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {themeCombos.map((theme) => (
            <button
              key={theme.id}
              className="text-left border border-gray-200 rounded-2xl p-4 hover:border-purple-300 hover:shadow-md transition flex gap-3 items-center"
              onClick={() => {
                onForegroundChange(theme.foreground)
                onBackgroundChange(theme.background)
              }}
            >
              <div
                className="w-12 h-12 rounded-xl shadow-inner border border-white ring-2 ring-white"
                style={{ background: `radial-gradient(circle at top, ${theme.foreground}, ${theme.background})` }}
              />
              <div>
                <p className="font-semibold text-sm text-gray-800 flex items-center gap-1">
                  {theme.accent} {theme.name}
                </p>
                <p className="text-xs text-gray-500">{theme.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-xs font-medium text-gray-600 mb-2">
          QR Code Color (Foreground)
        </label>
        <div className="flex items-center gap-3 mb-3">
          <div className="relative">
            <input
              type="color"
              value={foregroundColor}
              onChange={(e) => onForegroundChange(e.target.value)}
              className="w-14 h-14 rounded-xl cursor-pointer border-2 border-gray-300 shadow-md hover:shadow-lg transition-shadow"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-purple-500 rounded-full border-2 border-white"></div>
          </div>
          <input
            type="text"
            value={foregroundColor}
            onChange={(e) => onForegroundChange(e.target.value)}
            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all font-mono text-sm"
            placeholder="#000000"
          />
        </div>
        <div className="flex flex-wrap gap-2.5">
          {presetColors.map((color) => (
            <button
              key={color.value}
              onClick={() => onForegroundChange(color.value)}
              className={`color-picker-btn w-10 h-10 rounded-full border-2 ${
                foregroundColor === color.value
                  ? 'border-purple-500 ring-4 ring-purple-200 scale-110 shadow-lg'
                  : 'border-gray-300 hover:border-purple-300'
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-xs font-medium text-gray-600 mb-2">
          Background Color
        </label>
        <div className="flex items-center gap-3 mb-3">
          <div className="relative">
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => onBackgroundChange(e.target.value)}
              className="w-14 h-14 rounded-xl cursor-pointer border-2 border-gray-300 shadow-md hover:shadow-lg transition-shadow"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-pink-500 rounded-full border-2 border-white"></div>
          </div>
          <input
            type="text"
            value={backgroundColor}
            onChange={(e) => onBackgroundChange(e.target.value)}
            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-200 focus:border-pink-500 transition-all font-mono text-sm"
            placeholder="#FFFFFF"
          />
        </div>
        <div className="flex flex-wrap gap-2.5">
          {presetBgColors.map((color) => (
            <button
              key={color.value}
              onClick={() => onBackgroundChange(color.value)}
              className={`color-picker-btn w-10 h-10 rounded-full border-2 ${
                backgroundColor === color.value
                  ? 'border-pink-500 ring-4 ring-pink-200 scale-110 shadow-lg'
                  : 'border-gray-300 hover:border-pink-300'
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 rounded-xl border border-gray-100 bg-gray-50">
        <p className="text-xs font-semibold text-gray-600 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Contrast helper
        </p>
        <p className="text-sm font-semibold text-gray-800 mt-2">
          {contrastRatio ? `Ratio: ${contrastRatio}:1` : 'No ratio yet'}
        </p>
        <p className="text-xs text-gray-500">{contrastMessage}</p>
      </div>
    </div>
  )
}

export default ColorCustomizer

