import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/homepage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faArrowRightLong } from '@fortawesome/free-solid-svg-icons';

const DestinationBox: React.FC = () => {
  const navigate = useNavigate(); // usage of useNavigate
  return (
    <>
      <div className='destination-container'>
        <form action="">
          <div id='first-box'>
            <div id='location-icons'>
              <FontAwesomeIcon icon={faLocationDot} id='location-icon'/>
              <FontAwesomeIcon icon={faLocationDot} id='location-icon'/>
            </div>
            <div id='second-box'>
              <input type="text" name="pickup" id="pickup" placeholder='Pick-up' />
              <input type="text" name="dropoff" id="dropoff" placeholder='Drop-off' />
            </div>
            <button id='next-btn' onClick={() => navigate('/Schedule')}>
              <FontAwesomeIcon icon={faArrowRightLong} id='next-icon'/>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default DestinationBox;
