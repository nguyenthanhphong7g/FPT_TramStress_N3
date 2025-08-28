import bcrypt from "bcryptjs";



export const compareCurrentPassword = (password) => {
  const currentUser = getCurrentUser();
  const hashedPassword = currentUser?.password || "";
  return bcrypt.compareSync(password, hashedPassword);
};
export const comparePassword = (plainPassword, hashedPassword) => {
   return bcrypt.compareSync(plainPassword, hashedPassword);
};

const API_URL = "http://localhost:3001/users";

export async function getUsers() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function getUser(email) {
  const users = await getUsers();
  return users.find(u => u.email === email) || null;
}

export async function registerAdmin(admin) {
  const exist = await getUser(admin.email);
  if (exist) {
    return { success: false, message: "Email đã tồn tại" };
  }

  admin.password = hashPassword(admin.password);
  admin.role = "admin";

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(admin),
  });

  return { success: true, message: "Tạo admin thành công" };
}

export async function registerUser(newUser) {
  const exist = await getUser(newUser.email);
 
  if (exist) {
     console.log(exist)
    return { success: false, message: "Email đã tồn tại" };
  }

  newUser.password = hashPassword(newUser.password);
  newUser.role = newUser.role || "user";

  newUser.created_at = new Date().toISOString().split("T")[0]; 
  newUser.status = "Đang hoạt động";   
  newUser.mood = 3;            
  newUser.regularity = 0;  
  newUser.interaction_count = 0;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });

  return { success: true, message: "Đăng ký thành công" };
}

export async function loginUser(email, password) {
  const user = await getUser(email);
  if (!user) {
    return { success: false, message: "Sai email hoặc mật khẩu" };
  }
  const isValid = bcrypt.compareSync(password, user.password);
  if (!isValid) {
    return { success: false, message: "Sai email hoặc mật khẩu" };
  }
  setCurrentUser(user);
  return { success: true, message: "Đăng nhập thành công", user };
}

export async function deleteUser(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  return { success: true, message: "Xóa thành công" };
}

export async function updateUserStorages(updatedUser) {
  if (updatedUser.password && !updatedUser.password.startsWith("$2b$")) {
    updatedUser.password = hashPassword(updatedUser.password);
  }
  const updatedCurrentUser = {
  ...updatedUser,
  user_name: updatedUser.name, 
  };
  delete updatedCurrentUser.name; 

  await fetch(`${API_URL}/${updatedUser.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedCurrentUser),
  });

  setCurrentUser(updatedCurrentUser)

  return { success: true, message: "Cập nhật thành công" };
}

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}


export function setCurrentUser(user) {
  sessionStorage.setItem("currentUser", JSON.stringify(user));
}

export function getCurrentUser() {
  const user = sessionStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
}

export function logoutUser() {
  sessionStorage.removeItem("currentUser");
}