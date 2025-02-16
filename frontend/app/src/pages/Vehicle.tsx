import React from 'react';
import NavbarComponent from '../components/NavbarComponent';
import BottomNavbarComponent from '../components/bottomNavComponent';
import VehicleTypeComponent from '../components/vehicleCardComponent';
import '../css/topnav.css';
import '../css/bottomnav.css';

const Vehicle = () => {
  return (
    <>
      <NavbarComponent />
      <VehicleTypeComponent />
      <BottomNavbarComponent />
    </>
  );
};

export default Vehicle;
