import React, { useMemo } from 'react';
import '../css/TimePicker.css';

interface TimePickerProps {
  hour: string;
  minute: string;
  timeMode: 'AM' | 'PM';
  selectedDate: Date | null;
  onHourChange: (hour: string) => void;
  onMinuteChange: (minute: string) => void;
  onTimeModeChange: (mode: 'AM' | 'PM') => void;
}

const TimePickerComponent: React.FC<TimePickerProps> = ({
  hour,
  minute,
  timeMode,
  selectedDate,
  onHourChange,
  onMinuteChange,
  onTimeModeChange,
}) => {
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

  const formatDate = (date: Date | null) => {
    if (!date) return 'No date selected';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="time-section">
      <h2 className="section-heading">Choose time</h2>
      <div className="time-picker-container">
        <div className="time-selectors">
          <select
            value={hour}
            onChange={(e) => onHourChange(e.target.value)}
            className="time-picker-select"
          >
            {hours.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
          <span className="time-separator">:</span>
          <select
            value={minute}
            onChange={(e) => onMinuteChange(e.target.value)}
            className="time-picker-select"
          >
            {minutes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className="time-mode-buttons">
          <button
            className={`time-mode-button ${timeMode === 'AM' ? 'time-mode-active' : ''}`}
            onClick={() => onTimeModeChange('AM')}
          >
            AM
          </button>
          <button
            className={`time-mode-button ${timeMode === 'PM' ? 'time-mode-active' : ''}`}
            onClick={() => onTimeModeChange('PM')}
          >
            PM
          </button>
        </div>
      </div>

      <div className="time-display">
        Selected date and time: {formatDate(selectedDate)} | {hour}:{minute} {timeMode}
      </div>
    </div>
  );
};

export default TimePickerComponent;
