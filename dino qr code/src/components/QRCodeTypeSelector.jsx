import { useState } from 'react'
import LocationPicker from './LocationPicker'

const QR_CODE_TYPES = [
  { id: 'url', name: 'Website/URL', icon: '🌐', placeholder: 'https://example.com', description: 'Create QR code for website or any URL' },
  { id: 'whatsapp', name: 'WhatsApp', icon: '💬', placeholder: '+1234567890', description: 'Create QR code for WhatsApp chat or message' },
  { id: 'social-media', name: 'Social Media', icon: '📱', placeholder: 'Select platform and enter URL', description: 'Create QR code for social media profiles' },
  { id: 'location', name: 'Location', icon: '📍', placeholder: 'Latitude, Longitude (e.g., 40.7128, -74.0060)', description: 'Create QR code for GPS location or address' },
  { id: 'google-forms', name: 'Google Forms', icon: '📝', placeholder: 'https://forms.gle/...', description: 'Create QR code for Google Forms' },
  { id: 'business-card', name: 'Business Card', icon: '👤', placeholder: 'Enter contact details', description: 'Create QR code for business card (vCard)' },
  { id: 'text', name: 'Plain Text', icon: '📄', placeholder: 'Enter any text...', description: 'Create QR code for plain text or message' },
]

// Social Media Icons as SVG Components
const InstagramIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

const FacebookIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const TwitterIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const LinkedInIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const TikTokIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
  </svg>
)

const YouTubeIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
)

const PinterestIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.346-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.987C23.97 5.39 18.565.026 11.99.017L12.017 0z"/>
  </svg>
)

const SnapchatIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.15.031.33c.014.149.037.297.058.445.099.697.209 1.463.206 2.014 0 .746-.166 1.269-.388 1.662a2.976 2.976 0 01-1.433 1.144c-.338.138-.818.23-1.459.36-.095.019-.195.04-.297.065-.622.146-1.306.31-1.826.61-.432.248-.676.509-.676.747 0 .434.412.829.971.947.462.098 1.012.144 1.634.144.746 0 1.455-.09 1.922-.134.138-.013.27-.02.393-.02.746 0 1.18.186 1.695.561.391.287.771.673 1.412.673.777 0 1.287-.41 1.287-1.072 0-.684-.564-1.398-1.287-1.398-.169 0-.348.02-.537.046-.271.039-.558.085-.855.12-.33.04-.68.077-1.036.077-.884 0-1.484-.12-1.884-.243a.687.687 0 01-.454-.672c0-.384.279-.734.582-.981.541-.44 1.347-.633 2.096-.761l.109-.02.106-.016c.57-.09 1.088-.175 1.532-.346.28-.107.495-.233.615-.391.143-.187.167-.376.167-.554 0-.468-.167-1.219-.348-1.899-.058-.216-.115-.427-.166-.628l-.02-.08c-.046-.19-.09-.369-.126-.529-.173-.766-.358-1.57-.766-2.155C17.755 2.14 15.678 2.14 12.206 2.14 8.734 2.14 6.657 2.14 5.544 3.685c-.408.585-.593 1.389-.766 2.155-.036.16-.08.339-.126.529l-.02.08c-.051.2-.108.412-.166.628-.181.68-.348 1.43-.348 1.899 0 .178.024.367.167.554.12.158.335.284.615.391.444.171.962.256 1.532.346l.106.016.109.02c.749.128 1.555.322 2.096.761.303.247.582.597.582.981 0 .312-.184.585-.454.672-.4.123-1 .243-1.884.243-.356 0-.706-.037-1.036-.077-.297-.035-.584-.081-.855-.12-.189-.026-.368-.046-.537-.046-.723 0-1.287.714-1.287 1.398 0 .662.51 1.072 1.287 1.072.641 0 1.021-.386 1.412-.673.515-.375.949-.561 1.695-.561.123 0 .255.007.393.02.467.044 1.176.134 1.922.134.622 0 1.172-.046 1.634-.144.559-.118.971-.513.971-.947 0-.238-.244-.499-.676-.747-.52-.3-1.204-.464-1.826-.61-.102-.025-.202-.046-.297-.065-.641-.13-1.121-.222-1.459-.36a2.976 2.976 0 01-1.433-1.144c-.222-.393-.388-.916-.388-1.662 0-.551.107-1.317.206-2.014.021-.148.044-.296.058-.445l.031-.33-.003-.15c-.104-1.628-.23-3.654.299-4.847C7.859 1.069 11.216.793 12.206.793"/>
  </svg>
)

