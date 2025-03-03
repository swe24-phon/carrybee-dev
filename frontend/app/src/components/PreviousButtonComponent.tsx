import React from 'react';
import Button from '@mui/material/Button';

interface PrevButtonProps {
  onClick: () => void; // This tells TypeScript that the onClick prop is a function that returns nothing (void)
}

const PrevButtonComponent: React.FC<PrevButtonProps> = ({ onClick }) => {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      sx={{
        color: '#cc9e00',
        borderColor: '#cc9e00',
        width: '100%',
        '&:hover': {
          backgroundColor: '#FECF30',
          color: '#000000',
        },
      }}>
      Previous
    </Button>
  );
};

export default PrevButtonComponent;
