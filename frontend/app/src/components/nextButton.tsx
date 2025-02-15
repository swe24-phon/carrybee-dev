import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const NavbarComponent: React.FC = () => {
  const navigate = useNavigate(); // usage of useNavigate
  return (
    <>
      <Button
        variant="contained"
        onClick={() => navigate(+1)}
        sx={{
          color: '#000000',
          fontWeight: '600',
          background: '#FECF30',
          borderRadius: '5px',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: '#E6B82A',},}}>Next</Button>
    </>
  );
};

export default NavbarComponent;
