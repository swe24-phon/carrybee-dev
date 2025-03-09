import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
// import Button from '@mui/material/Button';

const PaymentCardComponent = () => {
  return (
    <div className='summary-card'>
              <div id='invoice-no'>
                Invoice no: 123456
              </div>
              <div className='parcel-vehicle-type'>
                <h4>Medium Item</h4> {/* fetch from database */}
                <h4>Vehicle Type: Car</h4> {/* fetch from database */}
              </div>
              <div className='address-date'>
                <div id='addresses'>
                  <div id='pickup-adress'>
                    <FontAwesomeIcon icon={faLocationDot} id="location-icon" aria-label="Pick-up Location" />
                    <span>Pick-up</span>
                  </div>
                  <div id='dropoff-adress'>
                    <FontAwesomeIcon icon={faLocationDot} id="location-icon" aria-label="Pick-up Location" />
                    <span>Drop-off</span>
                  </div>
                </div>
                <span>DD/MM/2025</span>
              </div>
            </div>
  );
};

export default PaymentCardComponent;
