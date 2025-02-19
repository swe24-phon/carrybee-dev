// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCircleInfo, faFile, faBox, faGifts, faCouch, faCubes, faBoxOpen,faMotorcycle, faCarSide, faVanShuttle, faTruckPickup, faShip, faHelicopter } from '@fortawesome/free-solid-svg-icons';

// const ParcelType = () => {
//   const [active, setActive] = useState(null);

//   const handleInfoClick = (index) => {
//     setActive(index === active ? null : index); // Toggle the popup visibility
//   };

//   return (
//     <>
//     <h1 id='type'>Parcel Type</h1>
//     <div id="parcel-cards">
//       <div className="icon-box" >
//         <div className={`info-box ${active === 0 ? 'active' : ''}`} onClick={() => handleInfoClick(0)} >
//           <span className="info-button">
//             <FontAwesomeIcon icon={faCircleInfo} />
//           </span>
//           <div className="info-popup">
//             <h3 className='popup-head'>Document</h3>
//             <FontAwesomeIcon icon={faMotorcycle} className='vehicle-icon'/>
//             <p><strong>Weight:</strong> up to 20kg</p>
//             <p><strong>Size limit (L x W x H):</strong> 0.5 x 0.4 x 0.5 meters</p>
//           </div>
//         </div>
//         <FontAwesomeIcon icon={faFile} className="parcel-icon" /> Document
//       </div>

//       <div className="icon-box" >
//         <div className={`info-box ${active === 1 ? 'active' : ''}`} onClick={() => handleInfoClick(1)}>
//           <span className="info-button">
//             <FontAwesomeIcon icon={faCircleInfo} />
//           </span>
//           <div className="info-popup">
//             <h3 className='popup-head'>Small</h3>
//             <FontAwesomeIcon icon={faCarSide} className='vehicle-icon'/>
//             <p><strong>Weight:</strong> up to 200kg</p>
//             <p><strong>Size limit (L x W x H):</strong> 1 x 0.6 x 0.7 meters</p>
//           </div>
//         </div>
//         <FontAwesomeIcon icon={faBox} className="parcel-icon" /> Small
//       </div>

//       <div className="icon-box" >
//         <div className={`info-box ${active === 2 ? 'active' : ''}`} onClick={() => handleInfoClick(2)}>
//           <span className="info-button">
//             <FontAwesomeIcon icon={faCircleInfo} />
//           </span>
//           <div className="info-popup">
//             <h3 className='popup-head'>Medium</h3>
//             <FontAwesomeIcon icon={faVanShuttle} className='vehicle-icon' />
//             <p><strong>Weight:</strong> up to 300kg</p>
//             <p><strong>Size limit (L x W x H):</strong> 1.2 x 1 x 0.9 meters</p>
//           </div>
//         </div>
//         <FontAwesomeIcon icon={faGifts} className="parcel-icon" /> Medium
//       </div>

//       <div className="icon-box" >
//         <div className={`info-box ${active === 3 ? 'active' : ''}`} onClick={() => handleInfoClick(3)}>
//           <span className="info-button">
//             <FontAwesomeIcon icon={faCircleInfo} />
//           </span>
//           <div className="info-popup">
//             <h3 className='popup-head'>Large</h3>
//             <FontAwesomeIcon icon={faTruckPickup} className='vehicle-icon' />
//             <p><strong>Weight:</strong> up to 800kg</p>
//             <p><strong>Size limit (L x W x H):</strong> 2.7 x 1.5 x 0.5 meters</p>
//           </div>
//         </div>
//         <FontAwesomeIcon icon={faCouch} className="parcel-icon" /> Large
//       </div>

//       <div className="icon-box" >
//         <div className={`info-box ${active === 4 ? 'active' : ''}`} onClick={() => handleInfoClick(4)}>
//           <span className="info-button">
//             <FontAwesomeIcon icon={faCircleInfo} />
//           </span>
//           <div className="info-popup">
//             <h3 className='popup-head'>Extra Large</h3>
//             <FontAwesomeIcon icon={faShip} className='vehicle-icon' />
//             <p><strong>Weight:</strong> up to 1000kg</p>
//             <p><strong>Size limit (L x W x H):</strong> 10 x 10 x 10 meters</p>
//           </div>
//         </div>
//         <FontAwesomeIcon icon={faCubes} className="parcel-icon" /> Extra Large
//       </div>

//       <div className="icon-box" >
//         <div className={`info-box ${active === 5 ? 'active' : ''}`} onClick={() => handleInfoClick(5)}>
//           <span className="info-button">
//             <FontAwesomeIcon icon={faCircleInfo} />
//           </span>
//           <div className="info-popup">
//             <h3 className='popup-head'>Custom</h3>
//             <FontAwesomeIcon icon={faHelicopter} className='vehicle-icon' />
//             <p><strong>Weight:</strong> contact customer team</p>
//             <p><strong>Size limit (L x W x H):</strong> contact customer team</p>
//             <h5 id='customer-contact'>Contact us</h5>
//           </div>
//         </div>
//         <FontAwesomeIcon icon={faBoxOpen} className="parcel-icon" /> Custom
//       </div>
//     </div>
//     </>
//   );
// };

