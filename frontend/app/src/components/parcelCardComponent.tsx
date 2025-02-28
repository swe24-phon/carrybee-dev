import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faFile, faBox, faGifts, faCouch, faCubes, faBoxOpen, faMotorcycle, faCarSide, faVanShuttle, faTruckPickup, faShip, faHelicopter } from '@fortawesome/free-solid-svg-icons';
import useOrderStore from '../store/orderStore';
import userParcelStore from '../store/parcelStore'
import { suggestVehicle } from '../js/vehicleSuggestion';

const defaultDimensions = {
  DOCUMENT: { length: 35, width: 10, height: 32},
  SMALL: { length: 50, width: 40, height: 50 }, // NSC110 Dio
  MEDIUM: { length: 210, width: 120, height: 110}, // Renault Kangoo
  LARGE: { length: 310, width: 180, height: 180}, // Kia K2700
  EXTRA_LARGE: { length:600, width:195, height: 195}, // Isuzu npr
  CUSTOM: { length: null, width: null, height: null }, 
};

const availableVehicles = [
  { id: 1, type: 'Motorcycle', name: 'Motorcycle' },
  { id: 2, type: 'Car', name: 'Car' },
  { id: 3, type: 'Van', name: 'Van' },
  { id: 4, type: 'Truck', name: 'Truck' },
  { id: 5, type: 'Ship', name: 'Ship' }
];

const ParcelCategory = () => {
  const { setParcelDetails } = userParcelStore();
  const { setSelectedVehicle } = useOrderStore();
  const [active, setActive] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [parcelCategory, setParcelCategory] = useState(null); // New state for parcel category

  const handleCardClick = (index, category) => {
    setSelectedCard(index);
    setActive(index === active ? null : index);

    const dimensions = defaultDimensions[category];

    setParcelDetails({
      category,
      height: dimensions.height,
      width: dimensions.width,
      length: dimensions.length,
    });

    setParcelCategory(category); // Set the selected parcel category
  };

  // useEffect hook to update selected vehicle based on parcel dimensions
  useEffect(() => {
    if (parcelCategory) {
      const dimensions = defaultDimensions[parcelCategory];
      if (dimensions && dimensions.length && dimensions.width && dimensions.height) {
        const suggested = suggestVehicle(dimensions, availableVehicles);

        if (suggested.name) {
          setSelectedVehicle(suggested.name);
          console.log('Suggested Vehicle:', suggested.name);  // Log to confirm suggestion
        } else {
          console.log('No vehicle suggested');
        }
      }
    }
  }, [parcelCategory, setSelectedVehicle]); // Watch parcelCategory for changes


  return (
    <>
      <h1 id='type'>Parcel Type</h1>
      <div id="parcel-cards">
        <div className={`icon-box ${selectedCard === 0 ? 'selected' : ''}`}
          onClick={() => handleCardClick(0, 'DOCUMENT')}
        >
          <div className={`info-box ${active === 0 ? 'active' : ''}`}>
            <span className="info-button">
              <FontAwesomeIcon icon={faCircleInfo} />
            </span>
            <div className="info-popup">
              <h3 className='popup-head'>Document</h3>
              <FontAwesomeIcon icon={faMotorcycle} className='vehicle-icon'/>
              <p><strong>Weight:</strong> up to 20kg</p>
              <p><strong>Size limit (L x W x H):</strong> 35 x 32 x 10 cm</p>
            </div>
          </div>
          <FontAwesomeIcon icon={faFile} className="parcel-icon" /> Document
        </div>

        <div className={`icon-box ${selectedCard === 1 ? 'selected' : ''}`}
          onClick={() => handleCardClick(1, 'SMALL')}
        >
          <div className={`info-box ${active === 1 ? 'active' : ''}`}>
            <span className="info-button">
              <FontAwesomeIcon icon={faCircleInfo} />
            </span>
            <div className="info-popup">
              <h3 className='popup-head'>Small</h3>
              <FontAwesomeIcon icon={faCarSide} className='vehicle-icon'/>
              <p><strong>Weight:</strong> up to 200kg</p>
              <p><strong>Size limit (L x W x H):</strong> 50 x 40 x 50 cm </p>
            </div>
          </div>
          <FontAwesomeIcon icon={faBox} className="parcel-icon" /> Small
        </div>

        <div className={`icon-box ${selectedCard === 2 ? 'selected' : ''}`}
          onClick={() => handleCardClick(2, 'MEDIUM')}
        >
          <div className={`info-box ${active === 2 ? 'active' : ''}`}>
            <span className="info-button">
              <FontAwesomeIcon icon={faCircleInfo} />
            </span>
            <div className="info-popup">
              <h3 className='popup-head'>Medium</h3>
              <FontAwesomeIcon icon={faVanShuttle} className='vehicle-icon' />
              <p><strong>Weight:</strong> up to 300kg</p>
              <p><strong>Size limit (L x W x H):</strong> 210 x 120 x 110 cm </p>
            </div>
          </div>
          <FontAwesomeIcon icon={faGifts} className="parcel-icon" /> Medium
        </div>

        <div className={`icon-box ${selectedCard === 3 ? 'selected' : ''}`}
          onClick={() => handleCardClick(3, 'LARGE')}
        >
          <div className={`info-box ${active === 3 ? 'active' : ''}`}>
            <span className="info-button">
              <FontAwesomeIcon icon={faCircleInfo} />
            </span>
            <div className="info-popup">
              <h3 className='popup-head'>Large</h3>
              <FontAwesomeIcon icon={faTruckPickup} className='vehicle-icon' />
              <p><strong>Weight:</strong> up to 800kg</p>
              <p><strong>Size limit (L x W x H):</strong> 310 x 180 x 180 cm</p>
            </div>
          </div>
          <FontAwesomeIcon icon={faCouch} className="parcel-icon" /> Large
        </div>

        <div className={`icon-box ${selectedCard === 4 ? 'selected' : ''}`}
          onClick={() => handleCardClick(4, 'EXTRA_LARGE')}
        >
          <div className={`info-box ${active === 4 ? 'active' : ''}`}>
            <span className="info-button">
              <FontAwesomeIcon icon={faCircleInfo} />
            </span>
            <div className="info-popup">
              <h3 className='popup-head'>Extra Large</h3>
              <FontAwesomeIcon icon={faShip} className='vehicle-icon' />
              <p><strong>Weight:</strong> up to 1000kg</p>
              <p><strong>Size limit (L x W x H):</strong> 600 x 195 x 195 cm</p>
            </div>
          </div>
          <FontAwesomeIcon icon={faCubes} className="parcel-icon" /> Extra Large
        </div>

        <div className={`icon-box ${selectedCard === 5 ? 'selected' : ''}`}
          onClick={() => handleCardClick(5, 'CUSTOM')}
        >
          <div className={`info-box ${active === 5 ? 'active' : ''}`}>
            <span className="info-button">
              <FontAwesomeIcon icon={faCircleInfo} />
            </span>
            <div className="info-popup">
              <h3 className='popup-head'>Custom</h3>
              <FontAwesomeIcon icon={faHelicopter} className='vehicle-icon' />
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

export default ParcelCategory;