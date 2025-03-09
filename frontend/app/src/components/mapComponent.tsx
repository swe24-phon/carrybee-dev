import React, { useState, useEffect, useRef } from 'react';
import { LoadScript, GoogleMap, Libraries } from '@react-google-maps/api';
import pickupMarkerIcon from '../assets/pickup-marker.png'; // Custom icon for pickup
import dropoffMarkerIcon from '../assets/dropoff-marker.png'; // Custom icon for dropoff

const GOOGLE_MAPS_API_KEY = "";

// Define libraries array using the 'Libraries' type
const libraries: Libraries = ['places', 'geometry', 'marker'];

interface Props {
  pickupCoords: google.maps.LatLng | null;
  dropoffCoords: google.maps.LatLng | null;
}

const MapComponent: React.FC<Props> = ({ pickupCoords, dropoffCoords }) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);

  // Function to add a marker with a custom icon
  const addMarker = (map: google.maps.Map, position: google.maps.LatLng, title: string, iconUrl: string) => {
    const marker = new google.maps.Marker({
      position: position.toJSON(),
      map: map,
      title: title,
      icon: {
        url: iconUrl, // Custom icon URL
        scaledSize: new google.maps.Size(40, 40), // Size of the icon
      },
    });

    setMarkers((prevMarkers) => [...prevMarkers, marker]);
  };

  // Function to remove previous markers from the map
  const clearMarkers = () => {
    markers.forEach(marker => marker.setMap(null)); // Remove all markers from the map
    setMarkers([]); // Clear the marker array
  };

  useEffect(() => {
    if (mapRef.current && pickupCoords && dropoffCoords) {
      // Clear previous markers before adding new ones
      clearMarkers();

      const bounds = new google.maps.LatLngBounds();
      bounds.extend(pickupCoords);
      bounds.extend(dropoffCoords);

      mapRef.current.fitBounds(bounds); // Automatically adjusts zoom to fit both markers

      // Add Pickup Marker
      addMarker(mapRef.current, pickupCoords, "Pick-up Location", pickupMarkerIcon);
      // Add Drop-off Marker
      addMarker(mapRef.current, dropoffCoords, "Drop-off Location", dropoffMarkerIcon);
    }
  }, [pickupCoords, dropoffCoords]);

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={libraries}>
      <GoogleMap
        id="map"
        mapContainerStyle={{ width: '100%', height: '440px' }}
        zoom={11} // Default zoom level (will be overridden by fitBounds)
        center={pickupCoords || { lat: -37.8136, lng: 144.9631 }} // Default to Melbourne if no coords
        onLoad={(map) => {
          mapRef.current = map; // Set the map reference for markers
        }}
        options={{
          disableDefaultUI: true,
          zoomControl: true, // Enable zoom control if needed
          mapTypeControl: false,
          streetViewControl: false,
        }}
      />
    </LoadScript>
  );
};

export default MapComponent;
