import React, { useState, useCallback } from 'react';
import '../css/Schedule.css';
import CalendarComponent from './CalendarComponent';
import TimePickerComponent from './TimePickerComponent';

const ScheduleComponent = () => {
  const [displayDate, setDisplayDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [timeMode, setTimeMode] = useState<'AM' | 'PM'>('AM');
  const [hour, setHour] = useState<string>('02');
  const [minute, setMinute] = useState<string>('00');

  const handlePrevMonth = useCallback(() => {
    setDisplayDate(prevDate => {
      console.log('Previous month clicked', prevDate);
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      console.log('New date will be', newDate);
      return newDate;
    });
  }, []);

  const handleNextMonth = useCallback(() => {
    setDisplayDate(prevDate => {
      console.log('Next month clicked', prevDate);
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      console.log('New date will be', newDate);
      return newDate;
    });
  }, []);

  const handleDateSelect = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  return (
    <div className="schedule-container">
      <div className="calendar-and-time">
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
          onHourChange={setHour}
          onMinuteChange={setMinute}
          onTimeModeChange={setTimeMode}
        />
      </div>
    </div>
  );
};

export default ScheduleComponent;
