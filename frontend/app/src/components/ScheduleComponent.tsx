import React, { useState, useMemo } from 'react';
import '../css/Schedule.css';
import NavbarComponent from './NavbarComponent';

const ScheduleComponent: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [timeMode, setTimeMode] = useState<'AM' | 'PM'>('AM');
  const [hour, setHour] = useState<string>('02');
  const [minute, setMinute] = useState<string>('00');

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Memoized calendar calculations to improve performance
  const calendarData = useMemo(() => {
    // Get days in current month
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();

    // Get first day of month (0-6)
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay();

    const totalDays = [];
    const prevMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      totalDays.push({
        day: prevMonthDays - i,
        isCurrentMonth: false
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      totalDays.push({
        day: i,
        isCurrentMonth: true
      });
    }

    // Next month days
    const remainingDays = 42 - totalDays.length;
    for (let i = 1; i <= remainingDays; i++) {
      totalDays.push({
        day: i,
        isCurrentMonth: false
      });
    }

    // Split into weeks
    const weeks = [];
    for (let i = 0; i < totalDays.length; i += 7) {
      weeks.push(totalDays.slice(i, i + 7));
    }

    return weeks;
  }, [currentDate]);

  // Generate hours and minutes arrays
  const hours = useMemo(() => 
    Array.from({ length: 12 }, (_, i) => {
      const num = i + 1;
      return num < 10 ? `0${num}` : `${num}`;
    }), 
  []);

  const minutes = useMemo(() => 
    Array.from({ length: 60 }, (_, i) => 
      i < 10 ? `0${i}` : `${i}`
    ), 
  []);

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  // Format time display
  const formatTime = () => {
    return `${hour}:${minute} ${timeMode}`;
  };

  // Handle date selection
  const handleDateSelect = (date: { day: number, isCurrentMonth: boolean }) => {
    if (date.isCurrentMonth) {
      setSelectedDate(date.day);
    }
  };

  return (
    <>
      <NavbarComponent />
      <div className="schedule-container fade-in-section">
        <div className="calendar-section">
          <div className="text-center mb-4">
            <h2 className="section-heading">Choose date</h2>

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-normal">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <div className="flex space-x-4">
                <button 
                  className="schedule-button"
                  onClick={goToPreviousMonth}
                >
                  ←
                </button>
                <button 
                  className="schedule-button"
                  onClick={goToNextMonth}
                >
                  →
                </button>
              </div>
            </div>

            <table className="w-full border-separate border-spacing-2">
              <thead>
                <tr>
                  {days.map(day => (
                    <th key={day} className="font-normal">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {calendarData.map((week, weekIndex) => (
                  <tr key={weekIndex}>
                    {week.map((date, dateIndex) => (
                      <td
                        key={dateIndex}
                        onClick={() => handleDateSelect(date)}
                        className="text-center p-2"
                      >
                        <span 
                          className={`
                            inline-flex items-center justify-center w-8 h-8 rounded-full
                            schedule-button
                            ${date.isCurrentMonth ? 'cursor-pointer' : 'text-gray-300'}
                            ${date.isCurrentMonth && date.day === selectedDate 
                              ? 'bg-green-500 text-white date-selection-active' 
                              : ''}
                          `}
                        >
                          {date.day}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="time-section">
          <h2 className="section-heading">Choose time</h2>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <div className="flex justify-center items-center space-x-4 mb-4">
              {/* Hour selector */}
              <select
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                className="time-picker-select"
              >
                {hours.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
              <span>:</span>
              {/* Minute selector */}
              <select
                value={minute}
                onChange={(e) => setMinute(e.target.value)}
                className="time-picker-select"
              >
                {minutes.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            {/* AM/PM toggle */}
            <div className="flex justify-center gap-4">
              <button
                className={`px-4 py-2 rounded-lg schedule-button ${timeMode === 'AM' ? 'bg-black text-white' : 'bg-gray-200'}`}
                onClick={() => setTimeMode('AM')}
              >
                AM
              </button>
              <button
                className={`px-4 py-2 rounded-lg schedule-button ${timeMode === 'PM' ? 'bg-black text-white' : 'bg-gray-200'}`}
                onClick={() => setTimeMode('PM')}
              >
                PM
              </button>
            </div>
          </div>

          {/* Time display */}
          <div className="text-center text-lg mt-4 mb-4">
            Selected time: {formatTime()}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="bg-gray-200 py-2 px-4 rounded-lg schedule-button">
              Previous
            </button>
            <button className="bg-green-500 text-white py-2 px-4 rounded-lg schedule-button">
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScheduleComponent;
