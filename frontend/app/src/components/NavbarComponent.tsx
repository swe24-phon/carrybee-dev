import React from 'react';
import logo from '../assets/logo.png';
import banner1 from '../assets/banner1.png';
import avatar from '../assets/avatar.jpg';
import signout from '../assets/signout-icon.png';
import '../css/homepage.css';


const NavbarComponent: React.FC = () => {
  return (
    <>
      <div className='nav-container wave'>
        <img id="logo" src={signout} alt="signout-icon" id='signout-icon' />
        <img id="logo" src={logo} alt="logo" />
        <img id='avatar' src={avatar} alt='avatar' />
      </div>
    </>
  );
};

export default NavbarComponent;
