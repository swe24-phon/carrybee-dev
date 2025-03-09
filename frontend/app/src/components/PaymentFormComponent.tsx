import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PaymentFormComponent = () => {
  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany',
    'France', 'Japan', 'China', 'India', 'Brazil'
  ];

  const [country, setCountry] = useState('');
  const [cardNumberFocused, setCardNumberFocused] = useState(false);

  const [open, setOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  const handleClick = () => {
    setOpen(true); // Show the Snackbar

    // Wait for the Snackbar to close, then redirect to /dashboard
    setTimeout(() => {
      setOpen(false); // Close the Snackbar

      // Redirect to /dashboard after the Snackbar disappears
      navigate('/dashboard');
    }, 3000); // Wait for 3000ms (same as autoHideDuration)
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false); // Close the snackbar
  };
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
       <Button
        id="pay-button"
        fullWidth
        onClick={handleClick}
        sx={{
          margin: '1rem 0 2rem',
          backgroundColor: '#FECF30',
          color: '#000000',
          fontWeight: 600,
          '&:hover': {
            backgroundColor: '#E0B828' // Optional: to change the hover color
          }
        }}
      >
        Pay
      </Button>
      {/* Snackbar for showing "Payment Successful" message */}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
        }}
      >
        <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
          Payment Successful!
        </Alert>
      </Snackbar>
      </form>
    </div>
  );
};

export default PaymentFormComponent;
