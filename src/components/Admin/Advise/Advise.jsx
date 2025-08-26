import React, { useState, useRef } from "react";
import "./Advise.css";
import { FaCalendarAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
  const adviseTable = [
    {
      chuyenGia: "Nguyễn Văn A",
      nguoiDung: "Lê Thị B",
      thoiGian: "08:00 - 09:00",
      ngay: "24/08/2025",
      danhGia: "Tốt",
      status: "done",
    },
    {
      chuyenGia: "Nguyễn Văn B",
      nguoiDung: "Trần Văn C",
      thoiGian: "09:30 - 10:30",
      ngay: "24/08/2025",
      danhGia: "Chưa đánh giá",
      status: "pending",
    },
    {
      chuyenGia: "Nguyễn Văn C",
      nguoiDung: "Phạm Văn D",
      thoiGian: "15:00 - 16:00",
      ngay: "23/08/2025",
      danhGia: "Xuất sắc",
      status: "done",
    },
    {
      chuyenGia: "Nguyễn Văn A",
      nguoiDung: "Lê Thị B",
      thoiGian: "08:00 - 09:00",
      ngay: "24/08/2025",
      danhGia: "Tốt",
      status: "done",
    },
    {
      chuyenGia: "Nguyễn Văn B",
      nguoiDung: "Trần Văn C",
      thoiGian: "09:30 - 10:30",
      ngay: "24/08/2025",
      danhGia: "Chưa đánh giá",
      status: "pending",
    },
    {
      chuyenGia: "Nguyễn Văn C",
      nguoiDung: "Phạm Văn D",
      thoiGian: "15:00 - 16:00",
      ngay: "23/08/2025",
      danhGia: "Xuất sắc",
      status: "done",
    },
    {
      chuyenGia: "Nguyễn Văn A",
      nguoiDung: "Lê Thị B",
      thoiGian: "08:00 - 09:00",
      ngay: "24/08/2025",
      danhGia: "Tốt",
      status: "done",
    },
    {
      chuyenGia: "Nguyễn Văn B",
      nguoiDung: "Trần Văn C",
      thoiGian: "09:30 - 10:30",
      ngay: "24/08/2025",
      danhGia: "Chưa đánh giá",
      status: "pending",
    },
    {
      chuyenGia: "Nguyễn Văn C",
      nguoiDung: "Phạm Văn D",
      thoiGian: "15:00 - 16:00",
      ngay: "23/08/2025",
      danhGia: "Xuất sắc",
      status: "done",
    },
    {
      chuyenGia: "Nguyễn Văn A",
      nguoiDung: "Lê Thị B",
      thoiGian: "08:00 - 09:00",
      ngay: "24/08/2025",
      danhGia: "Tốt",
      status: "done",
    },
    {
      chuyenGia: "Nguyễn Văn B",
      nguoiDung: "Trần Văn C",
      thoiGian: "09:30 - 10:30",
      ngay: "24/08/2025",
      danhGia: "Chưa đánh giá",
      status: "pending",
    },
    {
      chuyenGia: "Nguyễn Văn C",
      nguoiDung: "Phạm Văn D",
      thoiGian: "15:00 - 16:00",
      ngay: "23/08/2025",
      danhGia: "Xuất sắc",
      status: "done",
    },
    {
      chuyenGia: "Nguyễn Văn B",
      nguoiDung: "Trần Văn C",
      thoiGian: "09:30 - 10:30",
      ngay: "24/08/2025",
      danhGia: "Chưa đánh giá",
      status: "pending",
    },
    {
      chuyenGia: "Nguyễn Văn B",
      nguoiDung: "Trần Văn C",
      thoiGian: "09:30 - 10:30",
      ngay: "24/08/2025",
      danhGia: "Chưa đánh giá",
      status: "pending",
    },
    {
      chuyenGia: "Nguyễn Văn B",
      nguoiDung: "Trần Văn C",
      thoiGian: "09:30 - 10:30",
      ngay: "24/08/2025",
      danhGia: "Chưa đánh giá",
      status: "pending",
    },
    {
      chuyenGia: "Nguyễn Văn B",
      nguoiDung: "Trần Văn C",
      thoiGian: "09:30 - 10:30",
      ngay: "24/08/2025",
      danhGia: "Chưa đánh giá",
      status: "pending",
    },
    {
      chuyenGia: "Nguyễn Văn B",
      nguoiDung: "Trần Văn C",
      thoiGian: "09:30 - 10:30",
      ngay: "24/08/2025",
      danhGia: "Chưa đánh giá",
      status: "pending",
    },
    {
      chuyenGia: "Nguyễn Văn B",
      nguoiDung: "Trần Văn C",
      thoiGian: "09:30 - 10:30",
      ngay: "24/08/2025",
      danhGia: "Chưa đánh giá",
      status: "pending",
    },
    {
      chuyenGia: "Nguyễn Văn B",
      nguoiDung: "Trần Văn C",
      thoiGian: "09:30 - 10:30",
      ngay: "24/08/2025",
      danhGia: "Chưa đánh giá",
      status: "pending",
    },
    {
      chuyenGia: "Nguyễn Văn C",
      nguoiDung: "Phạm Văn D",
      thoiGian: "15:00 - 16:00",
      ngay: "23/08/2025",
      danhGia: "Xuất sắc",
      status: "done",
    },
    {
      chuyenGia: "Nguyễn Văn A",
      nguoiDung: "Lê Thị B",
      thoiGian: "08:00 - 09:00",
      ngay: "24/08/2025",
      danhGia: "Tốt",
      status: "done",
    },
    {
      chuyenGia: "Nguyễn Văn C",
      nguoiDung: "Phạm Văn D",
      thoiGian: "15:00 - 16:00",
      ngay: "23/08/2025",
      danhGia: "Xuất sắc",
      status: "done",
    },
    {
      chuyenGia: "Nguyễn Văn A",
      nguoiDung: "Lê Thị B",
      thoiGian: "08:00 - 09:00",
      ngay: "24/08/2025",
      danhGia: "Tốt",
      status: "done",
    },
    {
      chuyenGia: "Nguyễn Văn C",
      nguoiDung: "Phạm Văn D",
      thoiGian: "15:00 - 16:00",
      ngay: "23/08/2025",
      danhGia: "Xuất sắc",
      status: "done",
    },
    {
      chuyenGia: "Nguyễn Văn A",
      nguoiDung: "Lê Thị B",
      thoiGian: "08:00 - 09:00",
      ngay: "24/08/2025",
      danhGia: "Tốt",
      status: "done",
    },
    {
      chuyenGia: "Nguyễn Văn C",
      nguoiDung: "Phạm Văn D",
      thoiGian: "15:00 - 16:00",
      ngay: "23/08/2025",
      danhGia: "Xuất sắc",
      status: "done",
    },
    {
      chuyenGia: "Nguyễn Văn A",
      nguoiDung: "Lê Thị B",
      thoiGian: "08:00 - 09:00",
      ngay: "24/08/2025",
      danhGia: "Tốt",
      status: "done",
    },
    {
      chuyenGia: "Nguyễn Văn C",
      nguoiDung: "Phạm Văn D",
      thoiGian: "15:00 - 16:00",
      ngay: "23/08/2025",
      danhGia: "Xuất sắc",
      status: "done",
    },
    {
      chuyenGia: "Nguyễn Văn A",
      nguoiDung: "Lê Thị B",
      thoiGian: "08:00 - 09:00",
      ngay: "24/08/2025",
      danhGia: "Tốt",
      status: "done",
    },
    {
      chuyenGia: "Nguyễn Văn C",
      nguoiDung: "Phạm Văn D",
      thoiGian: "15:00 - 16:00",
      ngay: "23/08/2025",
      danhGia: "Xuất sắc",
      status: "done",
    },
    {
      chuyenGia: "Nguyễn Văn A",
      nguoiDung: "Lê Thị B",
      thoiGian: "08:00 - 09:00",
      ngay: "24/08/2025",
      danhGia: "Tốt",
      status: "done",
    },
  ];

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
      <div className="Admin-container-left">
        <h3>Lịch tư vấn</h3>
        <div className="Content-container-advise">
          <div className="Content-advise-left">
            <div className="calendar-advise">
              <FaCalendarAlt
                className="icon-calendar-advise"
                onClick={handleIconClick}
              />
              <input
                ref={inputRef}
                type="date"
                className="text-calendar-advise"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            <div className="Content-advise-right">
              <div className="w-80 border rounded-lg overflow-hidden mt-4">
                <div className="flex justify-between items-center p-2 border-b bg-gray-50">
                  <button className="px-2">{"<"}</button>
                  <span className="font-medium">Hôm nay</span>
                  <button className="px-2">{">"}</button>
                </div>

                <div className="relative">
                  {hours.map((hour) => (
                    <div
                      key={hour}
                      className="h-16 border-t flex items-start pl-2 text-xs text-gray-500 relative"
                    >
                      <span className="absolute -left-8 top-1">{hour}:00</span>
                    </div>
                  ))}

                  {events.map((event) => {
                    const startMin = timeToMinutes(event.start);
                    const endMin = timeToMinutes(event.end);
                    const top = ((startMin - 8 * 60) / 60) * 64;
                    const height = ((endMin - startMin) / 60) * 64;

                    return (
                      <div
                        key={event.id}
                        className="absolute left-12 right-2 bg-green-500 text-white text-xs rounded-md px-2 py-1"
                        style={{
                          top: `${top}px`,
                          height: `${height}px`,
                        }}
                      >
                        {event.title}
                      </div>
                    );
                  })}

                  {/* Đường kẻ giờ hiện tại */}
                  {(() => {
                    const now = new Date();
                    const currentTime = `${now.getHours()}:${now
                      .getMinutes()
                      .toString()
                      .padStart(2, "0")}`;
                    const top =
                      ((timeToMinutes(currentTime) - 8 * 60) / 60) * 64;

                    return (
                      <div
                        className="absolute left-0 right-0 h-0.5 bg-red-500"
                        style={{ top: `${top}px` }}
                      />
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
              {`${(currentPage - 1) * itemsPerPage + 1}–${Math.min(
                currentPage * itemsPerPage,
                filteredData.length
              )} trong ${filteredData.length} hàng`}
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
