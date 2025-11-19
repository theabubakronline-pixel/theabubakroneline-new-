import { useState, useRef } from 'react'
import LoadingScreen from './components/LoadingScreen'
import SimpleHeader from './components/SimpleHeader'
import InputField from './components/InputField'
import DinoTemplateSelector from './components/DinoTemplateSelector'
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
  const [inputValue, setInputValue] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState(DINOSAUR_TEMPLATES[0])
  const [foregroundColor, setForegroundColor] = useState('#000000')
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF')
  const [backgroundPattern, setBackgroundPattern] = useState('footprints')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const qrRef = useRef(null)

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
    <>
      <LoadingScreen />
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <SimpleHeader />
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
            Welcome to the ultimate QR code generator — where fun meets functionality. Create dinosaur-themed QR codes or standard custom QR codes with ease. Whether for events, marketing campaigns, classroom activities, or social media, our tool lets you generate fully scannable, high-quality QR codes in seconds.
          </p>
          <div className="mt-8 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
              <div className="group flex items-start gap-4 p-6 bg-gradient-to-br from-purple-50/90 via-pink-50/90 to-orange-50/90 backdrop-blur-md rounded-2xl shadow-lg border border-purple-100/50 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-pink-500/0 to-orange-500/0 group-hover:from-purple-500/5 group-hover:via-pink-500/5 group-hover:to-orange-500/5 transition-all duration-300"></div>
                <div className="text-4xl relative z-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">⚡</div>
                <div className="relative z-10 flex-1">
                  <p className="font-bold text-gray-800 mb-2 text-lg">Enter your URL or text</p>
                  <p className="text-sm text-gray-600 leading-relaxed">Instantly see a live, animated preview of your QR code.</p>
                </div>
              </div>
              <div className="group flex items-start gap-4 p-6 bg-gradient-to-br from-green-50/90 via-emerald-50/90 to-teal-50/90 backdrop-blur-md rounded-2xl shadow-lg border border-green-100/50 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 via-emerald-500/0 to-teal-500/0 group-hover:from-green-500/5 group-hover:via-emerald-500/5 group-hover:to-teal-500/5 transition-all duration-300"></div>
                <div className="text-4xl relative z-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">🦖</div>
                <div className="relative z-10 flex-1">
                  <p className="font-bold text-gray-800 mb-2 text-lg">Choose dinosaur or standard styles</p>
                  <p className="text-sm text-gray-600 leading-relaxed">T-Rex, Stegosaurus, Triceratops, or standard QR code styles.</p>
                </div>
              </div>
              <div className="group flex items-start gap-4 p-6 bg-gradient-to-br from-blue-50/90 via-cyan-50/90 to-indigo-50/90 backdrop-blur-md rounded-2xl shadow-lg border border-blue-100/50 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-cyan-500/0 to-indigo-500/0 group-hover:from-blue-500/5 group-hover:via-cyan-500/5 group-hover:to-indigo-500/5 transition-all duration-300"></div>
                <div className="text-4xl relative z-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">🎨</div>
                <div className="relative z-10 flex-1">
                  <p className="font-bold text-gray-800 mb-2 text-lg">Customize colors & patterns</p>
                  <p className="text-sm text-gray-600 leading-relaxed">Foreground, background, and dinosaur-themed patterns.</p>
                </div>
              </div>
              <div className="group flex items-start gap-4 p-6 bg-gradient-to-br from-amber-50/90 via-orange-50/90 to-red-50/90 backdrop-blur-md rounded-2xl shadow-lg border border-amber-100/50 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-orange-500/0 to-red-500/0 group-hover:from-amber-500/5 group-hover:via-orange-500/5 group-hover:to-red-500/5 transition-all duration-300"></div>
                <div className="text-4xl relative z-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">📥</div>
                <div className="relative z-10 flex-1">
                  <p className="font-bold text-gray-800 mb-2 text-lg">Download high-quality PNG/SVG</p>
                  <p className="text-sm text-gray-600 leading-relaxed">Ready for digital or print use, exactly as previewed.</p>
                </div>
              </div>
            </div>
            <div className="mt-6 p-5 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200/50 rounded-2xl shadow-md backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-indigo-400/0 to-purple-400/0 hover:from-blue-400/5 hover:via-indigo-400/5 hover:to-purple-400/5 transition-all duration-300"></div>
              <p className="text-sm text-gray-700 flex items-center gap-3 relative z-10">
                <span className="text-2xl animate-bounce">💡</span>
                <span><strong className="text-blue-700">Tip:</strong> Our free QR code generator works entirely in-browser — no account required.</span>
              </p>
            </div>
          </div>
          <div className="mt-8 flex items-center justify-center gap-4 text-sm flex-wrap">
            <div className="group flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-50 to-emerald-50 backdrop-blur-md rounded-full shadow-lg border border-green-200/50 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></span>
              <span className="font-bold text-gray-700">Fully scannable</span>
            </div>
            <div className="group flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-50 to-pink-50 backdrop-blur-md rounded-full shadow-lg border border-purple-200/50 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <span className="text-xl group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">🦖</span>
              <span className="font-bold text-gray-700">10 unique templates</span>
            </div>
            <div className="group flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-50 to-cyan-50 backdrop-blur-md rounded-full shadow-lg border border-blue-200/50 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <span className="text-xl group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">🎨</span>
              <span className="font-bold text-gray-700">Custom colors</span>
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

            {/* Dinosaur Template Selector */}
            <div className="stagger-item">
              <DinoTemplateSelector
                templates={DINOSAUR_TEMPLATES}
                selectedTemplate={selectedTemplate}
                onSelectTemplate={setSelectedTemplate}
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
          <div className="card-enhanced p-8 md:p-12 rounded-3xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-16">
              <span className="gradient-text">Why Choose Our QR Code Generator</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="group card-hover p-7 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 rounded-2xl border-2 border-purple-100/50 hover:border-purple-300/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500"></div>
                <div className="text-6xl mb-5 relative z-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">🦖</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 relative z-10">Dinosaur QR Code Generator</h3>
                <p className="text-gray-600 text-sm leading-relaxed relative z-10">Make your QR codes fun and memorable with integrated dinosaur shapes (T-Rex, Stegosaurus, Triceratops).</p>
              </div>
              
              <div className="group card-hover p-7 bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50 rounded-2xl border-2 border-blue-100/50 hover:border-blue-300/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/10 group-hover:to-cyan-500/10 transition-all duration-500"></div>
                <div className="text-6xl mb-5 relative z-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">🎨</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 relative z-10">Custom QR Code Maker</h3>
                <p className="text-gray-600 text-sm leading-relaxed relative z-10">Generate standard QR codes with personalized colors, patterns, and designs to match your brand.</p>
              </div>
              
              <div className="group card-hover p-7 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-2xl border-2 border-green-100/50 hover:border-green-300/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-emerald-500/0 group-hover:from-green-500/10 group-hover:to-emerald-500/10 transition-all duration-500"></div>
                <div className="text-6xl mb-5 relative z-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">✨</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 relative z-10">Animated QR Code Generator</h3>
                <p className="text-gray-600 text-sm leading-relaxed relative z-10">See your QR code come to life with hover effects and background animations in the live preview.</p>
              </div>
              
              <div className="group card-hover p-7 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 rounded-2xl border-2 border-orange-100/50 hover:border-orange-300/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-amber-500/0 group-hover:from-orange-500/10 group-hover:to-amber-500/10 transition-all duration-500"></div>
                <div className="text-6xl mb-5 relative z-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">📥</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 relative z-10">High-Quality QR Code PNG/SVG</h3>
                <p className="text-gray-600 text-sm leading-relaxed relative z-10">Download exactly what you see in the live preview — perfect for digital or print use.</p>
              </div>
              
              <div className="group card-hover p-7 bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 rounded-2xl border-2 border-pink-100/50 hover:border-pink-300/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 to-rose-500/0 group-hover:from-pink-500/10 group-hover:to-rose-500/10 transition-all duration-500"></div>
                <div className="text-6xl mb-5 relative z-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">✅</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 relative z-10">Fully Scannable</h3>
                <p className="text-gray-600 text-sm leading-relaxed relative z-10">All QR codes are tested to work with smartphones and standard QR scanners.</p>
              </div>
              
              <div className="group card-hover p-7 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 rounded-2xl border-2 border-teal-100/50 hover:border-teal-300/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 to-cyan-500/0 group-hover:from-teal-500/10 group-hover:to-cyan-500/10 transition-all duration-500"></div>
                <div className="text-6xl mb-5 relative z-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">🆓</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 relative z-10">Free & No Registration Needed</h3>
                <p className="text-gray-600 text-sm leading-relaxed relative z-10">Create and download QR codes instantly without signing up — works entirely in-browser.</p>
              </div>
              
              <div className="group card-hover p-7 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 rounded-2xl border-2 border-violet-100/50 hover:border-violet-300/50 relative overflow-hidden md:col-span-2 lg:col-span-1">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-purple-500/0 group-hover:from-violet-500/10 group-hover:to-purple-500/10 transition-all duration-500"></div>
                <div className="text-6xl mb-5 relative z-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">👤</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 relative z-10">Personalized QR Code Maker</h3>
                <p className="text-gray-600 text-sm leading-relaxed relative z-10">Ideal for teachers, event planners, designers, and social media influencers.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Step-by-Step Instructions Section */}
        <section className="mb-20">
          <div className="card-enhanced p-8 md:p-12 rounded-3xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-16">
              <span className="gradient-text">How to Use Our QR Code Creator</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { step: 1, title: 'Enter Content', desc: 'Type your URL or text in the input field above.', icon: '📝', color: 'from-purple-500 to-pink-500' },
                { step: 2, title: 'Select QR Code Style', desc: 'Choose a dinosaur QR code or a standard custom QR code template.', icon: '🦖', color: 'from-green-500 to-emerald-500' },
                { step: 3, title: 'Customize Colors & Background', desc: 'Adjust foreground, background, and dinosaur-themed or abstract patterns.', icon: '🎨', color: 'from-blue-500 to-cyan-500' },
                { step: 4, title: 'Preview in Real Time', desc: 'See the animated QR code generator preview update as you customize.', icon: '👀', color: 'from-orange-500 to-amber-500' },
                { step: 5, title: 'Generate & Download', desc: 'Export as PNG or SVG, fully scannable and matching the preview exactly.', icon: '📥', color: 'from-pink-500 to-rose-500' },
                { step: 6, title: 'Use Anywhere', desc: 'Print, digital campaigns, social media, merchandise, or classroom materials.', icon: '🌐', color: 'from-indigo-500 to-purple-500' },
              ].map((item) => (
                <div key={item.step} className="group card-hover p-7 bg-gradient-to-br from-white to-gray-50 rounded-2xl border-2 border-gray-100/50 hover:border-purple-200/50 relative overflow-hidden transition-all duration-300">
                  <div className={`absolute -top-5 -left-5 w-16 h-16 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center text-white font-bold text-xl shadow-2xl z-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300`}>
                    {item.step}
                  </div>
                  <div className="text-6xl mb-5 mt-3 relative z-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">{item.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 relative z-10">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed relative z-10">{item.desc}</p>
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="mb-20">
          <div className="card-enhanced p-8 md:p-12 rounded-3xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-16">
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
                <div key={idx} className={`group card-hover p-8 bg-gradient-to-br ${useCase.color} rounded-2xl text-white shadow-2xl relative overflow-hidden hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/10 group-hover:to-white/5 transition-all duration-300"></div>
                  <div className="text-7xl mb-6 relative z-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">{useCase.icon}</div>
                  <h3 className="text-xl font-bold mb-3 relative z-10">{useCase.title}</h3>
                  <p className="text-white/95 text-sm leading-relaxed relative z-10">{useCase.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20">
          <div className="card-enhanced p-8 md:p-12 rounded-3xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-16">
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
                <div key={idx} className="group card-hover p-7 bg-gradient-to-br from-gray-50 via-white to-purple-50/30 rounded-2xl border-2 border-gray-200/50 hover:border-purple-200/50 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-300"></div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-start gap-3 relative z-10">
                    <span className="text-purple-600 text-2xl font-extrabold group-hover:scale-110 transition-transform duration-300">Q:</span>
                    <span className="flex-1">{faq.q}</span>
                  </h3>
                  <p className="text-gray-700 leading-relaxed ml-10 flex items-start gap-3 relative z-10">
                    <span className="text-green-600 font-bold text-xl group-hover:scale-110 transition-transform duration-300">A:</span>
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
    </>
  )
}

export default App

