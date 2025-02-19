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
