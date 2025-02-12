import React from 'react';
import MapComponent from '../components/mapComponent';
import NavbarComponent from '../components/NavbarComponent';
import Component from '../components/NavbarComponent';
import '../css/homepage.css';

const HomePage = () => {
  return (
    <div>
      <NavbarComponent />
      <h1 className="text-4xl font-bold text-center text-blue-600 mt-10">Hello, here's your map!</h1>
      <MapComponent />
    </div>
  );
};

export default HomePage;
