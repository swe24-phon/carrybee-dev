import React from 'react';
import '../css/homepage.css';

const destinationBox: React.FC = () => {
  return (
    <>
      <div className='destination-container'>
        <form action="">
          <div id='first-box'>
            <div id='second-box'>
              <label htmlFor="">Pick-up:</label>
              <input type="text" name="pickup" id="pickup" />
              <label htmlFor="">Drop-off:</label>
              <input type="text" name="pickup" id="dropoff" />
            </div>
            <button id='next-btn'>Next</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default destinationBox;
