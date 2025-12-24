import { useState } from 'react'
import LocationPicker from './LocationPicker'

// SVG Icon Components for QR Code Types
const WhatsAppIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
)

const SocialMediaIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)

const LocationIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)

const GoogleFormsIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <line x1="3" y1="9" x2="21" y2="9"/>
    <line x1="9" y1="3" x2="9" y2="21"/>
    <circle cx="6" cy="6" r="1" fill="currentColor"/>
    <circle cx="12" cy="6" r="1" fill="currentColor"/>
    <circle cx="18" cy="6" r="1" fill="currentColor"/>
    <line x1="6" y1="12" x2="18" y2="12"/>
    <line x1="6" y1="15" x2="18" y2="15"/>
    <line x1="6" y1="18" x2="18" y2="18"/>
  </svg>
)

const WebsiteIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
)

const BusinessCardIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="16" rx="2"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
    <line x1="7" y1="15" x2="7.01" y2="15"/>
    <line x1="11" y1="15" x2="13" y2="15"/>
  </svg>
)

const TextIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 7 4 4 20 4 20 7"/>
    <line x1="9" y1="20" x2="15" y2="20"/>
    <line x1="12" y1="4" x2="12" y2="20"/>
  </svg>
)

const QR_CODE_TYPES = [
  { id: 'url', name: 'Website/URL', icon: WebsiteIcon, placeholder: 'https://example.com', description: 'Create QR code for website or any URL' },
  { id: 'whatsapp', name: 'WhatsApp', icon: WhatsAppIcon, placeholder: '+1234567890', description: 'Create QR code for WhatsApp chat or message' },
  { id: 'social-media', name: 'Social Media', icon: SocialMediaIcon, placeholder: 'Select platform and enter URL', description: 'Create QR code for social media profiles' },
  { id: 'location', name: 'Location', icon: LocationIcon, placeholder: 'Latitude, Longitude (e.g., 40.7128, -74.0060)', description: 'Create QR code for GPS location or address' },
  { id: 'google-forms', name: 'Google Forms', icon: GoogleFormsIcon, placeholder: 'https://forms.gle/...', description: 'Create QR code for Google Forms' },
  { id: 'business-card', name: 'Business Card', icon: BusinessCardIcon, placeholder: 'Enter contact details', description: 'Create QR code for business card (vCard)' },
  { id: 'text', name: 'Plain Text', icon: TextIcon, placeholder: 'Enter any text...', description: 'Create QR code for plain text or message' },
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
  <img 
    src="/tool/dino-qr-code-generator/snapchat-logo.png" 
    alt="Snapchat" 
    className={className}
    style={{ objectFit: 'contain' }}
  />
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
          {QR_CODE_TYPES.map((type) => {
            const IconComponent = type.icon
            return (
            <button
              key={type.id}
              onClick={() => handleTypeSelect(type)}
                className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 text-center hover:scale-105 active:scale-95 min-h-[75px] sm:min-h-[85px] touch-manipulation flex flex-col items-center justify-center ${
                selectedType.id === type.id
                    ? 'border-blue-500 bg-blue-50 shadow-lg ring-2 ring-blue-200 scale-105'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
              }`}
              title={type.description}
            >
                <div className={`mb-2 transition-colors duration-300 ${
                  selectedType.id === type.id 
                    ? 'text-blue-600' 
                    : 'text-gray-600'
                }`}>
                  <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 transition-transform duration-300" />
                </div>
                <div className={`text-xs sm:text-sm font-medium leading-tight ${
                  selectedType.id === type.id
                    ? 'text-blue-700'
                    : 'text-gray-700'
                }`}>
                {type.name}
              </div>
            </button>
            )
          })}
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

