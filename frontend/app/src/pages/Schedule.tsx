import React from 'react';
import ScheduleComponent from '../components/ScheduleComponent';
import BottomNavComponent from '../components/bottomNavComponent';
import NavbarComponent from '../components/NavbarComponent';

const Schedule: React.FC = () => {
  return (
    <div>
      <NavbarComponent />
      <ScheduleComponent />
      <BottomNavComponent />
    </div>
  );
};

export default Schedule;
