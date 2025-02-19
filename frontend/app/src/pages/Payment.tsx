import React from 'react';
import NavbarComponent from '../components/NavbarComponent';
import BottomNavbarComponent from '../components/BottomNavComponent';
import VehicleTypeComponent from '../components/VehicleCardComponent';
import NextButtonComponent from '../components/NextButton';
import PrevButtonComponent from '../components/PreviousButton';
import { useNavigate } from 'react-router-dom';
import '../css/TopNav.css';
import '../css/bottomnav.css';

const Payment = () => {
  const navigate = useNavigate(); // usage of useNavigate
  return (
    <>
    < NavbarComponent/>
    <h1>Payment</h1>
    <BottomNavbarComponent />
    </>
  );
};

export default Payment;
