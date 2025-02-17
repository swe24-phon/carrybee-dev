import React from 'react';
import NavbarComponent from '../components/NavbarComponent';
import BottomNavbarComponent from '../components/bottomNavComponent';
import VehicleTypeComponent from '../components/vehicleCardComponent';
import NextButtonComponent from '../components/nextButton';
import PrevButtonComponent from '../components/previousButton';
import { useNavigate } from 'react-router-dom';
import '../css/topnav.css';
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
