import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { faBox } from '@fortawesome/free-solid-svg-icons';
import { faGifts } from '@fortawesome/free-solid-svg-icons';
import { faCouch } from '@fortawesome/free-solid-svg-icons';
import { faCubes } from '@fortawesome/free-solid-svg-icons';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import '../css/parcelType.css';

const ParcelType = () => {
  return (
    <>
      <h4 id='type'>Parcel type</h4>
      <div id='parcel-cards'>
        <div className='icon-box'><FontAwesomeIcon icon={faFile} className='parcel-icon'/>Document</div>
        <div className='icon-box'><FontAwesomeIcon icon={faBox} className='parcel-icon' />Small</div>
        <div className='icon-box'><FontAwesomeIcon icon={faGifts} className='parcel-icon' />Medium</div>
        <div className='icon-box'><FontAwesomeIcon icon={faCouch} className='parcel-icon' />Large</div>
        <div className='icon-box'><FontAwesomeIcon icon={faCubes} className='parcel-icon' />Extra Large</div>
        <div className='icon-box'><FontAwesomeIcon icon={faBoxOpen} className='parcel-icon' />Custom</div>
      </div>
    </>
  );
};

export default ParcelType;
