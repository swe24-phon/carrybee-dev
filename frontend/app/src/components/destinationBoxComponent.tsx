// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faLocationDot, faArrowRightLong } from '@fortawesome/free-solid-svg-icons';

// // The DestinationBox component receives the setter functions as props
// interface Props {
//   setPickupCoords: React.Dispatch<React.SetStateAction<google.maps.LatLng | null>>;
//   setDropoffCoords: React.Dispatch<React.SetStateAction<google.maps.LatLng | null>>;
// }

// const DestinationBox: React.FC<Props> = ({ setPickupCoords, setDropoffCoords }) => {
//   const [pickup, setPickup] = useState('');
//   const [dropoff, setDropoff] = useState('');

//   // Function to handle the geocoding request
//   const geocodeAddress = async (address: string) => {
//     const geocoder = new google.maps.Geocoder();
//     return new Promise<google.maps.LatLng | null>((resolve, reject) => {
//       geocoder.geocode({ address }, (results, status) => {
//         if (status === google.maps.GeocoderStatus.OK && results?.[0]?.geometry?.location) {
//           resolve(results[0].geometry.location);
//         } else {
//           reject("Geocoding failed");
//         }
//       });
//     });
//   };

//   // Handle form submit
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const pickupLocation = await geocodeAddress(pickup);
//       const dropoffLocation = await geocodeAddress(dropoff);

//       setPickupCoords(pickupLocation);
//       setDropoffCoords(dropoffLocation);
//     } catch (error) {
//       console.error('Error geocoding address:', error);
//     }
//   };

//   return (
//     <div className="destination-container">
//       <form onSubmit={handleSubmit}>
//         <div id="first-box">
//           <div id="location-icons">
//             <FontAwesomeIcon icon={faLocationDot} id="location-icon" />
//             <FontAwesomeIcon icon={faLocationDot} id="location-icon" />
//           </div>
//           <div id="second-box">
//             <input
//               type="text"
//               name="pickup"
//               id="pickup"
//               value={pickup}
//               onChange={(e) => setPickup(e.target.value)}
//               placeholder="Pick-up"
//             />
//             <input
//               type="text"
//               name="dropoff"
//               id="dropoff"
//               value={dropoff}
//               onChange={(e) => setDropoff(e.target.value)}
//               placeholder="Drop-off"
//             />
//           </div>
//           <button id="next-btn" type="submit">
//             <FontAwesomeIcon icon={faArrowRightLong} id="next-icon" />
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default DestinationBox;

// THIS CODE WORK
// import React, { useState, useRef, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faLocationDot, faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
// import { useNavigate } from 'react-router-dom';  // Import useNavigate for page navigation

// interface Props {
//   setPickupCoords: React.Dispatch<React.SetStateAction<google.maps.LatLng | null>>;
//   setDropoffCoords: React.Dispatch<React.SetStateAction<google.maps.LatLng | null>>;
// }

// const DestinationBox: React.FC<Props> = ({ setPickupCoords, setDropoffCoords }) => {
//   const [pickup, setPickup] = useState('');
//   const [dropoff, setDropoff] = useState('');
//   const [loading, setLoading] = useState(false);  // Loading state for feedback
//   const pickupInputRef = useRef<HTMLInputElement>(null);
//   const dropoffInputRef = useRef<HTMLInputElement>(null);
//   const navigate = useNavigate();  // Use navigate for routing

//   const geocodeAddress = async (address: string) => {
//     const geocoder = new google.maps.Geocoder();
//     return new Promise<google.maps.LatLng | null>((resolve, reject) => {
//       geocoder.geocode({ address }, (results, status) => {
//         if (status === google.maps.GeocoderStatus.OK && results?.[0]?.geometry?.location) {
//           resolve(results[0].geometry.location);
//         } else {
//           reject(new Error("Geocoding failed"));
//         }
//       });
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);  // Set loading to true while geocoding

//     try {
//       const pickupLocation = await geocodeAddress(pickup);
//       const dropoffLocation = await geocodeAddress(dropoff);

//       setPickupCoords(pickupLocation);
//       setDropoffCoords(dropoffLocation);

