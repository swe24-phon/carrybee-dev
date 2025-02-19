import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavComponent from '../components/BottomNavComponent';
import NavbarComponent from '../components/NavbarComponent';
import CalendarComponent from '../components/CalendarComponent';
import TimePickerComponent from '../components/TimePickerComponent';
import nextButton from '../components/NextButton';
import previousButton from '../components/PreviousButton';
import PrevButtonComponent from '../components/PreviousButton';
import NextButtonComponent from '../components/NextButton';

const Schedule: React.FC = () => {
  const navigate = useNavigate();
  const [displayDate, setDisplayDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [timeMode, setTimeMode] = useState<'AM' | 'PM'>('AM');
  const [hour, setHour] = useState<string>('02');
  const [minute, setMinute] = useState<string>('00');

  const handlePrevMonth = () => {
    setDisplayDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setDisplayDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + 1);
      return newDate;
    });
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handlePrevClick = () => {
    navigate('/'); // Navigate to homepage
  };

  const handleNextClick = () => {
    navigate('/Form'); // Navigate to form page
  };

  return (
    <div className="h-screen flex justify-center bg-gray-50">
      <div className="app-container">
        <NavbarComponent />
        <div className="content-wrapper">
          <div className="schedule-container">
            <CalendarComponent
              currentDate={displayDate}
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
            />
            <TimePickerComponent
              hour={hour}
              minute={minute}
              timeMode={timeMode}
              selectedDate={selectedDate}
              onHourChange={setHour}
              onMinuteChange={setMinute}
              onTimeModeChange={setTimeMode}
            />
            <div className="navigation-buttons">
              <PrevButtonComponent onClick={handlePrevClick} />
              <NextButtonComponent onClick={handleNextClick} />
            </div>
          </div>
        </div>
        <div className="bottom-nav-wrapper">
          <BottomNavComponent />
        </div>
      </div>
    </div>
  );
};

export default Schedule;
