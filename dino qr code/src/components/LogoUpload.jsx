import { useState, useRef } from 'react'

const LogoUpload = ({ onLogoUpload, currentLogo, onRemoveLogo }) => {
  const [preview, setPreview] = useState(currentLogo || null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileSelect = (file) => {
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, SVG, etc.)')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const imageUrl = e.target.result
      setPreview(imageUrl)
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

  const handleRemove = () => {
    setPreview(null)
    onRemoveLogo()
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="card-enhanced p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-2xl">🎨</span>
        <span className="gradient-text">Custom Logo/Image</span>
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Upload your brand logo or image to use in the center of your QR code instead of dinosaur templates.
      </p>

      {preview ? (
        <div className="space-y-4">
          <div className="relative inline-block mx-auto">
            <div className="bg-white p-4 rounded-xl shadow-lg border-2 border-purple-200">
              <img
                src={preview}
                alt="Logo preview"
                className="max-w-full h-auto max-h-32 object-contain rounded-lg"
              />
            </div>
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:scale-105"
            >
              Change Logo
            </button>
            <button
              onClick={handleRemove}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all shadow-lg hover:scale-105"
            >
              Remove Logo
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
            isDragging
              ? 'border-purple-500 bg-purple-50 scale-105'
              : 'border-gray-300 bg-gray-50 hover:border-purple-400 hover:bg-purple-50'
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
          <div className="space-y-4">
            <div className="text-6xl mb-4">📤</div>
            <p className="text-lg font-semibold text-gray-700">
              Drag & drop your logo here
            </p>
            <p className="text-sm text-gray-500">or</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:scale-105"
            >
              Browse Files
            </button>
            <p className="text-xs text-gray-400 mt-4">
              Supported: PNG, JPG, SVG, GIF (Max 5MB)
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default LogoUpload

