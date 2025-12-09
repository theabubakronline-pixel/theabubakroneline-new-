import { useEffect, useRef, useState } from 'react'

const LocationPicker = ({ onLocationSelect, initialLat = null, initialLng = null }) => {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markerRef = useRef(null)
  const geocoderRef = useRef(null)
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check if Google Maps is already loaded
    if (window.google && window.google.maps) {
      initializeMap()
      setIsLoading(false)
      return
    }

    // Check if script is already being loaded
    if (document.querySelector('script[src*="maps.googleapis.com"]')) {
      // Wait for existing script to load
      const checkGoogleMaps = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(checkGoogleMaps)
          initializeMap()
          setIsLoading(false)
        }
      }, 100)
      return () => clearInterval(checkGoogleMaps)
    }

    // Load Google Maps script
    const script = document.createElement('script')
    // Get API key from environment variable or use a test key
    // To use your own: Create .env file with VITE_GOOGLE_MAPS_API_KEY=your_key_here
    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
    
    if (!API_KEY) {
      setError('Google Maps API key is required. Please add VITE_GOOGLE_MAPS_API_KEY to your .env file. Get a free key at: https://console.cloud.google.com/google/maps-apis')
      setIsLoading(false)
      return
    }
    
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&callback=initGoogleMap`
    script.async = true
    script.defer = true
    
    // Add timeout to detect if callback never fires
    const timeout = setTimeout(() => {
      if (!window.google || !window.google.maps) {
        setError('Google Maps failed to load (timeout). Check: 1) API key is valid, 2) Required APIs are enabled, 3) Billing is enabled, 4) API key restrictions allow localhost, 5) Check browser console for errors')
        setIsLoading(false)
      }
    }, 10000) // 10 second timeout

    // Create global callback with error handling
    window.initGoogleMap = () => {
      clearTimeout(timeout)
      try {
        initializeMap()
        setIsLoading(false)
      } catch (err) {
        console.error('Google Maps initialization error:', err)
        setError(`Map initialization failed: ${err.message}. Check browser console for details.`)
        setIsLoading(false)
      }
    }

    // Handle script load errors
    script.onerror = (error) => {
      clearTimeout(timeout)
      console.error('Google Maps script load error:', error)
      setError('Failed to load Google Maps. Please check: 1) API key is correct, 2) Billing is enabled, 3) Required APIs are enabled (Maps JavaScript API, Geocoding API, Places API), 4) API key restrictions allow localhost')
      setIsLoading(false)
    }

    document.head.appendChild(script)

    return () => {
      // Cleanup
      if (window.initGoogleMap) {
        delete window.initGoogleMap
      }
      clearTimeout(timeout)
    }
  }, [])

  const initializeMap = () => {
    if (!window.google || !window.google.maps) {
      setError('Google Maps failed to load. Check browser console for errors.')
      setIsLoading(false)
      return
    }

    // Check if mapRef is available
    if (!mapRef.current) {
      console.error('Map container not available')
      setError('Map container not found')
      setIsLoading(false)
      return
    }

    const defaultLat = initialLat || 40.7128
    const defaultLng = initialLng || -74.0060

    // Initialize map with mobile-optimized settings
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: parseFloat(defaultLat) || 40.7128, lng: parseFloat(defaultLng) || -74.0060 },
      zoom: 13,
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true,
      gestureHandling: 'greedy', // Better touch handling on mobile
      disableDefaultUI: false,
      zoomControl: true,
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.RIGHT_CENTER
      },
      mapTypeControlOptions: {
        position: window.google.maps.ControlPosition.TOP_RIGHT,
        style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR
      }
    })

    mapInstanceRef.current = map

    // Initialize geocoder
    geocoderRef.current = new window.google.maps.Geocoder()

    // Add click listener to map
    map.addListener('click', (event) => {
      const lat = event.latLng.lat()
      const lng = event.latLng.lng()
      
      // Update marker position
      if (markerRef.current) {
        markerRef.current.setPosition({ lat, lng })
      } else {
        markerRef.current = new window.google.maps.Marker({
          position: { lat, lng },
          map: map,
          draggable: true,
          animation: window.google.maps.Animation.DROP,
        })

        // Add drag listener
        markerRef.current.addListener('dragend', (event) => {
          const newLat = event.latLng.lat()
          const newLng = event.latLng.lng()
          geocodeLocation(newLat, newLng)
        })
      }

      // Geocode to get address
      geocodeLocation(lat, lng)
    })

    // Add search box - Mobile Optimized
    const input = document.createElement('input')
    input.type = 'text'
    input.placeholder = 'Search for a location...'
    input.className = 'w-full max-w-xs sm:max-w-sm md:max-w-md px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm border-2 border-gray-300 rounded-lg sm:rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-md placeholder:text-gray-400'
    input.style.fontSize = '14px'
    input.style.margin = '8px'
    
    const searchBox = new window.google.maps.places.SearchBox(input)
    
    // Add search box to map
    map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(input)

    // Bias search results to current map viewport
    map.addListener('bounds_changed', () => {
      searchBox.setBounds(map.getBounds())
    })

    // Listen for selection from search box
    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces()
      if (places.length === 0) return

      const place = places[0]
      if (!place.geometry || !place.geometry.location) return

      // Set marker at selected place
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }

      if (markerRef.current) {
        markerRef.current.setPosition(location)
      } else {
        markerRef.current = new window.google.maps.Marker({
          position: location,
          map: map,
          draggable: true,
        })
      }

      map.setCenter(location)
      map.setZoom(15)

      // Update location
      geocodeLocation(location.lat, location.lng)
    })

    // Set initial location if provided
    if (initialLat && initialLng) {
      const location = { lat: parseFloat(initialLat), lng: parseFloat(initialLng) }
      markerRef.current = new window.google.maps.Marker({
        position: location,
        map: map,
        draggable: true,
      })
      map.setCenter(location)
      geocodeLocation(location.lat, location.lng)
    }

    setIsLoading(false)
  }

  const geocodeLocation = (lat, lng) => {
    if (!geocoderRef.current) return

    geocoderRef.current.geocode(
      { location: { lat, lng } },
      (results, status) => {
        if (status === 'OK' && results[0]) {
          const address = results[0].formatted_address
          const locationData = {
            lat: lat.toString(),
            lng: lng.toString(),
            address: address
          }
          setSelectedLocation(locationData)
          onLocationSelect(locationData)
        } else {
          // Still set coordinates even if geocoding fails
          const locationData = {
            lat: lat.toString(),
            lng: lng.toString(),
            address: ''
          }
          setSelectedLocation(locationData)
          onLocationSelect(locationData)
        }
      }
    )
  }

  return (
    <div className="space-y-2 sm:space-y-3">
      {/* Mobile-Optimized Map Container */}
      <div className="relative w-full h-[280px] sm:h-64 md:h-80 lg:h-96 rounded-lg sm:rounded-xl overflow-hidden border-2 border-gray-300 shadow-md map-container">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
            <div className="text-center px-4">
              <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 border-b-2 border-green-600 mx-auto mb-2"></div>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">Loading Google Maps...</p>
            </div>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-50 z-10 p-4">
            <div className="text-center max-w-sm">
              <p className="text-xs sm:text-sm text-red-600 font-medium">{error}</p>
            </div>
          </div>
        )}
        <div ref={mapRef} className="w-full h-full touch-pan-x touch-pan-y"></div>
      </div>
      
      {/* Selected Location Info - Mobile Responsive */}
      {selectedLocation && (
        <div className="p-3 sm:p-4 bg-green-50 rounded-lg sm:rounded-xl border border-green-200 shadow-sm">
          <div className="flex items-start gap-2 mb-2">
            <span className="text-base sm:text-lg flex-shrink-0">📍</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-2">Selected Location:</p>
              <div className="space-y-1.5">
                <p className="text-xs sm:text-sm text-gray-600 break-all">
                  <strong className="text-gray-700">Coordinates:</strong> {selectedLocation.lat}, {selectedLocation.lng}
                </p>
                {selectedLocation.address && (
                  <p className="text-xs sm:text-sm text-gray-600 break-words">
                    <strong className="text-gray-700">Address:</strong> {selectedLocation.address}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Helpful Tip - Mobile Optimized */}
      <div className="flex items-start gap-2 p-2 sm:p-3 bg-blue-50 rounded-lg border border-blue-100">
        <span className="text-sm sm:text-base flex-shrink-0 mt-0.5">💡</span>
        <p className="text-[10px] sm:text-xs text-gray-600 leading-relaxed">
          <strong className="text-gray-700">Mobile:</strong> Tap the map to select a location. <strong className="text-gray-700">Desktop:</strong> Click or search to select. Drag the marker to adjust position.
        </p>
      </div>
    </div>
  )
}

export default LocationPicker

