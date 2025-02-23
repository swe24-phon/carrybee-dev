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
// -----------------------------------------------------------------------------
// import React, { useState, useRef } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faLocationDot, faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
// import useOrderStore from '../store/orderStore';
// import { useNavigate } from 'react-router-dom';

// interface Props {
//   setPickupCoords: React.Dispatch<React.SetStateAction<google.maps.LatLng | null>>;
//   setDropoffCoords: React.Dispatch<React.SetStateAction<google.maps.LatLng | null>>;
// }

// const DestinationBox: React.FC<Props> = ({ setPickupCoords, setDropoffCoords }) => {
//   const [pickupInput, setPickupInput] = useState('');
//   const [dropoffInput, setDropoffInput] = useState('');
//   const [loading, setLoading] = useState(false);

//   const { setPickup, setDropoff } = useOrderStore(); // Keep using the store to set pickup/dropoff data
//   const pickupInputRef = useRef<HTMLInputElement>(null);
//   const dropoffInputRef = useRef<HTMLInputElement>(null);
//   const navigate = useNavigate();

//   // Geocoding function to convert address into LatLng
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

//   // Update markers whenever the user types an address
//   const handlePickupChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     setPickupInput(e.target.value);
//     if (e.target.value.trim()) {
//       try {
//         const location = await geocodeAddress(e.target.value);
//         setPickupCoords(location); // Update pickup coordinates immediately
//       } catch (error) {
//         console.error('Error geocoding pickup address:', error);
//       }
//     }
//   };

//   const handleDropoffChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     setDropoffInput(e.target.value);
//     if (e.target.value.trim()) {
//       try {
//         const location = await geocodeAddress(e.target.value);
//         setDropoffCoords(location); // Update dropoff coordinates immediately
//       } catch (error) {
//         console.error('Error geocoding dropoff address:', error);
//       }
//     }
//   };

//   // Handle the form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const pickupLocation = await geocodeAddress(pickupInput);
//       const dropoffLocation = await geocodeAddress(dropoffInput);

//       setPickup(pickupInput); // Save pickup location in the store
//       setDropoff(dropoffInput); // Save dropoff location in the store
//       setPickupCoords(pickupLocation); // Set pickup coordinates
//       setDropoffCoords(dropoffLocation); // Set dropoff coordinates

//       console.log("Locations added");
//       navigate("/schedule"); // Navigate to the next page after successful form submission
//     } catch (error) {
//       console.error('Error geocoding addresses:', error);
//     } finally {
//       setLoading(false); // Reset loading state after geocoding
//     }
//   };

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
//               value={pickupInput}
//               onChange={handlePickupChange} // Updates the pickup marker immediately
//               placeholder="Pick-up"
//             />
//             <input
//               ref={dropoffInputRef}
//               type="text"
//               name="dropoff"
//               id="dropoff"
//               value={dropoffInput}
//               onChange={handleDropoffChange} // Updates the dropoff marker immediately
//               placeholder="Drop-off"
//             />
//           </div>
//           <button
//             id="next-btn"
//             type="submit"
//             disabled={loading || !pickupInput || !dropoffInput} // Button disabled until both fields are filled and not loading
//           >
//             {loading ? 'Loading...' : <FontAwesomeIcon icon={faArrowRightLong} id="next-icon" />}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default DestinationBox;
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

interface Props {
  setPickupCoords: React.Dispatch<React.SetStateAction<google.maps.LatLng | null>>;
  setDropoffCoords: React.Dispatch<React.SetStateAction<google.maps.LatLng | null>>;
}

const DestinationBox: React.FC<Props> = ({ setPickupCoords, setDropoffCoords }) => {
  const [pickupInput, setPickupInput] = useState('');
  const [dropoffInput, setDropoffInput] = useState('');
  const [pickupCoords, setPickupLocalCoords] = useState<google.maps.LatLng | null>(null);
  const [dropoffCoords, setDropoffLocalCoords] = useState<google.maps.LatLng | null>(null);
  const [loading, setLoading] = useState(false);
  const [distance, setDistance] = useState<number | null>(null); // To store calculated distance

  const navigate = useNavigate();

  // Geocoding function to convert address into LatLng
  const geocodeAddress = async (address: string): Promise<google.maps.LatLng | null> => {
    const geocoder = new google.maps.Geocoder();
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results[0].geometry?.location) {
          resolve(results[0].geometry.location);
        } else {
          reject(new Error('Geocoding failed'));
        }
      });
    });
  };

  // Calculate distance when coordinates are updated
  useEffect(() => {
    if (pickupCoords && dropoffCoords) {
      const distanceInMeters = google.maps.geometry.spherical.computeDistanceBetween(pickupCoords, dropoffCoords);
      setDistance(distanceInMeters / 1000); // Convert to kilometers
    }
  }, [pickupCoords, dropoffCoords]);

  const handlePickupChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setPickupInput(e.target.value);
    if (e.target.value.trim()) {
      try {
        const location = await geocodeAddress(e.target.value);
        setPickupLocalCoords(location); // Update local state
        setPickupCoords(location); // Update parent component state
      } catch (error) {
        console.error('Error geocoding pickup address:', error);
      }
    }
  };

  const handleDropoffChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setDropoffInput(e.target.value);
    if (e.target.value.trim()) {
      try {
        const location = await geocodeAddress(e.target.value);
        setDropoffLocalCoords(location); // Update local state
        setDropoffCoords(location); // Update parent component state
      } catch (error) {
        console.error('Error geocoding dropoff address:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const pickupLocation = await geocodeAddress(pickupInput);
      const dropoffLocation = await geocodeAddress(dropoffInput);

      setPickupLocalCoords(pickupLocation); // Set pickup coordinates
      setDropoffLocalCoords(dropoffLocation); // Set dropoff coordinates

      console.log("Locations added");
      navigate("/schedule"); // Navigate to the next page after successful form submission
    } catch (error) {
      console.error('Error geocoding addresses:', error);
    } finally {
      setLoading(false); // Reset loading state after geocoding
    }
  };

  return (
    <div className="destination-container">
      <form onSubmit={handleSubmit}>
        <div id="first-box">
          <div id="location-icons">
            <FontAwesomeIcon icon={faLocationDot} id="location-icon" aria-label="Pick-up Location" />
            <FontAwesomeIcon icon={faLocationDot} id="location-icon" aria-label="Drop-off Location" />
          </div>
          <div id="second-box">
            <input
              type="text"
              name="pickup"
              id="pickup"
              value={pickupInput}
              onChange={handlePickupChange} // Updates the pickup marker immediately
              placeholder="Pick-up"
            />
            <input
              type="text"
              name="dropoff"
              id="dropoff"
              value={dropoffInput}
              onChange={handleDropoffChange} // Updates the dropoff marker immediately
              placeholder="Drop-off"
            />
          </div>
          <button
            id="next-btn"
            type="submit"
            disabled={loading || !pickupInput || !dropoffInput} // Button disabled until both fields are filled and not loading
          >
            {loading ? 'Loading...' : <FontAwesomeIcon icon={faArrowRightLong} id="next-icon" />}
          </button>
        </div>
      </form>
      {distance !== null && (
        <p style={{color: '#d0a816', fontWeight: '500'}}>Distance: {distance.toFixed(2)} km</p> // Display the calculated distance in kilometers
      )}
    </div>
  );
};

export default DestinationBox;
