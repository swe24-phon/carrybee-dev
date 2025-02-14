import React, { useState } from 'react';
import '../css/Schedule.css';

const ScheduleComponent = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(8);
  const [timeMode, setTimeMode] = useState('AM');
  const [hour, setHour] = useState('02');
  const [minute, setMinute] = useState('00');

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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

  // Create calendar array
  const createCalendarDays = () => {
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
  };

  const hours = Array.from({ length: 12 }, (_, i) => {
    const num = i + 1;
    return num < 10 ? `0${num}` : `${num}`;
  });

  const minutes = Array.from({ length: 60 }, (_, i) => {
    return i < 10 ? `0${i}` : `${i}`;
  });

  // Format time display
  const formatTime = () => {
    return `${hour}:${minute}`;
  };

  return (
    <div className="calendar-container">
      <div className="text-center mb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-normal">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <div className="flex space-x-4">
            <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}>
              ←
            </button>
            <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}>
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
            {createCalendarDays().map((week, weekIndex) => (
              <tr key={weekIndex}>
                {week.map((date, dateIndex) => (
                  <td
                    key={dateIndex}
                    onClick={() => date.isCurrentMonth && setSelectedDate(date.day)}
                    className="text-center p-2"
                  >
                    <span className={`
                      inline-flex items-center justify-center w-8 h-8 rounded-full
                      ${date.isCurrentMonth ? 'cursor-pointer' : 'text-gray-300'}
                      ${date.isCurrentMonth && date.day === selectedDate ? 'bg-gray-200' : ''}
                    `}>
                      {date.day}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <p className="mb-2">Pick-up time:</p>
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <div className="flex justify-between items-center">
                {/* Hour selector */}
              <select
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                className="p-2 rounded border border-gray-300"
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
                className="p-2 rounded border border-gray-300"
              >
                {minutes.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            {/* AM/PM toggle */}
            <div className="flex gap-2">
              <button
                className={`px-4 py-1 rounded ${timeMode === 'AM' ? 'bg-black text-white' : ''}`}
                onClick={() => setTimeMode('AM')}
            >
              AM
            </button>
            <button
              className={`px-4 py-1 rounded ${timeMode === 'PM' ? 'bg-black text-white' : ''}`}
              onClick={() => setTimeMode('PM')}
            >
              PM
            </button>
          </div>
        </div>

         {/* Time display */}
         <div className="text-lg mt-2">
            Selected time: {formatTime()} {timeMode}
          </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="bg-gray-200 py-2 px-4 rounded-lg">prev</button>
          <button className="bg-gray-400 text-white py-2 px-4 rounded-lg">next</button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleComponent;
