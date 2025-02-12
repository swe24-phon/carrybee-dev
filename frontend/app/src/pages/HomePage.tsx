import React from 'react';
import MapComponent from '../components/MapComponent';
import NavbarComponent from '../components/NavbarComponent';
import DestinationBoxComponent from '../components/destinationBoxComponent';
import '../css/homepage.css';

const HomePage = () => {
  return (
    <div>
      <NavbarComponent />
      <DestinationBoxComponent />
      <MapComponent />
    </div>
  );
};

export default HomePage;
