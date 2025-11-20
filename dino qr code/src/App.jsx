import { useState, useRef } from 'react'
import Header from './components/Header'
import LoadingAnimation from './components/LoadingAnimation'
import InputField from './components/InputField'
import DinoTemplateSelector from './components/DinoTemplateSelector'
import LogoUpload from './components/LogoUpload'
import ColorCustomizer from './components/ColorCustomizer'
import BackgroundPatternSelector from './components/BackgroundPatternSelector'
import PreviewSection from './components/PreviewSection'
import DownloadShareButtons from './components/DownloadShareButtons'

const DINOSAUR_TEMPLATES = [
  { id: 'trex', name: 'T-Rex', emoji: '🦖', color: 'from-red-500 to-orange-600', pattern: 'roar' },
  { id: 'stegosaurus', name: 'Stegosaurus', emoji: '🦕', color: 'from-green-500 to-emerald-600', pattern: 'plates' },
  { id: 'triceratops', name: 'Triceratops', emoji: '🦏', color: 'from-blue-500 to-cyan-600', pattern: 'horns' },
  { id: 'brontosaurus', name: 'Brontosaurus', emoji: '🦕', color: 'from-purple-500 to-pink-600', pattern: 'neck' },
  { id: 'raptor', name: 'Raptor', emoji: '🦖', color: 'from-yellow-500 to-amber-600', pattern: 'claws' },
  { id: 'pterodactyl', name: 'Pterodactyl', emoji: '🦅', color: 'from-indigo-500 to-blue-600', pattern: 'wings' },
  { id: 'spinosaurus', name: 'Spinosaurus', emoji: '🦖', color: 'from-teal-500 to-cyan-600', pattern: 'sail' },
  { id: 'ankylosaurus', name: 'Ankylosaurus', emoji: '🦏', color: 'from-amber-500 to-orange-600', pattern: 'armor' },
  { id: 'velociraptor', name: 'Velociraptor', emoji: '🦖', color: 'from-violet-500 to-purple-600', pattern: 'speed' },
  { id: 'diplodocus', name: 'Diplodocus', emoji: '🦕', color: 'from-emerald-500 to-green-600', pattern: 'tail' },
]

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [inputValue, setInputValue] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState(DINOSAUR_TEMPLATES[0])
  const [customLogo, setCustomLogo] = useState(null)
  const [foregroundColor, setForegroundColor] = useState('#000000')
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF')
  const [backgroundPattern, setBackgroundPattern] = useState('footprints')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
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
      <div className={`pt-20 sm:pt-24 md:pt-28 pb-8 px-4 sm:px-6 lg:px-8 transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
      {/* Decorative background elements with dinosaur patterns */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 text-9xl opacity-5 animate-float particle parallax-slow">🦖</div>
        <div className="absolute top-40 right-20 text-8xl opacity-5 animate-float particle parallax-slow" style={{ animationDelay: '1s' }}>🦕</div>
        <div className="absolute bottom-20 left-1/4 text-7xl opacity-5 animate-float particle parallax-slow" style={{ animationDelay: '2s' }}>🦏</div>
        <div className="absolute top-60 left-1/3 text-6xl opacity-5 animate-float particle parallax-slow" style={{ animationDelay: '1.5s' }}>🦅</div>
        <div className="absolute bottom-40 right-1/4 text-5xl opacity-5 animate-float particle parallax-slow" style={{ animationDelay: '2.5s' }}>🦖</div>
        <div className="absolute top-80 right-1/3 text-6xl opacity-5 animate-float particle parallax-slow" style={{ animationDelay: '3s' }}>🦕</div>
        <div className="absolute bottom-60 left-1/3 text-5xl opacity-5 animate-float particle parallax-slow" style={{ animationDelay: '3.5s' }}>🦖</div>
        {/* Dinosaur footprint patterns */}
        <svg className="absolute top-32 right-32 w-24 h-24 opacity-5" viewBox="0 0 100 100">
          <path d="M20,50 Q30,40 40,50 Q30,60 20,50" fill="currentColor" opacity="0.3"/>
          <circle cx="25" cy="50" r="3" fill="currentColor" opacity="0.3"/>
          <circle cx="35" cy="50" r="3" fill="currentColor" opacity="0.3"/>
        </svg>
        <svg className="absolute bottom-32 left-32 w-24 h-24 opacity-5" viewBox="0 0 100 100" style={{ animationDelay: '3s' }}>
          <path d="M20,50 Q30,40 40,50 Q30,60 20,50" fill="currentColor" opacity="0.3"/>
          <circle cx="25" cy="50" r="3" fill="currentColor" opacity="0.3"/>
          <circle cx="35" cy="50" r="3" fill="currentColor" opacity="0.3"/>
        </svg>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* SEO-Optimized Hero Section */}
        <header className="text-center mb-16 fade-in">
          <div className="inline-block mb-6 animate-float">
            <span className="text-7xl sm:text-8xl drop-shadow-lg">🦖</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6">
            <span className="gradient-text text-shadow-lg">Dino QR Code Generator</span>
            <br />
            <span className="text-gray-800 text-shadow">Custom QR Code Maker Online</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 font-medium max-w-3xl mx-auto leading-relaxed mb-6">
            Welcome to the ultimate QR code generator — where fun meets functionality. Create dinosaur-themed QR codes, upload your brand logo, or design standard custom QR codes with ease. Whether for events, marketing campaigns, classroom activities, or social media, our tool lets you generate fully scannable, high-quality QR codes in seconds.
          </p>
          <div className="mt-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="flex items-start gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-gray-200">
                <span className="text-2xl">⚡</span>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">Enter your URL or text</p>
                  <p className="text-sm text-gray-600">Instantly see a live, animated preview of your QR code.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-gray-200">
                <span className="text-2xl">🦖</span>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">Choose dinosaur or upload your logo</p>
                  <p className="text-sm text-gray-600">T-Rex, Stegosaurus, Triceratops, or upload your brand logo/image.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-gray-200">
                <span className="text-2xl">🎨</span>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">Customize colors & patterns</p>
                  <p className="text-sm text-gray-600">Foreground, background, and dinosaur-themed patterns.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-gray-200">
                <span className="text-2xl">📥</span>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">Download high-quality PNG/SVG</p>
                  <p className="text-sm text-gray-600">Ready for digital or print use, exactly as previewed.</p>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-sm text-gray-700 flex items-center gap-2">
                <span className="text-lg">💡</span>
                <span><strong>Tip:</strong> Our free QR code generator works entirely in-browser — no account required.</span>
              </p>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-center gap-3 text-sm text-gray-600 flex-wrap">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md border border-gray-200">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="font-semibold">Fully scannable</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md border border-gray-200">
              <span className="text-lg">🦖</span>
              <span className="font-semibold">10 unique templates</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md border border-gray-200">
              <span className="text-lg">🎨</span>
              <span className="font-semibold">Custom colors</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Column - Controls */}
          <div className="space-y-6">
            {/* Input Field */}
            <div className="stagger-item">
              <InputField
                value={inputValue}
                onChange={handleInputChange}
                error={error}
                onValidate={validateInput}
              />
            </div>

            {/* Logo Upload */}
            <div className="stagger-item">
              <LogoUpload
                onLogoUpload={handleLogoUpload}
                currentLogo={customLogo}
                onRemoveLogo={handleRemoveLogo}
              />
            </div>

            {/* Dinosaur Template Selector */}
            <div className="stagger-item">
              <DinoTemplateSelector
                templates={DINOSAUR_TEMPLATES}
                selectedTemplate={selectedTemplate}
                onSelectTemplate={(template) => {
                  setSelectedTemplate(template)
                  // Clear custom logo when selecting a dinosaur template
                  if (customLogo) {
                    setCustomLogo(null)
                  }
                }}
                disabled={!!customLogo}
              />
            </div>

            {/* Color Customizer */}
            <div className="stagger-item">
              <ColorCustomizer
                foregroundColor={foregroundColor}
                backgroundColor={backgroundColor}
                onForegroundChange={setForegroundColor}
                onBackgroundChange={setBackgroundColor}
              />
            </div>

            {/* Background Pattern Selector */}
            <div className="stagger-item">
              <BackgroundPatternSelector
                selectedPattern={backgroundPattern}
                onSelectPattern={setBackgroundPattern}
              />
            </div>

            {/* Copy to Clipboard */}
            <div className="stagger-item">
              <button
                onClick={handleCopyToClipboard}
                className={`btn-primary w-full font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 relative overflow-hidden shadow-lg ${
                  copied
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white scale-in'
                    : 'bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 text-white hover:from-blue-600 hover:via-purple-700 hover:to-pink-700 hover:shadow-xl'
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
          </div>

          {/* Right Column - Preview */}
          <div className="lg:sticky lg:top-8">
            <PreviewSection
              inputValue={inputValue}
              selectedTemplate={selectedTemplate}
              customLogo={customLogo}
              foregroundColor={foregroundColor}
              backgroundColor={backgroundColor}
              backgroundPattern={backgroundPattern}
              qrRef={qrRef}
            />
          </div>
        </div>

        {/* Download & Share Section */}
        {inputValue.trim() && (
          <DownloadShareButtons
            qrRef={qrRef}
            inputValue={inputValue}
            selectedTemplate={selectedTemplate}
            backgroundPattern={backgroundPattern}
            backgroundColor={backgroundColor}
          />
        )}

        {/* SEO Content Sections */}
        
        {/* Features Section */}
        <section className="mt-24 mb-20">
          <div className="card-enhanced p-8 md:p-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-12">
              <span className="gradient-text">Why Choose Our QR Code Generator</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="card-hover p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                <div className="text-5xl mb-4">🦖</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Dinosaur QR Code Generator</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Make your QR codes fun and memorable with integrated dinosaur shapes (T-Rex, Stegosaurus, Triceratops).</p>
              </div>
              
              <div className="card-hover p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                <div className="text-5xl mb-4">🎨</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Custom QR Code Maker</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Generate standard QR codes with personalized colors, patterns, and designs to match your brand.</p>
              </div>
              
              <div className="card-hover p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                <div className="text-5xl mb-4">✨</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Animated QR Code Generator</h3>
                <p className="text-gray-600 text-sm leading-relaxed">See your QR code come to life with hover effects and background animations in the live preview.</p>
              </div>
              
              <div className="card-hover p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-100">
                <div className="text-5xl mb-4">📥</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">High-Quality QR Code PNG/SVG</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Download exactly what you see in the live preview — perfect for digital or print use.</p>
              </div>
              
              <div className="card-hover p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl border border-pink-100">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Fully Scannable</h3>
                <p className="text-gray-600 text-sm leading-relaxed">All QR codes are tested to work with smartphones and standard QR scanners.</p>
              </div>
              
              <div className="card-hover p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl border border-teal-100">
                <div className="text-5xl mb-4">🆓</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Free & No Registration Needed</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Create and download QR codes instantly without signing up — works entirely in-browser.</p>
              </div>
              
              <div className="card-hover p-6 bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl border border-violet-100 md:col-span-2 lg:col-span-1">
                <div className="text-5xl mb-4">👤</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Personalized QR Code Maker</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Ideal for teachers, event planners, designers, and social media influencers.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Step-by-Step Instructions Section */}
        <section className="mb-20">
          <div className="card-enhanced p-8 md:p-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-12">
              <span className="gradient-text">How to Use Our QR Code Creator</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { step: 1, title: 'Enter Content', desc: 'Type your URL or text in the input field above.', icon: '📝' },
                { step: 2, title: 'Select QR Code Style', desc: 'Choose a dinosaur QR code or a standard custom QR code template.', icon: '🦖' },
                { step: 3, title: 'Customize Colors & Background', desc: 'Adjust foreground, background, and dinosaur-themed or abstract patterns.', icon: '🎨' },
                { step: 4, title: 'Preview in Real Time', desc: 'See the animated QR code generator preview update as you customize.', icon: '👀' },
                { step: 5, title: 'Generate & Download', desc: 'Export as PNG or SVG, fully scannable and matching the preview exactly.', icon: '📥' },
                { step: 6, title: 'Use Anywhere', desc: 'Print, digital campaigns, social media, merchandise, or classroom materials.', icon: '🌐' },
              ].map((item) => (
                <div key={item.step} className="card-hover p-6 bg-white rounded-xl border-2 border-gray-100 relative overflow-hidden">
                  <div className="absolute -top-4 -left-4 w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-xl z-10">
                    {item.step}
                  </div>
                  <div className="text-5xl mb-4 mt-2">{item.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="mb-20">
          <div className="card-enhanced p-8 md:p-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-12">
              <span className="gradient-text">Who Needs This QR Code Generator</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                { title: 'Event Planners & Marketers', desc: 'Create memorable QR codes for promotions, tickets, and posters.', icon: '🎪', color: 'from-purple-500 to-pink-500' },
                { title: 'Educators & Parents', desc: 'Fun QR codes for worksheets, treasure hunts, or classroom activities.', icon: '📚', color: 'from-blue-500 to-cyan-500' },
                { title: 'Designers & Creators', desc: 'Integrate personalized QR codes into branding, packaging, and digital content.', icon: '🎨', color: 'from-orange-500 to-amber-500' },
                { title: 'Social Media Influencers', desc: 'Share fun QR codes to engage followers and drive traffic to your content.', icon: '📱', color: 'from-green-500 to-emerald-500' },
                { title: 'Anyone Looking for a Free QR Code Generator', desc: 'Works for personal or professional projects — no limits, no fees.', icon: '🌟', color: 'from-indigo-500 to-purple-500' },
              ].map((useCase, idx) => (
                <div key={idx} className={`card-hover p-8 bg-gradient-to-br ${useCase.color} rounded-xl text-white shadow-xl`}>
                  <div className="text-6xl mb-5">{useCase.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{useCase.title}</h3>
                  <p className="text-white/95 text-sm leading-relaxed">{useCase.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20">
          <div className="card-enhanced p-8 md:p-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-12">
              <span className="gradient-text">Frequently Asked Questions</span>
            </h2>
            <div className="max-w-3xl mx-auto space-y-5">
              {[
                {
                  q: 'Can I generate standard QR codes without dinosaur themes?',
                  a: 'Yes. Our tool supports both dinosaur QR codes and standard custom QR codes, making it a versatile QR code creator for any need.',
                },
                {
                  q: 'Will my QR code scan reliably?',
                  a: 'Absolutely. All QR codes are fully scannable with standard QR code scanners and smartphones. We use high error correction to ensure reliability.',
                },
                {
                  q: 'Can I use the generated QR code for commercial purposes?',
                  a: 'Yes. Download high-quality PNG or SVG QR codes for digital campaigns, marketing materials, or printed items. The QR codes are yours to use for any purpose.',
                },
                {
                  q: 'Do I need an account or pay to use this tool?',
                  a: 'No. This is a free QR code generator, and all processing happens in your browser. No registration, no payment, no limits.',
                },
                {
                  q: 'How do I make sure the downloaded QR code matches the live preview?',
                  a: 'Click "Generate" and then "Download." Your animated QR code preview is rendered exactly as a PNG or SVG, preserving all colors, shapes, and patterns.',
                },
              ].map((faq, idx) => (
                <div key={idx} className="card-hover p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-gray-200">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-start gap-3">
                    <span className="text-purple-600 text-xl font-extrabold">Q:</span>
                    <span className="flex-1">{faq.q}</span>
                  </h3>
                  <p className="text-gray-700 leading-relaxed ml-8 flex items-start gap-3">
                    <span className="text-green-600 font-bold text-lg">A:</span>
                    <span className="flex-1">{faq.a}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-20">
          <div className="relative p-10 md:p-12 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-2xl text-center text-white shadow-2xl overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 text-6xl animate-float">🦖</div>
              <div className="absolute bottom-10 right-10 text-5xl animate-float" style={{ animationDelay: '1s' }}>🦕</div>
              <div className="absolute top-1/2 left-1/4 text-4xl animate-float" style={{ animationDelay: '2s' }}>🦏</div>
            </div>
            <div className="relative z-10">
              <div className="text-7xl mb-6 animate-float">🦖</div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-5 text-shadow-lg">
                Start Creating Your QR Code Today
              </h2>
              <p className="text-lg md:text-xl mb-10 text-white/95 max-w-3xl mx-auto leading-relaxed">
                Generate dinosaur-themed or custom QR codes in seconds. Customize colors, patterns, and animations, preview live, and download in high-quality PNG or SVG. Free, fast, fully scannable, and perfect for any project.
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

        {/* Footer */}
        <footer className="mt-20 mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-4 bg-white/90 backdrop-blur-sm rounded-full shadow-xl border border-gray-200 card-hover">
            <span className="text-base font-medium text-gray-700">Made with</span>
            <span className="text-red-500 animate-pulse-slow text-xl">❤️</span>
            <span className="text-base font-medium text-gray-700">and</span>
            <span className="text-2xl animate-bounce">🦖</span>
            <span className="text-gray-600 text-sm font-medium">| Create amazing QR codes!</span>
          </div>
        </footer>
      </div>
      </div>
    </div>
  )
}

export default App

