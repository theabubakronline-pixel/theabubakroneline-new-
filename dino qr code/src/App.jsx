import { useState, useRef } from 'react'
import Header from './components/Header'
import LoadingAnimation from './components/LoadingAnimation'
import InputField from './components/InputField'
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
  const [selectedTemplate, setSelectedTemplate] = useState(DINOSAUR_TEMPLATES[0]) // Simple is now first
  const [customLogo, setCustomLogo] = useState(null)
  const [foregroundColor, setForegroundColor] = useState('#000000')
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF')
  const backgroundPattern = 'none'
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState(null)
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900">
      {isLoading && <LoadingAnimation onComplete={() => setIsLoading(false)} />}
      <Header />
      
      {/* Subtle background pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] dark:opacity-[0.03]">
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
                <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
                  <span className="text-8xl sm:text-9xl">🦖</span>
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Dino QR Code Generator
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-700 dark:text-gray-300 font-medium mb-4">
              Free Online QR Code Generator - Create QR Codes with Logo
            </p>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-10">
              Our <strong className="text-blue-600 dark:text-blue-400">free dino QR code generator</strong> helps you create unique <strong className="text-purple-600 dark:text-purple-400">QR codes with logo</strong> instantly. Learn <strong className="text-pink-600 dark:text-pink-400">how to make QR code with logo free</strong> for links, websites, and locations. Upload your logo in the middle, customize colors, and download - all completely free, no signup required.
            </p>

            {/* Quick Stats - Minimalist */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12">
              {[
                { icon: '✅', label: 'Fully Scannable', color: 'green' },
                { icon: '🦖', label: 'Dino Themes', color: 'purple' },
                { icon: '🏢', label: 'Logo Upload', color: 'blue' },
                { icon: '🆓', label: '100% Free', color: 'pink' },
                { icon: '🎨', label: 'No Redirects', color: 'orange' },
              ].map((stat, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-full shadow-md border border-gray-200/60 dark:border-gray-700/60 hover:shadow-lg transition-all duration-200 hover:scale-105"
                >
                  <span className="text-lg">{stat.icon}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{stat.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Main Workspace - Efficient Horizontal Layout */}
          <section id="workspace" className="mb-12 sm:mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              
              {/* Efficient Header */}
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-4 sm:px-6 py-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-base sm:text-lg font-bold text-white">Create Your QR Code</h2>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3].map((step, idx) => (
                      <div key={step} className="flex items-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          step === 1 && inputValue.trim()
                            ? 'bg-white text-blue-600' 
                            : 'bg-white/30 text-white'
                        }`}>
                          {step === 1 && inputValue.trim() ? '✓' : step}
                        </div>
                        {idx < 2 && <div className={`w-3 h-0.5 mx-1 ${
                          step === 1 && inputValue.trim() ? 'bg-white' : 'bg-white/30'
                        }`}></div>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Efficient Workspace - Horizontal Layout */}
              <div className="p-4 sm:p-5">
                <div className="grid grid-cols-1 xl:grid-cols-[1fr_0.8fr] gap-4 sm:gap-5">
                  
                  {/* Left: All Controls in Single Column */}
                  <div className="space-y-3">
                    
                    {/* Input Section */}
                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Enter URL or Text
                      </label>
                      <InputField 
                        value={inputValue} 
                        onChange={handleInputChange} 
                        error={error} 
                        onValidate={validateInput} 
                      />
                    </div>
                    
                    {/* Template & Logo - Horizontal Layout */}
                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Choose Style or Upload Logo
                      </label>
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
                    
                    {/* Colors - Compact Horizontal */}
                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Customize Colors
                      </label>
                      <ColorCustomizer
                        foregroundColor={foregroundColor}
                        backgroundColor={backgroundColor}
                        onForegroundChange={setForegroundColor}
                        onBackgroundChange={setBackgroundColor}
                      />
                    </div>
                  </div>
                  
                  {/* Right: Preview with Download */}
                  <div className="xl:sticky xl:top-4 h-fit">
                    <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                      {/* Compact Preview Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-[10px] font-semibold text-blue-700 dark:text-blue-300 uppercase">Live</span>
                        </div>
                        {inputValue.trim() && (
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {customLogo ? '🎨 Custom Logo' : `${selectedTemplate.emoji} ${selectedTemplate.name}`}
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
                        qrRef={qrRef}
                      />
                      
                      {/* Download Buttons - Always Visible */}
                      {inputValue.trim() && (
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                          <DownloadShareButtons
                            qrRef={qrRef}
                            inputValue={inputValue}
                            selectedTemplate={selectedTemplate}
                            backgroundPattern={backgroundPattern}
                            backgroundColor={backgroundColor}
                          />
                        </div>
                      )}
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
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full mb-4">
                <span className="text-base">⭐</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-300">Why Choose Us</span>
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
                  icon: '🦖', 
                  title: 'Dino QR Code Generator Free', 
                  desc: 'Create unique dino QR codes with actual dinosaur shapes integrated into the QR pattern. Perfect for Jurassic World themed projects!',
                  gradient: 'from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20',
                  border: 'border-red-200 dark:border-red-800'
                },
                { 
                  icon: '🏢', 
                  title: 'QR Code with Logo - Free Generator', 
                  desc: 'Learn how to make QR code with logo free using our generator. Create QR code with logo in the middle for business cards, marketing materials, product packaging, and corporate branding. All features completely free.',
                  gradient: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
                  border: 'border-blue-200 dark:border-blue-800'
                },
                { 
                  icon: '🎨', 
                  title: 'Custom QR Code Design & Shapes', 
                  desc: 'Create stunning custom QR code design with unique custom QR code shapes including dinosaur themes. Design beautiful QR codes with custom colors, logos, and creative shapes.',
                  gradient: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
                  border: 'border-green-200 dark:border-green-800'
                },
                { 
                  icon: '📥', 
                  title: 'Easy Download', 
                  desc: 'Download your dino QR codes or branded QR codes instantly as high-quality PNG or SVG files. Perfect for digital use, print materials, and large-scale printing.',
                  gradient: 'from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20',
                  border: 'border-orange-200 dark:border-orange-800'
                },
                { 
                  icon: '✅', 
                  title: 'Fully Scannable', 
                  desc: 'All dino QR codes and branded QR codes are fully scannable with any dinosaur QR code scanner, smartphone camera, or standard QR code reader.',
                  gradient: 'from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20',
                  border: 'border-pink-200 dark:border-pink-800'
                },
                { 
                  icon: '🆓', 
                  title: 'Custom QR Code Generator Free', 
                  desc: 'Our custom QR code generator free works without redirects - your links go directly to the destination. Create unlimited custom QR codes, custom QR codes with logo, and custom designs completely free.',
                  gradient: 'from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20',
                  border: 'border-teal-200 dark:border-teal-800'
                },
                { 
                  icon: '🚀', 
                  title: 'Instant Generation', 
                  desc: 'Generate dino QR codes and branded QR codes instantly with real-time preview. See your QR code update as you type - no waiting, no delays, instant results.',
                  gradient: 'from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20',
                  border: 'border-violet-200 dark:border-violet-800'
                },
                { 
                  icon: '🔒', 
                  title: 'Privacy & Security', 
                  desc: 'All processing happens in your browser - your data never leaves your device. No servers, no tracking, no watermarks. Generate QR codes with complete privacy.',
                  gradient: 'from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20',
                  border: 'border-indigo-200 dark:border-indigo-800'
                },
                { 
                  icon: '🎯', 
                  title: 'Fun & Professional', 
                  desc: 'The only QR code generator that combines fun dino QR codes for creative projects with professional branded QR codes for business. Versatile for any use case.',
                  gradient: 'from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20',
                  border: 'border-yellow-200 dark:border-yellow-800'
                },
              ].map((feature, idx) => (
                <div 
                  key={idx}
                  className={`group bg-gradient-to-br ${feature.gradient} rounded-xl p-6 border ${feature.border} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Step-by-Step Section - Timeline Design */}
          <section className="mb-16 sm:mb-20 lg:mb-24">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full mb-4">
                <span className="text-base">📋</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-300">How It Works</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  How to Make QR Code with Logo - Step by Step Guide
                </span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                { step: 1, title: 'Enter Your URL or Text', desc: 'Type your URL, text, or content to make QR code for link, website, or location. Works for websites, social media links, WiFi passwords, and more.', icon: '📝' },
                { step: 2, title: 'Upload Logo or Choose Dino Theme', desc: 'To create QR code with logo, upload your company logo. Or choose fun dinosaur themes (T-Rex, Stegosaurus) for themed QR codes. Logo appears in the middle automatically.', icon: '🦖' },
                { step: 3, title: 'Customize Colors & Design', desc: 'Design your QR code with logo by customizing colors to match your brand. Our QR code with logo generator offers full color control for professional results.', icon: '🎨' },
                { step: 4, title: 'Preview QR Code with Logo', desc: 'See your QR code with logo in the middle update in real-time. Preview ensures your QR code with logo looks perfect before downloading.', icon: '👀' },
                { step: 5, title: 'Download High-Quality QR Code', desc: 'Export your QR code with logo as high-quality PNG. Perfect for print materials, digital campaigns, or business cards. Fully scannable QR codes with logo.', icon: '📥' },
                { step: 6, title: 'Use QR Code Everywhere', desc: 'Your QR code with logo works on business cards, social media posts, product packaging, marketing materials, stickers, signs, and more. Use anywhere!', icon: '🌐' },
              ].map((item) => (
                <div 
                  key={item.step} 
                  className="relative bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="absolute -top-3 -left-3 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {item.step}
                  </div>
                  <div className="text-4xl mb-4 mt-2">{item.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Use Cases Section */}
          <section className="mb-16 sm:mb-20 lg:mb-24">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full mb-4">
                <span className="text-base">🎯</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-300">Use Cases</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Perfect for Creating QR Codes with Logo
                </span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                { title: 'Businesses & Marketers', desc: 'Create professional QR codes with logo for marketing campaigns, business cards, product packaging, stickers, signs, and plaques. Learn how to make QR code with logo free for all your branding needs.', icon: '🏢', color: 'from-blue-500 to-cyan-500' },
                { title: 'Event Planners', desc: 'Use fun dino QR codes for events, tickets, and promotions. Or create branded QR codes with your event logo for a professional touch.', icon: '🎪', color: 'from-purple-500 to-pink-500' },
                { title: 'Educators & Parents', desc: 'Create engaging dino QR codes for worksheets, treasure hunts, classroom activities, and educational materials. Kids love dinosaur-themed QR codes!', icon: '📚', color: 'from-orange-500 to-amber-500' },
                { title: 'Designers & Creators', desc: 'Create stunning custom QR code design with unique custom QR code shapes for client projects, creative portfolios, stickers, signs, and stands.', icon: '🎨', color: 'from-green-500 to-emerald-500' },
                { title: 'Social Media Influencers', desc: 'Share unique dino QR codes to engage followers and drive traffic. Or use branded QR codes with your logo for professional content marketing.', icon: '📱', color: 'from-indigo-500 to-purple-500' },
                { title: 'E-commerce & Stores', desc: 'Add branded QR codes to product packaging, shipping labels, and promotional materials. Direct customers to your online store instantly.', icon: '🛍️', color: 'from-rose-500 to-red-500' },
              ].map((useCase, idx) => (
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
          </section>

          {/* FAQ Section - Clean Accordion */}
          <section className="mb-16 sm:mb-20 lg:mb-24">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full mb-4">
                  <span className="text-base">❓</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-300">FAQs</span>
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
                    q: 'What is a dino QR code and how is it different?',
                    a: 'A dino QR code features actual dinosaur shapes (like T-Rex or Stegosaurus) integrated directly into the QR code pattern, not just colors. Our dino QR code generator creates fun, unique QR codes that remain fully scannable while being visually engaging and memorable.',
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
                ].map((faq, idx) => {
                  const isExpanded = expandedFaq === idx
                  return (
                    <div 
                      key={idx} 
                      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                        className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <div className="flex items-start gap-3 flex-1">
                          <span className="text-blue-600 dark:text-blue-400 text-lg font-bold flex-shrink-0 mt-0.5">Q:</span>
                          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white flex-1">
                            {faq.q}
                          </h3>
                        </div>
                        <div className={`flex-shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                          <svg 
                            className="w-5 h-5 text-blue-600 dark:text-blue-400" 
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
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed flex items-start gap-3">
                            <span className="text-green-600 dark:text-green-400 font-bold text-lg flex-shrink-0">A:</span>
                            <span className="flex-1">{faq.a}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
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
                  Use our free dino QR code generator to create QR codes with logo instantly. Learn how to make QR code with logo free for links, websites, and locations. Upload your logo in the middle, customize colors, and download - all completely free, no signup required.
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
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-full shadow-md border border-gray-200/60 dark:border-gray-700/60">
              <span className="text-sm text-gray-600 dark:text-gray-400">Made with</span>
              <span className="text-red-500 animate-pulse text-lg">❤️</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">and</span>
              <span className="text-xl">🦖</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">| Create amazing QR codes!</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default App
