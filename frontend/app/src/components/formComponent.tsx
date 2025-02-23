import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

function OptionCheckbox() {

  return (
    <>

      <div id='form-box'>
        <TextField
        label="Receiver"
        variant="standard"
        sx={{ // to apply custom styles
          width: '100%',
          mb: 2, // margin-bottom
          '& .MuiInputLabel-root': { color: '#cc9e00' }, // Before focus label
          '& .MuiInputLabel-root.Mui-focused': { color: '#cc9e00' }, // After focus label
          '& .MuiInput-underline:before': { borderBottomColor: '#cc9e00' }, // Before focus border-bottom
          '& .MuiInput-underline:after': { borderBottomColor: '#cc9e00' },  // After focus border-bottom
        }}
        />
        <TextField
        label="Item"
        variant="standard"
        sx={{ // to apply custom styles
          width: '100%',
          mb: 2, // margin-bottom
          '& .MuiInputLabel-root': { color: '#cc9e00' }, // Before focus label
          '& .MuiInputLabel-root.Mui-focused': { color: '#cc9e00' }, // After focus label
          '& .MuiInput-underline:before': { borderBottomColor: '#cc9e00' }, // Before focus border-bottom
          '& .MuiInput-underline:after': { borderBottomColor: '#cc9e00' },  // After focus border-bottom
        }}
      />
        <TextField
          label="Quantity"
          variant="standard"
          sx={{ // to apply custom styles
            width: '100%',
            mb: 2, // margin-bottom
            '& .MuiInputLabel-root': { color: '#cc9e00' }, // Before focus label
            '& .MuiInputLabel-root.Mui-focused': { color: '#cc9e00' }, // After focus label
            '& .MuiInput-underline:before': { borderBottomColor: '#cc9e00' }, // Before focus border-bottom
            '& .MuiInput-underline:after': { borderBottomColor: '#cc9e00' },  // After focus border-bottom
          }}
        />
         <TextField
          label="Description"
          variant="standard"
          multiline
          rows={4} // Adjust this number to make the box taller
          sx={{
            width: '100%', // Adjust width as needed
            mb: 2, // margin-bottom
            '& .MuiInputLabel-root': { color: '#cc9e00' }, // Before focus
            '& .MuiInputLabel-root.Mui-focused': { color: '#cc9e00' }, // After focus
            '& .MuiInput-underline:before': { borderBottomColor: '#cc9e00' }, // Before focus
            '& .MuiInput-underline:after': { borderBottomColor: '#cc9e00' },  // After focus
          }}
        />
      </div>
    </>
  );
}

export default OptionCheckbox;
