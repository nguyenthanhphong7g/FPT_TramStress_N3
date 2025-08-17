import "./../Diary/Diary.css";
import { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import imgCat01 from "./../../../assets/images/CatDiary.png";
import MiniCalendar from "./MiniCalendar";

function Diary() {
  const today = new Date();

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [day, setDay] = useState(today.getDate());
  const [content, setContent] = useState("");
  const [modalDate, setModalDate] = useState("");

  // State cho modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  // Load dữ liệu lần đầu
  useEffect(() => {
    loadDiary(year, month, day);
  }, []);

  // Hàm load nhật ký theo ngày
  const loadDiary = (y, m, d) => {
    setYear(y);
    setMonth(m);
    setDay(d);

    const saved = JSON.parse(localStorage.getItem("myDiarys") || "{}");
    const key = `${y}-${m}-${d}`;
    setContent(saved[key] || "");
  };

  // Lưu nhật ký
  const saveDiary = () => {
    const saved = JSON.parse(localStorage.getItem("myDiarys") || "{}");
    const key = `${year}-${month}-${day}`;
    saved[key] = content;
    localStorage.setItem("myDiarys", JSON.stringify(saved));
    alert(`Đã lưu nhật ký ngày ${day}/${month}/${year} ✅`);
  };

  // Xóa nhật ký
  const deleteDiary = () => {
    const saved = JSON.parse(localStorage.getItem("myDiarys") || "{}");
    const key = `${year}-${month}-${day}`;
    if (saved[key]) {
      delete saved[key];
      localStorage.setItem("myDiarys", JSON.stringify(saved));
      setContent("");
      alert(`Đã xóa nhật ký ngày ${day}/${month}/${year}`);
    } else {
      alert("Không có nhật ký để xóa!");
    }
  };

  // Khi chọn ngày trong MiniCalendar
  const handleSelectDate = (y, m, d) => {
    const selectedDate = new Date(y, m - 1, d);
    const isPastDate =
      selectedDate <
      new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const saved = JSON.parse(localStorage.getItem("myDiarys") || "{}");
    const key = `${y}-${m}-${d}`;

    if (isPastDate) {
      // Lưu ngày được chọn
      setModalDate(`${d}/${m}/${y}`);
      // Mở modal
      setModalContent(saved[key] || "📌 Chưa có nhật ký ngày này.");
      setModalOpen(true);
    } else {
      loadDiary(y, m, d);
    }
  };
  return (
    <div className="diary-container">
      {/* Khung nhật ký */}
      <div className="diary-box">
        <h2 className="diary-title">📖 Nhật ký hôm nay</h2>

        <input
          type="date"
          className="date-picker"
          value={`${year}-${month.toString().padStart(2, "0")}-${day
            .toString()
            .padStart(2, "0")}`}
          onChange={(e) => {
            const [y, m, d] = e.target.value.split("-").map(Number);
            loadDiary(y, m, d);
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
          <button className="prev-btn" onClick={deleteDiary}>
            Xóa nhật ký
          </button>

          <button type="button" className="save-btn-diary" onClick={saveDiary}>
            <FaSave /> Lưu
          </button>
        </div>
      </div>

      {/* Panel bên phải */}
      <div className="right-panel">
        <select
          value={year}
          onChange={(e) => loadDiary(Number(e.target.value), month, day)}
        >
          <option value={2025}>Năm 2025</option>
          <option value={2024}>Năm 2024</option>
        </select>

        <select
          value={month}
          onChange={(e) => loadDiary(year, Number(e.target.value), day)}
        >
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              Tháng {i + 1}
            </option>
          ))}
        </select>

        <select
          value={day}
          onChange={(e) => loadDiary(year, month, Number(e.target.value))}
        >
          {[...Array(31)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              Ngày {i + 1}
            </option>
          ))}
        </select>

        {/* Lịch mini */}
        <MiniCalendar
          year={year}
          month={month}
          day={day}
          onSelectDate={handleSelectDate}
        />

        <img src={imgCat01} alt="Mèo" className="cat-img" />
      </div>

      {/* Modal hiển thị nhật ký ngày trước */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>📅 Nhật ký ngày {modalDate}</h3>
            <p>{modalContent}</p>
            <button onClick={() => setModalOpen(false)}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Diary;