const SOCIAL_MEDIA_PLATFORMS = [
  { id: 'instagram', name: 'Instagram', icon: InstagramIcon, placeholder: '@username or https://instagram.com/username', baseUrl: 'https://instagram.com/', color: '#E4405F' },
  { id: 'facebook', name: 'Facebook', icon: FacebookIcon, placeholder: '@username or Profile/Page URL', baseUrl: 'https://facebook.com/', color: '#1877F2' },
  { id: 'twitter', name: 'Twitter/X', icon: TwitterIcon, placeholder: '@username or https://twitter.com/username', baseUrl: 'https://twitter.com/', color: '#000000' },
  { id: 'linkedin', name: 'LinkedIn', icon: LinkedInIcon, placeholder: 'Profile URL or Company Page', baseUrl: 'https://linkedin.com/in/', color: '#0A66C2' },
  { id: 'tiktok', name: 'TikTok', icon: TikTokIcon, placeholder: '@username or https://tiktok.com/@username', baseUrl: 'https://tiktok.com/@', color: '#000000' },
  { id: 'youtube', name: 'YouTube', icon: YouTubeIcon, placeholder: '@username (channel) or video/channel URL', baseUrl: 'https://youtube.com/', color: '#FF0000' },
  { id: 'pinterest', name: 'Pinterest', icon: PinterestIcon, placeholder: 'Profile URL or Board URL', baseUrl: 'https://pinterest.com/', color: '#BD081C' },
  { id: 'snapchat', name: 'Snapchat', icon: SnapchatIcon, placeholder: '@username', baseUrl: 'https://snapchat.com/add/', color: '#FFFC00' },
]

