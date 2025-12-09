import { useState, useRef } from 'react'
import Header from './components/Header'
import LoadingAnimation from './components/LoadingAnimation'
import InputField from './components/InputField'
import QRCodeTypeSelector, { QR_CODE_TYPES } from './components/QRCodeTypeSelector'
import DinoTemplateSelector from './components/DinoTemplateSelector'
import ColorCustomizer from './components/ColorCustomizer'
import PreviewSection from './components/PreviewSection'
import DownloadShareButtons from './components/DownloadShareButtons'

const DINOSAUR_TEMPLATES = [
  { id: 'simple', name: 'Simple', emoji: '⬜', color: 'from-gray-400 to-gray-600', pattern: 'none', isSimple: true },
  { id: 'trex', name: 'T-Rex', emoji: '🦖', color: 'from-red-500 to-orange-600', pattern: 'roar' },
  { id: 'stegosaurus', name: 'Stegosaurus', emoji: '🦕', color: 'from-green-500 to-emerald-600', pattern: 'plates' },
]

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [inputValue, setInputValue] = useState('')
  const [selectedQRType, setSelectedQRType] = useState(QR_CODE_TYPES[0]) // URL is default
  const [selectedTemplate, setSelectedTemplate] = useState(DINOSAUR_TEMPLATES[0]) // Simple is now first
  const [customLogo, setCustomLogo] = useState(null)
  const [foregroundColor, setForegroundColor] = useState('#000000')
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF')
  const [scanText, setScanText] = useState('SCAN ME!')
  const [scanTextColor, setScanTextColor] = useState('#9333EA') // Default purple
  const backgroundPattern = 'none'
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [useCasesExpanded, setUseCasesExpanded] = useState(false)
  const [faqsExpanded, setFaqsExpanded] = useState(false)
  const qrRef = useRef(null)

  const handleLogoUpload = (logoUrl, file) => {
    setCustomLogo(logoUrl)
  }

  const handleRemoveLogo = () => {
    setCustomLogo(null)
  }

  const handleInputChange = (value) => {
    setInputValue(value)
    setError('')
    if (copied) setCopied(false)
  }

  const handleInputGenerate = (generatedValue) => {
    setInputValue(generatedValue)
    setError('')
  }

  const validateInput = () => {
    if (!inputValue.trim()) {
      setError('Please enter a URL or text')
      return false
    }
    setError('')
    return true
  }

  const handleCopyToClipboard = async () => {
    if (!validateInput()) return
    
    try {
      await navigator.clipboard.writeText(inputValue)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {isLoading && <LoadingAnimation onComplete={() => setIsLoading(false)} />}
      <Header />
      
      {/* Subtle background pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02]">
          <div className="absolute top-20 left-10 text-9xl animate-float">🦖</div>
          <div className="absolute top-40 right-20 text-8xl animate-float" style={{ animationDelay: '1s' }}>🦕</div>
          <div className="absolute bottom-20 left-1/4 text-7xl animate-float" style={{ animationDelay: '2s' }}>🦏</div>
        </div>
      </div>
      
      <div className={`relative pt-20 sm:pt-24 pb-16 px-4 sm:px-6 lg:px-8 transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Hero Section - Clean & Modern */}
          <section className="text-center mb-16 sm:mb-20 lg:mb-24 max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full blur-3xl opacity-40 animate-pulse"></div>
                <div className="relative bg-white rounded-3xl p-6 shadow-2xl border border-gray-200/50">
                  <span className="text-8xl sm:text-9xl">🦖</span>
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Dino QR Code Generator
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-700 font-medium mb-4">
              Free QR Code Generator No Sign Up - Instant & Fast
            </p>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-10">
              The best <strong className="text-blue-600">free QR code generator no sign up</strong> - generate QR codes instantly without registration! Create QR codes for <strong className="text-blue-600">location, WhatsApp, website, link, business card, and Google Forms</strong>. Make <strong className="text-purple-600">QR codes with dinosaur</strong> shapes and <strong className="text-pink-600">QR codes with logo</strong> in seconds. No signup, no waiting - just instant QR code generation with dinosaur themes, logo uploads, and custom colors.
            </p>

            {/* Quick Stats - Minimalist */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12">
              {[
                { icon: '⚡', label: 'Instant Generation', color: 'yellow' },
                { icon: '🚫', label: 'No Sign Up', color: 'green' },
                { icon: '✅', label: 'Fully Scannable', color: 'green' },
                { icon: '🦖', label: 'Dino Themes', color: 'purple' },
                { icon: '🏢', label: 'Logo Upload', color: 'blue' },
                { icon: '🆓', label: '100% Free', color: 'pink' },
              ].map((stat, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white/80 backdrop-blur-md rounded-full shadow-md border border-gray-200/60 hover:shadow-lg transition-all duration-200 hover:scale-105"
                >
                  <span className="text-lg">{stat.icon}</span>
                  <span className="text-sm font-medium text-gray-700">{stat.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Main Workspace - Premium Modern Layout */}
          <section id="workspace" className="mb-12 sm:mb-16">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 overflow-hidden backdrop-blur-sm">
              
              {/* Premium Header with Enhanced Step Indicator - Mobile Responsive */}
              <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-5 md:py-6 overflow-hidden">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGMwIDQuNDE4LTMuNTgyIDgtOCA4cy04LTMuNTgyLTgtOCAzLjU4Mi04IDgtOCA4IDMuNTgyIDggOHoiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjwvZz48L3N2Zz4=')]"></div>
                </div>
                
                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                  <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/30 flex-shrink-0">
                      <span className="text-lg sm:text-xl md:text-2xl">🦖</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight truncate sm:whitespace-normal">Create Your QR Code</h2>
                      <p className="text-xs sm:text-sm text-white/80 mt-0.5 hidden sm:block">Design & Generate in Seconds</p>
                    </div>
                  </div>
                  
                  {/* Enhanced Step Indicator - Mobile Optimized */}
                  <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 bg-white/10 backdrop-blur-md rounded-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 border border-white/20 w-full sm:w-auto justify-center sm:justify-end">
                    {[
                      { num: 1, label: 'Content', icon: '📝', active: inputValue.trim() },
                      { num: 2, label: 'Design', icon: '🎨', active: inputValue.trim() && (selectedTemplate.id !== 'simple' || customLogo) },
                      { num: 3, label: 'Download', icon: '📥', active: inputValue.trim() }
                    ].map((step, idx) => (
                      <div key={step.num} className="flex items-center">
                        <div className={`group relative flex items-center gap-1 sm:gap-2 transition-all duration-300 ${
                          step.active ? 'scale-105' : 'opacity-70'
                        }`}>
                          <div className={`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 shadow-lg ${
                            step.active
                              ? 'bg-white text-blue-600 scale-110 shadow-xl' 
                              : 'bg-white/30 text-white/80'
                          }`}>
                            {step.active ? (
                              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <span className="text-[10px] sm:text-xs">{step.num}</span>
                            )}
                          </div>
                          <span className={`hidden md:block text-[10px] sm:text-xs font-semibold transition-all whitespace-nowrap ${
                            step.active ? 'text-white' : 'text-white/70'
                          }`}>
                            {step.label}
                          </span>
                        </div>
                        {idx < 2 && (
                          <div className={`w-2 sm:w-3 md:w-4 h-0.5 mx-1 sm:mx-1.5 md:mx-2 lg:mx-3 rounded-full transition-all duration-300 ${
                            step.active ? 'bg-white' : 'bg-white/30'
                          }`}></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Workspace - Optimized Fast Layout - Mobile Responsive */}
              <div className="p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 bg-gradient-to-br from-gray-50/50 via-white to-blue-50/30">
                <div className="max-w-7xl mx-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-4 sm:gap-5 md:gap-6 lg:gap-8">
                    
                    {/* Left: All Controls - Modern Card Design */}
                    <div className="space-y-4 sm:space-y-5">
                      
                      {/* QR Code Type Selector - Premium Card */}
                      <div className="group relative bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 border border-blue-100/50 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative">
                          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg flex-shrink-0">
                              <span className="text-lg sm:text-xl">🌐</span>
                            </div>
                            <div className="min-w-0 flex-1">
                              <label className="block text-sm sm:text-base md:text-lg font-bold text-gray-800">
                                QR Code Type
                              </label>
                              <p className="text-xs text-gray-500 hidden sm:block">Choose your content type</p>
                            </div>
                          </div>
                          <QRCodeTypeSelector
                            selectedType={selectedQRType}
                            onTypeChange={setSelectedQRType}
                            onInputGenerate={handleInputGenerate}
                          />
                        </div>
                      </div>

                      {/* Input Section - Premium Card */}
                      <div className="group relative bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 border border-green-100/50 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 to-emerald-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative">
                          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg flex-shrink-0">
                              <span className="text-lg sm:text-xl">📝</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <label className="block text-sm sm:text-base md:text-lg font-bold text-gray-800 truncate">
                                {selectedQRType.id === 'whatsapp' || selectedQRType.id === 'location' || selectedQRType.id === 'business-card' || selectedQRType.id === 'social-media'
                                  ? 'Generated QR Code Content'
                                  : `Enter ${selectedQRType.name}`}
                              </label>
                              <p className="text-xs text-gray-500 hidden sm:block">Add your content or link</p>
                            </div>
                          </div>
                          <InputField 
                            value={inputValue} 
                            onChange={handleInputChange} 
                            error={error} 
                            onValidate={validateInput}
                            placeholder={selectedQRType.placeholder}
                          />
                          {selectedQRType.id !== 'whatsapp' && selectedQRType.id !== 'location' && selectedQRType.id !== 'business-card' && selectedQRType.id !== 'social-media' && (
                            <p className="text-xs sm:text-sm text-gray-500 mt-3 leading-relaxed flex items-start gap-2">
                              <span className="text-blue-500 mt-0.5">💡</span>
                              <span>{selectedQRType.description}</span>
                            </p>
                          )}
                        </div>
                      </div>
                      
                      {/* Template & Logo - Premium Card */}
                      <div className="group relative bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 border border-purple-100/50 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 to-pink-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative">
                          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg flex-shrink-0">
                              <span className="text-lg sm:text-xl">🦖</span>
                            </div>
                            <div className="min-w-0 flex-1">
                              <label className="block text-sm sm:text-base md:text-lg font-bold text-gray-800">
                                Choose Style or Upload Logo
                              </label>
                              <p className="text-xs text-gray-500 hidden sm:block">Customize your QR code design</p>
                            </div>
                          </div>
                          <DinoTemplateSelector
                            templates={DINOSAUR_TEMPLATES}
                            selectedTemplate={selectedTemplate}
                            customLogo={customLogo}
                            onLogoUpload={handleLogoUpload}
                            onRemoveLogo={handleRemoveLogo}
                            onSelectTemplate={(template) => {
                              setSelectedTemplate(template)
                              if (customLogo) {
                                setCustomLogo(null)
                              }
                            }}
                          />
                        </div>
                      </div>
                      
                      {/* Colors - Premium Card */}
                      <div className="group relative bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 border border-orange-100/50 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 to-amber-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative">
                          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg flex-shrink-0">
                              <span className="text-lg sm:text-xl">🎨</span>
                            </div>
                            <div className="min-w-0 flex-1">
                              <label className="block text-sm sm:text-base md:text-lg font-bold text-gray-800">
                                Customize Colors
                              </label>
                              <p className="text-xs text-gray-500 hidden sm:block">Match your brand colors</p>
                            </div>
                          </div>
                          <ColorCustomizer
                            foregroundColor={foregroundColor}
                            backgroundColor={backgroundColor}
                            onForegroundChange={setForegroundColor}
                            onBackgroundChange={setBackgroundColor}
                          />
                        </div>
                      </div>
                      
                      {/* Scan Text Customization - Premium Card */}
                      <div className="group relative bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 border border-indigo-100/50 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 to-violet-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative">
                          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg flex-shrink-0">
                              <span className="text-lg sm:text-xl">✏️</span>
                            </div>
                            <div className="min-w-0 flex-1">
                              <label className="block text-sm sm:text-base md:text-lg font-bold text-gray-800">
                                Customize Scan Text
                              </label>
                              <p className="text-xs text-gray-500 hidden sm:block">Add a call-to-action message</p>
                            </div>
                          </div>
                        <div className="space-y-4">
                          {/* Text Input */}
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Text Content
                            </label>
                            <input
                              type="text"
                              value={scanText}
                              onChange={(e) => setScanText(e.target.value.toUpperCase())}
                              placeholder="SCAN ME!"
                              maxLength={30}
                              className="w-full px-4 py-3 text-base bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-bold uppercase"
                            />
                            <p className="text-xs text-gray-500 mt-1.5">
                              Maximum 30 characters
                            </p>
                          </div>
                          
                          {/* Color Picker */}
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Text Color
                            </label>
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <input
                                  type="color"
                                  value={scanTextColor}
                                  onChange={(e) => setScanTextColor(e.target.value)}
                                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl cursor-pointer border-2 border-gray-300 bg-white shadow-sm hover:shadow-md transition-shadow"
                                />
                              </div>
                              <input
                                type="text"
                                value={scanTextColor}
                                onChange={(e) => setScanTextColor(e.target.value)}
                                className="flex-1 px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-mono text-sm text-gray-900"
                                placeholder="#9333EA"
                              />
                              <button
                                onClick={() => setScanTextColor('#9333EA')}
                                className="px-3 py-3 text-xs font-medium rounded-lg border-2 border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200"
                                title="Reset to default purple"
                              >
                                ↺ Reset
                              </button>
                            </div>
                            
                            {/* Preset Colors */}
                            <div className="mt-3">
                              <p className="text-xs font-medium text-gray-600 mb-2">Quick Colors:</p>
                              <div className="flex flex-wrap gap-2">
                                {[
                                  { name: 'Purple', value: '#9333EA' },
                                  { name: 'Blue', value: '#2563EB' },
                                  { name: 'Pink', value: '#EC4899' },
                                  { name: 'Green', value: '#10B981' },
                                  { name: 'Orange', value: '#F97316' },
                                  { name: 'Red', value: '#EF4444' },
                                  { name: 'Indigo', value: '#6366F1' },
                                  { name: 'Teal', value: '#14B8A6' },
                                ].map((color) => (
                                  <button
                                    key={color.value}
                                    onClick={() => setScanTextColor(color.value)}
                                    className={`w-10 h-10 rounded-lg border-2 transition-all duration-300 hover:scale-110 ${
                                      scanTextColor.toLowerCase() === color.value.toLowerCase()
                                        ? 'border-indigo-500 ring-4 ring-indigo-200 scale-110 shadow-lg'
                                        : 'border-gray-300 hover:border-indigo-300'
                                    }`}
                                    style={{ backgroundColor: color.value }}
                                    title={color.name}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Right: Premium Preview Panel - Mobile Responsive */}
                    <div className="lg:sticky lg:top-6 h-fit order-first lg:order-last">
                      <div className="relative bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-7 border border-gray-200/50 shadow-xl overflow-hidden">
                        {/* Animated Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-purple-50/10 to-pink-50/20 opacity-50"></div>
                        
                        <div className="relative z-10">
                          {/* Premium Preview Header - Mobile Responsive */}
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-5 md:mb-6 pb-3 sm:pb-4 border-b border-gray-200/50">
                            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                              <div className="relative flex-shrink-0">
                                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
                                <div className="absolute inset-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-ping opacity-75"></div>
                              </div>
                              <div className="min-w-0">
                                <span className="text-xs sm:text-sm font-bold text-gray-800 block">Live Preview</span>
                                <span className="text-[10px] sm:text-xs text-gray-500 hidden sm:block">Real-time updates</span>
                              </div>
                            </div>
                            {inputValue.trim() && (
                              <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full border border-purple-200/50 flex-shrink-0">
                                <span className="text-base sm:text-lg">{customLogo ? '🎨' : selectedTemplate.emoji}</span>
                                <span className="text-[10px] sm:text-xs font-semibold text-gray-700 whitespace-nowrap">
                                  {customLogo ? 'Custom Logo' : selectedTemplate.name}
                                </span>
                              </div>
                            )}
                          </div>
                        
                        {/* Preview */}
                        <PreviewSection
                          inputValue={inputValue}
                          selectedTemplate={selectedTemplate}
                          customLogo={customLogo}
                          foregroundColor={foregroundColor}
                          backgroundColor={backgroundColor}
                          backgroundPattern={backgroundPattern}
                          scanText={scanText}
                          scanTextColor={scanTextColor}
                          qrRef={qrRef}
                        />
                        
                          {/* Premium Download Section */}
                          {inputValue.trim() && (
                            <div className="mt-6 pt-6 border-t border-gray-200/50">
                              <div className="space-y-3">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-sm font-semibold text-gray-700">Ready to Download</span>
                                  <span className="text-xs text-gray-400">•</span>
                                  <span className="text-xs text-green-600 font-medium">✓ Fully Scannable</span>
                                </div>
                                <DownloadShareButtons
                                  qrRef={qrRef}
                                  inputValue={inputValue}
                                  selectedTemplate={selectedTemplate}
                                  backgroundPattern={backgroundPattern}
                                  backgroundColor={backgroundColor}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Blog Guide Banner - Creative & Eye-Catching */}
          <section className="mb-12 sm:mb-16">
            <a 
              href="https://theabubakronline.com/how-to-make-qr-code-with-logo.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group block relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* Animated Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-90 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGMwIDQuNDE4LTMuNTgyIDgtOCA4cy04LTMuNTgyLTgtOCAzLjU4Mi04IDgtOCA4IDMuNTgyIDggOHoiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjwvZz48L3N2Zz4=')] opacity-20 animate-pulse"></div>
              </div>
              
              {/* Floating Dinosaur Icons */}
              <div className="absolute top-4 right-4 text-6xl sm:text-7xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 animate-float">🦖</div>
              <div className="absolute bottom-4 left-4 text-5xl sm:text-6xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 animate-float" style={{ animationDelay: '1s' }}>🦕</div>
              
              {/* Content */}
              <div className="relative z-10 p-8 sm:p-12 lg:p-16 text-white">
                <div className="max-w-4xl mx-auto">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full mb-6 border border-white/30">
                    <span className="text-lg">📚</span>
                    <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider">Complete Guide</span>
                  </div>
                  
                  {/* Main Heading */}
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                    <span className="block mb-2">Learn How to Make</span>
                    <span className="block bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 bg-clip-text text-transparent">
                      QR Code with Logo
                    </span>
                    <span className="block text-2xl sm:text-3xl md:text-4xl mt-2 text-white/90 font-normal">
                      Free Step-by-Step Guide
                    </span>
                  </h2>
                  
                  {/* Description */}
                  <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl">
                    Master the art of creating professional QR codes with logos. Our comprehensive guide covers everything from basic setup to advanced branding techniques.
                  </p>
                  
                  {/* Features List */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                      <span className="text-2xl">📸</span>
                      <span className="text-sm sm:text-base font-medium">Step-by-Step Screenshots</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                      <span className="text-2xl">💡</span>
                      <span className="text-sm sm:text-base font-medium">Pro Tips & Best Practices</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                      <span className="text-2xl">✅</span>
                      <span className="text-sm sm:text-base font-medium">Complete FAQ Section</span>
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="inline-flex items-center gap-3 bg-white text-blue-600 font-bold py-4 px-8 rounded-xl shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
                      <span className="text-xl">📖</span>
                      <span className="text-base sm:text-lg">Read Complete Guide</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                    <div className="flex items-center gap-2 text-white/80 text-sm sm:text-base">
                      <span>⏱️</span>
                      <span>12 min read</span>
                      <span className="mx-2">•</span>
                      <span>🆓</span>
                      <span>100% Free</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Shine Effect on Hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            </a>
          </section>

          {/* Features Section - Clean Grid */}
          <section className="mb-16 sm:mb-20 lg:mb-24">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-4">
                <span className="text-base">⭐</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-700">Why Choose Us</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Why Choose Our Custom QR Code Generator
                </span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { 
                  icon: '⚡', 
                  title: 'Free QR Code Generator No Sign Up - Instant', 
                  desc: 'Our free QR code generator requires no sign up - generate QR codes instantly without registration, email, or account creation. Create QR codes as fast as you can type, with real-time preview and instant downloads. No signup, no waiting, just instant QR code generation!',
                  gradient: 'from-green-50 to-emerald-50',
                  border: 'border-green-200'
                },
                { 
                  icon: '⭐', 
                  title: 'Best JustFreeQR Alternative - Free QR Generator', 
                  desc: 'Looking for a justfreeqr alternative? Our free QR code generator no sign up offers everything justfreeqr does plus unique dinosaur themes, better logo placement, custom colors, and no redirects. The best justfreeqr alternative with more features!',
                  gradient: 'from-yellow-50 to-amber-50',
                  border: 'border-yellow-200'
                },
                { 
                  icon: '🦖', 
                  title: 'QR Code with Dinosaur Shapes', 
                  desc: 'Create unique QR code with dinosaur shapes integrated into the QR pattern. Our QR code dino generator makes fun, memorable QR codes perfect for themed projects!',
                  gradient: 'from-red-50 to-orange-50',
                  border: 'border-red-200'
                },
                { 
                  icon: '💬', 
                  title: 'QR Code Generator for WhatsApp', 
                  desc: 'Create QR code generator for WhatsApp easily! Generate WhatsApp QR codes that open direct chats or messages. Perfect for customer support, sales teams, or personal contacts. Free QR code generator for WhatsApp - no signup required!',
                  gradient: 'from-green-50 to-teal-50',
                  border: 'border-green-200'
                },
                { 
                  icon: '📍', 
                  title: 'QR Code Generator for Location', 
                  desc: 'Create QR code generator for location and GPS coordinates. Generate location QR codes that open Google Maps with exact coordinates or addresses. Perfect for event venues, businesses, or sharing locations instantly. Free location QR code generator!',
                  gradient: 'from-red-50 to-pink-50',
                  border: 'border-red-200'
                },
                { 
                  icon: '👤', 
                  title: 'QR Code Generator for Business Card', 
                  desc: 'Create QR code generator for business card with vCard format. Generate professional business card QR codes with contact details, phone, email, company, and title. Perfect for networking, events, and professional branding.',
                  gradient: 'from-purple-50 to-indigo-50',
                  border: 'border-purple-200'
                },
                { 
                  icon: '📝', 
                  title: 'QR Code Generator for Google Forms', 
                  desc: 'Create QR code generator for Google Forms instantly! Generate QR codes that link directly to your Google Forms. Perfect for surveys, registrations, feedback collection, and event management. Free and instant!',
                  gradient: 'from-blue-50 to-cyan-50',
                  border: 'border-blue-200'
                },
                { 
                  icon: '🏢', 
                  title: 'QR Code with Logo - Free Generator', 
                  desc: 'Learn how to make QR code with logo free using our generator. Create QR code with logo in the middle for business cards, marketing materials, product packaging, and corporate branding. All features completely free.',
                  gradient: 'from-blue-50 to-cyan-50',
                  border: 'border-blue-200'
                },
                { 
                  icon: '🎨', 
                  title: 'Custom QR Code Design & Shapes', 
                  desc: 'Create stunning custom QR code design with unique custom QR code shapes including dinosaur themes. Design beautiful QR codes with custom colors, logos, and creative shapes.',
                  gradient: 'from-green-50 to-emerald-50',
                  border: 'border-green-200'
                },
                { 
                  icon: '📥', 
                  title: 'Easy Download', 
                  desc: 'Download your dino QR codes or branded QR codes instantly as high-quality PNG or SVG files. Perfect for digital use, print materials, and large-scale printing.',
                  gradient: 'from-orange-50 to-amber-50',
                  border: 'border-orange-200'
                },
                { 
                  icon: '✅', 
                  title: 'Fully Scannable QR Code Dino', 
                  desc: 'All QR code with dinosaur shapes and branded QR codes are fully scannable with any smartphone camera or standard QR code reader. Every QR code dino works perfectly!',
                  gradient: 'from-pink-50 to-rose-50',
                  border: 'border-pink-200'
                },
                { 
                  icon: '🆓', 
                  title: 'Custom QR Code Generator Free', 
                  desc: 'Our custom QR code generator free works without redirects - your links go directly to the destination. Create unlimited custom QR codes, custom QR codes with logo, and custom designs completely free.',
                  gradient: 'from-teal-50 to-cyan-50',
                  border: 'border-teal-200'
                },
                { 
                  icon: '🚀', 
                  title: 'Instant QR Code Dino Generation', 
                  desc: 'Generate QR code with dinosaur shapes instantly with real-time preview. See your QR code dino update as you type - no waiting, no delays, instant results.',
                  gradient: 'from-violet-50 to-purple-50',
                  border: 'border-violet-200'
                },
                { 
                  icon: '🔒', 
                  title: 'Privacy & Security', 
                  desc: 'All processing happens in your browser - your data never leaves your device. No servers, no tracking, no watermarks. Generate QR codes with complete privacy.',
                  gradient: 'from-indigo-50 to-blue-50',
                  border: 'border-indigo-200'
                },
                { 
                  icon: '🎯', 
                  title: 'Fun & Professional QR Code Dino', 
                  desc: 'The only QR code generator that combines fun QR code with dinosaur shapes for creative projects with professional branded QR codes for business. Perfect QR code dino for any use case.',
                  gradient: 'from-yellow-50 to-amber-50',
                  border: 'border-yellow-200'
                },
              ].map((feature, idx) => (
                <div 
                  key={idx}
                  className={`group bg-gradient-to-br ${feature.gradient} rounded-xl p-6 border ${feature.border} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Step-by-Step Section - Timeline Design */}
          <section className="mb-16 sm:mb-20 lg:mb-24">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-4">
                <span className="text-base">📋</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-700">How It Works</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  How to Make QR Code with Logo - Step by Step Guide
                </span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                { step: 1, title: 'Enter Your URL or Text (No Sign Up!)', desc: 'Start instantly - no sign up required! Type your URL, text, or content to make QR code for link, website, or location. Works for websites, social media links, WiFi passwords, and more. Your QR code appears instantly as you type.', icon: '📝' },
                { step: 2, title: 'Upload Logo or Choose Dino Theme', desc: 'To create QR code with logo, upload your company logo. Or choose fun QR code with dinosaur themes (T-Rex, Stegosaurus) for a unique QR code dino. Logo appears in the middle automatically.', icon: '🦖' },
                { step: 3, title: 'Customize Colors & Design', desc: 'Design your QR code with logo by customizing colors to match your brand. Our QR code with logo generator offers full color control for professional results.', icon: '🎨' },
                { step: 4, title: 'Preview QR Code with Logo', desc: 'See your QR code with logo in the middle update in real-time. Preview ensures your QR code with logo looks perfect before downloading.', icon: '👀' },
                { step: 5, title: 'Download High-Quality QR Code', desc: 'Export your QR code with logo as high-quality PNG. Perfect for print materials, digital campaigns, or business cards. Fully scannable QR codes with logo.', icon: '📥' },
                { step: 6, title: 'Use QR Code Everywhere', desc: 'Your QR code with logo works on business cards, social media posts, product packaging, marketing materials, stickers, signs, and more. Use anywhere!', icon: '🌐' },
              ].map((item) => (
                <div 
                  key={item.step} 
                  className="relative bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="absolute -top-3 -left-3 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {item.step}
                  </div>
                  <div className="text-4xl mb-4 mt-2">{item.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Use Cases Section */}
          <section className="mb-16 sm:mb-20 lg:mb-24">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-4">
                <span className="text-base">🎯</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-700">Use Cases</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Perfect for Creating QR Codes with Logo
                </span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                { title: 'Businesses & Marketers', desc: 'Elevate your marketing campaigns with professional QR codes featuring your logo. Our free QR code generator requires no signup and works instantly. Perfect for business cards, product packaging, promotional materials, and brand awareness campaigns. Create QR codes with logo that reflect your brand identity.', icon: '🏢', color: 'from-blue-500 to-cyan-500' },
                { title: 'Restaurants & Cafes', desc: 'Streamline your restaurant operations with QR codes for digital menus, online ordering, and reservations. Our QR code generator for restaurants helps you create branded codes that enhance customer experience. Share WiFi passwords, special offers, and feedback forms effortlessly.', icon: '🍽️', color: 'from-orange-500 to-red-500' },
                { title: 'Event Planners', desc: 'Make your events memorable with custom QR codes. Whether you need fun dinosaur-themed codes for themed parties or professional branded codes for corporate events, our QR code generator delivers. Perfect for ticket distribution, event information, and attendee engagement.', icon: '🎪', color: 'from-purple-500 to-pink-500' },
                { title: 'WiFi QR Code Generator', desc: 'Share your WiFi network instantly with QR codes that automatically connect guests. Our free WiFi QR code generator creates codes that work with any smartphone. No more spelling out passwords—just scan and connect. Ideal for homes, cafes, hotels, and offices.', icon: '📶', color: 'from-teal-500 to-cyan-500' },
                { title: 'Educators & Parents', desc: 'Transform learning experiences with engaging QR codes. Create interactive worksheets, treasure hunts, and educational materials that students love. Our QR code generator for education makes learning fun while keeping kids engaged with dinosaur-themed designs.', icon: '📚', color: 'from-orange-500 to-amber-500' },
                { title: 'QR Code Generator for PDF', desc: 'Share PDF documents effortlessly with QR codes. Whether it\'s manuals, e-books, reports, or guides, our PDF QR code generator creates instant access links. No file hosting required—generate codes that link directly to your PDF files for easy distribution.', icon: '📄', color: 'from-gray-500 to-slate-500' },
                { title: 'Designers & Creators', desc: 'Showcase your creativity with custom QR code designs that match your aesthetic. Our custom QR code generator free offers unique shapes, colors, and logo integration. Perfect for portfolios, client projects, creative marketing materials, and artistic presentations.', icon: '🎨', color: 'from-green-500 to-emerald-500' },
                { title: 'Real Estate Agents', desc: 'Simplify property marketing with location-based QR codes. Generate codes for open houses, property tours, and virtual showings that help clients find properties instantly. Our QR code generator for location integrates with Google Maps for seamless navigation.', icon: '🏠', color: 'from-amber-500 to-yellow-500' },
                { title: 'Social Media Influencers', desc: 'Boost your online presence with branded QR codes that drive traffic and engagement. Create eye-catching codes with your logo that link to your content, products, or social profiles. Stand out from the crowd with unique dinosaur-themed designs or professional branded codes.', icon: '📱', color: 'from-indigo-500 to-purple-500' },
                { title: 'Healthcare & Medical', desc: 'Enhance patient services with secure QR codes for portals, appointments, and health information. Our healthcare QR code generator prioritizes privacy and security. Streamline patient access to medical records, appointment booking, and health resources.', icon: '🏥', color: 'from-red-500 to-rose-500' },
                { title: 'E-commerce & Stores', desc: 'Drive online sales with QR codes on product packaging and promotional materials. Our free QR code generator helps e-commerce businesses connect customers to product pages, special offers, and online stores instantly. Enhance customer experience with branded codes featuring your logo.', icon: '🛍️', color: 'from-rose-500 to-red-500' },
                { title: 'Hospitality & Hotels', desc: 'Improve guest experience with QR codes for check-in, WiFi access, room service, and local information. Our hotel QR code generator creates professional codes that enhance convenience and reduce contact. Perfect for modern hospitality services.', icon: '🏨', color: 'from-blue-500 to-indigo-500' },
                { title: 'QR Code Generator for Video', desc: 'Share video content instantly with QR codes linking to YouTube, tutorials, and promotional videos. Our video QR code generator makes it easy to distribute video content through print materials, presentations, and marketing campaigns.', icon: '🎥', color: 'from-red-500 to-pink-500' },
                { title: 'Fitness & Gyms', desc: 'Engage members with QR codes for class schedules, workout videos, and membership services. Our fitness QR code generator helps gyms and trainers share resources, track attendance, and provide value to members through easy-to-scan codes.', icon: '💪', color: 'from-orange-500 to-red-500' },
                { title: 'Non-Profit Organizations', desc: 'Amplify your cause with QR codes for donations, event registration, and volunteer sign-ups. Our free QR code generator for nonprofits helps you raise awareness and funds efficiently. Create codes that link to donation pages, campaigns, and important information.', icon: '❤️', color: 'from-pink-500 to-rose-500' },
                { title: 'QR Code Generator for Contact', desc: 'Simplify networking with digital business cards in QR code format. Generate vCard codes containing your contact information, social media links, and professional details. Perfect for events, meetings, and professional networking—just scan and save.', icon: '📇', color: 'from-indigo-500 to-blue-500' },
                { title: 'Automotive & Dealerships', desc: 'Enhance vehicle sales and service with QR codes for listings, schedules, and financing. Our automotive QR code generator helps dealerships share vehicle information, service appointments, and special offers with potential customers instantly.', icon: '🚗', color: 'from-gray-500 to-blue-500' },
                { title: 'QR Code Generator for Payment', desc: 'Facilitate transactions with secure QR codes for payment links and digital wallets. Our payment QR code generator supports PayPal, Venmo, and other payment platforms. Create codes for donations, invoices, and secure financial transactions.', icon: '💳', color: 'from-green-500 to-teal-500' },
                { title: 'Food & Beverage Industry', desc: 'Modernize your food service with QR codes for menus, ordering, and customer engagement. Enhance dining experiences with codes that link to digital menus, online ordering systems, and special promotions. Our restaurant QR code generator works seamlessly for any food service business.', icon: '🍕', color: 'from-orange-500 to-red-500' },
                { title: 'Retail & Shopping Centers', desc: 'Connect customers to products and deals with QR codes on tags, displays, and receipts. Our retail QR code generator helps shopping centers and stores drive online engagement, share product information, and promote loyalty programs through easy-to-scan codes.', icon: '🛒', color: 'from-blue-500 to-indigo-500' },
                { title: 'Tourism & Travel', desc: 'Enhance visitor experiences with QR codes for travel information, maps, and local guides. Our tourism QR code generator helps hotels, attractions, and travel agencies provide valuable resources to visitors. Share destination guides, maps, and travel tips instantly.', icon: '✈️', color: 'from-cyan-500 to-blue-500' },
                { title: 'Education & Training', desc: 'Create interactive learning experiences with QR codes linking to course materials, videos, and resources. Our education QR code generator makes it easy for teachers and trainers to share content, assignments, and learning resources with students.', icon: '🎓', color: 'from-purple-500 to-indigo-500' },
                { title: 'Entertainment & Venues', desc: 'Enhance audience engagement with QR codes for event information, tickets, and exclusive content. Our entertainment QR code generator helps venues, theaters, and event organizers connect with audiences through seamless digital experiences.', icon: '🎭', color: 'from-pink-500 to-rose-500' },
                { title: 'Professional Services', desc: 'Showcase your expertise with QR codes linking to portfolios, service catalogs, and contact information. Our professional services QR code generator helps lawyers, consultants, and freelancers share their work and make it easy for clients to connect and learn more.', icon: '💼', color: 'from-slate-500 to-gray-500' },
                { title: 'Government & Public Services', desc: 'Improve citizen access to services with QR codes for forms, information, and resources. Our public services QR code generator helps municipalities and agencies provide quick access to voting information, citizen services, and public resources.', icon: '🏛️', color: 'from-blue-600 to-indigo-600' },
                { title: 'Technology & IT Services', desc: 'Streamline technical support with QR codes linking to documentation, downloads, and knowledge bases. Our IT services QR code generator helps tech companies share resources, support tickets, and technical information with clients and users efficiently.', icon: '💻', color: 'from-emerald-500 to-green-500' },
                { title: 'Beauty & Wellness', desc: 'Enhance customer experience with QR codes for appointments, product catalogs, and beauty tips. Our beauty QR code generator helps salons, spas, and wellness centers share information, booking links, and resources with clients seamlessly.', icon: '✨', color: 'from-pink-500 to-purple-500' },
                { title: 'Pet Services & Veterinary', desc: 'Improve pet care communication with QR codes for vaccination records, appointments, and care resources. Our veterinary QR code generator helps clinics and pet services share important information with pet owners efficiently and conveniently.', icon: '🐾', color: 'from-amber-500 to-orange-500' },
                { title: 'Home Services & Contractors', desc: 'Showcase your work and simplify client communication with QR codes linking to portfolios and contact information. Our contractor QR code generator helps plumbers, electricians, and home service providers share work examples and make it easy for clients to request quotes.', icon: '🔧', color: 'from-yellow-500 to-amber-500' },
              ]
              .slice(0, useCasesExpanded ? 29 : 6)
              .map((useCase, idx) => (
                <div 
                  key={idx} 
                  className={`group relative bg-gradient-to-br ${useCase.color} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
                  <div className="text-5xl mb-4 relative z-10">{useCase.icon}</div>
                  <h3 className="text-lg font-bold mb-3 relative z-10">{useCase.title}</h3>
                  <p className="text-white/95 text-sm leading-relaxed relative z-10">{useCase.desc}</p>
                </div>
              ))}
            </div>
            
            {/* Expand/Collapse Button */}
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setUseCasesExpanded(!useCasesExpanded)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <span>{useCasesExpanded ? 'Show Less' : 'Show All Use Cases'}</span>
                <svg 
                  className={`w-5 h-5 transition-transform duration-300 ${useCasesExpanded ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </section>

          {/* FAQ Section - Clean Accordion */}
          <section className="mb-16 sm:mb-20 lg:mb-24">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-4">
                  <span className="text-base">❓</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-700">FAQs</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Frequently Asked Questions
                  </span>
                </h2>
              </div>
              
              <div className="space-y-4">
                {[
                  {
                    q: 'What is a QR code with dinosaur and how is it different?',
                    a: 'A QR code with dinosaur features actual dinosaur shapes (like T-Rex or Stegosaurus) integrated directly into the QR code pattern, not just colors. Our QR code dino generator creates fun, unique QR codes that remain fully scannable while being visually engaging and memorable.',
                  },
                  {
                    q: 'How to make QR code with logo?',
                    a: 'To make QR code with logo: use our free dino QR code generator, enter your URL or text, click upload logo button, select your logo image, and it will automatically appear in the middle of your QR code. You can customize colors, preview in real-time, and download your QR code with logo free. Creating QR codes with logo takes just seconds!',
                  },
                  {
                    q: 'Can I create QR code with logo in the middle?',
                    a: 'Yes! Our free QR code generator automatically places your logo in the middle of the QR code. When you upload a logo, it appears centered while maintaining full scannability. Perfect for creating professional QR codes with logo in the middle for branding purposes.',
                  },
                  {
                    q: 'How to make QR code for link?',
                    a: 'To make QR code for link: paste your website URL in the input field, customize the design (add logo, choose colors, select dinosaur theme if desired), preview your QR code, and download. Our free generator creates QR codes for links instantly - perfect for business cards, marketing materials, or social media.',
                  },
                  {
                    q: 'Is QR code with logo free?',
                    a: 'Yes! Creating QR code with logo is completely free. Our dino QR code generator offers logo upload, custom colors, logo positioning in the middle, and all features at no cost. No registration, no payment, no hidden fees - just free QR codes with logo.',
                  },
                  {
                    q: 'How to create QR code with logo?',
                    a: 'To create QR code with logo: use our free online generator, enter your content, upload your logo image, customize colors if needed, and download. Our tool creates QR codes with logo in the middle automatically. Perfect for creating branded QR codes for business use.',
                  },
                  {
                    q: 'Are dino QR codes scannable like regular QR codes?',
                    a: 'Yes! All dino QR codes are fully functional and scannable with any smartphone camera or standard QR code reader. We use high error correction to ensure dino QR codes work exactly like regular QR codes while maintaining the fun dinosaur designs.',
                  },
                  {
                    q: 'Is this custom QR code generator free?',
                    a: 'Yes, completely free! Our custom QR code generator free version lets you create unlimited custom QR codes, custom QR codes with logo, and custom designs with logo upload. No registration, no payment, no hidden fees. The custom QR code free tier includes all features - download, customize colors, add logos, create custom shapes, and more. All processing happens in your browser.',
                  },
                  {
                    q: 'Can I create custom QR code designs with unique shapes?',
                    a: 'Yes! Our custom QR code generator lets you create unique custom QR code design with custom QR code shapes including dinosaur themes. Customize foreground and background colors, upload logos, and create professional custom QR codes perfect for stickers, signs, plaques, stands, or any marketing material. Design your perfect custom QR code!',
                  },
                  {
                    q: 'Does this QR code generator work without redirects?',
                    a: 'Yes! Our QR code generator creates direct links without redirects. When someone scans your QR code, they go straight to your destination URL - no intermediate pages, no tracking redirects, just direct access. Perfect for creating QR codes without redirect hassles.',
                  },
                  {
                    q: 'What makes this the best custom QR code generator free?',
                    a: 'Our custom QR code generator free offers everything you need: create custom QR codes with logo, design unique custom QR code design with custom QR code shapes, download for stickers, signs, plaques, and stands - all completely free. Unlike other generators, we offer dinosaur themes plus professional branding, all without redirects or registration. Perfect custom QR code generator for any project!',
                  },
                  {
                    q: 'Is this better than justfreeqr?',
                    a: 'Yes! Our dino QR code generator is a better alternative to justfreeqr. We offer unique dinosaur-themed QR codes, logo uploads, custom colors, and all features completely free - no redirects, no watermarks, no registration required. Unlike justfreeqr, we provide fun dinosaur shapes plus professional branding options in one tool. The best justfreeqr alternative!',
                  },
                  {
                    q: 'What is the best justfreeqr alternative?',
                    a: 'Our dino QR code generator is the best justfreeqr alternative. We offer everything justfreeqr does plus unique dinosaur-themed QR codes, better logo placement, custom colors, and a more user-friendly interface - all completely free with no redirects or hidden fees. Better than justfreeqr in every way!',
                  },
                  {
                    q: 'Is this a free QR code generator no sign up?',
                    a: 'Yes! Our free QR code generator requires no sign up. Generate QR codes instantly without registration, email, or account creation. Simply enter your URL or text, customize your design, and download - it\'s that fast and easy! No signup, no hassle, just instant QR code generation. Perfect for anyone who wants quick results without creating accounts.',
                  },
                  {
                    q: 'How fast can I generate QR codes?',
                    a: 'Our free QR code generator no sign up creates QR codes instantly in real-time. As you type, your QR code updates automatically - there\'s no waiting, no processing delay, just instant results. Generate unlimited QR codes as fast as you can type, with no signup required. Get your QR code ready in seconds, not minutes!',
                  },
                  {
                    q: 'How to create QR code generator for WhatsApp?',
                    a: 'Create QR code generator for WhatsApp easily with our tool! Select the WhatsApp option, enter the phone number (with country code), optionally add a message, and click generate. The QR code will create a WhatsApp deep link that opens a chat when scanned. Perfect for customer support and quick communication!',
                  },
                  {
                    q: 'How to create QR code generator for location?',
                    a: 'Create QR code generator for location in seconds! Select the Location option, enter GPS coordinates (latitude and longitude) or an address, and generate. The QR code will open Google Maps with the exact location when scanned. Perfect for events, businesses, or sharing locations!',
                  },
                  {
                    q: 'Can I create QR code generator for business card?',
                    a: 'Yes! Our QR code generator for business card creates professional vCard QR codes. Select Business Card, enter your name, phone, email, company, and title, then generate. When scanned, it saves all your contact details directly to the phone. Perfect for networking events and professional contacts!',
                  },
                  {
                    q: 'How to create QR code generator for Google Forms?',
                    a: 'Create QR code generator for Google Forms instantly! Just select Google Forms, paste your Google Forms URL, and generate the QR code. When scanned, it opens your form directly. Perfect for surveys, registrations, feedback collection, and event management - all completely free!',
                  },
                  {
                    q: 'Can I create QR code generator for website or link?',
                    a: 'Yes! Our QR code generator for website and link is simple - just select Website/URL type, paste any URL or link, and generate instantly. Works for any website, social media profile, product page, or online resource. Create QR codes for links in seconds!',
                  },
                  {
                    q: 'What file formats can I download my QR code in?',
                    a: 'You can download your QR code as a high-quality PNG image. PNG format is perfect for both digital use (websites, social media, presentations) and print materials (business cards, flyers, posters). The downloaded QR code maintains excellent quality and remains fully scannable at any size.',
                  },
                  {
                    q: 'What size should my QR code be for printing?',
                    a: 'For best results, print your QR code at least 2cm x 2cm (0.8 inches x 0.8 inches) or larger. Larger sizes ensure better scannability, especially from a distance. For posters or signs, use larger sizes like 10cm x 10cm or more. Our generator creates high-resolution QR codes suitable for any print size.',
                  },
                  {
                    q: 'Can I use QR codes for business or commercial purposes?',
                    a: 'Absolutely! Our QR code generator is perfect for business and commercial use. Create professional QR codes with your company logo for marketing materials, product packaging, business cards, restaurant menus, event tickets, and more. All features are free for commercial use with no restrictions.',
                  },
                  {
                    q: 'Do QR codes expire or stop working?',
                    a: 'No, QR codes themselves never expire. As long as the destination URL or content remains accessible, your QR code will continue working indefinitely. If you change your website URL, simply generate a new QR code with the updated link. The QR code image file you download will work forever.',
                  },
                  {
                    q: 'Can I edit or change my QR code after downloading?',
                    a: 'QR codes are generated based on the content you provide. If you need to change the destination URL, text, or any content, simply generate a new QR code with the updated information. You can always come back to our free generator and create a new QR code instantly - no account needed.',
                  },
                  {
                    q: 'What is the maximum amount of data I can put in a QR code?',
                    a: 'QR codes can store up to 2,953 bytes of data. For URLs, this typically means around 2,000-3,000 characters depending on the URL structure. For plain text, you can include several paragraphs. Our generator automatically handles data optimization to ensure your QR code remains scannable even with longer content.',
                  },
                  {
                    q: 'Will my QR code work on all smartphones and devices?',
                    a: 'Yes! QR codes are universally compatible. Your QR code will work with any smartphone camera (iPhone, Android), tablet, or dedicated QR code scanner app. Modern smartphones have built-in QR code scanning in their camera apps, so no special app is required. Works on iOS, Android, and all major platforms.',
                  },
                  {
                    q: 'Is my data private and secure when using this QR code generator?',
                    a: 'Yes, your privacy is our priority. All QR code generation happens entirely in your browser - your data never leaves your device. We don\'t store, track, or collect any of your URLs, text, or personal information. No server processing means complete privacy and security for your content.',
                  },
                  {
                    q: 'Can I create multiple QR codes at once?',
                    a: 'While our generator creates one QR code at a time, you can generate unlimited QR codes quickly and easily. Simply enter new content, customize as needed, and download. Since there\'s no signup required, you can create as many QR codes as you need without any limitations or restrictions.',
                  },
                  {
                    q: 'What makes dino QR codes different from regular QR codes?',
                    a: 'Dino QR codes feature fun dinosaur shapes (T-Rex, Stegosaurus, Triceratops) integrated into the QR code pattern while maintaining full functionality. They\'re visually unique and memorable while being just as scannable as regular QR codes. Perfect for adding personality to your QR codes without sacrificing functionality.',
                  },
                  {
                    q: 'How do I ensure my QR code with logo is scannable?',
                    a: 'Our generator automatically optimizes logo placement and size to ensure scannability. We use high error correction levels and carefully position logos in the center. For best results, use a simple, high-contrast logo. The QR code updates in real-time, so you can test it immediately before downloading.',
                  },
                  {
                    q: 'Can I create QR codes for WiFi passwords?',
                    a: 'Yes! You can create QR codes for WiFi passwords using our Plain Text option. Format your WiFi information as: WIFI:T:WPA;S:YourNetworkName;P:YourPassword;; Then generate the QR code. When scanned, it will automatically connect devices to your WiFi network. Perfect for home, office, or events.',
                  },
                  {
                    q: 'What colors work best for QR codes?',
                    a: 'High contrast works best for QR codes. Dark colors (black, navy, dark blue) on light backgrounds (white, light gray) or light colors on dark backgrounds ensure optimal scannability. Our color customizer lets you choose any colors while maintaining sufficient contrast for reliable scanning.',
                  },
                  {
                    q: 'Can I use QR codes for social media profiles?',
                    a: 'Absolutely! Create QR codes for any social media profile by selecting Website/URL and pasting your profile link. Works for Instagram, Facebook, Twitter, LinkedIn, TikTok, and all social platforms. When scanned, it opens your profile directly. Great for business cards and marketing materials.',
                  },
                  {
                    q: 'How do I test if my QR code works before printing?',
                    a: 'Simply scan the preview QR code on our generator page using your smartphone camera. All modern phones have built-in QR code scanning - just point your camera at the screen. You can test it immediately before downloading to ensure it works perfectly. No need to download first!',
                  },
                  {
                    q: 'Can I create QR codes for email addresses?',
                    a: 'Yes! Use our Plain Text option and format it as: mailto:your.email@example.com?subject=Subject&body=Message. When scanned, it opens the email app with your address pre-filled. You can also create QR codes for contact information using our Business Card option for vCard format.',
                  },
                  {
                    q: 'What is the difference between QR code types (URL, WhatsApp, Location, etc.)?',
                    a: 'Different QR code types format data in specific ways for different purposes. URL type creates standard web links. WhatsApp type creates deep links that open WhatsApp chats. Location type opens Google Maps. Business Card creates vCard format for saving contacts. Each type is optimized for its specific use case.',
                  },
                  {
                    q: 'Can I create QR codes for PDF files?',
                    a: 'To create QR codes for PDF files, you need to upload your PDF to a cloud storage service (Google Drive, Dropbox, etc.) and make it publicly accessible. Then use our Website/URL option with the PDF\'s shareable link. When scanned, it opens the PDF directly in the browser.',
                  },
                  {
                    q: 'Do I need an internet connection to scan QR codes?',
                    a: 'It depends on the QR code content. For URLs, websites, and online resources, yes - an internet connection is needed. For plain text QR codes (like WiFi passwords, contact info, or messages), no internet is required. The QR code itself is just an image and doesn\'t need internet to be scanned.',
                  },
                  {
                    q: 'Can I create QR codes for phone numbers?',
                    a: 'Yes! Use our Plain Text option and format it as: tel:+1234567890 (include country code). When scanned, it opens the phone dialer with the number ready to call. You can also use our Business Card option to include phone numbers along with other contact information.',
                  },
                  {
                    q: 'What happens if I lose my downloaded QR code?',
                    a: 'No problem! Since our generator is free and requires no signup, simply return to our tool and regenerate the same QR code by entering the same content. Your QR code will be identical to the original. You can recreate it anytime without any restrictions.',
                  },
                  {
                    q: 'Can I create QR codes for YouTube videos or playlists?',
                    a: 'Yes! Select Website/URL and paste your YouTube video or playlist URL. When scanned, it opens the video or playlist directly in the YouTube app or browser. Perfect for sharing videos on business cards, flyers, or marketing materials. Works with any YouTube link.',
                  },
                  {
                    q: 'Are there any limitations on how many times a QR code can be scanned?',
                    a: 'No! There are no scanning limits. Your QR code can be scanned unlimited times by unlimited users. The QR code itself doesn\'t track scans - it simply redirects to your content. If you need scan analytics, you would need to use a URL shortener with tracking features.',
                  },
                  {
                    q: 'Can I create QR codes for restaurant menus?',
                    a: 'Absolutely! Create QR codes for digital restaurant menus by uploading your menu to a website or cloud storage, then generate a QR code with the menu URL. Place QR codes on tables for contactless menu access. Perfect for modern restaurants and cafes looking for hygienic solutions.',
                  },
                  {
                    q: 'What is error correction in QR codes and why does it matter?',
                    a: 'Error correction allows QR codes to remain scannable even if part of the code is damaged, obscured, or covered (like with a logo). We use high error correction (Level H) which allows up to 30% of the code to be covered while remaining scannable. This is why logos in the center work perfectly.',
                  },
                  {
                    q: 'Can I create QR codes for event tickets or registration?',
                    a: 'Yes! Create QR codes for event registration by using our Google Forms option with your registration form link. For tickets, generate QR codes with unique ticket URLs. When scanned, they can verify registration or open ticket information. Perfect for conferences, concerts, and events.',
                  },
                  {
                    q: 'How do I create a QR code for my business contact information?',
                    a: 'Use our Business Card option! Enter your name, phone, email, company, and job title. The generator creates a vCard QR code that, when scanned, saves all your contact information directly to the phone\'s contacts. Much faster than manual entry and perfect for networking.',
                  },
                  {
                    q: 'Can I create QR codes for app downloads (App Store, Google Play)?',
                    a: 'Yes! Use our Website/URL option with your app\'s App Store or Google Play Store link. When scanned on iOS, it opens the App Store. On Android, it opens Google Play. Smartphones automatically detect the platform and open the correct store. Perfect for marketing campaigns.',
                  },
                  {
                    q: 'What is the best way to display QR codes for maximum scanning success?',
                    a: 'Display QR codes at eye level, ensure good lighting, maintain high contrast, and use appropriate size (minimum 2cm x 2cm). Avoid reflective surfaces, ensure the code is flat (not curved), and provide clear instructions nearby. Test the QR code from the intended viewing distance before finalizing.',
                  },
                  {
                    q: 'Can I create QR codes for cryptocurrency wallet addresses?',
                    a: 'Yes! Use our Plain Text or Website/URL option with your cryptocurrency wallet address. For Bitcoin, format as: bitcoin:walletaddress. When scanned, it opens the wallet app with the address ready for transactions. Always double-check addresses before sharing.',
                  },
                  {
                    q: 'How do I create a QR code that works offline?',
                    a: 'Create QR codes with plain text content (like messages, WiFi passwords, or contact info) using our Plain Text option. These QR codes work offline because they don\'t require internet to display the content. The scanner reads the data directly from the QR code image itself.',
                  },
                  {
                    q: 'Can I customize the size of my downloaded QR code?',
                    a: 'The downloaded QR code is high-resolution and can be scaled to any size without quality loss. Use image editing software to resize for your specific needs. For print, ensure the final size is at least 2cm x 2cm. For digital use, any size works as long as it remains scannable.',
                  },
                  {
                    q: 'What should I do if my QR code is not scanning?',
                    a: 'Check these: ensure good lighting, verify the QR code isn\'t damaged or distorted, confirm sufficient contrast between colors, check that the code is flat (not curved), ensure minimum size (2cm x 2cm), clean your camera lens, and try a different scanning app. Our generator uses high error correction for maximum compatibility.',
                  },
                  {
                    q: 'Can I create QR codes for discount codes or coupons?',
                    a: 'Yes! Use our Plain Text option and enter your discount code. When scanned, it displays the code for easy copying. You can also use Website/URL to link to a landing page with the discount code. Perfect for marketing campaigns, promotions, and customer engagement.',
                  },
                  {
                    q: 'Is this QR code generator better than paid alternatives?',
                    a: 'Our free QR code generator offers all the features of paid alternatives - logo upload, custom colors, multiple QR code types, high-quality downloads, and unlimited generation - completely free. No watermarks, no redirects, no registration required. You get professional results without the cost.',
                  },
                ]
                .slice(0, faqsExpanded ? 50 : 6)
                .map((faq, idx) => {
                  const isExpanded = expandedFaq === idx
                  return (
                    <div 
                      key={idx} 
                      className="bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-200 overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                        className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start gap-3 flex-1">
                          <span className="text-blue-600 text-lg font-bold flex-shrink-0 mt-0.5">Q:</span>
                          <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex-1">
                            {faq.q}
                          </h3>
                        </div>
                        <div className={`flex-shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                          <svg 
                            className="w-5 h-5 text-blue-600" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </button>
                      <div 
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${
                          isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="px-6 pb-6 pt-0">
                          <p className="text-gray-600 leading-relaxed flex items-start gap-3">
                            <span className="text-green-600 font-bold text-lg flex-shrink-0">A:</span>
                            <span className="flex-1">{faq.a}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              
              {/* Expand/Collapse Button */}
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setFaqsExpanded(!faqsExpanded)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <span>{faqsExpanded ? 'Show Less FAQs' : 'Show All FAQs'}</span>
                  <svg 
                    className={`w-5 h-5 transition-transform duration-300 ${faqsExpanded ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </section>

          {/* CTA Section - Minimalist */}
          <section className="mb-16 sm:mb-20">
            <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 text-center text-white shadow-2xl overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 text-6xl animate-float">🦖</div>
                <div className="absolute bottom-10 right-10 text-5xl animate-float" style={{ animationDelay: '1s' }}>🦕</div>
              </div>
              <div className="relative z-10">
                <div className="text-6xl mb-6 animate-float">🦖</div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                  Start Creating QR Codes with Logo Today
                </h2>
                <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
                  Free QR code generator no sign up - generate QR codes instantly! Create QR code with dinosaur shapes using our fast QR code dino generator. Make unique QR codes with logo in seconds for links, websites, and locations. Upload your logo in the middle, customize colors, and download - all completely free, no signup, no waiting!
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a 
                    href="#workspace" 
                    className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-semibold py-3 px-8 rounded-xl hover:bg-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Get Started Now
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Footer - Clean */}
          <footer className="text-center py-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-md rounded-full shadow-md border border-gray-200/60">
              <span className="text-sm text-gray-600">Made with</span>
              <span className="text-red-500 animate-pulse text-lg">❤️</span>
              <span className="text-sm text-gray-600">and</span>
              <span className="text-xl">🦖</span>
              <span className="text-sm text-gray-600">| Create amazing QR codes!</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default App
