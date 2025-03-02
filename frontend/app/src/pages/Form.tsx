import React from 'react';
import NavbarComponent from '../components/NavbarComponent';
import BottomNavComponent from '../components/bottomNavComponent';
import MyCheckboxComponent from '../components/MyCheckboxComponent';
import FormComponent from '../components/formComponent';
import ParcelCardComponent from '../components/ParcelCardComponent';
// import CameraComponent from '../components/cameraComponent';
import '../css/form.css';
import '../css/parcelCategory.css';
import '../css/topnav.css';
import '../css/bottomnav.css';

const Form = () => {
  const handleSubmit= () => {
    console.log('Form submitted');
};
  return (
    <>
      <NavbarComponent />
      <ParcelCardComponent />
      <MyCheckboxComponent />
      <FormComponent onSubmit={handleSubmit}  />
      {/* <CameraComponent /> */}
      <div style={{ position: 'sticky', bottom: 0 }}>
        <BottomNavComponent />
      </div>
    </>
  );
};

export default Form;
