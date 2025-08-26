import React, { useState } from "react";
import {
  FaPlus,
  FaSearch,
  FaCalendarAlt,
  FaEye,
  FaEdit,
  FaTrash,
  FaSlidersH,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import "./Content.css";
import dataFake from "./DataFake";
function ContentAdmin() {
  const [data, setData] = useState(dataFake);
  const [selectedItem, setSelectedItem] = useState(null); // item đang xem
  const [editItem, setEditItem] = useState(null); // item đang chỉnh sửa
  const [filter, setFilter] = useState("Tất cả");
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // tìm kiếm

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [newItem, setNewItem] = useState({
    id: data.length + 1,
    noidung: "",
    camxuc: 1,
    loaihinh: "Bài tập",
    thoiluong: "",
    luottuongtac: 0,
    ngaythem: new Date().toLocaleDateString("vi-VN"), // auto ngày hiện tại
  });

  // Lọc dữ liệu theo loại hình
  // Lọc dữ liệu theo loại hình + search
  const filteredItems = data.filter((item) => {
    const matchFilter = filter === "Tất cả" || item.loaihinh === filter;
    const matchSearch = item.noidung
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchFilter && matchSearch;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Xem chi tiết
  const handleView = (item) => {
    setSelectedItem(item);
  };

  // Đóng modal xem
  const handleCloseView = () => {
    setSelectedItem(null);
  };

  // Mở modal sửa
  const handleEdit = (item) => {
    setEditItem({ ...item }); // copy dữ liệu để chỉnh
  };

  // Cập nhật giá trị trong form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditItem((prev) => ({ ...prev, [name]: value }));
  };
  const handleNewChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  // Lưu chỉnh sửa
  const handleSaveEdit = () => {
    setData((prev) => prev.map((d) => (d.id === editItem.id ? editItem : d)));
    setEditItem(null); // đóng modal
  };

  const handleCloseEdit = () => {
    setEditItem(null);
  };

  const handleDelete = (item) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa: ${item.noidung}?`)) {
      setData((prev) => prev.filter((d) => d.id !== item.id));
    }
  };

  return (
    <div>
      {/* --- Header --- */}
      <div className="top-container-Admin">
        <div className="left-title">
          <h2>Nội dung thư giãn</h2>
          <p>
            <a href="">Nội dung thư giãn</a>
          </p>
        </div>
        <button className="btn-add" onClick={() => setShowAddModal(true)}>
          <FaPlus className="icon-plus" />
          Thêm nội dung
        </button>
      </div>

      {/* --- Search + Filter --- */}
      <div className="bottom-container-Admin">
        <div className="header-content-center">
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // reset về trang 1 khi tìm
              }}
            />
            <FaSearch className="search-icon" />
          </div>
          <div className="button-header-container">
            <button>
              <FaCalendarAlt className="calendar-icon" />
              Chọn ngày
            </button>
            <button>
              <FaSlidersH className="calendar-icon" />
              Lọc
            </button>
          </div>
        </div>

        {/* --- Table --- */}
        <div className="content-main">
          <div className="title-contain">
            <h4>Danh sách nội dung</h4>
            <div className="select-button">
              <button
                className={filter === "Tất cả" ? "active" : ""}
                onClick={() => {
                  setFilter("Tất cả");
                  setCurrentPage(1);
                }}
              >
                Tất cả
              </button>
              <button
                className={filter === "Bài tập" ? "active" : ""}
                onClick={() => {
                  setFilter("Bài tập");
                  setCurrentPage(1);
                }}
              >
                Bài tập
              </button>
              <button
                className={filter === "Giai điệu" ? "active" : ""}
                onClick={() => {
                  setFilter("Giai điệu");
                  setCurrentPage(1);
                }}
              >
                Giai điệu
              </button>
              <button
                className={filter === "Lời hay" ? "active" : ""}
                onClick={() => {
                  setFilter("Lời hay");
                  setCurrentPage(1);
                }}
              >
                Lời hay
              </button>
            </div>
          </div>
          <table className="Content-Table">
            <thead>
              <tr>
                <th>Nội dung</th>
                <th>Cảm xúc</th>
                <th>Loại hình</th>
                <th>Thời lượng</th>
                <th>Lượt tương tác</th>
                <th>Ngày thêm</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.noidung}</td>
                  <td>{item.camxuc}</td>
                  <td>{item.loaihinh}</td>
                  <td>{item.thoiluong}</td>
                  <td>{item.luottuongtac}</td>
                  <td>{item.ngaythem}</td>
                  <td className="btn-table-all">
                    <button
                      className="btn-table"
                      onClick={() => handleView(item)}
                    >
                      <FaEye />
                    </button>
                    <button
                      className="btn-table"
                      onClick={() => handleEdit(item)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn-table"
                      onClick={() => handleDelete(item)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Modal Xem chi tiết --- */}
      {selectedItem && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Chi tiết nội dung</h3>
            <p>
              <strong>Nội dung:</strong> {selectedItem.noidung}
            </p>
            <p>
              <strong>Cảm xúc:</strong> {selectedItem.camxuc}
            </p>
            <p>
              <strong>Loại hình:</strong> {selectedItem.loaihinh}
            </p>
            <p>
              <strong>Thời lượng:</strong> {selectedItem.thoiluong}
            </p>
            <p>
              <strong>Lượt tương tác:</strong> {selectedItem.luottuongtac}
            </p>
            <p>
              <strong>Ngày thêm:</strong> {selectedItem.ngaythem}
            </p>
            <button className="btn-close-Content" onClick={handleCloseView}>
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* --- Modal Sửa nội dung --- */}
      {editItem && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Chỉnh sửa nội dung</h3>
            <label>
              Nội dung:
              <input
                type="text"
                name="noidung"
                value={editItem.noidung}
                onChange={handleChange}
              />
            </label>
            <label>
              Cảm xúc:
              <input
                type="number"
                name="camxuc"
                value={editItem.camxuc}
                onChange={handleChange}
              />
            </label>
            <label>
              Loại hình:
              <input
                type="text"
                name="loaihinh"
                value={editItem.loaihinh}
                onChange={handleChange}
              />
            </label>
            <label>
              Thời lượng:
              <input
                type="text"
                name="thoiluong"
                value={editItem.thoiluong}
                onChange={handleChange}
              />
            </label>
            <label>
              Lượt tương tác:
              <input
                type="number"
                name="luottuongtac"
                value={editItem.luottuongtac}
                onChange={handleChange}
              />
            </label>
            <label>
              Ngày thêm:
              <input
                type="text"
                name="ngaythem"
                value={editItem.ngaythem}
                onChange={handleChange}
              />
            </label>
            <div style={{ marginTop: "15px" }}>
              <button className="btn-close-Content" onClick={handleSaveEdit}>
                Lưu
              </button>
              <button
                className="btn-close-Content"
                style={{ background: "gray" }}
                onClick={handleCloseEdit}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content modal-add-content">
            <div className="modal-content-header">
              <h3>Thêm nội dung thư giãn</h3>
              <button onClick={() => setShowAddModal(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="add-form-main">
              <div className="add-info">
                <label>Tên nội dung:</label>
                <input
                  type="text"
                  name="noidung"
                  value={newItem.noidung}
                  onChange={handleNewChange}
                  placeholder="Nhập tên nội dung..."
                />
                <label>Mô tả:</label>
                <textarea placeholder="Nhập mô tả..." />
                <div className="add-side">
                  <div className="add-select">
                    <label>Cảm xúc:</label>
                    <select>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </select>
                    <label>Loại hình:</label>
                    <select>
                      <option>Bài tập</option>
                      <option>Giai điệu</option>
                      <option>Lời hay</option>
                    </select>
                  </div>
                  <div className="add-time">
                    <div className="add-time">
                      <label>Thời lượng:</label>
                      <input
                        type="text"
                        name="thoiluong"
                        value={newItem.thoiluong}
                        onChange={handleNewChange}
                        placeholder="VD: 10p20s"
                      />
                    </div>
                  </div>
                  <div className="add-status">
                    <label>Trạng thái:</label>
                    <select>
                      <option>Khóa</option>
                      <option>Mở</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="add-content-block">
                <h4>Nội dung</h4>
                <div className="add-media">
                  <div className="add-media-item">
                    <span>Ảnh</span>
                    <div className="add-dropzone">
                      Kéo thả hoặc thêm ảnh
                      <input
                        type="file"
                        accept="image/*"
                        style={{ marginTop: "10px" }}
                        onChange={(e) => {
                          // Xử lý file ảnh ở đây, ví dụ:
                          const file = e.target.files[0];
                          if (file) {
                            // Bạn có thể lưu file vào state hoặc upload lên server
                            alert(`Đã chọn ảnh: ${file.name}`);
                          }
                        }}
                      />
                    </div>
                    <button className="btn-add-media">Thêm ảnh</button>
                  </div>
                  <div className="add-media-item">
                    <span>Video</span>
                    <div className="add-dropzone">
                      Kéo thả hoặc thêm video
                      <input
                        type="file"
                        accept="video/*"
                        style={{ marginTop: "10px" }}
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            alert(`Đã chọn video: ${file.name}`);
                          }
                        }}
                      />
                    </div>
                    <button className="btn-add-media">Thêm video</button>
                  </div>
                  <div className="add-media-item">
                    <span>Link</span>
                    <div className="add-dropzone">
                      Kéo thả hoặc thêm link
                      <input
                        type="file"
                        style={{ marginTop: "10px" }}
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            alert(`Đã chọn file: ${file.name}`);
                          }
                        }}
                      />
                    </div>
                    <button className="btn-add-media">Thêm link</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="add-actions">
              <button className="btn-close-Content-add-action">Quay lại</button>
              <button
                className="btn-save-Content-add-action"
                onClick={() => {
                  setData((prev) => [
                    ...prev,
                    { ...newItem, id: prev.length + 1 },
                  ]);
                  setNewItem({
                    id: data.length + 2,
                    noidung: "",
                    camxuc: 1,
                    loaihinh: "Bài tập",
                    thoiluong: "",
                    luottuongtac: 0,
                    ngaythem: new Date().toLocaleDateString("vi-VN"),
                  });
                  setShowAddModal(false);
                }}
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="pagination-container-Content">
        <div className="pagination-info-content">
          {`Showing ${(currentPage - 1) * itemsPerPage + 1}–${Math.min(
            currentPage * itemsPerPage,
            filteredItems.length 
          )} from ${filteredItems.length}`}{" "}
        </div>

        <div className="pagination-buttons-content">
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
  );
}

export default ContentAdmin;
