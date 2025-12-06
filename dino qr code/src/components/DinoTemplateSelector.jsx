import { useRef, useState, useEffect } from 'react'

const DinoTemplateSelector = ({ templates, selectedTemplate, onSelectTemplate, customLogo, onLogoUpload, onRemoveLogo }) => {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  // Reset file input whenever logo is cleared (when switching templates or removing logo)
  useEffect(() => {
    if (!customLogo && fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [customLogo])

  const handleFileSelect = (file) => {
    if (!file) return
    if (!file.type?.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, SVG, etc.)')
      if (fileInputRef.current) fileInputRef.current.value = ''
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB')
      if (fileInputRef.current) fileInputRef.current.value = ''
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      const imageUrl = e.target.result
      onLogoUpload(imageUrl, file)
      // Reset the input value after successful upload so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
    reader.onerror = () => {
      alert('Error reading file. Please try again.')
      if (fileInputRef.current) fileInputRef.current.value = ''
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
    <div className="space-y-4">
      {/* Template Selection - Improved Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4">
        {templates.map((template) => {
          const isSelected = selectedTemplate.id === template.id && !customLogo
          return (
            <button
              key={template.id}
              onClick={() => {
                onSelectTemplate(template)
                // Keep logo when switching templates - don't clear it
              }}
              className={`relative p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 active:scale-95 min-h-[80px] sm:min-h-[90px] flex flex-col items-center justify-center touch-manipulation ${
                isSelected
                  ? template.isSimple
                    ? 'border-gray-500 bg-gradient-to-br ' + template.color + ' shadow-lg ring-2 ring-gray-300 dark:ring-gray-700 scale-105'
                    : 'border-purple-500 bg-gradient-to-br ' + template.color + ' shadow-lg ring-2 ring-purple-200 dark:ring-purple-900/30 scale-105'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-md'
              }`}
            >
              <div className={`text-3xl sm:text-3xl mb-1.5 transition-transform duration-200 ${isSelected ? 'scale-110' : ''}`}>
                {template.emoji}
              </div>
              <div className={`text-xs sm:text-sm font-bold leading-tight text-center ${
                isSelected ? 'text-white' : 'text-gray-700 dark:text-gray-300'
              }`}>
                {template.name}
              </div>
              {isSelected && (
                <div className="absolute -top-2 -right-2">
                  <div className={`rounded-full w-6 h-6 flex items-center justify-center shadow-lg ${
                    template.isSimple ? 'bg-gray-600' : 'bg-purple-600'
                  }`}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              )}
            </button>
          )
        })}
        
        {/* Custom Logo Upload */}
        <div
          className={`relative rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center text-center min-h-[80px] sm:min-h-[90px] touch-manipulation ${
            customLogo
              ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 ring-2 ring-purple-200 dark:ring-purple-900/30'
              : isDragging
              ? 'border-purple-400 bg-purple-50 dark:bg-purple-900/20 scale-105'
              : 'border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 hover:border-purple-300 dark:hover:border-purple-600 hover:bg-purple-50/50 dark:hover:bg-purple-900/10'
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
            <div className="w-full p-3 space-y-2">
              <div className="bg-white dark:bg-gray-900 rounded-lg border border-purple-200 dark:border-purple-800 p-2">
                <img src={customLogo} alt="Custom logo" className="w-full h-14 object-contain" />
              </div>
              <p className="text-xs font-bold text-gray-800 dark:text-gray-200">Logo</p>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => {
                    if (fileInputRef.current) {
                      fileInputRef.current.value = '' // Reset input to allow same file selection
                      fileInputRef.current.click()
                    }
                  }}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                >
                  Change
                </button>
                <button
                  onClick={() => {
                    onRemoveLogo()
                    if (fileInputRef.current) fileInputRef.current.value = ''
                  }}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full p-3 space-y-2">
              <div className="text-3xl mb-1">📤</div>
              <p className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200 leading-tight">Upload<br/>Logo</p>
              <button
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '' // Reset input to allow same file selection
                    fileInputRef.current.click()
                  }
                }}
                className="mt-1 px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
              >
                Upload
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Info Tip */}
      <p className="text-xs sm:text-sm text-purple-600 dark:text-purple-400 flex items-start gap-2 leading-relaxed">
        <span className="text-base">💡</span>
        <span>Choose Simple for plain QR, or pick a dino template with unique shapes</span>
      </p>
    </div>
  )
}

export default DinoTemplateSelector
