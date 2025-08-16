import React from "react";
import "./../Diary/MiniCalendar.css";

function MiniCalendar({ year, month, day }) {
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

  return (
    <div className="mini-calendar">
      <div className="calendar-header">
        {weekDays.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="calendar-days">
        {weeks.flat().map((d, idx) => (
          <div
            key={idx}
            className={`calendar-day 
              ${d === null ? "empty" : ""} 
              ${d === day ? "selected" : ""} 
              ${idx % 7 === 5 ? "sat" : ""} 
              ${idx % 7 === 6 ? "sun" : ""}`}
          >
            {d ?? ""}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MiniCalendar;
