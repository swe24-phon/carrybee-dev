import React from 'react';
import Button from '@mui/material/Button';

interface ProceedButtonProps {
  onClick: () => void; // This tells TypeScript that the onClick prop is a function that returns nothing (void)
}

const ProceedButtonComponent: React.FC<ProceedButtonProps> = ({ onClick }) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        backgroundColor: '#FECF30',
        color: '#000000',
        borderRadius: '5px',
        '&:hover': {
          backgroundColor: '#E6B82A',
        },
      }}>
      Proceed
    </Button>
  );
};

export default ProceedButtonComponent;
