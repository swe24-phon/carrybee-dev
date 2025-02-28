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

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import useOrderStore from '../store/orderStore';
import useParcelStore from '../store/parcelStore'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FormComponent = () => {
  const navigate = useNavigate();
  
  // Destructure store methods and state once
  const {
    setParcelDetails, 
    setParcelId, 
    parcelId, 
    category, 
    userID, 
    height, 
    width, 
    length 
  } = useParcelStore();

  const { setReceiverName } = useOrderStore();

  const [formData, setFormData] = useState({
    item: '',
    receiverName: '',
    quantity: '',
    weight: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with:', formData);
    

    //setParcelId();

    // Get the updated order data from the store
    const orderData = useParcelStore.getState();
    const userId = orderData.parcelDetails.user_id; 
    console.log('Order Data:', orderData);

    console.log('User ID from store before submitting:', userId); 

    // Set other parcel details
    setParcelDetails({
        item: formData.item,
        quantity: formData.quantity,
        weight: formData.weight,
        description: formData.description,
    });
    setReceiverName(formData.receiverName);

    const partialData = {
        parcelId: orderData.parcelId,
        item_name: formData.item,
        category: orderData.parcelDetails?.category ?? 'defaultCategory', // Avoid undefined
        quantity: parseInt(formData.quantity),
        weight: parseFloat(formData.weight),
        description: formData.description,
        user_id: userId ?? 'defaultUserID',
        height: parseFloat(orderData.parcelDetails?.height) ?? 0,
        width: parseFloat(orderData.parcelDetails?.width) ?? 0,
        length: parseFloat(orderData.parcelDetails?.length) ?? 0,
    };

    console.log('Payload being sent:', partialData);

    try {
        const response = await axios.post('http://localhost:4000/api/parcels', partialData);
        console.log('Data successfully saved:', response.data);
        // Update the parcelId in the store after successful submission
        setParcelId(response.data.id)
        
        navigate('/Vehicle');
    } catch (error: any) {
        console.error('Error saving data to the database:', error.response?.data ?? error.message);
    }
};


  return (
    <form onSubmit={handleSubmit} style={{ height: '70%' }}>
      <div id='form-box'>
        <TextField
          label="Item"
          name="item"
          variant="standard"
          value={formData.item}
          onChange={handleChange}
          sx={textFieldStyles}
        />
        <TextField
          label="Receiver Name"
          name="receiverName"
          variant="standard"
          value={formData.receiverName}
          onChange={handleChange}
          sx={textFieldStyles}
        />
        <TextField
          label="Quantity"
          name="quantity"
          variant="standard"
          value={formData.quantity}
          onChange={handleChange}
          sx={textFieldStyles}
        />
        <TextField
          label="Weight"
          name="weight"
          variant="standard"
          value={formData.weight}
          onChange={handleChange}
          sx={textFieldStyles}
        />
        <TextField
          label="Description"
          name="description"
          variant="standard"
          multiline
          rows={2}
          value={formData.description}
          onChange={handleChange}
          sx={textFieldStyles}
        />
      </div>
      <div className='btn-box'>
        <button id="prev-btn" type="button" onClick={() => navigate('/Schedule')}>
          Previous
        </button>
        <button id="proceed-btn" type="submit">
          Proceed
        </button>
      </div>
    </form>
  );
};

// Reusable styles for TextField components
const textFieldStyles = {
  width: '100%',
  mb: 2,
  '& .MuiInputLabel-root': { color: '#cc9e00' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#cc9e00' },
  '& .MuiInput-underline:before': { borderBottomColor: '#cc9e00' },
  '& .MuiInput-underline:after': { borderBottomColor: '#cc9e00' },
};

export default FormComponent;
