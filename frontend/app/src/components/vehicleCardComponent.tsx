import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMotorcycle, faCarSide, faVanShuttle, faTruckPickup, faShip, faHelicopter } from '@fortawesome/free-solid-svg-icons';
import '../css/vehicleOptions.css';

const VehicleType = () => {
  return (
    <>
      <h1 id='type'>Available Vehicles</h1>
      <div id="vehicle-cards">
        <div className="icon-box">
          <FontAwesomeIcon icon={faMotorcycle} className='vehicle-icon'/>
          <p>Motorcycle</p>
        </div>

        <div className="icon-box">
          <FontAwesomeIcon icon={faCarSide} className='vehicle-icon'/>
          <p>Car</p>
        </div>

        <div className="icon-box">
          <FontAwesomeIcon icon={faVanShuttle} className='vehicle-icon'/>
          <p>Van</p>
        </div>

        <div className="icon-box">
          <FontAwesomeIcon icon={faTruckPickup} className='vehicle-icon'/>
          <p>Truck</p>
        </div>

        <div className="icon-box">
          <FontAwesomeIcon icon={faShip} className='vehicle-icon'/>
          <p>Ship</p>
        </div>

        <div className="icon-box">
          <FontAwesomeIcon icon={faHelicopter} className='vehicle-icon'/>
          <p>Helicopter</p>
        </div>
      </div>
    </>
  );
};

export default VehicleType;
