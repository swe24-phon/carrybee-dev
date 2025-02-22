// import React, { useState } from 'react';
// import TextField from '@mui/material/TextField';
// import useOrderStore from '../store/orderStore';

// //Added this and line 18
// const FormComponent = () => {
//   const { setParcelDetails, setReceiverName } = useOrderStore();

//   const [formData, setFormData] = useState({
//     item:'',
//     receiverName: '',
//     quantity:'',
//     weight:'',
//     description:'',
//   });
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Form submitted", formData);
//     setParcelDetails({
//         item: formData.item,
//         quantity: formData.quantity,
//         weight: formData.weight,
//         description: formData.description,
//     });
//     setReceiverName(formData.receiverName)
//   };

// //function OptionCheckbox() {

//   return (
//     <form onSubmit={handleSubmit}>
//       <div id='form-box'>
//         <TextField
//         label="Receiver"
//         name="receiverName"
//         variant="standard"
//         value={formData.receiverName}
//         onChange={handleChange}
//         sx={{ // to apply custom styles
//           width: '100%',
//           mb: 2, // margin-bottom
//           '& .MuiInputLabel-root': { color: '#cc9e00' }, // Before focus label
//           '& .MuiInputLabel-root.Mui-focused': { color: '#cc9e00' }, // After focus label
//           '& .MuiInput-underline:before': { borderBottomColor: '#cc9e00' }, // Before focus border-bottom
//           '& .MuiInput-underline:after': { borderBottomColor: '#cc9e00' },  // After focus border-bottom
//         }}
//         />
//         <TextField
//         label="Item"
//         name='item'
//         variant="standard"
//         value={formData.item}
//         onChange={handleChange}
//         sx={{ // to apply custom styles
//           width: '100%',
//           mb: 2, // margin-bottom
//           '& .MuiInputLabel-root': { color: '#cc9e00' }, // Before focus label
//           '& .MuiInputLabel-root.Mui-focused': { color: '#cc9e00' }, // After focus label
//           '& .MuiInput-underline:before': { borderBottomColor: '#cc9e00' }, // Before focus border-bottom
//           '& .MuiInput-underline:after': { borderBottomColor: '#cc9e00' },  // After focus border-bottom
//         }}
//       />
//         <TextField
//           label="Quantity"
//           name="quantity"
//           variant="standard"
//           value={formData.quantity}
//           onChange={handleChange}
//           sx={{ // to apply custom styles
//             width: '100%',
//             mb: 2, // margin-bottom
//             '& .MuiInputLabel-root': { color: '#cc9e00' }, // Before focus label
//             '& .MuiInputLabel-root.Mui-focused': { color: '#cc9e00' }, // After focus label
//             '& .MuiInput-underline:before': { borderBottomColor: '#cc9e00' }, // Before focus border-bottom
//             '& .MuiInput-underline:after': { borderBottomColor: '#cc9e00' },  // After focus border-bottom
//           }}
//         />
//         <TextField
//           label="Weight"
//           name="weight"
//           variant="standard"
//           value={formData.weight}
//           onChange={handleChange}
//           sx={{ // to apply custom styles
//             width: '100%',
//             mb: 2, // margin-bottom
//             '& .MuiInputLabel-root': { color: '#cc9e00' }, // Before focus label
//             '& .MuiInputLabel-root.Mui-focused': { color: '#cc9e00' }, // After focus label
//             '& .MuiInput-underline:before': { borderBottomColor: '#cc9e00' }, // Before focus border-bottom
//             '& .MuiInput-underline:after': { borderBottomColor: '#cc9e00' },  // After focus border-bottom
//           }}
//         />
//          <TextField
//           label="Description"
//           name="description"
//           variant="standard"
//           multiline
//           rows={4} // Adjust this number to make the box taller
//           value={formData.description}
//           onChange={handleChange}
//           sx={{
//             width: '100%', // Adjust width as needed
//             mb: 2, // margin-bottom
//             '& .MuiInputLabel-root': { color: '#cc9e00' }, // Before focus
//             '& .MuiInputLabel-root.Mui-focused': { color: '#cc9e00' }, // After focus
//             '& .MuiInput-underline:before': { borderBottomColor: '#cc9e00' }, // Before focus
//             '& .MuiInput-underline:after': { borderBottomColor: '#cc9e00' },  // After focus
//           }}
//         />
//       </div>

//     </form>
//   );
// }
// // export default OptionCheckbox;
// export default FormCompoent;

import React, { useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import useOrderStore from '../store/orderStore';
import { useNavigate } from 'react-router-dom';

const FormComponent = () => {
  const navigate = useNavigate(); // usage of useNavigate
  const { setParcelDetails, setReceiverName } = useOrderStore();

  const [formData, setFormData] = useState({
    item: '',
    receiverName: '',
    quantity: '',
    weight: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with:', formData);
    setParcelDetails({
      item: formData.item,
      quantity: formData.quantity,
      weight: formData.weight,
      description: formData.description,
    });
    setReceiverName(formData.receiverName);
  };

  return (
    <form onSubmit={handleSubmit} style={{height: '70%'}}>
      <div id='form-box'>
        <TextField
        label="Item"
        name='item'
        variant="standard"
        value={formData.item}
        onChange={handleChange}
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
          label="Receiver Name"
          name="receiverName"
          variant="standard"
          value={formData.receiverName}
          onChange={handleChange}
          sx={{
            width: '100%',
            mb: 2,
            '& .MuiInputLabel-root': { color: '#cc9e00' },
            '& .MuiInputLabel-root.Mui-focused': { color: '#cc9e00' },
            '& .MuiInput-underline:before': { borderBottomColor: '#cc9e00' },
            '& .MuiInput-underline:after': { borderBottomColor: '#cc9e00' },
          }}
        />
        <TextField
          label='Quantity'
          name='quantity'
          variant='standard'
          value={formData.quantity}
          onChange={handleChange}
          sx={{
            width: '100%',
            mb: 2,
            '& .MuiInputLabel-root': { color: '#cc9e00' },
            '& .MuiInputLabel-root.Mui-focused': { color: '#cc9e00' },
            '& .MuiInput-underline:before': { borderBottomColor: '#cc9e00' },
            '& .MuiInput-underline:after': { borderBottomColor: '#cc9e00' },
          }}
        />
        <TextField
          label='Weight'
          name='weight'
          variant='standard'
          value={formData.weight}
          onChange={handleChange}
          sx={{
            width: '100%',
            mb: 2, // margin-bottom
            '& .MuiInputLabel-root': { color: '#cc9e00' }, // Before focus label
            '& .MuiInputLabel-root.Mui-focused': { color: '#cc9e00' }, // After focus label
            '& .MuiInput-underline:before': { borderBottomColor: '#cc9e00' }, // Before focus border-bottom
            '& .MuiInput-underline:after': { borderBottomColor: '#cc9e00' },  // After focus border-bottom
          }}
        />
        <TextField
          label='Description'
          name='description'
          variant='standard'
          multiline
          rows={2}
          value={formData.description}
          onChange={handleChange}
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
      <div className='btn-box'>
        <button id="prev-btn" onClick={() => navigate('/Schedule')}>Previous</button>
        <button id="proceed-btn" type="submit" onClick={() => navigate('/Vehicle')}>Proceed</button>
      </div>
    </form>
  );
};

export default FormComponent;
