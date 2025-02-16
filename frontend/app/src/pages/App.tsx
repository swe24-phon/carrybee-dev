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
import HomePage from './HomePage';
import '../css/index.css';
import '../css/phoneWrapper.css';
// import { LoginPage } from './SignIn';
import SignInComponent from '../components/SignInComponent';
import Schedule from './Schedule';
import Form from './Form';
import Vehicle from './Vehicle';
import Dashboard from './Dashboard';

const App: React.FC = () => {
  return (
    <div className="smartphone-frame">
      <div className="app-content">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/SignIn" element={<SignInComponent />} />
            <Route path="/Schedule" element={<Schedule />} />
            <Route path="/Form" element={<Form />} />
            <Route path="/Vehicle" element={<Vehicle />} />
            <Route path="/dashboard" element={<Dashboard />} /> 
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default App;
