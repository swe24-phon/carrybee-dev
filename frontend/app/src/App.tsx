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
// AIzaSyB613qjkRHO_l58B_9cF_ja3Tp7DKBT_y4 >>>> key
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapComponent = () => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyB613qjkRHO_l58B_9cF_ja3Tp7DKBT_y4">
      <GoogleMap
        mapContainerStyle={{ width: '400px', height: '400px' }}
        zoom={13}
        center={{ lat: -37.8136, lng: 144.9631 }}>
        <Marker position={{ lat: -37.8136, lng: 144.9631 }} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
