import React, { useState } from 'react';
import BottomNavComponent from '../components/BottomNavComponent';
import NavbarComponent from '../components/NavbarComponent';
import CalendarComponent from '../components/CalendarComponent';
import TimePickerComponent from '../components/TimePickerComponent';
import nextButton from '../components/NextButton';
import previousButton from '../components/PreviousButton';
import PrevButtonComponent from '../components/PreviousButton';
import NextButtonComponent from '../components/NextButton';

const Schedule: React.FC = () => {
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
    // Handle previous button click
    console.log('Previous clicked');
  };

  const handleNextClick = () => {
    // Handle next button click
    console.log('Next clicked');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavbarComponent />
      <main className="flex-1 container mx-auto px-4 pt-4 pb-24 overflow-y-auto">
        <div className="max-w-xl mx-auto">
          <CalendarComponent
            currentDate={displayDate}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
          />
          <div className="mt-4">
            <TimePickerComponent
              hour={hour}
              minute={minute}
              timeMode={timeMode}
              selectedDate={selectedDate}
              onHourChange={setHour}
              onMinuteChange={setMinute}
              onTimeModeChange={setTimeMode}
            />
          </div>
          <div className="flex justify-between mt-8 mb-4 px-4">
            <PrevButtonComponent onClick={handlePrevClick} />
            <NextButtonComponent onClick={handleNextClick} />
          </div>
        </div>
      </main>
      <div className="fixed bottom-0 left-0 right-0">
        <BottomNavComponent />
      </div>
    </div>
  );
};

export default Schedule;
