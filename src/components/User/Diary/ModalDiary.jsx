import React from "react";
import "./ModalDiary.css";

function ModalDiary({ show, date, content, onClose }) {
  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h3>📅 Nhật ký ngày {date}</h3>
        <p>{content}</p>
        <button onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
}

export default ModalDiary;
