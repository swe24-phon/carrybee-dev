import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const NavbarComponent: React.FC = () => {
  const navigate = useNavigate(); // usage of useNavigate
  return (
    <>
      <Button
  variant="outlined"
  onClick={() => navigate('/Schedule')}
  sx={{
    color: '#ffffff',
    fontWeight: '600',
    background: '#000000',
    borderRadius: '5px',
    width: '120px',
    '&:hover': {
      borderColor: '#f3bb05', // Maintain yellow border on hover
      backgroundColor: 'rgba(254, 207, 48, 0.1)', },}}>Previous</Button>

    </>
  );
};

export default NavbarComponent;
