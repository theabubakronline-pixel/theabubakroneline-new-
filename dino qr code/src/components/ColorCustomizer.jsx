const ColorCustomizer = ({
  foregroundColor,
  backgroundColor,
  onForegroundChange,
  onBackgroundChange,
}) => {
  const presetColors = [
    { name: 'Black', value: '#000000' },
    { name: 'Blue', value: '#2563EB' },
    { name: 'Green', value: '#10B981' },
    { name: 'Red', value: '#EF4444' },
    { name: 'Purple', value: '#8B5CF6' },
    { name: 'Orange', value: '#F97316' },
  ]

  const presetBgColors = [
    { name: 'White', value: '#FFFFFF' },
    { name: 'Light Blue', value: '#DBEAFE' },
    { name: 'Light Green', value: '#D1FAE5' },
    { name: 'Light Pink', value: '#FCE7F3' },
    { name: 'Light Yellow', value: '#FEF3C7' },
    { name: 'Light Gray', value: '#F3F4F6' },
  ]

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <label className="block text-sm font-bold text-gray-800 mb-5 flex items-center gap-2">
        <span className="text-xl">🎨</span>
        <span>Customize Colors</span>
      </label>
      
      {/* Foreground Color */}
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

      {/* Background Color */}
      <div>
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
    </div>
  )
}

export default ColorCustomizer

