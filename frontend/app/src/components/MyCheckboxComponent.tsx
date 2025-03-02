import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/formControlLabel';
import '../css/checkbox.css';

function OptionCheckbox() {
  const [insuranceChecked, setInsuranceChecked] = useState(false);
  const [urgentChecked, setUrgentChecked] = useState(false);
  const [roundTripChecked, setRoundTripChecked] = useState(false);

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
            label="Insurance"
            sx={{
              '& .MuiTypography-root': { // sx Prop with Typography Target
                color: '#000000',  // Label color
                fontSize: '14px',  // Change font size
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
            label="Urgent"
            sx={{
              '& .MuiTypography-root': { // sx Prop with Typography Target
                color: '#000000',  // Label color
                fontSize: '14px',  // Change font size
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
            label="Round-trip"
            sx={{
              '& .MuiTypography-root': { // sx Prop with Typography Target
                color: '#000000',  // Label color
                fontSize: '14px',  // Change font size
              },
            }}
          />
        </div>
      </div>
    </>
  );
}

export default OptionCheckbox;
