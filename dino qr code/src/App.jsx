import { useState, useRef } from 'react'
import Header from './components/Header'
import LoadingAnimation from './components/LoadingAnimation'
import InputField from './components/InputField'
import DinoTemplateSelector from './components/DinoTemplateSelector'
import ColorCustomizer from './components/ColorCustomizer'
import PreviewSection from './components/PreviewSection'
import DownloadShareButtons from './components/DownloadShareButtons'

const DINOSAUR_TEMPLATES = [
  { id: 'trex', name: 'T-Rex', emoji: '🦖', color: 'from-red-500 to-orange-600', pattern: 'roar' },
  { id: 'stegosaurus', name: 'Stegosaurus', emoji: '🦕', color: 'from-green-500 to-emerald-600', pattern: 'plates' },
]

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [inputValue, setInputValue] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState(DINOSAUR_TEMPLATES[0])
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
    // Optionally switch to a standard template when using custom logo
    // setSelectedTemplate(DINOSAUR_TEMPLATES[0])
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
    <div className="min-h-screen relative overflow-hidden">
      {isLoading && <LoadingAnimation onComplete={() => setIsLoading(false)} />}
      <Header />
      {/* Modern Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 -z-10"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 text-9xl opacity-[0.03] animate-float particle parallax-slow">🦖</div>
        <div className="absolute top-40 right-20 text-8xl opacity-[0.03] animate-float particle parallax-slow" style={{ animationDelay: '1s' }}>🦕</div>
        <div className="absolute bottom-20 left-1/4 text-7xl opacity-[0.03] animate-float particle parallax-slow" style={{ animationDelay: '2s' }}>🦏</div>
      </div>

      <div className={`relative pt-24 sm:pt-28 md:pt-32 pb-12 px-4 sm:px-6 lg:px-8 transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Hero Section - Redesigned */}
          <header className="text-center mb-16 sm:mb-20 md:mb-24 fade-in">
            <div className="inline-flex items-center justify-center mb-6 animate-float">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                <span className="relative text-7xl sm:text-8xl md:text-9xl drop-shadow-2xl">🦖</span>
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent animate-gradient">
                Dino QR Code Generator
              </span>
              <br />
              <span className="text-gray-800 dark:text-gray-100 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                Create Custom & Branded QR Codes with Logo
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-medium max-w-4xl mx-auto leading-relaxed mb-8">
              Create unique <strong className="text-purple-600 dark:text-purple-400">dino QR codes</strong> with dinosaur themes or professional <strong className="text-pink-600 dark:text-pink-400">branded QR codes with logo</strong> for your business. Our free dino QR code generator lets you upload your logo, customize colors, and generate fully scannable QR codes instantly.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-12">
              <div className="flex items-center gap-2 px-4 sm:px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200">Fully Scannable</span>
              </div>
              <div className="flex items-center gap-2 px-4 sm:px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
                <span className="text-xl sm:text-2xl">🦖</span>
                <span className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200">Dino Themes</span>
              </div>
              <div className="flex items-center gap-2 px-4 sm:px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
                <span className="text-xl sm:text-2xl">🏢</span>
                <span className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200">Logo Upload</span>
              </div>
              <div className="flex items-center gap-2 px-4 sm:px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
                <span className="text-xl sm:text-2xl">🆓</span>
                <span className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200">100% Free</span>
              </div>
            </div>
          </header>

          {/* Workspace Section - Redesigned for Better Usability */}
          <section id="workspace" className="mb-16 sm:mb-20">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl sm:rounded-[2rem] shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
              
              {/* Step-by-Step Header */}
              <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 p-6 sm:p-8 text-white">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-3">
                    <span className="text-lg">🎯</span>
                    <span className="text-sm font-semibold uppercase tracking-wide">Quick & Easy QR Creation</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2">
                    Create Your Dino QR Code in 3 Simple Steps
                  </h2>
                  <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto">
                    Follow the steps below to generate your perfect QR code
                  </p>
                </div>
                
                {/* Progress Steps */}
                <div className="flex items-center justify-center gap-2 sm:gap-4 mt-6 max-w-2xl mx-auto">
                  <div className="flex items-center gap-2 flex-1">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm transition-all ${
                      inputValue.trim() ? 'bg-white text-purple-600 scale-110' : 'bg-white/30 text-white'
                    }`}>
                      {inputValue.trim() ? '✓' : '1'}
                    </div>
                    <span className="text-xs sm:text-sm font-medium hidden sm:inline">Enter URL</span>
                  </div>
                  <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                    <div className={`h-full bg-white transition-all duration-500 ${
                      inputValue.trim() ? 'w-full' : 'w-0'
                    }`}></div>
                  </div>
                  <div className="flex items-center gap-2 flex-1">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm bg-white/30 text-white">
                      2
                    </div>
                    <span className="text-xs sm:text-sm font-medium hidden sm:inline">Choose Style</span>
                  </div>
                  <div className="flex-1 h-1 bg-white/30 rounded-full"></div>
                  <div className="flex items-center gap-2 flex-1">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm bg-white/30 text-white">
                      3
                    </div>
                    <span className="text-xs sm:text-sm font-medium hidden sm:inline">Download</span>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 lg:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-6 sm:gap-8 lg:gap-12 items-start">
                  
                  {/* Left Column - Step-by-Step Controls */}
                  <div className="space-y-6">
                    
                    {/* Step 1: Input Field */}
                    <div className="relative">
                      <div className="absolute -left-3 sm:-left-4 top-0 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg z-10">
                        <span className="text-white font-bold text-sm sm:text-base">1</span>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 shadow-lg border-2 border-purple-200 dark:border-purple-800 ml-4">
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-2xl">📝</span>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Enter Your Content</h3>
                        </div>
                        <InputField value={inputValue} onChange={handleInputChange} error={error} onValidate={validateInput} />
                      </div>
                    </div>
                    
                    {/* Step 2: Template & Logo Selection */}
                    <div className="relative">
                      <div className="absolute -left-3 sm:-left-4 top-0 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-lg z-10">
                        <span className="text-white font-bold text-sm sm:text-base">2</span>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 shadow-lg border-2 border-blue-200 dark:border-blue-800 ml-4">
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-2xl">🎨</span>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Choose Style or Logo</h3>
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
                    
                    {/* Step 3: Color Customization */}
                    <div className="relative">
                      <div className="absolute -left-3 sm:-left-4 top-0 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full shadow-lg z-10">
                        <span className="text-white font-bold text-sm sm:text-base">3</span>
                      </div>
                      <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-2xl p-6 shadow-lg border-2 border-orange-200 dark:border-orange-800 ml-4">
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-2xl">🎨</span>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Customize Colors</h3>
                        </div>
                        <ColorCustomizer
                          foregroundColor={foregroundColor}
                          backgroundColor={backgroundColor}
                          onForegroundChange={setForegroundColor}
                          onBackgroundChange={setBackgroundColor}
                        />
                      </div>
                    </div>
                    
                    {/* Quick Action: Copy URL */}
                    <button
                      onClick={handleCopyToClipboard}
                      className={`w-full font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 relative overflow-hidden shadow-xl transition-all duration-300 transform hover:scale-[1.02] ${
                        copied
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                          : 'bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 text-white hover:shadow-2xl'
                      }`}
                    >
                      {copied ? (
                        <>
                          <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="font-bold">Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          <span>Copy URL to Clipboard</span>
                        </>
                      )}
                    </button>
                  </div>
                  
                  {/* Right Column - Live Preview & Download */}
                  <div className="lg:sticky lg:top-8">
                    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 sm:p-8 shadow-2xl border-2 border-purple-200 dark:border-purple-800">
                      {/* Preview Header */}
                      <div className="text-center mb-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full mb-3">
                          <span className="text-lg">👀</span>
                          <span className="text-sm font-bold text-purple-700 dark:text-purple-300">Live Preview</span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          See your QR code update in real-time
                        </p>
                      </div>
                      
                      {/* QR Code Preview */}
                      <PreviewSection
                        inputValue={inputValue}
                        selectedTemplate={selectedTemplate}
                        customLogo={customLogo}
                        foregroundColor={foregroundColor}
                        backgroundColor={backgroundColor}
                        backgroundPattern={backgroundPattern}
                        qrRef={qrRef}
                      />
                      
                      {/* Download Section */}
                      {inputValue.trim() ? (
                        <div className="mt-6">
                          <div className="text-center mb-4">
                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Ready to download?</span>
                          </div>
                          <DownloadShareButtons
                            qrRef={qrRef}
                            inputValue={inputValue}
                            selectedTemplate={selectedTemplate}
                            backgroundPattern={backgroundPattern}
                            backgroundColor={backgroundColor}
                          />
                        </div>
                      ) : (
                        <div className="mt-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 p-6 text-center">
                          <div className="text-4xl mb-3">⬆️</div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                            Enter URL or text to see preview
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            Your QR code will appear here
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Features Section - Redesigned */}
          <section className="mb-16 sm:mb-20">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl sm:rounded-[2rem] shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 sm:p-10 lg:p-12">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full mb-4">
                  <span className="text-lg">⭐</span>
                  <span className="text-sm font-semibold text-purple-700 dark:text-purple-300 uppercase tracking-wide">Why Choose Us</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
                  <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                    Why Choose Our Dino QR Code Generator
                  </span>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="group relative p-6 sm:p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border border-purple-200 dark:border-purple-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-5xl mb-4">🦖</div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Dino QR Code Generator</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">Create unique <strong>dino QR codes</strong> with actual dinosaur shapes integrated into the QR pattern. Choose from T-Rex, Stegosaurus, and other fun dinosaur templates that make your QR codes memorable and engaging.</p>
              </div>
              
              <div className="group relative p-6 sm:p-8 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border border-blue-200 dark:border-blue-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-5xl mb-4">🏢</div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Custom QR Code with Logo</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">Upload your company logo to create professional <strong>branded QR codes</strong>. Perfect for business cards, marketing materials, product packaging, and corporate branding. Your logo, your brand, your QR code.</p>
              </div>
              
              <div className="group relative p-6 sm:p-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200 dark:border-green-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-5xl mb-4">🎨</div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Branded QR Code Generator</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">Create professional <strong>branded QR codes</strong> with your logo and brand colors. Perfect for marketing campaigns, business cards, and corporate materials. Stand out with custom-branded QR codes.</p>
              </div>
              
              <div className="group relative p-6 sm:p-8 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-2xl border border-orange-200 dark:border-orange-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-5xl mb-4">📥</div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">High-Quality Downloads</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">Download your <strong>dino QR codes</strong> or <strong>branded QR codes</strong> as high-quality PNG or SVG files. Perfect for digital use, print materials, and large-scale printing. Exactly as previewed.</p>
              </div>
              
              <div className="group relative p-6 sm:p-8 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-2xl border border-pink-200 dark:border-pink-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Fully Scannable</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">All <strong>dino QR codes</strong> and <strong>branded QR codes</strong> are fully scannable with any smartphone camera or QR code scanner. High error correction ensures reliability.</p>
              </div>
              
              <div className="group relative p-6 sm:p-8 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-2xl border border-teal-200 dark:border-teal-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-5xl mb-4">🆓</div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Free & No Signup Required</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">Create unlimited <strong>dino QR codes</strong> and <strong>custom branded QR codes</strong> completely free. No registration, no payment, no limits. Works entirely in your browser.</p>
              </div>
              
              <div className="group relative p-6 sm:p-8 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-2xl border border-violet-200 dark:border-violet-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-5xl mb-4">🚀</div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Fun & Professional</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">The only QR code generator that combines fun <strong>dino QR codes</strong> for creative projects with professional <strong>branded QR codes</strong> for business. Versatile for any use case.</p>
              </div>
              
              <div className="group relative p-6 sm:p-8 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-2xl border border-indigo-200 dark:border-indigo-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Instant Generation</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">Generate <strong>dino QR codes</strong> and <strong>branded QR codes</strong> instantly with real-time preview. See your QR code update as you type - no waiting, no delays, instant results.</p>
              </div>
              
              <div className="group relative p-6 sm:p-8 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-2xl border border-yellow-200 dark:border-yellow-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-5xl mb-4">🔒</div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Privacy & Security</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">All processing happens in your browser - your data never leaves your device. No servers, no tracking, no watermarks. Generate <strong>dino QR codes</strong> and <strong>branded QR codes</strong> with complete privacy.</p>
              </div>
            </div>
          </div>
        </section>

          {/* Step-by-Step Instructions Section - Redesigned */}
          <section className="mb-16 sm:mb-20">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl sm:rounded-[2rem] shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 sm:p-10 lg:p-12">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full mb-4">
                  <span className="text-lg">📋</span>
                  <span className="text-sm font-semibold text-purple-700 dark:text-purple-300 uppercase tracking-wide">Step by Step</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
                  <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                    How to Create Dino QR Codes & Branded QR Codes with Logo
                  </span>
                </h2>
              </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { step: 1, title: 'Enter Your URL or Text', desc: 'Type your URL, text, or content in the input field. Works for websites, social media links, WiFi passwords, and more.', icon: '📝' },
                { step: 2, title: 'Choose Dino QR Code or Upload Logo', desc: 'Select a fun dinosaur-themed QR code template (T-Rex, Stegosaurus) or upload your company logo to create a branded QR code.', icon: '🦖' },
                { step: 3, title: 'Customize Colors & Branding', desc: 'Customize foreground and background colors to match your brand. Perfect for creating branded QR codes with your brand colors.', icon: '🎨' },
                { step: 4, title: 'Preview Your QR Code', desc: 'See your dino QR code or branded QR code update in real-time as you customize. Ensure everything looks perfect before downloading.', icon: '👀' },
                { step: 5, title: 'Download High-Quality File', desc: 'Export your QR code as PNG or SVG. Perfect for print materials, digital campaigns, or business cards. Fully scannable and high-resolution.', icon: '📥' },
                { step: 6, title: 'Use in Your Marketing', desc: 'Print on business cards, use in social media posts, add to product packaging, or include in marketing materials. Works everywhere!', icon: '🌐' },
              ].map((item) => (
                <div key={item.step} className="group relative p-6 sm:p-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden">
                  <div className="absolute -top-3 -left-3 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-2xl z-10">
                    {item.step}
                  </div>
                  <div className="text-5xl mb-4 mt-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

          {/* Use Cases Section - Redesigned */}
          <section className="mb-16 sm:mb-20">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl sm:rounded-[2rem] shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 sm:p-10 lg:p-12">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full mb-4">
                  <span className="text-lg">🎯</span>
                  <span className="text-sm font-semibold text-purple-700 dark:text-purple-300 uppercase tracking-wide">Use Cases</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
                  <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                    Perfect for Creating Dino QR Codes & Branded QR Codes
                  </span>
                </h2>
              </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                { title: 'Businesses & Marketers', desc: 'Create professional branded QR codes with your logo for marketing campaigns, business cards, and product packaging. Stand out with custom-branded QR codes.', icon: '🏢', color: 'from-purple-500 to-pink-500' },
                { title: 'Event Planners & Organizers', desc: 'Use fun dino QR codes for events, tickets, and promotions. Or create branded QR codes with your event logo for a professional touch.', icon: '🎪', color: 'from-blue-500 to-cyan-500' },
                { title: 'Educators & Parents', desc: 'Create engaging dino QR codes for worksheets, treasure hunts, classroom activities, and educational materials. Kids love dinosaur-themed QR codes!', icon: '📚', color: 'from-orange-500 to-amber-500' },
                { title: 'Designers & Creators', desc: 'Design custom branded QR codes with logos for client projects, creative portfolios, and branded content. Professional branded QR codes made easy.', icon: '🎨', color: 'from-green-500 to-emerald-500' },
                { title: 'Social Media Influencers', desc: 'Share unique dino QR codes to engage followers and drive traffic. Or use branded QR codes with your logo for professional content marketing.', icon: '📱', color: 'from-indigo-500 to-purple-500' },
                { title: 'E-commerce & Online Stores', desc: 'Add branded QR codes to product packaging, shipping labels, and promotional materials. Direct customers to your online store or product pages instantly.', icon: '🛍️', color: 'from-rose-500 to-red-500' },
              ].map((useCase, idx) => (
                <div key={idx} className={`group relative p-6 sm:p-8 bg-gradient-to-br ${useCase.color} rounded-2xl text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                  <div className="text-6xl mb-5 relative z-10">{useCase.icon}</div>
                  <h3 className="text-xl font-bold mb-3 relative z-10">{useCase.title}</h3>
                  <p className="text-white/95 text-sm leading-relaxed relative z-10">{useCase.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

          {/* FAQ Section - Redesigned */}
          <section className="mb-16 sm:mb-20">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl sm:rounded-[2rem] shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 sm:p-10 lg:p-12">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full mb-4">
                  <span className="text-lg">❓</span>
                  <span className="text-sm font-semibold text-purple-700 dark:text-purple-300 uppercase tracking-wide">FAQs</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
                  <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                    Frequently Asked Questions
                  </span>
                </h2>
              </div>
            <div className="max-w-3xl mx-auto space-y-4">
              {[
                {
                  q: 'What is a dino QR code and how is it different?',
                  a: 'A dino QR code features actual dinosaur shapes (like T-Rex or Stegosaurus) integrated directly into the QR code pattern, not just colors. Our dino QR code generator creates fun, unique QR codes that remain fully scannable while being visually engaging and memorable.',
                },
                {
                  q: 'Can I add my company logo to create a branded QR code?',
                  a: 'Absolutely! Our branded QR code generator allows you to upload your company logo directly into the QR code. Create professional branded QR codes perfect for business cards, marketing materials, product packaging, and corporate branding.',
                },
                {
                  q: 'Are dino QR codes scannable like regular QR codes?',
                  a: 'Yes! All dino QR codes are fully functional and scannable with any smartphone camera or standard QR code reader. We use high error correction to ensure dino QR codes work exactly like regular QR codes while maintaining the fun dinosaur designs.',
                },
                {
                  q: 'Can I create both dino QR codes and branded QR codes with logo?',
                  a: 'Yes! Our tool is versatile - you can create fun dino QR codes for creative projects or professional branded QR codes with your logo for business use. Choose a dinosaur template or upload your logo to get started.',
                },
                {
                  q: 'Is this dino QR code generator really free?',
                  a: 'Yes, completely free! Create unlimited dino QR codes and branded QR codes with logo upload. No registration, no payment, no hidden fees. All processing happens in your browser.',
                },
                {
                  q: 'What file formats can I download my QR codes in?',
                  a: 'You can download both dino QR codes and branded QR codes as high-quality PNG or SVG files. PNG is perfect for digital use and social media, while SVG is ideal for print materials and scalable graphics.',
                },
                {
                  q: 'Can I customize the colors of my dino QR code or branded QR code?',
                  a: 'Yes! Customize foreground and background colors for both dino QR codes and branded QR codes. Match your brand colors when creating branded QR codes, or choose fun colors for dino QR codes.',
                },
                {
                  q: 'What makes this the best dino QR code generator?',
                  a: 'We\'re the only QR code generator that offers actual dinosaur-themed QR codes with integrated shapes, plus professional branded QR codes with logo upload. Combine fun dino QR codes with business-ready branded QR codes - all in one free tool!',
                },
              ].map((faq, idx) => {
                const isExpanded = expandedFaq === idx
                return (
                  <div 
                    key={idx} 
                    className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                      className="w-full p-6 sm:p-8 text-left flex items-start justify-between gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="flex items-start gap-3 flex-1">
                        <span className="text-purple-600 dark:text-purple-400 text-xl font-extrabold flex-shrink-0 mt-0.5">Q:</span>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white flex-1">
                          {faq.q}
                        </h3>
                      </div>
                      <div className={`flex-shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                        <svg 
                          className="w-6 h-6 text-purple-600 dark:text-purple-400" 
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
                      <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed flex items-start gap-3">
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

          {/* CTA Section - Redesigned */}
          <section className="mb-16 sm:mb-20">
            <div className="relative p-8 sm:p-10 md:p-12 lg:p-16 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-3xl sm:rounded-[2rem] text-center text-white shadow-2xl overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 text-6xl animate-float">🦖</div>
              <div className="absolute bottom-10 right-10 text-5xl animate-float" style={{ animationDelay: '1s' }}>🦕</div>
              <div className="absolute top-1/2 left-1/4 text-4xl animate-float" style={{ animationDelay: '2s' }}>🦏</div>
            </div>
            <div className="relative z-10">
              <div className="text-7xl mb-6 animate-float">🦖</div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-5 text-shadow-lg">
                Start Creating Dino QR Codes & Branded QR Codes Today
              </h2>
              <p className="text-lg md:text-xl mb-10 text-white/95 max-w-3xl mx-auto leading-relaxed">
                Create unique <strong>dino QR codes</strong> with fun dinosaur themes or professional <strong>branded QR codes with logo</strong> for your business. Upload your logo, customize colors, preview in real-time, and download high-quality PNG/SVG files instantly. Free, fast, fully scannable, and perfect for any project - from marketing campaigns to educational materials.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="#qr-input" className="btn-primary bg-white text-purple-600 font-bold py-4 px-8 md:px-10 rounded-xl hover:bg-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-lg">
                  Get Started Now
                </a>
                <button
                  onClick={() => {
                    document.getElementById('qr-input')?.scrollIntoView({ behavior: 'smooth' })
                    document.getElementById('qr-input')?.focus()
                  }}
                  className="btn-primary bg-white/20 backdrop-blur-sm text-white font-bold py-4 px-8 md:px-10 rounded-xl border-2 border-white/40 hover:bg-white/30 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-lg"
                >
                  Try It Free
                </button>
              </div>
            </div>
          </div>
        </section>

          {/* Footer - Redesigned */}
          <footer className="mt-16 sm:mt-20 mb-12 text-center">
            <div className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <span className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">Made with</span>
              <span className="text-red-500 animate-pulse-slow text-xl">❤️</span>
              <span className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">and</span>
              <span className="text-2xl animate-bounce">🦖</span>
              <span className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-medium">| Create amazing QR codes!</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default App

