import React, { useEffect, useState } from "react";
import {
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import "./Content.css";
import TatCa from "../../Common/Button/Admin/TatCa";
import BaiTap from "../../Common/Button/Admin/BaiTap";
import GiaiDieu from "../../Common/Button/Admin/GiaiDieu";
import LoiHay from "../../Common/Button/Admin/LoiHay";
import Pagination from "../../Common/Pagination/Admin/Pagination";
import { getData } from "../../../services/apiService";
import Search_Admin from "../../Common/Search/Search_Admin";
import Loc from "../../Common/Button/Admin/Loc";
import ChonNgay from "../../Common/Button/Admin/ChonNgay";
import eye from '../../../assets/images/admin/eye.png'
import pencil from '../../../assets/images/admin/pencil.png'
import trash from '../../../assets/images/admin/trash.png'

function ContentAdmin() {
  const [selected, setSelected] = useState('tatca');
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // item đang xem
  const [editItem, setEditItem] = useState(null); // item đang chỉnh sửa
  const [filter, setFilter] = useState("Tất cả");
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // tìm kiếm
  const [allData, setAllData] = useState([]);
  //const [selected, setSelected] = useState('tatca');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pagesize = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData('relax_content');
        setAllData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const [newItem, setNewItem] = useState({
    noidung: "",
    camxuc: 1,
    loaihinh: "Bài tập",
    thoiluong: "",
    luottuongtac: 0,
    ngaythem: new Date().toLocaleDateString("vi-VN"),
  });

  // 📌 Lấy dữ liệu từ API khi load trang
  useEffect(() => {
    fetch("http://localhost:3001/content")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Lỗi khi fetch content:", err));
  }, []);

  // 📌 Lọc dữ liệu
  const filteredItems = data.filter((item) => {
    const matchFilter = filter === "Tất cả" || item.loaihinh === filter;
    const matchSearch = item.noidung
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchFilter && matchSearch;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // 📌 CRUD
  const handleAdd = () => {
    fetch("http://localhost:3001/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    })
      .then((res) => res.json())
      .then((created) => {
        setData((prev) => [...prev, created]);
        setShowAddModal(false);
        setNewItem({
          noidung: "",
          camxuc: 1,
          loaihinh: "Bài tập",
          thoiluong: "",
          luottuongtac: 0,
          ngaythem: new Date().toLocaleDateString("vi-VN"),
        });
      });
    ngaythem: new Date().toLocaleDateString("vi-VN"), // auto ngày hiện tại 
  });
  // Xem chi tiết
  const handleView = (item) => {
    setSelectedItem(item);
  };

  const handleSaveEdit = () => {
    fetch(`http://localhost:3001/content/${editItem.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editItem),
    })
      .then((res) => res.json())
      .then((updated) => {
        setData((prev) =>
          prev.map((d) => (d.id === updated.id ? updated : d))
        );
        setEditItem(null);
      });
  };

  const handleDelete = (item) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa: ${item.noidung}?`)) {
      fetch(`http://localhost:3001/content/${item.id}`, {
        method: "DELETE",
      }).then(() => {
        setData((prev) => prev.filter((d) => d.id !== item.id));
      });
    }
  };

  // 📌 Cập nhật form
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
  const getFilteredContent = () => {
    let filtered = allData;

    // Lọc theo loại
    switch (selected) {
      case 'baitap':
        filtered = filtered.filter(item => item.slug === 'exercise');
        break;
      case 'giaidieu':
        filtered = filtered.filter(item => item.slug === 'music');
        break;
      case 'loihay':
        filtered = filtered.filter(item => item.slug === 'quote');
        break;
      default:
        break;
    }
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(item =>
        (item.title || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };
  const totalPages = Math.ceil(getFilteredContent().length / pagesize);
  const startIdx = (currentPage - 1) * pagesize;
  const endIdx = startIdx + pagesize;
  const currentContent = getFilteredContent().slice(startIdx, endIdx);

  const handlePageChange = (page) => setCurrentPage(page);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset về trang đầu
  };

  return (
    <>
      {

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
                setCurrentPage(1);
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
              {["Tất cả", "Bài tập", "Giai điệu", "Lời hay"].map((type) => (
                <button
                  key={type}
                  className={filter === type ? "active" : ""}
                  onClick={() => {
                    setFilter(type);
                    setCurrentPage(1);
                  }}
                >
                  {type}
                </button>
              ))}
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
              {currentItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.noidung}</td>
                  <td>{item.camxuc}</td>
                  <td>{item.loaihinh}</td>
                  <td>{item.thoiluong}</td>
                  <td>{item.luottuongtac}</td>
                  <td>{item.ngaythem}</td>
                  <td className="btn-table-all">
                    <button
                      className="btn-table"
                      onClick={() => setSelectedItem(item)}
                    >
                      <FaEye />
                    </button>
                    <button
                      className="btn-table"
                      onClick={() => setEditItem(item)}
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

      {/* --- Modal Add --- */}
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
              <label>Nội dung:</label>
              <input
                type="text"
                name="noidung"
                value={newItem.noidung}
                onChange={handleNewChange}
              />
              <label>Loại hình:</label>
              <input
                type="text"
                name="loaihinh"
                value={newItem.loaihinh}
                onChange={handleNewChange}
              />
              <label>Thời lượng:</label>
              <input
                type="text"
                name="thoiluong"
                value={newItem.thoiluong}
                onChange={handleNewChange}
              />
              <button onClick={handleAdd}>Lưu</button>
            </div>
          </div>
        </div>
      )}

      {/* --- Modal Edit --- */}
      {editItem && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Chỉnh sửa nội dung</h3>
            <input
              type="text"
              name="noidung"
              value={editItem.noidung}
              onChange={handleChange}
            />
            <input
              type="text"
              name="loaihinh"
              value={editItem.loaihinh}
              onChange={handleChange}
            />
            <input
              type="text"
              name="thoiluong"
              value={editItem.thoiluong}
              onChange={handleChange}
            />
            <button onClick={handleSaveEdit}>Lưu</button>
            <button onClick={() => setEditItem(null)}>Hủy</button>
          </div>
        </div>
      )}

      {/* --- Pagination --- */}
      <div className="pagination-container-Content">
        <div className="pagination-info-content">
          {`Showing ${(currentPage - 1) * itemsPerPage + 1}–${Math.min(
            currentPage * itemsPerPage,
            filteredItems.length
          )} from ${filteredItems.length}`}
        </div>

        <div className="pagination-buttons-content">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
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
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>

        selectedItem && (
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
        )
      }

      {/* --- Modal Sửa nội dung --- */}
      {
        editItem && (
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
        )
      }
      {
        showAddModal && (
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
        )
      }
      <div className='admin-user'>
        <div className="admin-user-header">
          <div className="admin-user-title">
            <h4>Nội dung thư giãn</h4>
            <h5>Nội dung thư giãn</h5>
          </div>
          <div className='trending-content-btn'>
            <button onClick={() => setShowAddModal(true)}>
              <FaPlus className="icon-plus" />
              Thêm nội dung
            </button>
          </div>
        </div>

        <div className="admin-user-filter-bar">
          <Search_Admin onSearch={handleSearch} />
          <div className="admin-filter">
            <ChonNgay />
            <Loc />
          </div>
        </div>
        <div className="trending-content-table">
          <div className="trending-content-header">
            <h5>Nội dung thịnh hành</h5>
            <div className="filter-bar">
              <TatCa isActive={selected === 'tatca'} onClick={() => { setSelected('tatca'); setCurrentPage(1); }} />
              <BaiTap isActive={selected === 'baitap'} onClick={() => { setSelected('baitap'); setCurrentPage(1); }} />
              <GiaiDieu isActive={selected === 'giaidieu'} onClick={() => { setSelected('giaidieu'); setCurrentPage(1); }} />
              <LoiHay isActive={selected === 'loihay'} onClick={() => { setSelected('loihay'); setCurrentPage(1); }} />
            </div>
          </div>
          <div className="admin-user-table" style={{ minHeight: `${pagesize * 60 + 125}px` }}>
            <div className="table-wrapper">
              <table>
                <colgroup>
                  <col style={{ width: '250px' }} />
                  <col style={{ width: '150px' }} />
                  <col style={{ width: '150px' }} />
                  <col style={{ width: '150px' }} />
                  <col style={{ width: '150px' }} />
                  <col style={{ width: '150px' }} />
                  <col style={{ width: '150px' }} />
                </colgroup>
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
                  {getFilteredContent().map(item => (
                    <tr key={item.id}>
                      <td>{item.title}</td>
                      <td>{item.emotion_number}</td>
                      <td>{item.type}</td>
                      <td>{item.duration}</td>
                      <td>{item.views}</td>
                      <td>{item.date}</td>
                      <td className='admin-table-action'>
                        <button
                          className="btn-table"
                          onClick={() => handleView(item)}
                        >
                          <img src={eye} alt="" />
                        </button>
                        <button
                          className="btn-table"
                          onClick={() => handleEdit(item)}
                        >
                          <img src={pencil} alt="" />
                        </button>
                        <button
                          className="btn-table"
                          onClick={() => handleDelete(item)}
                        >
                          <img src={trash} alt="" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="footer-admin">
              <Pagination
                totalPages={Math.ceil(getFilteredContent().length / pagesize)}
                onPageChange={handlePageChange}
                start={startIdx}
                end={endIdx}
                total={getFilteredContent().length}
              />
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default ContentAdmin;
