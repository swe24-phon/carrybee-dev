import React from 'react';
import NavbarComponent from '../components/NavbarComponent';
import BottomNavbarComponent from '../components/BottomNavComponent';
import CheckboxComponent from '../components/CheckboxComponent';
import FormComponent from '../components/FormComponent';
import ParcelCardComponent from '../components/ParcelCardComponent';
import CameraComponent from '../components/CameraComponent';
import '../css/form.css';
import '../css/parcelType.css';
import '../css/TopNav.css';
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
        <BottomNavbarComponent /> // bottom nav for form page needs different prop
      </div>
    </>
  );
};

export default Form;
