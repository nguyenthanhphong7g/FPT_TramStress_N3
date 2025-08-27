import BarChartEmoji from "../../../Common/Recharts/BarChartComponent";
import Calendar from "../../../Common/Calendar/Calender";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "./History.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../contexts/AuthContext";
import { getDailyMoodEntry } from "../../../../services/activity/getDailyMoodEntry";

function History() {
  const [dailyMoods, setDailyMoods] = useState([]);
  const [selectedWeekData, setSelectedWeekData] = useState([]);
  const [isCustomWeek, setIsCustomWeek] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(dayjs());
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
  if (!user) return;
  const fetchMood = async () => {
    const userId = user.id;
    // const date = dayjs().format("YYYY-MM-DD")

    const moodEntry = await getDailyMoodEntry(userId);
    setDailyMoods(moodEntry)
  };

  fetchMood();
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
        <button
          onClick={() => navigate("/userlayout/emotion/test")}
          className="save-btn"
        >
          Làm bài test ngay
        </button>
      </div>
    </div>
  );
}

export default History;