// export default ParcelType;
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faFile, faBox, faGifts, faCouch, faCubes, faBoxOpen, faMotorcycle, faCarSide, faVanShuttle, faTruckPickup, faShip, faHelicopter } from '@fortawesome/free-solid-svg-icons';

const ParcelType = () => {
  const [active, setActive] = useState(null);

  const handleInfoClick = (index) => {
    setActive(index === active ? null : index); // Toggle the popup visibility
  };

  return (
    <>
      <h1 id='type'>Parcel Type</h1>
      <div id="parcel-cards">
        <div className="icon-box">
          <div className={`info-box ${active === 0 ? 'active' : ''}`} onClick={() => handleInfoClick(0)}>
            <span className="info-button">
              <FontAwesomeIcon icon={faCircleInfo} />
            </span>
            <div className="info-popup">
              <h3 className='popup-head'>Document</h3>
              <FontAwesomeIcon icon={faMotorcycle} className='vehicle-icon'/>
              <p><strong>Weight:</strong> up to 20kg</p>
              <p><strong>Size limit (L x W x H):</strong> 0.5 x 0.4 x 0.5 meters</p>
            </div>
          </div>
          <FontAwesomeIcon icon={faFile} className="parcel-icon" /> Document
        </div>

        <div className="icon-box">
          <div className={`info-box ${active === 1 ? 'active' : ''}`} onClick={() => handleInfoClick(1)}>
            <span className="info-button">
              <FontAwesomeIcon icon={faCircleInfo} />
            </span>
            <div className="info-popup">
              <h3 className='popup-head'>Small</h3>
              <FontAwesomeIcon icon={faCarSide} className='vehicle-icon'/>
              <p><strong>Weight:</strong> up to 200kg</p>
              <p><strong>Size limit (L x W x H):</strong> 1 x 0.6 x 0.7 meters</p>
            </div>
          </div>
          <FontAwesomeIcon icon={faBox} className="parcel-icon" /> Small
        </div>

        <div className="icon-box">
          <div className={`info-box ${active === 2 ? 'active' : ''}`} onClick={() => handleInfoClick(2)}>
            <span className="info-button">
              <FontAwesomeIcon icon={faCircleInfo} />
            </span>
            <div className="info-popup">
              <h3 className='popup-head'>Medium</h3>
              <FontAwesomeIcon icon={faVanShuttle} className='vehicle-icon'/>
              <p><strong>Weight:</strong> up to 300kg</p>
              <p><strong>Size limit (L x W x H):</strong> 1.2 x 1 x 0.9 meters</p>
            </div>
          </div>
          <FontAwesomeIcon icon={faGifts} className="parcel-icon" /> Medium
        </div>

        <div className="icon-box">
          <div className={`info-box ${active === 3 ? 'active' : ''}`} onClick={() => handleInfoClick(3)}>
            <span className="info-button">
              <FontAwesomeIcon icon={faCircleInfo} />
            </span>
            <div className="info-popup">
              <h3 className='popup-head'>Large</h3>
              <FontAwesomeIcon icon={faTruckPickup} className='vehicle-icon'/>
              <p><strong>Weight:</strong> up to 800kg</p>
              <p><strong>Size limit (L x W x H):</strong> 2.7 x 1.5 x 0.5 meters</p>
            </div>
          </div>
          <FontAwesomeIcon icon={faCouch} className="parcel-icon" /> Large
        </div>

        <div className="icon-box">
          <div className={`info-box ${active === 4 ? 'active' : ''}`} onClick={() => handleInfoClick(4)}>
            <span className="info-button">
              <FontAwesomeIcon icon={faCircleInfo} />
            </span>
            <div className="info-popup">
              <h3 className='popup-head'>Extra Large</h3>
              <FontAwesomeIcon icon={faShip} className='vehicle-icon'/>
              <p><strong>Weight:</strong> up to 1000kg</p>
              <p><strong>Size limit (L x W x H):</strong> 10 x 10 x 10 meters</p>
            </div>
          </div>
          <FontAwesomeIcon icon={faCubes} className="parcel-icon" /> Extra Large
        </div>

        <div className="icon-box">
          <div className={`info-box ${active === 5 ? 'active' : ''}`} onClick={() => handleInfoClick(5)}>
            <span className="info-button">
              <FontAwesomeIcon icon={faCircleInfo} />
            </span>
            <div className="info-popup">
              <h3 className='popup-head'>Custom</h3>
              <FontAwesomeIcon icon={faHelicopter} className='vehicle-icon'/>
              <p><strong>Weight:</strong> contact customer team</p>
              <p><strong>Size limit (L x W x H):</strong> contact customer team</p>
              <h5 id='customer-contact'>Contact us</h5>
            </div>
          </div>
          <FontAwesomeIcon icon={faBoxOpen} className="parcel-icon" /> Custom
        </div>
      </div>
    </>
  );
};

export default ParcelType;
