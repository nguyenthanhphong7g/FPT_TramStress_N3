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

  // State cho modal
  const [modalDate, setModalDate] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalPreview, setModalPreview] = useState("");
  const [modalKey, setModalKey] = useState("");
  const [hasDiary, setHasDiary] = useState(false);
  const [isViewingOldDiary, setIsViewingOldDiary] = useState(false);
  const [isTodaySelected, setIsTodaySelected] = useState(true);

  const { user } = useAuth();

  // Xác định ngày
  const todayKey = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const selectedKey = `${year}-${month}-${day}`;
  const isToday = todayKey === selectedKey;

  // Load dữ liệu khi mở component
  useEffect(() => {
    loadDiary(year, month, day);
  }, []);

  // Hàm load nhật ký
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

  // Hàm lưu nhật ký
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
        toast.warning("⚠️ Mỗi ngày chỉ được ghi nhật ký một lần!");
        return;
      } else {
        await fetch("http://localhost:3001/diary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(entry),
        });

        setModalDate(`${day}/${month}/${year}`);
        setModalContent(`✅ Đã lưu nhật ký ngày ${day}/${month}/${year}`);
        setModalKey(key);
        setModalPreview(
          entry.content.slice(0, 50) + (entry.content.length > 50 ? "..." : "")
        );
        setHasDiary(true);

        setContent("");
        setModalOpen(true);
      }
    } catch {
      toast.error("❌ Lỗi khi lưu nhật ký");
    }
  };

  // Hàm xóa nhật ký
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

  // Khi chọn ngày trên calendar
  const handleSelectDate = async (y, m, d) => {
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    const selectedDate = new Date(y, m - 1, d);

    setModalDate(`${d}/${m}/${y}`);
    setIsTodaySelected(
      selectedDate.toDateString() === todayDate.toDateString()
    );

    if (selectedDate > todayDate) {
      setModalContent("🚫 Bạn không thể ghi nhật ký cho ngày trong tương lai!");
      setHasDiary(false);
    } else {
      const diaryExists = await checkDiary(y, m, d);
      setHasDiary(diaryExists);
    }

    setModalOpen(true);
  };

  // Xem nhật ký trong editor
  const viewInEditor = () => {
    if (!modalKey) return;
    const [y, m, d] = modalKey.split("-").map(Number);
    loadDiary(y, m, d);
    setIsViewingOldDiary(true); // Chế độ chỉ xem
    setModalOpen(false);
  };

  // Quay lại hôm nay
  const goBackToToday = async () => {
    const y = today.getFullYear();
    const m = today.getMonth() + 1;
    const d = today.getDate();

    await loadDiary(y, m, d);
    setYear(y);
    setMonth(m);
    setDay(d);

    const res = await fetch(
      `http://localhost:3001/diary?userId=${user?.id || "guest"}&date=${y}-${m}-${d}`
    );
    const data = await res.json();
    if (data.length > 0) {
      setIsViewingOldDiary(true);
    } else {
      setIsViewingOldDiary(false);
    }
  };

  // Hàm render nút trong Modal
  const renderModalButtons = () => {
    const buttons = [
      <button key="close" onClick={() => setModalOpen(false)}>
        Đóng
      </button>,
    ];

    if (hasDiary) {
      buttons.push(
        <button
          key="view"
          onClick={viewInEditor}
          className="save-btn-diary-select"
        >
          Xem ngay
        </button>
      );
    }

    if (isTodaySelected && !hasDiary) {
      buttons.push(
        <button
          className="save-btn-diary-select"
          key="write"
          onClick={() => {
            setModalOpen(false);
            setIsViewingOldDiary(false);
          }}
        >
          Ghi ngay
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="diary-container">
      <div className="diary-box">
        <h2 className="diary-title">📖 Nhật ký</h2>

        <div className="text-area-box">
          <textarea
            className="text-area"
            placeholder="Viết gì đó..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            readOnly={isViewingOldDiary}
          />
        </div>

        <div className="button-group">
          <button className="prev-btn" onClick={deleteDiary}>
            🗑️ Xóa nhật ký
          </button>

          {isViewingOldDiary && !isToday ? (
            <button
              type="button"
              className="save-btn-diary"
              onClick={goBackToToday}
            >
              ⬅ Quay lại
            </button>
          ) : !hasDiary && isToday ? (
            <button
              type="button"
              className="save-btn-diary"
              onClick={saveDiary}
            >
              <FaSave /> Lưu
            </button>
          ) : null}
        </div>
      </div>

      <div className="right-panel">
        <div className="right-panel-day">
          {/* Ngày */}
          <div className="select-field">
            <label htmlFor="day" className="sr-only">Ngày</label>
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

          {/* Tháng */}
          <div className="select-field">
            <label htmlFor="month" className="sr-only">Tháng</label>
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

          {/* Năm */}
          <div className="select-field">
            <label htmlFor="year" className="sr-only">Năm</label>
            <select
              id="year"
              className="day-select"
              value={year}
              onChange={(e) => loadDiary(Number(e.target.value), month, day)}
            >
              <option value={2025}>Năm 2025</option>
              <option value={2024}>Năm 2024</option>
              <option value={2023}>Năm 2023</option>
              <option value={2022}>Năm 2022</option>
              <option value={2021}>Năm 2021</option>
              <option value={2020}>Năm 2020</option>
              <option value={2019}>Năm 2019</option>
              <option value={2018}>Năm 2018</option>
              <option value={2017}>Năm 2017</option>
              <option value={2016}>Năm 2016</option>
              <option value={2015}>Năm 2015</option>
              <option value={2014}>Năm 2014</option>
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

      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>📅 Nhật ký ngày {modalDate}</h3>
            <p>{modalContent}</p>

            {hasDiary && modalPreview && (
              <div className="modal-preview-has-diary">
                {modalPreview}
              </div>
            )}

            <div className="Buttons-modal-Preview">{renderModalButtons()}</div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default Diary;
