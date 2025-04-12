import React, { useState, useEffect, useRef } from 'react'
import { LoadScript, GoogleMap } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%',
};

// Set default center to India's coordinates
const defaultCenter = {
    lat: 20.5937,
    lng: 78.9629
};

const LIBRARIES = ['marker'];

const LiveTracking = () => {
    const [currentPosition, setCurrentPosition] = useState(defaultCenter);
    const [error, setError] = useState(null);
    const mapRef = useRef(null);
    const markerRef = useRef(null);

    const onLoad = async (map) => {
        mapRef.current = map;
        // Import the marker library and create marker after map loads
        try {
            // eslint-disable-next-line no-undef
            const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");
            const pin = new PinElement({
                background: "red", // Google Blue color
                borderColor: "#2962EA",
                glyphColor: "#FFFFFF",
                scale: 1.5
            });

            markerRef.current = new AdvancedMarkerElement({
                map,
                position: currentPosition,
                title: "Current Location",
                content: pin.element
            });
        } catch (error) {
            console.error("Error creating advanced marker:", error);
        }
    };

    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by this browser.");
            return;
        }

        const updatePosition = async (position) => {
            const { latitude, longitude } = position.coords;
            const newPosition = { lat: latitude, lng: longitude };
            setCurrentPosition(newPosition);

            // Update marker position if it exists
            if (markerRef.current) {
                markerRef.current.position = newPosition;
            }
            
            setError(null);
        };

        const handleError = error => {
            console.warn('Geolocation error:', error);
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    setError("Please enable location permissions.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    setError("Location information unavailable.");
                    break;
                case error.TIMEOUT:
                    setError("Location request timed out. Retrying...");
                    navigator.geolocation.getCurrentPosition(
                        updatePosition,
                        handleError,
                        {
                            enableHighAccuracy: false,
                            maximumAge: 30000,
                            timeout: 27000
                        }
                    );
                    break;
                default:
                    setError("An unknown error occurred.");
                    break;
            }
        };

        // Initial position request
        navigator.geolocation.getCurrentPosition(
            updatePosition,
            handleError,
            {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 15000
            }
        );

        // Watch position
        const watchId = navigator.geolocation.watchPosition(
            updatePosition,
            handleError,
            {
                enableHighAccuracy: false,
                maximumAge: 10000,
                timeout: 15000
            }
        );

        return () => {
            if (watchId) {
                navigator.geolocation.clearWatch(watchId);
            }
            // Cleanup marker
            if (markerRef.current) {
                markerRef.current.map = null;
            }
        };
    }, []);

    return (
        <LoadScript 
            googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
            libraries={LIBRARIES}
        >
            {error && (
                <div className="absolute top-0 left-0 right-0 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
                    {error}
                </div>
            )}
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={currentPosition}
                zoom={15}
                onLoad={onLoad}
                options={{
                    mapId: 'YOUR_MAP_ID',
                    zoomControl: true,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                }}
            >
            </GoogleMap>
        </LoadScript>
    );
};

export default LiveTracking;