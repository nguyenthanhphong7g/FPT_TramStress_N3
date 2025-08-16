import BarChartEmoji from "../../../Common/Recharts/BarChartComponent";
import Calendar from "../../../Common/Calendar/Calender";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "./History.css";

function History() {
    const [dailyMoods, setDailyMoods] = useState([]);
    const [selectedWeekData, setSelectedWeekData] = useState([]);
    const [isCustomWeek, setIsCustomWeek] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(dayjs());

    useEffect(() => {
        const storedData = localStorage.getItem("dailyMoods");
        if (storedData) {
            setDailyMoods(JSON.parse(storedData));
        } else {
            const demoData = [];
            const today = dayjs();
            for (let i = 0; i < 365; i++) {
                demoData.push({
                    date: today.subtract(i, "day").format("YYYY-MM-DD"),
                    value: Math.floor(Math.random() * 5) + 1
                });
            }
            localStorage.setItem("dailyMoods", JSON.stringify(demoData));
            setDailyMoods(demoData);
        }
    }, []);

    return (

        <div className="container">
            <span className="underline-text">Lịch sử cảm xúc</span>
            <div className="history-container">
                <div className="history-chart">
                    <BarChartEmoji
                        weekData={selectedWeekData}
                        isCustomWeek={isCustomWeek}
                        setIsCustomWeek={setIsCustomWeek}
                        dailyMoods={dailyMoods}
                        selectedMonth={selectedMonth}
                    />
                </div>
                <div className="history-calendar">
                    <Calendar
                        dailyMoods={dailyMoods}
                        onSelectWeek={(data) => setSelectedWeekData(data)}
                        setIsCustomWeek={setIsCustomWeek}
                        onMonthChange={setSelectedMonth}
                    />
                </div>
            </div>
            <div className="history-test">
                <p>Muốn hiểu rõ hơn cảm xúc của mình trong tuần này?</p>
                <button className="save-btn">
                    Làm bài test ngay
                </button>
            </div>
        </div>
    );
}

export default History;
