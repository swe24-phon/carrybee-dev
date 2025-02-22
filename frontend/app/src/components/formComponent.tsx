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
//           '& .MuiInputLabel-root': { color: '#f3bb05' }, // Before focus label
//           '& .MuiInputLabel-root.Mui-focused': { color: '#f3bb05' }, // After focus label
//           '& .MuiInput-underline:before': { borderBottomColor: '#f3bb05' }, // Before focus border-bottom
//           '& .MuiInput-underline:after': { borderBottomColor: '#f3bb05' },  // After focus border-bottom
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
//           '& .MuiInputLabel-root': { color: '#f3bb05' }, // Before focus label
//           '& .MuiInputLabel-root.Mui-focused': { color: '#f3bb05' }, // After focus label
//           '& .MuiInput-underline:before': { borderBottomColor: '#f3bb05' }, // Before focus border-bottom
//           '& .MuiInput-underline:after': { borderBottomColor: '#f3bb05' },  // After focus border-bottom
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
//             '& .MuiInputLabel-root': { color: '#f3bb05' }, // Before focus label
//             '& .MuiInputLabel-root.Mui-focused': { color: '#f3bb05' }, // After focus label
//             '& .MuiInput-underline:before': { borderBottomColor: '#f3bb05' }, // Before focus border-bottom
//             '& .MuiInput-underline:after': { borderBottomColor: '#f3bb05' },  // After focus border-bottom
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
//             '& .MuiInputLabel-root': { color: '#f3bb05' }, // Before focus label
//             '& .MuiInputLabel-root.Mui-focused': { color: '#f3bb05' }, // After focus label
//             '& .MuiInput-underline:before': { borderBottomColor: '#f3bb05' }, // Before focus border-bottom
//             '& .MuiInput-underline:after': { borderBottomColor: '#f3bb05' },  // After focus border-bottom
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
//             '& .MuiInputLabel-root': { color: '#f3bb05' }, // Before focus
//             '& .MuiInputLabel-root.Mui-focused': { color: '#f3bb05' }, // After focus
//             '& .MuiInput-underline:before': { borderBottomColor: '#f3bb05' }, // Before focus
//             '& .MuiInput-underline:after': { borderBottomColor: '#f3bb05' },  // After focus
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

const FormComponent = ({ onSubmit }) => {
  const formRef = useRef<HTMLFormElement>(null);
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
    onSubmit && onSubmit(); // Notify parent component if needed
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div id='form-box'>
        <TextField
          label='Item'
          name='item'
          variant='standard'
          value={formData.item}
          onChange={handleChange}
          sx={{
            width: '100%',
            mb: 2,
            '& .MuiInputLabel-root': { color: '#f3bb05' },
            '& .MuiInputLabel-root.Mui-focused': { color: '#f3bb05' },
            '& .MuiInput-underline:before': { borderBottomColor: '#f3bb05' },
            '& .MuiInput-underline:after': { borderBottomColor: '#f3bb05' },
          }}
        />
        <TextField
          label='Receiver Name'
          name='receiverName'
          variant='standard'
          value={formData.receiverName}
          onChange={handleChange}
          sx={{
            width: '100%',
            mb: 2,
            '& .MuiInputLabel-root': { color: '#f3bb05' },
            '& .MuiInputLabel-root.Mui-focused': { color: '#f3bb05' },
            '& .MuiInput-underline:before': { borderBottomColor: '#f3bb05' },
            '& .MuiInput-underline:after': { borderBottomColor: '#f3bb05' },
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
            '& .MuiInputLabel-root': { color: '#f3bb05' },
            '& .MuiInputLabel-root.Mui-focused': { color: '#f3bb05' },
            '& .MuiInput-underline:before': { borderBottomColor: '#f3bb05' },
            '& .MuiInput-underline:after': { borderBottomColor: '#f3bb05' },
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
            mb: 2,
            '& .MuiInputLabel-root': { color: '#f3bb05' },
            '& .MuiInputLabel-root.Mui-focused': { color: '#f3bb05' },
            '& .MuiInput-underline:before': { borderBottomColor: '#f3bb05' },
            '& .MuiInput-underline:after': { borderBottomColor: '#f3bb05' },
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
            width: '100%',
            mb: 2,
            '& .MuiInputLabel-root': { color: '#f3bb05' },
            '& .MuiInputLabel-root.Mui-focused': { color: '#f3bb05' },
            '& .MuiInput-underline:before': { borderBottomColor: '#f3bb05' },
            '& .MuiInput-underline:after': { borderBottomColor: '#f3bb05' },
          }}
        />
      </div>
    </form>
  );
};

export default FormComponent;
