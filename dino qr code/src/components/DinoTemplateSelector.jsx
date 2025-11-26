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
    <div className="space-y-3">
      {/* Template Selection - Compact Small Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {templates.map((template) => {
          const isSelected = selectedTemplate.id === template.id && !customLogo
          return (
            <button
              key={template.id}
              onClick={() => {
                onSelectTemplate(template)
                // Keep logo when switching templates - don't clear it
              }}
              className={`relative p-2 sm:p-2.5 rounded-md border-2 transition-all duration-200 hover:scale-105 min-h-[70px] flex flex-col items-center justify-center ${
                isSelected
                  ? template.isSimple
                    ? 'border-gray-500 bg-gradient-to-br ' + template.color + ' shadow-lg ring-2 ring-gray-300 dark:ring-gray-700 scale-105'
                    : 'border-purple-500 bg-gradient-to-br ' + template.color + ' shadow-lg ring-2 ring-purple-200 dark:ring-purple-900/30 scale-105'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-md'
              }`}
            >
              <div className={`text-2xl sm:text-2xl mb-1 transition-transform duration-200 ${isSelected ? 'scale-110' : ''}`}>
                {template.emoji}
              </div>
              <div className={`text-[10px] font-bold leading-tight text-center ${
                isSelected ? 'text-white' : 'text-gray-700 dark:text-gray-300'
              }`}>
                {template.name}
              </div>
              {isSelected && (
                <div className="absolute -top-1.5 -right-1.5">
                  <div className={`rounded-full w-5 h-5 flex items-center justify-center shadow-md ${
                    template.isSimple ? 'bg-gray-600' : 'bg-purple-600'
                  }`}>
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              )}
            </button>
          )
        })}
        
        {/* Custom Logo Upload - Compact */}
        <div
          className={`relative rounded-md border-2 transition-all duration-200 flex flex-col items-center justify-center text-center min-h-[70px] ${
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
            <div className="w-full p-2 space-y-1.5">
              <div className="bg-white dark:bg-gray-900 rounded border border-purple-200 dark:border-purple-800 p-1.5">
                <img src={customLogo} alt="Custom logo" className="w-full h-12 object-contain" />
              </div>
              <p className="text-[10px] font-bold text-gray-800 dark:text-gray-200">Logo</p>
              <div className="flex gap-1 justify-center">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2 py-1 text-[10px] font-semibold rounded bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                >
                  Change
                </button>
                <button
                  onClick={() => {
                    onRemoveLogo()
                    if (fileInputRef.current) fileInputRef.current.value = ''
                  }}
                  className="px-2 py-1 text-[10px] font-semibold rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full p-2 space-y-1">
              <div className="text-2xl mb-0.5">📤</div>
              <p className="text-[10px] font-bold text-gray-800 dark:text-gray-200 leading-tight">Upload<br/>Logo</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-1 px-2 py-1 text-[10px] font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded shadow-sm hover:shadow-md transition-all duration-200"
              >
                Upload
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Info Tip - Compact */}
      <p className="text-[10px] text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
        <span>💡</span>
        <span>Choose Simple for plain QR, or pick a dino template with unique shapes</span>
      </p>
    </div>
  )
}

export default DinoTemplateSelector
