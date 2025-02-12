import React from 'react';
import hamburgerImage from '../assets/hamburger.png';
import logo from '../assets/logo.png';
import banner from '../assets/banner.png';
import '../css/homepage.css';

const NavbarComponent: React.FC = () => {
  return (
    <>
      <div className='nav-container'>
        <img id="hamburger-icon" src={hamburgerImage} alt="hamburger-menu" />
        <img id="logo" src={logo} alt="logo" />
      </div>
      <div className='banner-box'>
        <img id="banner" src={banner} alt="banner" />
      </div>
    </>
  );
};

export default NavbarComponent;
