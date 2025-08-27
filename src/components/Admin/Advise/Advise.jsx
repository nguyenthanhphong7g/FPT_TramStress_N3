import React, { useState, useRef } from "react";
import "./Advise.css";
import { FaCalendarAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import WorkArea from '../ConsultingSchedule/WorkArea'
import adviseTable from './Datadvise'
// Demo dữ liệu sự kiện
const events = [
  { id: 1, title: "Tư vấn A", start: "08:00", end: "09:00" },
  { id: 2, title: "Tư vấn B", start: "09:30", end: "10:30" },
  { id: 3, title: "Tư vấn C", start: "15:00", end: "16:00" },
];

// Hàm chuyển giờ thành phút
const timeToMinutes = (time) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

const Advise = () => {
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const inputRef = useRef(null);


  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Thêm state filter
  const [filterStatus, setFilterStatus] = useState("all");

  const handleIconClick = () => {
    if (inputRef.current) {
      if (inputRef.current.showPicker) {
        inputRef.current.showPicker();
      } else {
        inputRef.current.click();
      }
    }
  };

  const hours = Array.from({ length: 12 }, (_, i) => 8 + i); // từ 8h → 20h

  // Dữ liệu demo bảng
  
  // Lọc dữ liệu theo filterStatus
  const filteredData =
    filterStatus === "all"
      ? adviseTable
      : adviseTable.filter((row) => row.status === filterStatus);

  // Tính tổng số trang
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Cắt dữ liệu cho bảng theo trang hiện tại
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="Admin-container-box">
      {/* --- Lịch tư vấn bên trái --- */}
      <WorkArea/>

      {/* --- Bảng bên phải --- */}
      <div className="Admin-container-right">
        <div className="Button-Admin-Advise">
          <button
            className={`btn-Admin-Advise ${
              filterStatus === "done" ? "active" : ""
            }`}
            onClick={() => {
              setFilterStatus("done");
              setCurrentPage(1);
            }}
          >
            Đã hoàn thành
          </button>

          <button
            className={`btn-Admin-Advise ${
              filterStatus === "pending" ? "active" : ""
            }`}
            onClick={() => {
              setFilterStatus("pending");
              setCurrentPage(1);
            }}
          >
            Chưa hoàn thành
          </button>
          <table className="Content-Table-Advise">
            <thead>
              <tr>
                <th>Chuyên gia</th>
                <th>Người dùng</th>
                <th>Thời gian</th>
                <th>Ngày</th>
                <th>Đánh giá</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.chuyenGia}</td>
                  <td>{row.nguoiDung}</td>
                  <td>{row.thoiGian}</td>
                  <td>{row.ngay}</td>
                  <td>{row.danhGia}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* --- Pagination --- */}
          <div className="pagination-container">
            <div className="pagination-info">
              {`Showing ${(currentPage - 1) * itemsPerPage + 1}–${Math.min(
                currentPage * itemsPerPage,
                filteredData.length
              )} from ${filteredData.length}`}
            </div>

            <div className="pagination-buttons">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                {"<"}
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={currentPage === i + 1 ? "active" : ""}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                {">"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advise;
