import React, { useState, useEffect } from 'react';
import { LoadScript, GoogleMap, Marker, Libraries } from '@react-google-maps/api';

const GOOGLE_MAPS_API_KEY = "AIzaSyB613qjkRHO_l58B_9cF_ja3Tp7DKBT_y4";

// Define libraries array using the 'Libraries' type
const libraries: Libraries = ['places', 'geometry'];

interface Props {
  pickupCoords: google.maps.LatLng | null;
  dropoffCoords: google.maps.LatLng | null;
}

const MapComponent: React.FC<Props> = ({ pickupCoords, dropoffCoords }) => {
  const [zoomLevel, setZoomLevel] = useState<number>(11);

  useEffect(() => {
    if (pickupCoords && dropoffCoords) {
      const distance = google.maps.geometry.spherical.computeDistanceBetween(pickupCoords, dropoffCoords);
      if (distance < 5000) {
        setZoomLevel(14); // closer zoom for shorter distances
      } else if (distance < 10000) {
        setZoomLevel(12); // medium zoom
      } else {
        setZoomLevel(11); // default zoom
      }
    }
  }, [pickupCoords, dropoffCoords]);
console.log(`pickup-coordinates: ${pickupCoords}, drop-off-coordinates: ${dropoffCoords}`)
  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={libraries}>
  <GoogleMap
    id="map"
    mapContainerStyle={{ width: '92%', height: '400px' }}
    zoom={zoomLevel}
    center={pickupCoords ? pickupCoords.toJSON() : dropoffCoords ? dropoffCoords.toJSON() : { lat: -37.8136, lng: 144.9631 }} // Default to Melbourne
    options={{
      disableDefaultUI: true,  // Disables all default UI controls
      zoomControl: false,      // Disables zoom control
      mapTypeControl: false,   // Disables map type control (e.g., switch between roadmap and satellite)
      streetViewControl: false // Disables street view control
    }}
  >
    {pickupCoords && (
      <Marker
        position={pickupCoords}
        title="Pick-up Location"
      />
    )}
    {dropoffCoords && (
      <Marker
        position={dropoffCoords}
        title="Drop-off Location"
      />
    )}
  </GoogleMap>
</LoadScript>
  );
};

export default MapComponent;
