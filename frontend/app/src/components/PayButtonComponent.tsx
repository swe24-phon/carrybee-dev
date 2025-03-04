import React from 'react';
import Button from '@mui/material/Button';

interface PayButtonProps {
  onClick: () => void; // This tells TypeScript that the onClick prop is a function that returns nothing (void)
}

const PayButtonComponent: React.FC<PayButtonProps> = ({ onClick }) => {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      sx={{
        backgroundColor: '#FECF30',
        color: '#000000',
        borderRadius: '5px',
        '&:hover': {
          backgroundColor: '#FECF30',
          color: '#000000',
        },
      }}>
      Pay Now
    </Button>
  );
};

export default PayButtonComponent;