//       // Navigate to the next page after successful geocoding
//       navigate('/Schedule');  // Change '/next-page' to your actual next page route
//     } catch (error) {
//       console.error('Error geocoding address:', error);
//     } finally {
//       setLoading(false);  // Reset loading state after geocoding
//     }
//   };

//   useEffect(() => {
//     // No need for autocomplete setup now, so this can be removed
//   }, []);

//   return (
//     <div className="destination-container">
//       <form onSubmit={handleSubmit}>
//         <div id="first-box">
//           <div id="location-icons">
//             <FontAwesomeIcon icon={faLocationDot} id="location-icon" aria-label="Pick-up Location" />
//             <FontAwesomeIcon icon={faLocationDot} id="location-icon" aria-label="Drop-off Location" />
//           </div>
//           <div id="second-box">
//             <input
//               ref={pickupInputRef}
//               type="text"
//               name="pickup"
//               id="pickup"
//               value={pickup}
//               onChange={(e) => setPickup(e.target.value)}
//               placeholder="Pick-up"
//             />
//             <input
//               ref={dropoffInputRef}
//               type="text"
//               name="dropoff"
//               id="dropoff"
//               value={dropoff}
//               onChange={(e) => setDropoff(e.target.value)}
//               placeholder="Drop-off"
//             />
//           </div>
//           <button id="next-btn" type="submit" disabled={loading}>
//             {loading ? 'Loading...' : <FontAwesomeIcon icon={faArrowRightLong} id="next-icon" />}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default DestinationBox;
// -----------------------------------------------------------------------------
import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

interface Props {
  setPickupCoords: React.Dispatch<React.SetStateAction<google.maps.LatLng | null>>;
  setDropoffCoords: React.Dispatch<React.SetStateAction<google.maps.LatLng | null>>;
}

const DestinationBox: React.FC<Props> = ({ setPickupCoords, setDropoffCoords }) => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [loading, setLoading] = useState(false);
  const pickupInputRef = useRef<HTMLInputElement>(null);
  const dropoffInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const geocodeAddress = async (address: string) => {
    const geocoder = new google.maps.Geocoder();
    return new Promise<google.maps.LatLng | null>((resolve, reject) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results?.[0]?.geometry?.location) {
          resolve(results[0].geometry.location);
        } else {
          reject(new Error("Geocoding failed"));
        }
      });
    });
  };

  // Update markers whenever the user types an address (onChange)
  const handlePickupChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setPickup(e.target.value);
    if (e.target.value.trim()) {
      try {
        const location = await geocodeAddress(e.target.value);
        setPickupCoords(location);
      } catch (error) {
        console.error('Error geocoding pickup address:', error);
      }
    }
  };

  const handleDropoffChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setDropoff(e.target.value);
    if (e.target.value.trim()) {
      try {
        const location = await geocodeAddress(e.target.value);
        setDropoffCoords(location);
      } catch (error) {
        console.error('Error geocoding dropoff address:', error);
      }
    }
  };

  // Only navigate to the next page without updating the markers
  const handleNextPage = () => {
    navigate('/Schedule');
  };

  return (
    <div className="destination-container">
      <div id="first-box">
        <div id="location-icons">
          <FontAwesomeIcon icon={faLocationDot} id="location-icon" aria-label="Pick-up Location" />
          <FontAwesomeIcon icon={faLocationDot} id="location-icon" aria-label="Drop-off Location" />
        </div>
        <div id="second-box">
          <input
            ref={pickupInputRef}
            type="text"
            name="pickup"
            id="pickup"
            value={pickup}
            onChange={handlePickupChange} // Updates the pickup marker immediately
            placeholder="Pick-up"
          />
          <input
            ref={dropoffInputRef}
            type="text"
            name="dropoff"
            id="dropoff"
            value={dropoff}
            onChange={handleDropoffChange} // Updates the dropoff marker immediately
            placeholder="Drop-off"
          />
        </div>
        <button
          id="next-btn"
          onClick={handleNextPage} // Just navigates to the next page
          disabled={loading || !pickup || !dropoff} // Button disabled until both fields are filled
        >
          {loading ? 'Loading...' : <FontAwesomeIcon icon={faArrowRightLong} id="next-icon" />}
        </button>
      </div>
    </div>
  );
};

export default DestinationBox;
