// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Carry Bee: Buzzing around</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
// -----------
import React from 'react';
// use Routes in React Router v6, which is the new way to define route

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import HomePage from './HomePage';
import '../css/index.css';
import '../css/phoneWrapper.css';
// import { LoginPage } from './SignIn';
import SignInComponent from '../components/SignInComponent';
import Schedule from './Schedule';
import Form from './Form';
import Vehicle from './Vehicle';
import PaymentComponent from '../components/PaymentComponent';
import Dashboard from './Dashboard';
import PaymentSuccess from './PaymentSuccess';
import PaymentError from './PaymentError';
import SignupComponent from '../components/SignupComponent';

const stripePromise = loadStripe('process.env.STRIPE_PUBLISHABLE_KEY');

const App: React.FC = () => {
  return (
    <div className="smartphone-frame">
      <div className="app-content">
      <Elements stripe={stripePromise}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupComponent />} />
            <Route path="/SignIn" element={<SignInComponent />} />
            <Route path="/Schedule" element={<Schedule />} />
            <Route path="/Form" element={<Form />} />
            <Route path="/Vehicle" element={<Vehicle />} />
            <Route path="/Payment" element={<PaymentComponent />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-error" element={<PaymentError />} />
          </Routes>
        </Router>
      </Elements>
      </div>
    </div>
  );
};

export default App;
