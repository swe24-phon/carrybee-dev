import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import '../css/checkbox.css';

function OptionCheckbox() {
  const [insuranceChecked, setInsuranceChecked] = useState(false);
  const [urgentChecked, setUrgentChecked] = useState(false);
  const [roundTripChecked, setRoundTripChecked] = useState(false);

  // Prices for each option
  const insurancePrice = 20;
  const urgentPrice = 10;
  const roundTripPrice = 15;

  // Calculate the total price based on checked options
  const totalPrice = (insuranceChecked ? insurancePrice : 0) +
                     (urgentChecked ? urgentPrice : 0) +
                     (roundTripChecked ? roundTripPrice : 0);

  const handleInsuranceChange = (event) => {
    setInsuranceChecked(event.target.checked);
  };

  const handleUrgentChange = (event) => {
    setUrgentChecked(event.target.checked);
  };

  const handleRoundTripChange = (event) => {
    setRoundTripChecked(event.target.checked);
  };

  return (
    <>
      <div id='checkbox'>
        <div id='checkbox-group'>
          <FormControlLabel
            control={
              <Checkbox
                checked={insuranceChecked}
                onChange={handleInsuranceChange}
                sx={{
                  color: '#f3bb05',
                  '&.Mui-checked': {
                    color: '#f3bb05',
                  },
                }}
              />
            }
            label={`Insurance (+$${insurancePrice})`}
            sx={{
              '& .MuiTypography-root': {
                color: '#000000',
                fontSize: '14px',
              },
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={urgentChecked}
                onChange={handleUrgentChange}
                sx={{
                  color: '#f3bb05',
                  '&.Mui-checked': {
                    color: '#f3bb05',
                  },
                }}
              />
            }
            label={`Urgent (+$${urgentPrice})`}
            sx={{
              '& .MuiTypography-root': {
                color: '#000000',
                fontSize: '14px',
              },
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={roundTripChecked}
                onChange={handleRoundTripChange}
                sx={{
                  color: '#f3bb05',
                  '&.Mui-checked': {
                    color: '#f3bb05',
                  },
                }}
              />
            }
            label={`Round-trip (+$${roundTripPrice})`}
            sx={{
              '& .MuiTypography-root': {
                color: '#000000',
                fontSize: '14px',
              },
            }}
          />
        </div>

        {/* Display the total price dynamically */}
        <div id="total-price">
          <h3>Total Price: ${totalPrice}</h3>
        </div>
      </div>
    </>
  );
}

export default OptionCheckbox;
