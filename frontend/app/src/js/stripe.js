import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Initialize Stripe with your publishable key
// Replace 'your-publishable-key' with your actual Stripe publishable key
const stripePromise = loadStripe('your-publishable-key');

// Card element styles
export const cardStyle = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: 'Arial, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  }
};

// Stripe Elements wrapper component
export const StripeWrapper = ({ children }) => {
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
};

// Helper function to format amount in cents
export const formatAmountForStripe = (amount, currency = 'USD') => {
  const numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  });
  const parts = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency = true;
  for (let part of parts) {
    if (part.type === 'decimal') {
      zeroDecimalCurrency = false;
    }
  }
  return zeroDecimalCurrency ? amount : Math.round(amount * 100);
};

// Helper function to validate card details
export const validateCardDetails = (cardElement) => {
  return new Promise((resolve) => {
    if (!cardElement) {
      resolve({ error: 'Card element not found' });
      return;
    }
    
    cardElement.validate().then((result) => {
      resolve(result);
    });
  });
};

export default stripePromise;
