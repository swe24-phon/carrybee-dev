import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const PaymentFormComponent = () => {
  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany',
    'France', 'Japan', 'China', 'India', 'Brazil'
  ];

  const [country, setCountry] = useState('');
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

        <FormControl fullWidth margin="normal" required>
          <InputLabel>Country</InputLabel>
          <Select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            label="Country"
            sx={{
              backgroundColor: 'transparent', // Transparent background for input
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#FECF30', // Default border color
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#FECF30', // Hover border color
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#FECF30', // Focus border color
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: '#ffffff', // White background for dropdown list
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // Shadow for dropdown
                },
              },
            }}
          >
            <MenuItem value=""><em>Select country</em></MenuItem>
            {countries.map((c) => (
              <MenuItem key={c} value={c}>{c}</MenuItem>
            ))}
          </Select>
        </FormControl>

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
            shrink: cardNumberFocused || false,
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
