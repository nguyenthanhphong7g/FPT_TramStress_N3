const API_URL = "http://localhost:3001"; 

// Hàm GET (xem danh sách hoặc chi tiết)
export const getData = async (endpoint, id = null) => {
  const url = id ? `${API_URL}/${endpoint}/${id}` : `${API_URL}/${endpoint}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Error fetching data");
  return res.json();
};

// Hàm POST (thêm mới)
export const addData = async (endpoint, data) => {
  const res = await fetch(`${API_URL}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error adding data");
  return res.json();
};

// Hàm PUT (cập nhật toàn bộ object)
export const updateData = async (endpoint, id, data) => {
  const res = await fetch(`${API_URL}/${endpoint}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error updating data");
  return res.json();
};

// Hàm PATCH (cập nhật một phần)
export const patchData = async (endpoint, id, data) => {
  const res = await fetch(`${API_URL}/${endpoint}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error patching data");
  return res.json();
};

// Hàm DELETE (xóa)
export const deleteData = async (endpoint, id) => {
  const res = await fetch(`${API_URL}/${endpoint}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error deleting data");
  return true;
};
