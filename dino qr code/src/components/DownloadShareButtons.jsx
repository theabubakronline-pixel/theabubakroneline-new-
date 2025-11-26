import { useState } from 'react'
import * as htmlToImage from 'html-to-image'

const DownloadShareButtons = ({ qrRef, inputValue, selectedTemplate, backgroundPattern, backgroundColor }) => {
  const [downloading, setDownloading] = useState(false)

  /**
   * Download as PNG using html-to-image for perfect preview matching
   * This captures exactly what the user sees in the preview
   */
  const downloadAsPNG = async () => {
    if (!qrRef || !qrRef.current) {
      alert('QR code not ready. Please wait a moment and try again.')
      return
    }
    
    setDownloading(true)
    try {
      // Wait a moment to ensure all shapes are rendered
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const container = qrRef.current
      
      // Find the preview container that includes background patterns
      // The container with background patterns is the parent of the QR code white box
      let previewContainer = container.closest('.bg-white')?.parentElement
      
      // If not found, try finding by class pattern
      if (!previewContainer) {
        const allContainers = document.querySelectorAll('[class*="min-h"]')
        previewContainer = Array.from(allContainers).find(el => 
          el.contains(container) && el.classList.toString().includes('bg-gradient')
        )
      }
      
      // Fallback to the QR code container itself
      if (!previewContainer) {
        previewContainer = container.closest('.bg-white') || container
      }
      
      // Use html-to-image to capture exactly what's shown (including background patterns)
      const dataUrl = await htmlToImage.toPng(previewContainer, {
        quality: 1.0,
        pixelRatio: 2, // Higher resolution
        backgroundColor: '#ffffff',
        cacheBust: true,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
        }
      })
      
      // Create download link
      const link = document.createElement('a')
      link.download = `dino-qr-code-${selectedTemplate.name.toLowerCase()}.png`
      link.href = dataUrl
      link.click()
      
      console.log('✓ PNG downloaded successfully with all dinosaur shapes')
      setDownloading(false)
    } catch (error) {
      console.error('Error downloading PNG:', error)
      alert('Error downloading PNG. Please try again.')
      setDownloading(false)
    }
  }

  return (
    <div className="w-full">
      <button
        onClick={downloadAsPNG}
        disabled={downloading}
        className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95"
      >
        {downloading ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="text-sm">Downloading...</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="text-sm">Download QR Code</span>
          </>
        )}
      </button>
    </div>
  )
}

export default DownloadShareButtons


