import React from 'react';
import hamburgerImage from '../assets/hamburger.png';
import logo from '../assets/logo.png';
import banner1 from '../assets/banner1.png';
import avatar from '../assets/avatar.jpg';
import '../css/homepage.css';

const NavbarComponent: React.FC = () => {
  return (
    <>
      <div className='nav-container wave'>
        <img id="hamburger-icon" src={hamburgerImage} alt="hamburger-menu" />
        <img id="logo" src={logo} alt="logo" />
        <img id='avatar' src={avatar} alt='avatar' />
      </div>
      <div className='banner-box'>
        <img id="banner" src={banner1} alt="banner" />
      </div>
    </>
  );
};

export default NavbarComponent;
