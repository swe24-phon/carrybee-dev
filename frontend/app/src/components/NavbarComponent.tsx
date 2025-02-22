import React from 'react';
import logo from '../assets/logo3.png';
// import banner1 from '../assets/banner1.png';
import avatar from '../assets/avatar.jpg';
import signout from '../assets/signout-icon.png';
import { useNavigate } from 'react-router-dom';
// import '../css/homepage.css';
import '../css/topnav.css';


const NavbarComponent: React.FC = () => {
  const navigate = useNavigate(); // usage of useNavigate
  return (
    <>
      <div className='nav-container wave'>
        <img src={signout} alt="signout-icon" id='signout-icon' onClick={() => navigate('/SignIn')}/>
        <img id="logo" src={logo} alt="logo" />
        <img id="avatar" src={avatar} alt="avatar" />
      </div>
    </>
  );
};

export default NavbarComponent;
