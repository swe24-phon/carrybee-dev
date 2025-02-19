import React from 'react';
import Button from '@mui/material/Button';
import '../css/landingpage.css'

interface StartedButtonProps {
  onClick: () => void; // This tells TypeScript that the onClick prop is a function that returns nothing (void)
}

const StartedButtonComponent: React.FC<StartedButtonProps> = ({ onClick }) => {
  return (
    <Button
    id='started-btn'
    variant="contained"
    onClick={onClick}
    sx={{
      backgroundColor: '#FFFDF1',
      color: '#000000',
      borderRadius: '5px',
      border: '1px solid rgb(255, 196, 0)',  // Custom border color
      '&:hover': {
        backgroundColor: '#FFFDF1',
      },
      '&:active': {
        backgroundColor: '#FFFDF1',
      },
      '&:focus': {
        outline: 'none',               // Remove default blue outline
        boxShadow: 'none',             // Remove box shadow (which may be causing the blue border)
        border: '1px solid rgb(255, 196, 0)',  // Ensure the border remains the same color
      }
    }}>
  Get Started
  </Button>
  );
};

export default StartedButtonComponent;
