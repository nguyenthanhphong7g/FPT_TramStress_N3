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

  // State cho modal
  const [modalDate, setModalDate] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [hasDiary, setHasDiary] = useState(false);
  const [modalKey, setModalKey] = useState("");

  const [isViewingOldDiary, setIsViewingOldDiary] = useState(false); // 🔥 kiểm soát nút quay lại
  const todayKey = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
  const selectedKey = `${year}-${month}-${day}`;
  const isToday = todayKey === selectedKey;

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

    // hiện modal thay vì alert
    setModalDate(`${day}/${month}/${year}`);
    setModalContent(`✅ Đã lưu nhật ký ngày ${day}/${month}/${year}`);
    setHasDiary(true);
    setModalOpen(true);
  };

  // Xóa nhật ký
  const deleteDiary = () => {
    const saved = JSON.parse(localStorage.getItem("myDiarys") || "{}");
    const key = `${year}-${month}-${day}`;
    if (saved[key]) {
      delete saved[key];
      localStorage.setItem("myDiarys", JSON.stringify(saved));
      setContent("");

      setModalDate(`${day}/${month}/${year}`);
      setModalContent(`🗑️ Đã xóa nhật ký ngày ${day}/${month}/${year}`);
      setHasDiary(false);
      setModalOpen(true);
    } else {
      setModalDate(`${day}/${month}/${year}`);
      setModalContent("⚠️ Không có nhật ký để xóa!");
      setHasDiary(false);
      setModalOpen(true);
    }
  };

  // Hàm kiểm tra có nhật ký hay chưa
  const checkDiary = (y, m, d) => {
    const saved = JSON.parse(localStorage.getItem("myDiarys") || "{}");
    const key = `${y}-${m}-${d}`;
    setModalKey(key);
    return !!saved[key];
  };

  // Khi chọn ngày trong MiniCalendar
  const handleSelectDate = (y, m, d) => {
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    const selectedDate = new Date(y, m - 1, d);

    setModalDate(`${d}/${m}/${y}`);

    if (selectedDate > todayDate) {
      // 🚫 Ngày tương lai
      setModalContent("🚫 Bạn không thể ghi nhật ký cho ngày trong tương lai!");
      setHasDiary(false);
    } else if (selectedDate.toDateString() === todayDate.toDateString()) {
      // 📌 Ngày hôm nay
      setModalContent("✍️ Bạn có thể viết nhật ký cho ngày hôm nay.");
      setHasDiary(true);
      setModalKey(`${y}-${m}-${d}`);
    } else {
      // 📌 Ngày quá khứ
      const diaryExists = checkDiary(y, m, d);
      if (diaryExists) {
        setModalContent("📖 Bạn đã có nhật ký ngày này. Muốn xem lại không?");
        setHasDiary(true);
      } else {
        setModalContent("📌 Chưa có nhật ký ngày này.");
        setHasDiary(false);
      }
    }

    setModalOpen(true);
  };

  // 👉 Xem / ghi nhật ký trong editor
  const viewInEditor = () => {
    if (!modalKey) return;
    const [y, m, d] = modalKey.split("-").map(Number);
    loadDiary(y, m, d);
    setIsViewingOldDiary(true);
    setModalOpen(false);
  };

  // 🔥 Hàm quay lại hôm nay
  const goBackToToday = () => {
    const y = today.getFullYear();
    const m = today.getMonth() + 1;
    const d = today.getDate();
    loadDiary(y, m, d);
    setYear(y);
    setMonth(m);
    setDay(d);
    setIsViewingOldDiary(false);
  };

  return (
    <div className="diary-container">
      {/* Khung nhật ký */}
      <div className="diary-box">
        <h2 className="diary-title">📖 Nhật ký</h2>
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

          {isViewingOldDiary ? (
            isToday ? (
              // Nếu đang xem hôm nay → hiện nút Lưu
              <button
                type="button"
                className="save-btn-diary"
                onClick={saveDiary}
              >
                <FaSave /> Lưu
              </button>
            ) : (
              // Nếu đang xem ngày cũ → hiện nút Quay lại
              <button
                type="button"
                className="save-btn-diary"
                onClick={goBackToToday}
              >
                ⬅ Quay lại
              </button>
            )
          ) : (
            // Nếu không ở chế độ xem → luôn cho phép Lưu
            <button
              type="button"
              className="save-btn-diary"
              onClick={saveDiary}
            >
              <FaSave /> Lưu
            </button>
          )}
        </div>
      </div>

      {/* Panel bên phải */}
      <div className="right-panel">
        <div className="right-panel-day">
          <div className="select-field">
            <label htmlFor="day" className="sr-only">
              Ngày
            </label>
            <select
              id="day"
              className="day-select"
              value={day}
              onChange={(e) => loadDiary(year, month, Number(e.target.value))}
            >
              {[...Array(31)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  Ngày {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="select-field">
            <label htmlFor="month" className="sr-only">
              Tháng
            </label>
            <select
              id="month"
              className="day-select"
              value={month}
              onChange={(e) => loadDiary(year, Number(e.target.value), day)}
            >
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  Tháng {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="select-field">
            <label htmlFor="year" className="sr-only">
              Năm
            </label>
            <select
              id="year"
              className="day-select"
              value={year}
              onChange={(e) => loadDiary(Number(e.target.value), month, day)}
            >
              <option value={2025}>Năm 2025</option>
              <option value={2024}>Năm 2024</option>
            </select>
          </div>
        </div>

        {/* Lịch mini */}
        <MiniCalendar
          year={year}
          month={month}
          day={day}
          onSelectDate={handleSelectDate}
        />
        <img src={imgCat01} alt="Mèo" className="cat-img" />
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>📅 Nhật ký ngày {modalDate}</h3>
            <p>{modalContent}</p>
            <div style={{ marginTop: "10px" }}>
              <button onClick={() => setModalOpen(false)}>Đóng</button>
              {(hasDiary ||
                modalContent.includes("hôm nay") ||
                modalContent.includes("Chưa có")) && (
                <button onClick={viewInEditor} style={{ marginLeft: "10px" }}>
                  Ghi / Xem ngay
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Diary;