const QRCodeTypeSelector = ({ selectedType, onTypeChange, onInputGenerate }) => {
  const [customInputs, setCustomInputs] = useState({
    whatsapp: { phone: '', message: '' },
    location: { lat: '', lng: '', address: '' },
    'business-card': { name: '', phone: '', email: '', company: '', title: '' },
    'social-media': { platform: 'instagram', url: '' }
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

  const formatSocialMediaURL = (platform, url) => {
    if (!url || !url.trim()) return ''
    
    const urlTrimmed = url.trim()
    const selectedPlatform = SOCIAL_MEDIA_PLATFORMS.find(p => p.id === platform)
    
    if (!selectedPlatform) return urlTrimmed
    
    // If it's already a full URL, return it as-is
    if (urlTrimmed.startsWith('http://') || urlTrimmed.startsWith('https://')) {
      return urlTrimmed
    }
    
    // Handle usernames (remove @ if present)
    let username = urlTrimmed.replace(/^@/, '').replace(/\s+/g, '')
    
    // For Snapchat, use the add URL format
    if (platform === 'snapchat') {
      return `${selectedPlatform.baseUrl}${username}`
    }
    
    // For TikTok, ensure @ is in the URL
    if (platform === 'tiktok') {
      const tiktokUsername = username.startsWith('@') ? username : `@${username}`
      return `${selectedPlatform.baseUrl.replace('@', '')}${tiktokUsername}`
    }
    
    // For Facebook, handle username or profile/page URL
    if (platform === 'facebook') {
      // If it looks like a username (no slashes, no dots after @ removal)
      if (!urlTrimmed.includes('/') && !urlTrimmed.includes('.')) {
        return `https://facebook.com/${username}`
      }
      // Otherwise, treat as URL
      return `https://facebook.com/${username}`
    }
    
    // For YouTube, auto-detect: username = channel, URL = use as-is (could be channel or video)
    if (platform === 'youtube') {
      // If it looks like a username (no http, no slashes, no dots), format as channel
      if (!urlTrimmed.includes('/') && !urlTrimmed.includes('.') && !urlTrimmed.includes('http')) {
        return `https://youtube.com/@${username}`
      }
      // If it's a URL-like string but missing protocol, add https
      if (urlTrimmed.includes('youtube.com') || urlTrimmed.includes('youtu.be')) {
        return `https://${urlTrimmed}`
      }
      // Otherwise, treat as username and format as channel
      return `https://youtube.com/@${username}`
    }
    
    // For other platforms, construct the URL
    return `${selectedPlatform.baseUrl}${username}`
  }

  const handleTypeSelect = (type) => {
    onTypeChange(type)
    // Reset input based on type
    if (type.id === 'whatsapp') {
      setCustomInputs(prev => ({ ...prev, whatsapp: { phone: '', message: '' } }))
    } else if (type.id === 'location') {
      setCustomInputs(prev => ({ ...prev, location: { lat: '', lng: '', address: '' } }))
    } else if (type.id === 'social-media') {
      setCustomInputs(prev => ({ ...prev, 'social-media': { platform: 'instagram', url: '' } }))
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
      case 'social-media':
        if (customInputs['social-media'].url) {
          generatedValue = formatSocialMediaURL(
            customInputs['social-media'].platform, 
            customInputs['social-media'].url
          )
        }
        break
      default:
        return
    }
    
    if (generatedValue) {
      onInputGenerate(generatedValue)
    }
  }

  return (
    <div className="space-y-4">
      {/* Type Selector */}
      <div>
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {QR_CODE_TYPES.map((type) => (
            <button
              key={type.id}
              onClick={() => handleTypeSelect(type)}
              className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 text-center hover:scale-105 active:scale-95 min-h-[75px] sm:min-h-[85px] touch-manipulation ${
                selectedType.id === type.id
                  ? 'border-blue-500 bg-blue-50 shadow-lg ring-2 ring-blue-200 scale-105'
                  : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
              }`}
              title={type.description}
            >
              <div className="text-2xl sm:text-3xl mb-2">{type.icon}</div>
              <div className="text-xs sm:text-sm font-medium text-gray-700 leading-tight">
                {type.name}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Input Forms */}
      {selectedType.id === 'whatsapp' && (
        <div className="space-y-4 p-4 sm:p-5 bg-blue-50 rounded-xl border-2 border-blue-200">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
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
              className="w-full px-4 py-3 text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
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
              className="w-full px-4 py-3 text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
          <button
            onClick={handleGenerate}
            disabled={!customInputs.whatsapp.phone}
            className="w-full px-4 py-3 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Generate WhatsApp QR Code
          </button>
        </div>
      )}

      {selectedType.id === 'location' && (
        <div className="space-y-3 sm:space-y-4 p-3 sm:p-4 md:p-5 bg-green-50 rounded-lg sm:rounded-xl border-2 border-green-200">
          <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2 sm:mb-3">
            Select Location on Map
          </label>
          <LocationPicker
            onLocationSelect={(locationData) => {
              setCustomInputs(prev => ({
                ...prev,
                location: {
                  lat: locationData.lat,
                  lng: locationData.lng,
                  address: locationData.address || ''
                }
              }))
              // Auto-generate when location is selected
              if (locationData.lat && locationData.lng) {
                const generatedValue = locationData.address 
                  ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationData.address)}`
                  : `https://www.google.com/maps/search/?api=1&query=${locationData.lat},${locationData.lng}`
                onInputGenerate(generatedValue)
              }
            }}
            initialLat={customInputs.location.lat || null}
            initialLng={customInputs.location.lng || null}
          />
          <div className="pt-3 sm:pt-4 border-t-2 border-green-200">
            <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 font-medium">
              Or manually enter coordinates:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Latitude
                </label>
                <input
                  type="text"
                  value={customInputs.location.lat}
                  onChange={(e) => {
                    const newLocation = { ...customInputs.location, lat: e.target.value }
                    setCustomInputs(prev => ({ ...prev, location: newLocation }))
                    if (newLocation.lat && newLocation.lng) {
                      const generatedValue = newLocation.address
                        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(newLocation.address)}`
                        : `https://www.google.com/maps/search/?api=1&query=${newLocation.lat},${newLocation.lng}`
                      onInputGenerate(generatedValue)
                    }
                  }}
                  placeholder="40.7128"
                  className="w-full px-4 py-3 text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Longitude
                </label>
                <input
                  type="text"
                  value={customInputs.location.lng}
                  onChange={(e) => {
                    const newLocation = { ...customInputs.location, lng: e.target.value }
                    setCustomInputs(prev => ({ ...prev, location: newLocation }))
                    if (newLocation.lat && newLocation.lng) {
                      const generatedValue = newLocation.address
                        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(newLocation.address)}`
                        : `https://www.google.com/maps/search/?api=1&query=${newLocation.lat},${newLocation.lng}`
                      onInputGenerate(generatedValue)
                    }
                  }}
                  placeholder="-74.0060"
                  className="w-full px-4 py-3 text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedType.id === 'social-media' && (
        <div className="space-y-5 p-5 sm:p-6 bg-gradient-to-br from-pink-50/80 via-rose-50/80 to-purple-50/80 rounded-xl border-2 border-pink-200 shadow-sm">
          <div>
            <label className="block text-base sm:text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
              <span className="text-xl">📱</span>
              <span>Select Social Media Platform</span>
            </label>
            <div className="grid grid-cols-4 gap-3 sm:gap-4">
              {SOCIAL_MEDIA_PLATFORMS.map((platform) => {
                const isSelected = customInputs['social-media'].platform === platform.id
                const IconComponent = platform.icon
                return (
                  <button
                    key={platform.id}
                    onClick={() => {
                      const currentUrl = customInputs['social-media'].url
                      setCustomInputs(prev => ({
                        ...prev,
                        'social-media': { ...prev['social-media'], platform: platform.id }
                      }))
                      // Auto-generate if URL already exists
                      if (currentUrl.trim()) {
                        setTimeout(() => {
                          const generatedValue = formatSocialMediaURL(platform.id, currentUrl)
                          if (generatedValue) {
                            onInputGenerate(generatedValue)
                          }
                        }, 0)
                      }
                    }}
                    className={`group relative p-4 sm:p-5 rounded-xl border-2 transition-all duration-300 hover:scale-105 active:scale-95 flex flex-col items-center justify-center min-h-[95px] sm:min-h-[110px] overflow-hidden ${
                      isSelected
                        ? 'border-pink-500 bg-gradient-to-br from-white to-pink-50 shadow-xl ring-2 ring-pink-400 scale-105'
                        : 'border-gray-200 bg-white hover:border-pink-300 hover:shadow-lg hover:bg-gradient-to-br hover:from-gray-50 hover:to-pink-50/30'
                    }`}
                    title={platform.name}
                  >
                    {/* Selected indicator with animation */}
                    {isSelected && (
                      <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-xl z-10 animate-pulse">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                    
                    {/* Background glow effect for selected */}
                    {isSelected && (
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-100/50 to-rose-100/50 rounded-xl blur-sm -z-0"></div>
                    )}
                    
                    {/* Icon with better styling and hover effect */}
                    <div 
                      className={`relative mb-3 flex items-center justify-center transition-all duration-300 z-10 ${
                        isSelected ? 'scale-110' : 'group-hover:scale-110'
                      }`}
                      style={{ 
                        color: isSelected ? platform.color : platform.color,
                        filter: isSelected ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' : 'none'
                      }}
                    >
                      <IconComponent className="w-9 h-9 sm:w-10 sm:h-10" />
                    </div>
                    
                    {/* Platform name with better styling */}
                    <div className={`relative text-[11px] sm:text-xs font-bold leading-tight text-center z-10 ${
                      isSelected 
                        ? 'text-pink-700' 
                        : 'text-gray-700 group-hover:text-gray-900'
                    }`}>
                      {platform.name}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {SOCIAL_MEDIA_PLATFORMS.find(p => p.id === customInputs['social-media'].platform)?.name} URL or Username
            </label>
            <input
              type="text"
              value={customInputs['social-media'].url}
              onChange={(e) => {
                const newUrl = e.target.value
                const currentPlatform = customInputs['social-media'].platform
                setCustomInputs(prev => ({
                  ...prev,
                  'social-media': { ...prev['social-media'], url: newUrl }
                }))
                // Auto-generate when URL is entered
                if (newUrl.trim()) {
                  const generatedValue = formatSocialMediaURL(currentPlatform, newUrl)
                  if (generatedValue) {
                    onInputGenerate(generatedValue)
                  }
                }
              }}
              onBlur={() => {
                // Generate on blur as well to ensure final URL is formatted
                if (customInputs['social-media'].url.trim()) {
                  handleGenerate()
                }
              }}
              placeholder={SOCIAL_MEDIA_PLATFORMS.find(p => p.id === customInputs['social-media'].platform)?.placeholder}
              className="w-full px-4 py-3 text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all"
            />
            <p className="text-xs text-gray-500 mt-1.5">
              {customInputs['social-media'].platform === 'youtube'
                ? 'Enter username (e.g., @username) for channel, or full URL for channel/video'
                : customInputs['social-media'].platform === 'facebook'
                ? 'Enter username (e.g., @username) or full profile/page URL'
                : 'Enter full URL or just username (e.g., @username or username)'
              }
            </p>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!customInputs['social-media'].url}
            className="w-full px-4 py-3 text-sm font-semibold bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-lg hover:from-pink-700 hover:to-rose-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Generate {SOCIAL_MEDIA_PLATFORMS.find(p => p.id === customInputs['social-media'].platform)?.name} QR Code
          </button>
        </div>
      )}

      {selectedType.id === 'business-card' && (
        <div className="space-y-4 p-4 sm:p-5 bg-purple-50 rounded-xl border-2 border-purple-200">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
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
              className="w-full px-4 py-3 text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                className="w-full px-4 py-3 text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                className="w-full px-4 py-3 text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                className="w-full px-4 py-3 text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                className="w-full px-4 py-3 text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              />
            </div>
          </div>
          <button
            onClick={handleGenerate}
            disabled={!customInputs['business-card'].name}
            className="w-full px-4 py-3 text-sm font-semibold bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
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

