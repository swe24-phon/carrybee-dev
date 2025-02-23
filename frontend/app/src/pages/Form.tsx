import React from 'react';
import NavbarComponent from '../components/NavbarComponent';
import BottomNavComponent from '../components/bottomNavComponent';
import CheckboxComponent from '../components/CheckboxComponent';
import FormComponent from '../components/FormComponent';
import ParcelCardComponent from '../components/ParcelCardComponent';
import CameraComponent from '../components/cameraComponent';
import '../css/form.css';
import '../css/parcelType.css';
import '../css/topnav.css';
import '../css/bottomnav.css';

const Form = () => {
  return (
    <>
      <NavbarComponent />
      <ParcelCardComponent />
      <CheckboxComponent />
      <FormComponent />
      <CameraComponent />
      <div style={{ position: 'sticky', bottom: 0 }}>
        <BottomNavComponent />
      </div>
    </>
  );
};

export default Form;
