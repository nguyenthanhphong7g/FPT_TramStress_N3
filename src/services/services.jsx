import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);
const hashPassword = (password) => bcrypt.hashSync(password, salt);

const USER_KEY = "users";

export const compareCurrentPassword = (password) => {
  const currentUser = getCurrentUser();
  const hashedPassword = currentUser?.password || "";
  return bcrypt.compareSync(password, hashedPassword);
};

export function getUser(email) {
  const users = getUsers();
  return users.find(u => u.email === email) || null;
}

export function getUsers() {
  const users = localStorage.getItem(USER_KEY);
  return users ? JSON.parse(users) : [];
}

function saveUsers(users) {
  localStorage.setItem(USER_KEY, JSON.stringify(users));
}

export function registerUser(newUser) {
  const users = getUsers();
  const exist = users.find(u => u.email === newUser.email);
  if (exist) {
    return { success: false, message: "Email đã tồn tại" };
  }

  newUser.password = hashPassword(newUser.password);
  // newUser.role = newUser.role || "user";
  users.push(newUser);
  saveUsers(users);
  return { success: true, message: "Đăng ký thành công" };
}


export function loginUser(email, password) {
  const users = getUsers();
  const user = users.find(u => u.email === email);
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

export function deleteUser(email) {
  let users = getUsers();
  users = users.filter(u => u.email !== email);
  saveUsers(users);
  return { success: true, message: "Xóa thành công" };
}
export const comparePassword = (plainPassword, hashedPassword) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};
export const updateUserStorages = (updatedUser) => {
  if (!updatedUser) return;

  if (updatedUser.password && !updatedUser.password.startsWith("$2a$")) {
    updatedUser.password = hashPassword(updatedUser.password);
  }

  setCurrentUser(updatedUser);

  const users = getUsers();

  const updatedUsers = users.map((u) => {
    const matchById = updatedUser.id != null && u.id != null && u.id === updatedUser.id;
    const matchByEmail = updatedUser.email && u.email && u.email === updatedUser.email;
    return matchById || matchByEmail ? updatedUser : u;
  });

  saveUsers(updatedUsers);
};



export function setCurrentUser(user) {
  sessionStorage.setItem("currentUser", JSON.stringify(user));
}

export function getCurrentUser() {
  const user = sessionStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
}