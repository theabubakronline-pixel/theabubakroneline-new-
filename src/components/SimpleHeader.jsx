function SimpleHeader() {
  const websiteBase = 'https://theabubakronline.com'

  return (
    <header style={{
      position: 'sticky',
      top: '0',
      zIndex: 100,
      marginBottom: '2rem',
      padding: '1rem 0'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.25rem 2rem',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
          backdropFilter: 'blur(30px) saturate(180%)',
          WebkitBackdropFilter: 'blur(30px) saturate(180%)',
          borderRadius: '24px',
          boxShadow: `
            0 8px 32px rgba(147, 51, 234, 0.12),
            0 2px 8px rgba(0, 0, 0, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.9)
          `,
          border: '1px solid rgba(255, 255, 255, 0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Animated background gradient */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(147, 51, 234, 0.1), transparent)',
            animation: 'shimmer 3s infinite'
          }}></div>

          {/* Logo/Brand */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            position: 'relative',
            zIndex: 1
          }}>
            <div style={{
              fontSize: '2.5rem',
              filter: 'drop-shadow(0 4px 8px rgba(147, 51, 234, 0.3))',
              animation: 'float 3s ease-in-out infinite',
              transformOrigin: 'center'
            }}>🦖</div>
            <div>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #9333ea 0%, #ec4899 50%, #f97316 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                backgroundSize: '200% auto',
                animation: 'gradient-shift 3s ease infinite',
                letterSpacing: '-0.02em',
                lineHeight: '1.2'
              }}>Dino QR Generator</div>
              <div style={{
                fontSize: '0.75rem',
                color: '#9ca3af',
                fontWeight: '500',
                marginTop: '2px',
                letterSpacing: '0.05em'
              }}>Create Amazing QR Codes</div>
            </div>
          </div>

          {/* Back to Tools Link */}
          <a
            href={`${websiteBase}/tools.html`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #9333ea 0%, #ec4899 50%, #f97316 100%)',
              backgroundSize: '200% auto',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '16px',
              fontWeight: '700',
              fontSize: '15px',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: `
                0 4px 16px rgba(147, 51, 234, 0.4),
                0 2px 4px rgba(0, 0, 0, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.2)
              `,
              position: 'relative',
              overflow: 'hidden',
              zIndex: 1,
              letterSpacing: '0.01em'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'
              e.currentTarget.style.boxShadow = `
                0 8px 24px rgba(147, 51, 234, 0.5),
                0 4px 8px rgba(0, 0, 0, 0.15),
                inset 0 1px 0 rgba(255, 255, 255, 0.3)
              `
              e.currentTarget.style.backgroundPosition = 'right center'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)'
              e.currentTarget.style.boxShadow = `
                0 4px 16px rgba(147, 51, 234, 0.4),
                0 2px 4px rgba(0, 0, 0, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.2)
              `
              e.currentTarget.style.backgroundPosition = 'left center'
            }}
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5"
              style={{
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
            >
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Back to Tools</span>
            {/* Shine effect */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
              transition: 'left 0.5s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.left = '100%'
            }}
            ></div>
          </a>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(5deg);
          }
        }
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% center;
          }
          50% {
            background-position: 100% center;
          }
        }
        @keyframes shimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }
      `}</style>
    </header>
  )
}

export default SimpleHeader

