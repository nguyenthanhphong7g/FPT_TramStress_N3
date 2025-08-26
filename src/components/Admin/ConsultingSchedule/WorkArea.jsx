import React, { useEffect, useState } from "react";
import "./WorkArea.css";
import calendar from '../../../assets/images/admin/calendar.png'
import arrow_left from '../../../assets/images/admin/arrow_left.png'
import arrow_right from '../../../assets/images/admin/arrow_right.png'

const scheduleData = {
    "2025-08-26": [
        { time: "08:00", title: "Design Sync" },
        { time: "09:30", title: "Design Sync" },
        { time: "11:00", title: "Design Sync" },
        { time: "13:00", title: "Design Sync" },
    ],
    "2025-08-27": [
        { time: "10:00", title: "Design Sync" },
        { time: "15:00", title: "Design Sync" },
    ],
};

const WorkArea = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const formatDate = (date) =>
        date.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });

    const getKey = (date) => date.toISOString().split("T")[0];
    const events = scheduleData[getKey(currentDate)] || [];

    const getLinePosition = () => {
        if (getKey(currentDate) !== getKey(currentTime)) return null;
        const hour = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        return (hour + minutes / 60) * 60 + 10;
    };

    const goPrevDay = () => {
        const d = new Date(currentDate);
        d.setDate(d.getDate() - 1);
        setCurrentDate(d);
    };

    const goNextDay = () => {
        const d = new Date(currentDate);
        d.setDate(d.getDate() + 1);
        setCurrentDate(d);
    };

    const goToday = () => setCurrentDate(new Date());

    return (
        <div className="work-area">
            {/* Header */}
            <div className="work-area-header">
                <div className="date-box">
                    <span className="icon">
                        <img src={calendar} alt="" />
                    </span>
                    <span className='date-box-day'>{formatDate(currentDate)}</span>
                </div>
            </div>

            {/* Navigation */}
            <div className="work-area-nav">
                <button onClick={goPrevDay} className="nav-btn">
                    <img src={arrow_left} alt="" />
                </button>
                <button onClick={goToday} className="today-btn">Hôm nay</button>
                <button onClick={goNextDay} className="nav-btn">
                    <img src={arrow_right} alt="" />
                </button>
            </div>

            {/* Timeline */}
            <div className="timeline">
                {/* Hours */}
                {Array.from({ length: 24 }, (_, i) => {
                    const hour = i;
                    return (
                        <div key={hour} className="hour">
                            <span className="hour-label">{hour}:00</span>
                        </div>
                    );
                })}
                {/* Events */}
                <div className="timeline-flex-end">
                    {events.map((event, idx) => {
                        const [h, m] = event.time.split(":").map(Number);
                        const top = h * 60 + (m / 60) * 60 + 13;
                        return (
                            <div
                                key={idx}
                                className="event"
                                style={{ top: `${top}px` }}
                            >
                                {event.title}
                            </div>

                        );
                    })}


                </div>
                {/* Current time line */}
                {getLinePosition() !== null && (
                    <div
                        className="current-line"
                        style={{ top: `${getLinePosition()}px` }}
                    />
                )}
            </div>
        </div>
    );
};

export default WorkArea;
