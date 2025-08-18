import React from "react";
import "./../Diary/MiniCalendar.css";

function MiniCalendar({ year, month, day, onSelectDate }) {
  const daysInMonth = new Date(year, month, 0).getDate();
  const startDay = new Date(year, month - 1, 1).getDay();
  const weeks = [];
  let dayNum = 1;

  const offset = startDay === 0 ? 6 : startDay - 1;

  for (let week = 0; week < 6; week++) {
    const days = [];
    for (let i = 0; i < 7; i++) {
      if ((week === 0 && i < offset) || dayNum > daysInMonth) {
        days.push(null);
      } else {
        days.push(dayNum++);
      }
    }
    weeks.push(days);
  }

  const weekDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  const today = new Date();
  const todayKey = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

  return (
    <div className="mini-calendar">
      <div className="calendar-header-diary">
        {weekDays.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="calendar-days">
        {weeks.flat().map((d, idx) => {
          if (d === null) {
            return <div key={idx} className="calendar-day-diary empty"></div>;
          }

          const cellKey = `${year}-${month}-${d}`;
          const isToday = cellKey === todayKey;
          const isSelected = d === day;
          const isPast =
            new Date(year, month - 1, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate());

          return (
            <div
              key={idx}
              className={`calendar-day-diary
                ${isSelected ? "selected" : ""} 
                ${isToday ? "today" : ""} 
                ${isPast ? "past" : ""} 
                ${idx % 7 === 5 ? "sat" : ""} 
                ${idx % 7 === 6 ? "sun" : ""}`}
              onClick={() => isPast && onSelectDate(year, month, d)}
            >
              {d}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MiniCalendar;
