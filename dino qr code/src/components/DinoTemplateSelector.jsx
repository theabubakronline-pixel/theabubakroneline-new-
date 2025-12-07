import { useRef, useState } from 'react'

const DinoTemplateSelector = ({ templates, selectedTemplate, onSelectTemplate, customLogo, onLogoUpload, onRemoveLogo }) => {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileSelect = (file) => {
    if (!file) return
    if (!file.type?.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, SVG, etc.)')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB')
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      const imageUrl = e.target.result
      onLogoUpload(imageUrl, file)
    }
    reader.readAsDataURL(file)
  }

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 border border-gray-100`}>
      <label className="block text-sm font-bold text-gray-800 mb-5 flex items-center gap-2">
        <span className="text-xl">🦖</span>
        <span>Choose Your Dinosaur</span>
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {templates.map((template) => {
          const isSelected = selectedTemplate.id === template.id
          return (
                <button
                  key={template.id}
                  onClick={() => {
                    onSelectTemplate(template)
                    if (customLogo) {
                      onRemoveLogo()
                      if (fileInputRef.current) fileInputRef.current.value = ''
                    }
                  }}
                  className={`dino-template-card relative p-5 rounded-xl border-2 transition-all ${
                    isSelected
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
        <div
          className={`relative p-5 rounded-xl border-2 transition-all flex flex-col items-center justify-center text-center ${
            customLogo
              ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200'
              : isDragging
              ? 'border-purple-400 bg-purple-50'
              : 'border-dashed border-gray-300 bg-gray-50 hover:border-purple-300'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
          />
          {customLogo ? (
            <>
              <div className="bg-white rounded-xl border border-purple-200 p-3 mb-3 w-full">
                <img src={customLogo} alt="Custom center" className="w-full h-24 object-contain" />
              </div>
              <p className="text-sm font-semibold text-gray-800">Custom Logo</p>
              <div className="flex gap-2 mt-3 flex-wrap justify-center">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow hover:from-purple-600 hover:to-pink-600"
                >
                  Change
                </button>
                <button
                  onClick={() => {
                    onRemoveLogo()
                    if (fileInputRef.current) fileInputRef.current.value = ''
                  }}
                  className="px-3 py-1.5 text-xs font-semibold rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  Remove
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="text-4xl mb-2">📤</div>
              <p className="font-semibold text-gray-800">Custom Logo/Image</p>
              <p className="text-xs text-gray-500 mt-1">Click to upload or drop (PNG/JPG/SVG/GIF up to 5MB)</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-3 px-4 py-2 text-sm font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow hover:from-purple-600 hover:to-pink-600"
              >
                Upload
              </button>
            </>
          )}
        </div>
      </div>
      <div className="mt-5 flex items-start gap-2 text-xs text-gray-500 bg-purple-50 p-3 rounded-lg border border-purple-100">
        <span className="text-base">💡</span>
        <span>Each dinosaur has unique shapes integrated into the QR code pattern!</span>
      </div>
    </div>
  )
}

export default DinoTemplateSelector

