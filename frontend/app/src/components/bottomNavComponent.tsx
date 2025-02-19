import React from 'react';
import '../css/homepage.css';
import '../css/bottomnav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney } from '@fortawesome/free-solid-svg-icons';
import { faGauge } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import {faCircleUser} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const navigate = useNavigate(); // usage of useNavigate
  return (
    <>
      <div id='bottom-nav'>
        <div className='nav-icons'>
          <FontAwesomeIcon icon={faHouseChimney} className='nav-icon' onClick={() => navigate('/')}/>
        </div>
        <div className='nav-icons'>
        <FontAwesomeIcon icon={faGauge} className='nav-icon' onClick={() => navigate('/dashboard')}/>
        </div>
        <div className='nav-icons'>
        <FontAwesomeIcon icon={faGear} className='nav-icon'/>
        </div>
        <div className='nav-icons'>
        <FontAwesomeIcon icon={faCircleUser} className='nav-icon'/>
        </div>
      </div>
    </>
  );
};

export default BottomNav;
