import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarComponent from '../components/NavbarComponent';
import BottomNavbarComponent from '../components/bottomNavComponent'
import CheckboxComponent from '../components/checkboxComponent';
import FormComponent from '../components/formComponent';
import ParcelCardComponent from '../components/parcelCardComponent';
import CameraComponent from '../components/cameraComponent';
import '../css/form.css';
import '../css/parcelType.css';
import '../css/topnav.css';
import '../css/bottomnav.css'

const Form = () => {
  return (
    <>
      <NavbarComponent />
      <ParcelCardComponent />
      <CheckboxComponent />
      <FormComponent />
      <CameraComponent />
      <BottomNavbarComponent />
    </>
  );
};

export default Form;
