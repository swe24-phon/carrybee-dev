import React from 'react';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import PrevButtonComponent from './PreviousButton';
import NextButtonComponent from './NextButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import '../css/camera.css';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const CameraFunction = () => {
  const navigate = useNavigate(); // usage of useNavigate
  return (
    <>
    <div id='camera-container'>
      <h4 id='photo-header'>Photo</h4>
      <div id='photo-frame'></div>
      <div id='camera-card'>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        sx={{ backgroundColor: '#FECF30', color: '#000000',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
         '&:hover': { backgroundColor: '#FECF30' } }} >
        <FontAwesomeIcon icon={faArrowUpFromBracket} id="download-icon" />
        <VisuallyHiddenInput
          type="file"
          onChange={(event) => console.log(event.target.files)}
          multiple
        />
      </Button>
      <div id='buttons'>
        <PrevButtonComponent onClick={() => navigate('/Schedule')}/>
        <NextButtonComponent onClick={() => navigate('/Vehicle')}/>
      </div>
      </div>
    </div>
    </>
  );
};

export default CameraFunction;
// import React, { useRef, useState } from 'react';
// import { styled } from '@mui/material/styles';
// import { useNavigate } from 'react-router-dom';
// import Button from '@mui/material/Button';
// import PrevButtonComponent from './PreviousButton';
// import NextButtonComponent from './NextButton';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
// import Webcam from 'react-webcam';  // Import react-webcam
// import '../css/camera.css';

// const VisuallyHiddenInput = styled('input')({
//   clip: 'rect(0 0 0 0)',
//   clipPath: 'inset(50%)',
//   height: 1,
//   overflow: 'hidden',
//   position: 'absolute',
//   bottom: 0,
//   left: 0,
//   whiteSpace: 'nowrap',
//   width: 1,
// });

// const CameraFunction = () => {
//   const [image, setImage] = useState<string | null>(null);  // State to store the captured image
//   const [isCameraActive, setIsCameraActive] = useState<boolean>(false);  // State to toggle camera activation
//   const webcamRef = useRef<Webcam | null>(null);  // Reference for the webcam component
//   const navigate = useNavigate(); // usage of useNavigate

//   // Function to capture the photo
//   const capture = () => {
//     if (webcamRef.current) {
//       const imageSrc = webcamRef.current.getScreenshot();
//       setImage(imageSrc);  // Save the captured image to the state
//       setIsCameraActive(false); // Deactivate the camera after capturing
//     }
//   };

//   // Function to toggle the camera on button click
//   const toggleCamera = () => {
//     if (isCameraActive) {
//       capture();  // Capture the photo if the camera is active
//     } else {
//       setIsCameraActive(true);  // Activate the camera if it's not already
//     }
//   };

//   return (
//     <>
//       <div id='camera-container'>
//         <h4 id='photo-header'>Photo</h4>
//         <div id='photo-frame'>
//           {/* Conditionally render the webcam feed */}
//           {isCameraActive ? (
//             <>
//               {/* Display the webcam feed */}
//               <Webcam
//                 audio={false}
//                 ref={webcamRef}
//                 screenshotFormat="image/jpeg"
//                 videoConstraints={{
//                   facingMode: "environment",  // Use the back camera on phones
//                 }}
//                 width="100%"  // Make the webcam fit within the container
//                 height="100%"
//               />
//             </>
//           ) : (
//             // Show the captured photo if the camera is not active
//             image && <img src={image} alt="Captured" id="captured-photo" />
//           )}
//         </div>
//         <div id='camera-card'>
//           <Button
//             component="label"
//             role={undefined}
//             variant="contained"
//             tabIndex={-1}
//             sx={{
//               backgroundColor: '#FECF30',
//               color: '#000000',
//               borderRadius: '50%',
//               width: '60px',
//               height: '60px',
//               '&:hover': { backgroundColor: '#FECF30' }
//             }}
//             onClick={toggleCamera} // Trigger camera activation or photo capture
//           >
//             <FontAwesomeIcon icon={faArrowUpFromBracket} id="download-icon" />
//           </Button>
//           <div id='buttons'>
//             <PrevButtonComponent onClick={() => navigate('/Schedule')}/>
//             <NextButtonComponent onClick={() => navigate('/Vehicle')}/>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CameraFunction;
