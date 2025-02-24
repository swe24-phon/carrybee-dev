import React, { useState } from 'react';
import MapComponent from '../components/MapComponent';
import NavbarComponent from '../components/NavbarComponent';
import BannerComponent from '../components/BannerComponent';
import DestinationBoxComponent from '../components/DestinationBoxComponent';
import BottomNavComponent from '../components/bottomNavComponent';
import '../css/homepage.css';
import '../css/topnav.css'
import '../css/bottomnav.css'


const HomePage: React.FC = () => {
  const [pickupCoords, setPickupCoords] = useState<google.maps.LatLng | null>(null);
  const [dropoffCoords, setDropoffCoords] = useState<google.maps.LatLng | null>(null);
  return (
    <div>
      <NavbarComponent />
      <BannerComponent />
      <DestinationBoxComponent setPickupCoords={setPickupCoords} setDropoffCoords={setDropoffCoords} />
      <MapComponent pickupCoords={pickupCoords} dropoffCoords={dropoffCoords} />
      <BottomNavComponent />
    </div>
  );
};

export default HomePage;
