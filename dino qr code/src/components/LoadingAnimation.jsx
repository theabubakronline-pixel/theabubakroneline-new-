import { useState, useEffect } from 'react'

const LoadingAnimation = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Fast loading - complete in 800ms
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsComplete(true)
          setTimeout(() => {
            if (onComplete) onComplete()
          }, 200)
          return 100
        }
        return prev + 8
      })
    }, 30)

    return () => clearInterval(interval)
  }, [onComplete])

  if (isComplete) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 flex items-center justify-center overflow-hidden">
      {/* Animated QR code pattern background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 21px),
                           repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 21px)`,
          animation: 'qr-pattern 2s linear infinite',
        }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* Rotating QR code morphing into dinosaur */}
        <div className="relative mb-8">
          <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto">
            {/* QR Code pattern */}
            <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '3s' }}>
              <div className="w-full h-full bg-white/20 rounded-lg p-3">
                <div className="grid grid-cols-4 gap-1 h-full">
                  {[...Array(16)].map((_, i) => (
                    <div
                      key={i}
                      className={`bg-white rounded transition-all duration-300 ${
                        i % 5 === 0 || i % 7 === 0 ? 'opacity-100' : 'opacity-50'
                      }`}
                      style={{
                        animation: `pulse ${0.5 + (i % 3) * 0.2}s ease-in-out infinite`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Dinosaur emoji overlay */}
            <div className="absolute inset-0 flex items-center justify-center animate-scale-in">
              <span className="text-6xl md:text-7xl animate-bounce" style={{ animationDuration: '0.8s' }}>
                🦖
              </span>
            </div>
          </div>
        </div>

        {/* Title with gradient text */}
        <h1 className="text-3xl md:text-5xl font-black text-white mb-2 drop-shadow-2xl">
          <span className="bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 bg-clip-text text-transparent animate-gradient">
            DINO QR
          </span>
        </h1>
        <p className="text-lg md:text-xl text-white/90 font-semibold mb-6">
          Creating magic...
        </p>

        {/* Fast progress bar */}
        <div className="w-64 md:w-80 mx-auto">
          <div className="h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className="h-full bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 rounded-full transition-all duration-75 ease-linear relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </div>
          <div className="mt-2 text-white/80 text-sm font-medium">
            {progress}%
          </div>
        </div>
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes qr-pattern {
          0% { transform: translate(0, 0); }
          100% { transform: translate(20px, 20px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes scale-in {
          0% { transform: scale(0) rotate(-180deg); opacity: 0; }
          50% { transform: scale(1.2) rotate(0deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        .animate-scale-in {
          animation: scale-in 0.6s ease-out;
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 2s linear infinite;
        }
        .animate-shimmer {
          animation: shimmer 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default LoadingAnimation

