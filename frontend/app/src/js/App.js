import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
const App = () => {
 return (
 <Elements stripe={stripePromise}>
 {/* Your payment form component */}
 </Elements>
 );
};
export default App;
