import React from 'react';
import { Card, CardContent, CardActions, Button, Typography, Grid, Box, Chip, Divider, LinearProgress, CircularProgress, Avatar } from '@mui/material';
import { AccessTime, CheckCircle, LocalShipping, Home } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const OrderCard = ({ order }) => {
  const statusColor = order.status === 'Delivered' ? 'success' : order.status === 'In Transit' ? 'warning' : 'default';

  return (
    <Card
      sx={{
        margin: '1rem',
        padding: '1rem',
        width: 'auto',
        borderRadius: '8px',
        boxShadow: 3,
        marginBottom: '2rem'
      }}
    >
      <CardContent>
        {/* Order Status with Badge */}
        <Chip
          label={order.status}
          color={statusColor}
          icon={order.status === 'Delivered' ? <CheckCircle /> : <LocalShipping />}
          sx={{ marginBottom: '0.5rem' }}
        />

        {/* Item Size */}
        <Typography variant="body2" color="text.secondary">
          Item Size: {order.itemSize}
        </Typography>

        {/* Pickup & Dropoff Details */}
        <Box sx={{ marginTop: '1rem' }}>
          <Typography variant="body1" component="div" fontWeight="bold">
            Pick-up:
          </Typography>
          <Typography variant="body2">{order.pickupLocation}</Typography>

          <Typography variant="body1" component="div" fontWeight="bold" sx={{ marginTop: '0.5rem' }}>
            Drop-off:
          </Typography>
          <Typography variant="body2">{order.dropoffLocation}</Typography>
        </Box>

        {/* Estimated Delivery Time */}
        <Box sx={{ marginTop: '1rem', display: 'flex', alignItems: 'center' }}>
          <AccessTime sx={{ marginRight: '0.5rem' }} />
          <Typography variant="body2">
            ETA: {order.eta}
          </Typography>
        </Box>

        {/* Driver's Name and Avatar */}
        <Divider sx={{ marginY: '1rem' }} />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ marginRight: '0.5rem' }} alt={order.driverName} src={`https://i.pravatar.cc/150?u=${order.driverName}`} />
          <Typography variant="body1" component="div" fontWeight="bold">
            Driver: {order.driverName}
          </Typography>
        </Box>
      </CardContent>

      {/* More Details Button */}
      <CardActions>
      <Button
        variant="outlined"
        onClick={() => alert('More details coming soon')}
        sx={{
          backgroundColor: 'transparent', // Transparent background
          border: '1px solid #e7b40c', // Transparent border with black color
          color: '#e7b40c', // Black text color
          '&:hover': {
            backgroundColor: 'transparent', // Transparent background on hover
            borderColor: '#FECF30', // Border color stays black on hover
          },
        }}
      >
        More Details
      </Button>
      </CardActions>
    </Card>
  );
};

// Sample Dashboard with Statistical Overview and Progress Bar
const Dashboard = () => {
  const navigate = useNavigate();

  // Sample list of orders
  const orders = [
    {
      status: 'In Transit',
      itemSize: 'Large',
      pickupLocation: '30 Rupert St, Collingwood VIC 3066',
      dropoffLocation: '454 Collins St, Melbourne VIC 3000',
      driverName: 'Peter Parker',
      eta: '20 minutes',
    },
    {
      status: 'Delivered',
      itemSize: 'Small',
      pickupLocation: '789 King Lane, Brisbane',
      dropoffLocation: '101 Brown Street, Perth',
      driverName: 'Clark Kent',
      eta: 'Delivered',
    },
    // Add more orders here...
  ];

  // Calculate the order completion percentage
  const completedOrders = orders.filter(order => order.status === 'Delivered').length;
  const totalOrders = orders.length;
  const completionPercentage = totalOrders === 0 ? 0 : (completedOrders / totalOrders) * 100;

  // Handle Home Button click to navigate to /homepage
  const handleHomeClick = () => {
    navigate('/homepage');
  };

  return (
    <>
    <h2 style={{ textAlign: 'center', margin: '2rem 0 0' }}>Welcome to Dashboard</h2>
    <Grid container spacing={2} sx={{ padding: '2rem' }} justifyContent="center">
      {/* Order Completion Overview Section */}
      <Grid item xs={12}>
        <Card sx={{ padding: '1rem', borderRadius: '8px', boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
              Order Completion
            </Typography>
            {/* Circular Progress */}
            <Box sx={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
              <CircularProgress variant="determinate" value={completionPercentage} size={70} thickness={4} sx={{ color: '#FECF30' }} />
            </Box>

            {/* Textual Overview */}
            <Box sx={{ marginBottom: '1rem' }}>
              <Typography variant="body2">Total Orders: {totalOrders}</Typography>
              <Typography variant="body2">Completed Orders: {completedOrders}</Typography>
            </Box>

            {/* Progress Bar showing order completion */}
            <LinearProgress
              variant="determinate"
              value={completionPercentage}
              sx={{
                height: 4,
                borderRadius: 2,
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#FECF30', // Yellow color for the progress bar
                },
                '& .MuiLinearProgress-root': {
                  backgroundColor: 'black !important', // Black background for the progress bar container
                },
              }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ marginTop: '1rem' }}>
              {Math.round(completionPercentage)}% of orders completed
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Orders Section */}
      <Grid item xs={12} md={6}>
        {orders.map((order, index) => (
          <OrderCard key={index} order={order} />
        ))}
      </Grid>

      {/* Home Button */}
      <Grid item xs={12}>
        <Button
          variant="contained"
          sx={{
            position: 'fixed',
            color: 'black',
            backgroundColor: '#FECF30',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            borderRadius: '8px',
            width: 'auto'
          }}
          startIcon={<Home />}
          onClick={handleHomeClick}
        >
          Home
        </Button>
      </Grid>
    </Grid>
    </>
  );
};

export default Dashboard;
