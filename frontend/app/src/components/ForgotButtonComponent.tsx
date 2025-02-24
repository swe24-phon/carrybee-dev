import React from 'react';
import Button from '@mui/material/Button';

interface ForgotButtonProps {
  onClick: () => void; // This tells TypeScript that the onClick prop is a function that returns nothing (void)
}

const ForgotButtonComponent: React.FC<ForgotButtonProps> = ({ onClick }) => {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      sx={{
        color: '#cc9e00',
        borderColor: '#cc9e00',
        '&:hover': {
          backgroundColor: '#FECF30',
          color: '#000000',
        },
      }}>
      Forgot Something?
    </Button>
  );
};

export default ForgotButtonComponent;