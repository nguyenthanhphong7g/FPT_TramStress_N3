import React, { useState } from 'react'
import './EmotionTest.css'
import BarChartEmoji from '../../Common/Recharts/BarChartComponent'
import dayjs from 'dayjs';

const EmotionTest = () => {
    const [dailyMoods, setDailyMoods] = useState([]);
    const [selectedWeekData, setSelectedWeekData] = useState([]);
    const [isCustomWeek, setIsCustomWeek] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(dayjs());
    return (
        <div className="emotion-test">
            <div className="emotion-test-header">
                <h5>Bài test cảm xúc</h5>
                <h6>Biểu đồ cảm xúc</h6>
            </div>
            <div className="emotion-test-content">
                <BarChartEmoji
                    weekData={selectedWeekData}
                    isCustomWeek={isCustomWeek}
                    setIsCustomWeek={setIsCustomWeek}
                    dailyMoods={dailyMoods}
                    selectedMonth={selectedMonth}
                />
            </div>
        </div>
    )
}

export default EmotionTest
