import React from 'react';
import banner1 from '../assets/banner1.png';
import '../css/homepage.css';


const BannerComponent: React.FC = () => {
  return (
    <>
      <div className='banner-box'>
        <img id="banner" src={banner1} alt="banner" />
      </div>
    </>
  );
};

export default BannerComponent;
