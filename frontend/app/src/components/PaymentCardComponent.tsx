import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
// import Button from '@mui/material/Button';

const PaymentCardComponent = () => {
  return (
    <div className='summary-card'>
              <div id='invoice-date'>
                <span>Invoice no: 32948763</span>
                <span>20/03/2025</span>
              </div>
              <div className='parcel-vehicle-type'>
                <h4>Item size: Small</h4> {/* fetch from database */}
                <h4>Vehicle: Motorcycle</h4> {/* fetch from database */}
              </div>
              <div className='address-date'>
                <div id='addresses'>
                  <div id='pickup-adress'>
                    <FontAwesomeIcon icon={faLocationDot} id="location-icon" aria-label="Pick-up Location" />
                    <span>454 Collins St, Melbourne VIC 3000</span>
                  </div>
                  <div id='dropoff-adress'>
                    <FontAwesomeIcon icon={faLocationDot} id="location-icon-drop" aria-label="Pick-up Location" />
                    <span>30 Rupert St, Collingwood VIC 3066</span>
                  </div>
                </div>
              </div>
            </div>
  );
};

export default PaymentCardComponent;
