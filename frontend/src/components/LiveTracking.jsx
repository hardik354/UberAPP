import React, { useState, useEffect } from 'react'
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api'

const containerStyle = {
    width: '100%',
    height: '100%',
};

const center = {
    lat: -3.745,
    lng: -38.523
};

const LiveTracking = () => {
    const [currentPosition, setCurrentPosition] = useState(center);

    useEffect(() => {
        if (!navigator.geolocation) {
            console.error("Geolocation is not supported by this browser.");
            return;
        }

        // Update position callback
        const updatePosition = position => {
            const { latitude, longitude } = position.coords;
            console.log('Position updated:', latitude, longitude);
            setCurrentPosition({
                lat: latitude,
                lng: longitude
            });
        };

        const handleError = error => {
            console.error('Geolocation error:', error);
        };

        // Get the current position once
        navigator.geolocation.getCurrentPosition(updatePosition, handleError);

        // Watch the position for continuous tracking
        const watchId = navigator.geolocation.watchPosition(updatePosition, handleError, {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 5000,
        });

        // Cleanup the watcher on unmount
        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    return (
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={currentPosition}
                zoom={15}
            >
                <Marker position={currentPosition} />
            </GoogleMap>
        </LoadScript>
    )
}

export default LiveTracking