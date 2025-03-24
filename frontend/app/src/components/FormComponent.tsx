import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import useOrderStore from '../store/orderStore';
import useParcelStore from '../store/parcelStore'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FormComponent = () => {
  const navigate = useNavigate();

  const {
    setParcelDetails,
    setParcelID,
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

    // Get the updated order data from the store
    const orderData = useParcelStore.getState();
    const userId = orderData.parcelDetails.user_id;
    console.log('User ID from store before submitting:', userId);
    console.log('Order Data:', orderData);

    console.log('User ID from store before submitting:', userId);

    // Set other parcel details
    setParcelDetails({
        item_name: formData.item,
        quantity: parseInt(formData.quantity),
        weight: parseFloat(formData.weight),
        description: formData.description,
    });
    setReceiverName(formData.receiverName);

    const partialData = {

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

        setParcelID(response.data.parcel.id)

        navigate('/vehicle', {
          state: { parcelID: response.data.parcel.id }
        });
    } catch (error: any) {
        console.error('Error saving data to the database:', error.response?.data ?? error.message);
    }
};


  return (
    <form onSubmit={handleSubmit} style={{ height: '60%' }}>
      <div id='form-box'>
        <TextField
          label="Item"
          name="item"
          variant="standard"
          value={formData.item}
          onChange={handleChange}
          sx={textFieldStyles}
          required
          autoComplete="off"
        />
        <TextField
          label="Receiver Name"
          name="receiverName"
          variant="standard"
          value={formData.receiverName}
          onChange={handleChange}
          sx={textFieldStyles}
          required
          autoComplete="off"
        />
        <TextField
          label="Quantity"
          name="quantity"
          variant="standard"
          value={formData.quantity}
          onChange={handleChange}
          sx={textFieldStyles}
          required
          autoComplete="off"
        />
        <TextField
          label="Weight"
          name="weight"
          variant="standard"
          value={formData.weight}
          onChange={handleChange}
          sx={textFieldStyles}
          required
          autoComplete="off"
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
          autoComplete="off"
        />
      </div>
      <div className='btn-box'>
        <button id="prev-btn" type="button" onClick={() => navigate('/schedule')}>
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
