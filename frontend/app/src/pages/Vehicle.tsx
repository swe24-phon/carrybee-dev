import React from 'react';
import NavbarComponent from '../components/NavbarComponent';
import BottomNavbarComponent from '../components/bottomNavComponent';
import VehicleTypeComponent from '../components/vehicleCardComponent';
import PrevButtonComponent from '../components/previousButton';
import ProceedButtonComponent from '../components/proceedButton';
import { useNavigate } from 'react-router-dom';
import '../css/topnav.css';
import '../css/bottomnav.css';

interface PrevButtonProps {
  onClick: () => void;

}

const Vehicle = () => {
  const navigate = useNavigate(); // usage of useNavigate
  return (
    <>
      <NavbarComponent />
      <VehicleTypeComponent />
      <div id='vehicle-buttons' >
        <div id='prev-button'>
        <PrevButtonComponent onClick={() => navigate('/Form')}/>
        </div>
        <ProceedButtonComponent onClick={() => navigate('/Payment')}/>
      </div>
      <BottomNavbarComponent />
    </>
  );
};

export default Vehicle;
