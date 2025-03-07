import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const PaymentFormComponent = () => {
  const [cardNumberFocused, setCardNumberFocused] = useState(false);
  return (
    <div className='payment-form-container'>
      <form>
        <TextField
          label="Name on Card"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#FECF30',
              },
              '&:hover fieldset': {
                borderColor: '#FECF30',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#FECF30',
              },
            },
          }}
        />
        <TextField
          label={cardNumberFocused ? "Card Number" : ""}
          placeholder="0000-0000-0000-0000"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          onFocus={() => setCardNumberFocused(true)}
          onBlur={() => setCardNumberFocused(false)}
          InputLabelProps={{
            shrink: cardNumberFocused || false,  // Shrinks the label when focused
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#FECF30',
              },
              '&:hover fieldset': {
                borderColor: '#FECF30',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#FECF30',
              },
            },
          }}
        />
        <TextField
          label="MM/YY"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#FECF30',
              },
              '&:hover fieldset': {
                borderColor: '#FECF30',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#FECF30',
              },
            },
          }}
        />
        <TextField
          label="CVC"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#FECF30',
              },
              '&:hover fieldset': {
                borderColor: '#FECF30',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#FECF30',
              },
            },
          }}
        />
        <Button variant="contained" id='pay-button' fullWidth>
          Pay
        </Button>
      </form>
    </div>
  );
};

export default PaymentFormComponent;
