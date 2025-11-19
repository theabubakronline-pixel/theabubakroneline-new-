import { useState, useEffect } from 'react'

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    // Get theme from localStorage or default to light
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  // Get base path for navigation links
  const basePath = '/tool/dino-qr-code-generator'
  const websiteBase = 'https://theabubakronline.com'

  return (
    <>
      <header className="header" style={{
        position: 'fixed',
        top: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 48px)',
        maxWidth: '1400px',
        zIndex: 1000,
        backgroundColor: 'var(--header-bg)',
        color: 'var(--header-text)',
        borderRadius: '999px',
        padding: '12px 24px',
        boxShadow: '0 4px 24px var(--header-shadow)',
        backdropFilter: 'blur(20px)',
        border: '1px solid var(--header-border)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%'
        }}>
          {/* Logo/Brand */}
          <div className="logo">
            <a href={`${websiteBase}/`} className="logo-link" style={{
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  backgroundColor: 'var(--header-text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <img 
                    src={`${websiteBase}/assets/images/the-abubakr-online-logo-muhammad-abubakr-ai-tech-marketing.png`}
                    alt="Muhammad Abubakr"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                  <div style={{
                    display: 'none',
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'var(--header-text-secondary)',
                    color: 'var(--header-bg)',
                    fontWeight: 'bold',
                    fontSize: '18px'
                  }}>MA</div>
                </div>
                <span style={{
                  fontWeight: '600',
                  fontSize: '16px',
                  whiteSpace: 'nowrap'
                }}>Muhammad Abubakr</span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="nav-desktop" style={{
            display: 'none',
            alignItems: 'center',
            gap: '4px'
          }}>
            <a href={`${websiteBase}/`} style={{
              padding: '8px 12px',
              textDecoration: 'none',
              color: 'var(--header-text-secondary)',
              fontSize: '14px',
              fontWeight: '500',
              borderRadius: '8px',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => e.target.style.color = 'var(--header-text)'}
            onMouseLeave={(e) => e.target.style.color = 'var(--header-text-secondary)'}
            >Home</a>
            <a href={`${websiteBase}/about.html`} style={{
              padding: '8px 12px',
              textDecoration: 'none',
              color: 'var(--header-text-secondary)',
              fontSize: '14px',
              fontWeight: '500',
              borderRadius: '8px',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => e.target.style.color = 'var(--header-text)'}
            onMouseLeave={(e) => e.target.style.color = 'var(--header-text-secondary)'}
            >About</a>
            <a href={`${websiteBase}/projects.html`} style={{
              padding: '8px 12px',
              textDecoration: 'none',
              color: 'var(--header-text-secondary)',
              fontSize: '14px',
              fontWeight: '500',
              borderRadius: '8px',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => e.target.style.color = 'var(--header-text)'}
            onMouseLeave={(e) => e.target.style.color = 'var(--header-text-secondary)'}
            >Projects</a>
            <a href={`${websiteBase}/blog.html`} style={{
              padding: '8px 12px',
              textDecoration: 'none',
              color: 'var(--header-text-secondary)',
              fontSize: '14px',
              fontWeight: '500',
              borderRadius: '8px',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => e.target.style.color = 'var(--header-text)'}
            onMouseLeave={(e) => e.target.style.color = 'var(--header-text-secondary)'}
            >Blog</a>
            <a href={`${websiteBase}/tools.html`} style={{
              padding: '8px 12px',
              textDecoration: 'none',
              color: 'var(--header-text)',
              fontSize: '14px',
              fontWeight: '600',
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap'
            }}>Tools</a>
            <a href={`${websiteBase}/contact.html`} style={{
              padding: '8px 12px',
              textDecoration: 'none',
              color: 'var(--header-text-secondary)',
              fontSize: '14px',
              fontWeight: '500',
              borderRadius: '8px',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => e.target.style.color = 'var(--header-text)'}
            onMouseLeave={(e) => e.target.style.color = 'var(--header-text-secondary)'}
            >Contact</a>
          </nav>

          {/* Header Actions */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            {/* CTA Button - Desktop Only */}
            <a 
              href={`${websiteBase}/contact.html#contact-form`}
              style={{
                display: 'none',
                padding: '10px 20px',
                backgroundColor: 'var(--cta-bg)',
                color: 'var(--cta-text)',
                textDecoration: 'none',
                borderRadius: '999px',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap'
              }}
              className="cta-desktop"
            >
              Want to talk?
            </a>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: 'transparent',
                color: 'var(--header-text)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                transition: 'all 0.2s'
              }}
            >
              {theme === 'light' ? '☀️' : '🌙'}
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: 'transparent',
                color: 'var(--header-text)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                transition: 'all 0.2s'
              }}
              className="mobile-menu-toggle"
            >
              <span style={{
                width: '20px',
                height: '2px',
                backgroundColor: 'currentColor',
                borderRadius: '2px',
                transition: 'all 0.3s',
                transform: isMobileMenuOpen ? 'rotate(45deg) translateY(6px)' : 'none'
              }}></span>
              <span style={{
                width: '20px',
                height: '2px',
                backgroundColor: 'currentColor',
                borderRadius: '2px',
                transition: 'all 0.3s',
                opacity: isMobileMenuOpen ? 0 : 1
              }}></span>
              <span style={{
                width: '20px',
                height: '2px',
                backgroundColor: 'currentColor',
                borderRadius: '2px',
                transition: 'all 0.3s',
                transform: isMobileMenuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none'
              }}></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div
          onClick={closeMobileMenu}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: 999,
            animation: 'fadeIn 0.3s ease'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'fixed',
              top: '100px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'calc(100% - 48px)',
              maxWidth: '400px',
              backgroundColor: 'var(--header-bg)',
              borderRadius: '24px',
              padding: '24px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              zIndex: 1000
            }}
          >
            <nav style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <a
                href={`${websiteBase}/`}
                onClick={closeMobileMenu}
                style={{
                  padding: '16px',
                  textDecoration: 'none',
                  color: 'var(--header-text)',
                  fontSize: '16px',
                  fontWeight: '500',
                  borderRadius: '12px',
                  transition: 'all 0.2s'
                }}
              >Home</a>
              <a
                href={`${websiteBase}/about.html`}
                onClick={closeMobileMenu}
                style={{
                  padding: '16px',
                  textDecoration: 'none',
                  color: 'var(--header-text)',
                  fontSize: '16px',
                  fontWeight: '500',
                  borderRadius: '12px',
                  transition: 'all 0.2s'
                }}
              >About</a>
              <a
                href={`${websiteBase}/projects.html`}
                onClick={closeMobileMenu}
                style={{
                  padding: '16px',
                  textDecoration: 'none',
                  color: 'var(--header-text)',
                  fontSize: '16px',
                  fontWeight: '500',
                  borderRadius: '12px',
                  transition: 'all 0.2s'
                }}
              >Projects</a>
              <a
                href={`${websiteBase}/blog.html`}
                onClick={closeMobileMenu}
                style={{
                  padding: '16px',
                  textDecoration: 'none',
                  color: 'var(--header-text)',
                  fontSize: '16px',
                  fontWeight: '500',
                  borderRadius: '12px',
                  transition: 'all 0.2s'
                }}
              >Blog</a>
              <a
                href={`${websiteBase}/tools.html`}
                onClick={closeMobileMenu}
                style={{
                  padding: '16px',
                  textDecoration: 'none',
                  color: 'var(--header-text)',
                  fontSize: '16px',
                  fontWeight: '600',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.2s'
                }}
              >Tools</a>
              <a
                href={`${websiteBase}/contact.html`}
                onClick={closeMobileMenu}
                style={{
                  padding: '16px',
                  textDecoration: 'none',
                  color: 'var(--header-text)',
                  fontSize: '16px',
                  fontWeight: '500',
                  borderRadius: '12px',
                  transition: 'all 0.2s'
                }}
              >Contact</a>
              <a
                href={`${websiteBase}/contact.html#contact-form`}
                onClick={closeMobileMenu}
                style={{
                  marginTop: '8px',
                  padding: '16px',
                  textDecoration: 'none',
                  backgroundColor: 'var(--cta-bg)',
                  color: 'var(--cta-text)',
                  fontSize: '16px',
                  fontWeight: '600',
                  borderRadius: '12px',
                  textAlign: 'center',
                  transition: 'all 0.2s'
                }}
              >Want to talk?</a>
            </nav>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 992px) {
          .nav-desktop {
            display: flex !important;
          }
          .cta-desktop {
            display: block !important;
          }
          .mobile-menu-toggle {
            display: none !important;
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .logo-link:hover {
          opacity: 0.9;
        }
        .cta-desktop:hover {
          background-color: var(--cta-hover-bg) !important;
          color: var(--cta-hover-text) !important;
        }
      `}</style>
    </>
  )
}

export default Header

