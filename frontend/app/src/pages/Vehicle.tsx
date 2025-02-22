import React from 'react';
import NavbarComponent from '../components/NavbarComponent';
import BottomNav from '../components/BottomNavComponent';
import VehicleTypeComponent from '../components/VehicleCardComponent';
import PrevButtonComponent from '../components/PreviousButton';
import ProceedButtonComponent from '../components/ProceedButton';
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
      <BottomNav />
    </>
  );
};

export default Vehicle;
