import React from 'react';
import MapComponent from '../components/MapComponent';
import NavbarComponent from '../components/NavbarComponent';
import BannerComponent from '../components/bannerComponent';
import DestinationBoxComponent from '../components/destinationBoxComponent';
import BottomNavComponent from '../components/bottomNavComponent';
import '../css/homepage.css';

const HomePage = () => {
  return (
    <div>
      <NavbarComponent />
      <BannerComponent />
      <DestinationBoxComponent />
      <MapComponent />
      <BottomNavComponent />
    </div>
  );
};

export default HomePage;
