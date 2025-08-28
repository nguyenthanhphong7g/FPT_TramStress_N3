import "./../Diary/Diary.css";
import { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import imgCat01 from "./../../../assets/images/CatDiary.png";
import MiniCalendar from "./MiniCalendar";
import { useAuth } from "../../../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Diary() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [day, setDay] = useState(today.getDate());
  const [content, setContent] = useState("");
  const [modalPreview, setModalPreview] = useState("");
  const { user } = useAuth();

  // State cho modal
  const [modalDate, setModalDate] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [hasDiary, setHasDiary] = useState(false);
  const [modalKey, setModalKey] = useState("");

  const [isViewingOldDiary, setIsViewingOldDiary] = useState(false);
  const todayKey = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
  const selectedKey = `${year}-${month}-${day}`;
  const isToday = todayKey === selectedKey;

  // Load dữ liệu lần đầu
  useEffect(() => {
    loadDiary(year, month, day);
  }, []);

  // Hàm load nhật ký từ db.json
  const loadDiary = async (y, m, d) => {
    setYear(y);
    setMonth(m);
    setDay(d);
    const key = `${y}-${m}-${d}`;

    try {
      const res = await fetch(
        `http://localhost:3001/diary?userId=${user?.id || "guest"}&date=${key}`
      );
      const data = await res.json();
      setContent(data.length > 0 ? data[0].content : "");
    } catch {
      setContent("");
    }
  };

  // Lưu nhật ký vào db.json
  // Lưu nhật ký vào db.json
  const saveDiary = async () => {
    if (!user) {
      toast.error("Bạn cần đăng nhập để tiếp tục!!!");
      return;
    }

    const key = `${year}-${month}-${day}`;
    const entry = {
      userId: user?.id || "guest",
      date: key,
      content,
    };

    try {
      const res = await fetch(
        `http://localhost:3001/diary?userId=${entry.userId}&date=${entry.date}`
      );
      const data = await res.json();

      if (data.length > 0) {
        // Đã có nhật ký → không cho lưu thêm
        toast.warning("⚠️ Mỗi ngày chỉ được ghi nhật ký một lần!");
        return;
      } else {
        // Thêm mới nếu chưa có
        await fetch("http://localhost:3001/diary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(entry),
        });

        setModalDate(`${day}/${month}/${year}`);
        setModalContent(`✅ Đã lưu nhật ký ngày ${day}/${month}/${year}`);
        setContent("");
        setHasDiary(true);
        setModalOpen(true);
      }
    } catch {
      toast.error("❌ Lỗi khi lưu nhật ký");
    }
  };

  // Xóa nhật ký
  const deleteDiary = async () => {
    const key = `${year}-${month}-${day}`;

    try {
      const res = await fetch(
        `http://localhost:3001/diary?userId=${user?.id || "guest"}&date=${key}`
      );
      const data = await res.json();

      if (data.length > 0) {
        await fetch(`http://localhost:3001/diary/${data[0].id}`, {
          method: "DELETE",
        });
        setContent("");
        setModalContent(`🗑️ Đã xóa nhật ký ngày ${day}/${month}/${year}`);
        setHasDiary(false);
      } else {
        setModalContent("⚠️ Không có nhật ký để xóa!");
        setHasDiary(false);
      }

      setModalDate(`${day}/${month}/${year}`);
      setModalOpen(true);
    } catch {
      toast.error("❌ Lỗi khi xóa nhật ký");
    }
  };

  // Kiểm tra có nhật ký không
  const checkDiary = async (y, m, d) => {
    const key = `${y}-${m}-${d}`;
    setModalKey(key);

    try {
      const res = await fetch(
        `http://localhost:3001/diary?userId=${user?.id || "guest"}&date=${key}`
      );
      const data = await res.json();

      if (data.length > 0) {
        setModalContent("📖 Bạn đã có nhật ký ngày này.");
        setModalPreview(
          data[0].content.slice(0, 50) +
            (data[0].content.length > 50 ? "..." : "")
        );
        setHasDiary(true);
        return true;
      } else {
        setModalContent("⚠️ Không có nhật ký ngày này.");
        setModalPreview("");
        setHasDiary(false);
        return false;
      }
    } catch {
      return false;
    }
  };

  // Khi chọn ngày trong MiniCalendar
  const handleSelectDate = async (y, m, d) => {
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    const selectedDate = new Date(y, m - 1, d);

    setModalDate(`${d}/${m}/${y}`);

    if (selectedDate > todayDate) {
      setModalContent("🚫 Bạn không thể ghi nhật ký cho ngày trong tương lai!");
      setHasDiary(false);
    } else if (selectedDate.toDateString() === todayDate.toDateString()) {
      setModalContent("✍️ Bạn có thể viết nhật ký cho ngày hôm nay.");
      setHasDiary(true);
      setModalKey(`${y}-${m}-${d}`);
    } else {
      const diaryExists = await checkDiary(y, m, d);
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

  // Xem / ghi nhật ký trong editor
  const viewInEditor = () => {
    if (!modalKey) return;
    const [y, m, d] = modalKey.split("-").map(Number);
    loadDiary(y, m, d);
    setIsViewingOldDiary(true);
    setModalOpen(false);
  };

  // Quay lại hôm nay
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

          {/* Nếu ngày đã có nhật ký thì KHÔNG hiển thị nút Lưu */}
          {!hasDiary && (
            <button
              type="button"
              className="save-btn-diary"
              onClick={saveDiary}
            >
              <FaSave /> Lưu
            </button>
          )}

          {/* Nếu đang xem nhật ký cũ (không phải hôm nay) thì cho nút Quay lại */}
          {isViewingOldDiary && !isToday && (
            <button
              type="button"
              className="save-btn-diary"
              onClick={goBackToToday}
            >
              ⬅ Quay lại
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

            {/* Nếu có nhật ký thì hiển thị thêm preview */}
            {hasDiary && modalPreview && (
              <div
                style={{
                  marginTop: "10px",
                  padding: "10px",
                  background: "#f8f8f8",
                  borderRadius: "5px",
                  fontStyle: "italic",
                }}
              >
                {modalPreview}
              </div>
            )}

            <div style={{ marginTop: "10px" }}>
              <button onClick={() => setModalOpen(false)}>Đóng</button>

              {/* Nếu có nhật ký thì thêm nút Xem ngay */}
              {hasDiary && (
                <button onClick={viewInEditor} style={{ marginLeft: "10px" }}>
                  Xem ngay
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default Diary;
