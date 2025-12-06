import { useState } from 'react'

const QR_CODE_TYPES = [
  { id: 'url', name: 'Website/URL', icon: '🌐', placeholder: 'https://example.com', description: 'Create QR code for website or any URL' },
  { id: 'whatsapp', name: 'WhatsApp', icon: '💬', placeholder: '+1234567890', description: 'Create QR code for WhatsApp chat or message' },
  { id: 'location', name: 'Location', icon: '📍', placeholder: 'Latitude, Longitude (e.g., 40.7128, -74.0060)', description: 'Create QR code for GPS location or address' },
  { id: 'google-forms', name: 'Google Forms', icon: '📝', placeholder: 'https://forms.gle/...', description: 'Create QR code for Google Forms' },
  { id: 'business-card', name: 'Business Card', icon: '👤', placeholder: 'Enter contact details', description: 'Create QR code for business card (vCard)' },
  { id: 'text', name: 'Plain Text', icon: '📄', placeholder: 'Enter any text...', description: 'Create QR code for plain text or message' },
]

const QRCodeTypeSelector = ({ selectedType, onTypeChange, onInputGenerate }) => {
  const [customInputs, setCustomInputs] = useState({
    whatsapp: { phone: '', message: '' },
    location: { lat: '', lng: '', address: '' },
    'business-card': { name: '', phone: '', email: '', company: '', title: '' }
  })

  const formatWhatsAppURL = (phone, message = '') => {
    const cleanPhone = phone.replace(/\D/g, '')
    const encodedMessage = message ? `&text=${encodeURIComponent(message)}` : ''
    return `https://wa.me/${cleanPhone}${encodedMessage}`
  }

  const formatLocationURL = (lat, lng, address = '') => {
    if (address.trim()) {
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
    }
    if (lat && lng) {
      return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
    }
    return `geo:${lat},${lng}`
  }

  const formatBusinessCard = (data) => {
    const vCard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${data.name || 'Name'}`,
      data.title ? `TITLE:${data.title}` : '',
      data.company ? `ORG:${data.company}` : '',
      data.phone ? `TEL:${data.phone}` : '',
      data.email ? `EMAIL:${data.email}` : '',
      'END:VCARD'
    ].filter(line => line).join('\n')
    return vCard
  }

  const handleTypeSelect = (type) => {
    onTypeChange(type)
    // Reset input based on type
    if (type.id === 'whatsapp') {
      setCustomInputs(prev => ({ ...prev, whatsapp: { phone: '', message: '' } }))
    } else if (type.id === 'location') {
      setCustomInputs(prev => ({ ...prev, location: { lat: '', lng: '', address: '' } }))
    }
  }

  const handleGenerate = () => {
    let generatedValue = ''
    
    switch (selectedType.id) {
      case 'whatsapp':
        if (customInputs.whatsapp.phone) {
          generatedValue = formatWhatsAppURL(customInputs.whatsapp.phone, customInputs.whatsapp.message)
        }
        break
      case 'location':
        if (customInputs.location.lat && customInputs.location.lng) {
          generatedValue = formatLocationURL(customInputs.location.lat, customInputs.location.lng, customInputs.location.address)
        } else if (customInputs.location.address) {
          generatedValue = formatLocationURL('', '', customInputs.location.address)
        }
        break
      case 'business-card':
        generatedValue = formatBusinessCard(customInputs['business-card'])
        break
      default:
        return
    }
    
    if (generatedValue) {
      onInputGenerate(generatedValue)
    }
  }

  return (
    <div className="space-y-3">
      {/* Type Selector */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
          QR Code Type
        </label>
        <div className="grid grid-cols-3 gap-2">
          {QR_CODE_TYPES.map((type) => (
            <button
              key={type.id}
              onClick={() => handleTypeSelect(type)}
              className={`p-2.5 rounded-lg border-2 transition-all duration-200 text-center ${
                selectedType.id === type.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 shadow-md scale-105'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-sm'
              }`}
              title={type.description}
            >
              <div className="text-xl mb-1">{type.icon}</div>
              <div className="text-[10px] font-medium text-gray-700 dark:text-gray-300 leading-tight">
                {type.name}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Input Forms */}
      {selectedType.id === 'whatsapp' && (
        <div className="space-y-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={customInputs.whatsapp.phone}
              onChange={(e) => setCustomInputs(prev => ({
                ...prev,
                whatsapp: { ...prev.whatsapp, phone: e.target.value }
              }))}
              placeholder="+1234567890"
              className="w-full px-3 py-2 text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Message (Optional)
            </label>
            <input
              type="text"
              value={customInputs.whatsapp.message}
              onChange={(e) => setCustomInputs(prev => ({
                ...prev,
                whatsapp: { ...prev.whatsapp, message: e.target.value }
              }))}
              placeholder="Hello!"
              className="w-full px-3 py-2 text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleGenerate}
            disabled={!customInputs.whatsapp.phone}
            className="w-full px-3 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Generate WhatsApp QR Code
          </button>
        </div>
      )}

      {selectedType.id === 'location' && (
        <div className="space-y-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Latitude
              </label>
              <input
                type="text"
                value={customInputs.location.lat}
                onChange={(e) => setCustomInputs(prev => ({
                  ...prev,
                  location: { ...prev.location, lat: e.target.value }
                }))}
                placeholder="40.7128"
                className="w-full px-3 py-2 text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Longitude
              </label>
              <input
                type="text"
                value={customInputs.location.lng}
                onChange={(e) => setCustomInputs(prev => ({
                  ...prev,
                  location: { ...prev.location, lng: e.target.value }
                }))}
                placeholder="-74.0060"
                className="w-full px-3 py-2 text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Or Enter Address
            </label>
            <input
              type="text"
              value={customInputs.location.address}
              onChange={(e) => setCustomInputs(prev => ({
                ...prev,
                location: { ...prev.location, address: e.target.value }
              }))}
              placeholder="123 Main St, City, Country"
              className="w-full px-3 py-2 text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            onClick={handleGenerate}
            disabled={!(customInputs.location.lat && customInputs.location.lng) && !customInputs.location.address}
            className="w-full px-3 py-2 text-xs font-semibold bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Generate Location QR Code
          </button>
        </div>
      )}

      {selectedType.id === 'business-card' && (
        <div className="space-y-2 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={customInputs['business-card'].name}
              onChange={(e) => setCustomInputs(prev => ({
                ...prev,
                'business-card': { ...prev['business-card'], name: e.target.value }
              }))}
              placeholder="John Doe"
              className="w-full px-3 py-2 text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone
              </label>
              <input
                type="text"
                value={customInputs['business-card'].phone}
                onChange={(e) => setCustomInputs(prev => ({
                  ...prev,
                  'business-card': { ...prev['business-card'], phone: e.target.value }
                }))}
                placeholder="+1234567890"
                className="w-full px-3 py-2 text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                value={customInputs['business-card'].email}
                onChange={(e) => setCustomInputs(prev => ({
                  ...prev,
                  'business-card': { ...prev['business-card'], email: e.target.value }
                }))}
                placeholder="email@example.com"
                className="w-full px-3 py-2 text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Company
              </label>
              <input
                type="text"
                value={customInputs['business-card'].company}
                onChange={(e) => setCustomInputs(prev => ({
                  ...prev,
                  'business-card': { ...prev['business-card'], company: e.target.value }
                }))}
                placeholder="Company Name"
                className="w-full px-3 py-2 text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title
              </label>
              <input
                type="text"
                value={customInputs['business-card'].title}
                onChange={(e) => setCustomInputs(prev => ({
                  ...prev,
                  'business-card': { ...prev['business-card'], title: e.target.value }
                }))}
                placeholder="Job Title"
                className="w-full px-3 py-2 text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <button
            onClick={handleGenerate}
            disabled={!customInputs['business-card'].name}
            className="w-full px-3 py-2 text-xs font-semibold bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Generate Business Card QR Code
          </button>
        </div>
      )}
    </div>
  )
}

export default QRCodeTypeSelector
export { QR_CODE_TYPES }

