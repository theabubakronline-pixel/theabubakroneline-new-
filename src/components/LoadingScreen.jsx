import { useState, useEffect } from 'react'

function LoadingScreen() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2
      })
    }, 30)

    // Hide loading screen after animation completes
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(timer)
    }
  }, [])

  if (!loading) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 8s ease infinite',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
      className="loading-screen"
    >
      {/* Animated background dinosaurs */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        opacity: 0.2
      }}>
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              fontSize: `${40 + i * 10}px`,
              animation: `floatDino ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
              left: `${(i * 12.5) % 100}%`,
              top: `${(i * 15) % 100}%`,
            }}
          >
            {['🦖', '🦕', '🦏', '🦅'][i % 4]}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        animation: 'fadeInScale 0.8s ease-out'
      }}>
        {/* Animated Dino Logo */}
        <div style={{
          fontSize: '120px',
          marginBottom: '30px',
          animation: 'bounceRotate 1.5s ease-in-out infinite',
          filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3))',
          transformOrigin: 'center'
        }}>
          🦖
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: '48px',
          fontWeight: '800',
          color: 'white',
          marginBottom: '20px',
          textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Dino QR Generator
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: '18px',
          color: 'rgba(255, 255, 255, 0.9)',
          marginBottom: '40px',
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
        }}>
          Creating amazing QR codes...
        </p>

        {/* Progress Bar */}
        <div style={{
          width: '300px',
          height: '8px',
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '10px',
          overflow: 'hidden',
          margin: '0 auto 20px',
          boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2)'
        }}>
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #ffffff 0%, #f0f0f0 50%, #ffffff 100%)',
              backgroundSize: '200% 100%',
              borderRadius: '10px',
              animation: 'shimmer 2s infinite',
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
              transition: 'width 0.3s ease-out'
            }}
          />
        </div>

        {/* Progress percentage */}
        <div style={{
          fontSize: '16px',
          color: 'rgba(255, 255, 255, 0.8)',
          fontWeight: '600',
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
        }}>
          {progress}%
        </div>

        {/* Loading dots */}
        <div style={{
          display: 'flex',
          gap: '8px',
          justifyContent: 'center',
          marginTop: '30px'
        }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: '12px',
                height: '12px',
                background: 'white',
                borderRadius: '50%',
                animation: `pulseDot 1.4s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
              }}
            />
          ))}
        </div>

        {/* Fun message */}
        <div style={{
          marginTop: '40px',
          fontSize: '14px',
          color: 'rgba(255, 255, 255, 0.7)',
          fontStyle: 'italic',
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
          animation: 'fadeIn 1s ease-out 0.5s backwards'
        }}>
          🦖 Preparing your prehistoric QR codes...
        </div>
      </div>

      <style>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes bounceRotate {
          0%, 100% {
            transform: translateY(0) rotate(0deg) scale(1);
          }
          25% {
            transform: translateY(-20px) rotate(-10deg) scale(1.1);
          }
          50% {
            transform: translateY(-10px) rotate(0deg) scale(1.05);
          }
          75% {
            transform: translateY(-20px) rotate(10deg) scale(1.1);
          }
        }

        @keyframes floatDino {
          0%, 100% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-30px) translateX(20px) rotate(15deg);
            opacity: 0.4;
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        @keyframes pulseDot {
          0%, 100% {
            transform: scale(1);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.3);
            opacity: 1;
          }
        }

        .loading-screen {
          animation: fadeOut 0.5s ease-out 1.8s forwards;
        }

        @keyframes fadeOut {
          to {
            opacity: 0;
            visibility: hidden;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}

export default LoadingScreen

