import React, { useState, useCallback, useEffect } from 'react';
import '../css/Schedule.css';
import CalendarComponent from './CalendarComponent';
import TimePickerComponent from './TimePickerComponent';
import useOrderStore from '../store/orderStore'; // Import the order store

const ScheduleComponent = () => {
  const [displayDate, setDisplayDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [timeMode, setTimeMode] = useState<'AM' | 'PM'>('AM');
  const [hour, setHour] = useState<string>('02');
  const [minute, setMinute] = useState<string>('00');

  const setSchedule = useOrderStore((state) => state.setSchedule); // Get setSchedule from the store

  const handlePrevMonth = useCallback(() => {
    setDisplayDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  }, []);

  const handleNextMonth = useCallback(() => {
    setDisplayDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  }, []);

  const handleDateSelect = useCallback((date: Date) => {
    console.log("HandleDate", date)
    setSelectedDate(date);
  }, [selectedDate]);
// combines the selected date and time into a
// proper Date object and updates the store with setSchedule
  useEffect(() => {
    if (selectedDate) {
      console.log(selectedDate, "This is from the useEffect")
      const hour24 = timeMode === 'PM' && hour !== '12' ? parseInt(hour) + 12 : parseInt(hour);
      const finalHour = timeMode === 'AM' && hour === '12' ? 0 : hour24;

      const scheduledDate = new Date(selectedDate);
      scheduledDate.setHours(finalHour, parseInt(minute), 0, 0);

      setSchedule(scheduledDate); // Update the store with the new schedul
    }
  }, [selectedDate, hour, minute, timeMode]);

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
          selectedDate={selectedDate}
          onHourChange={setHour}
          onMinuteChange={setMinute}
          onTimeModeChange={setTimeMode}
        />
      </div>
    </div>
  );
};

export default ScheduleComponent;
