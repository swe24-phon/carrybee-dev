import React, { useState, useEffect, useRef } from 'react';
import { LoadScript, GoogleMap, Libraries } from '@react-google-maps/api';
import markerIcon from '../assets/marker.png';

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
        url: markerIcon, // Custom icon URL
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

      const iconUrl = "https://media.istockphoto.com/id/1148705812/vector/location-icon-vector-pin-sign-isolated-on-white-background-navigation-map-gps-direction.jpg?s=612x612&w=0&k=20&c=lqEIzW3QedZfytsX30NoBJbHxZZbWnlLsvEiwOSbaow=";
      addMarker(mapRef.current, pickupCoords, "Pick-up Location", iconUrl);
      addMarker(mapRef.current, dropoffCoords, "Drop-off Location", iconUrl);
    }
  }, [pickupCoords, dropoffCoords]);
  console.log(`pickup-coordinates: ${pickupCoords}, drop-off-coordinates: ${dropoffCoords}`)
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
