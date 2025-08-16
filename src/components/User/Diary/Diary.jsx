import "./../Diary/Diary.css"
import { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import imgCat01 from "./../../../assets/images/CatDiary.png";
import MiniCalendar from "./MiniCalendar"; 

function Home() {
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(7);
  const [day, setDay] = useState(10);
  const [content, setContent] = useState("");
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    const saved = localStorage.getItem("myDiary");
    if (saved) {
      const { year, month, day, content } = JSON.parse(saved);
      setYear(year);
      setMonth(month);
      setDay(day);
      setContent(content);
    }
  }, []);

  return (
    <div className="diary-container">
      {/* Khung nhật ký */}
      <div className="diary-box">
        <h2 className="diary-title">Nhật ký nha !!!</h2>

        <input
          type="date"
          className="date-picker"
          value={`${year}-${month.toString().padStart(2, "0")}-${day
            .toString()
            .padStart(2, "0")}`}
          onChange={(e) => {
            const [y, m, d] = e.target.value.split("-").map(Number);
            setYear(y);
            setMonth(m);
            setDay(d);
          }}
        />

        <div className="text-area-box">
          <textarea
            className="text-area"
            placeholder="Viết gì đó..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="button-group">
          <button
            className="prev-btn"
            onClick={() => {
              setContent("");
              alert(
                `Nhật ký chưa được lưu!`
              );
            }}
          >
            Xóa nhật ký
          </button>

          <button
            type="button"
            className="save-btn"
            onClick={() => {
              const diaryData = { year, month, day, content };
              localStorage.setItem("myDiary", JSON.stringify(diaryData));
              console.log("Đã lưu vào localStorage!");
              setContent("");
              alert(
                `Hôm nay bạn đã ghi nhật ký ngày ${day}/${month}/${year} ✅`
              );
            }}
          >
            <FaSave /> Lưu
          </button>
        </div>
      </div>

      {/* Panel bên phải */}
      <div className="right-panel">
        <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
          <option value={2025}>Năm 2025</option>
          <option value={2024}>Năm 2024</option>
        </select>

        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
        >
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              Tháng {i + 1}
            </option>
          ))}
        </select>

        <select value={day} onChange={(e) => setDay(Number(e.target.value))}>
          {[...Array(31)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              Ngày {i + 1}
            </option>
          ))}
        </select>

        {/* Lịch mini */}
        <MiniCalendar year={year} month={month} day={day} />

        <img src={imgCat01} alt="Mèo" className="cat-img" />
      </div>
    </div>
  );
}

export default Home;
