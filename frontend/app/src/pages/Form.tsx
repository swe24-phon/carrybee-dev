// import React from 'react';
// import NavbarComponent from '../components/NavbarComponent';
// import BottomNavComponent from '../components/bottomNavComponent';
// import CheckboxComponent from '../components/CheckboxComponent';
// import FormComponent from '../components/formComponent';
// import ParcelCardComponent from '../components/parcelCardComponent';
// // import CameraComponent from '../components/CameraComponent';
// import '../css/form.css';
// import '../css/parcelCategory.css';
// import '../css/topnav.css';
// import '../css/bottomnav.css';

// const Form = () => {
//   return (
//     <>
//       <NavbarComponent />
//       <ParcelCardComponent />
//       <CheckboxComponent />
//       <FormComponent />
//       {/* <CameraComponent /> */}
//       <div style={{ position: 'sticky', bottom: 0 }}>
//         <BottomNavComponent /> // bottom nav for form page needs different prop
//       </div>
//     </>
//   );
// };

// export default Form;



import React from 'react';
import NavbarComponent from '../components/NavbarComponent';
import BottomNavComponent from '../components/bottomNavComponent';
import CheckboxComponent from '../components/checkboxComponent';
import FormComponent from '../components/formComponent';
import ParcelCardComponent from '../components/parcelCardComponent';
import CameraComponent from '../components/cameraComponent';
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
      <CheckboxComponent />
      <FormComponent onSubmit={handleSubmit}  />
      <CameraComponent /> 
      <div style={{ position: 'sticky', bottom: 0 }}>
        <BottomNavComponent /> {/* bottom nav for form page needs different prop */}
      </div>
    </>
  );
};

export default Form;