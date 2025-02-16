import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import '../css/homepage.css';

const MapComponent: React.FC = () => {
  return (
    <LoadScript googleMapsApiKey="add_public_key_here">
      <GoogleMap id='map'
        mapContainerStyle={{ width: '360px', height: '380px' }}
        zoom={13}
        center={{ lat: -37.8136, lng: 144.9631 }} // melbourne coordinates
        options={{
          disableDefaultUI: true,
          keyboardShortcuts: false,
          fullscreenControl: false,
          mapTypeControl: false,
        }}
      >
        {/* Make sure the marker's position is correct */}
        <Marker position={{ lat: -37.8136, lng: 144.9631 }} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
