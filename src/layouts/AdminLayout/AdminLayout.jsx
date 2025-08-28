import SidebarFormLayout from '../../components/Common/Sidebar/SidebarFormLayout';
import { FaHome, FaHeart, FaUserFriends, FaUser, FaUsers, FaCalendarAlt, FaCalendar } from 'react-icons/fa';
import Header from '../../components/Common/Header/Header';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from '../../components/Common/Footer/Footer';
import '../layout.css';
import { useEffect, useState } from 'react';

function AdminLayout() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("notifications")) || [];
    setNotifications(stored);
  }, []);

  const handleNotificationRead = (index) => {
    const updated = [...notifications];
    updated[index].read = true;
    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));
  };

  const sidebarItems = [
    { icon: <FaHome />, label: "Home", path: "/adminlayout/home" },
    { icon: <FaHeart />, label: "Nội dung", path: "/adminlayout/content" },
    { icon: <FaUser />, label: "Chuyên gia", path: "/#" },
    { icon: <FaUsers />, label: "Người dùng", path: "/adminlayout/user" },
    { icon: <FaCalendarAlt />, label: "Lịch tư vấn", path: "/adminlayout/advise" },
    { icon: <FaCalendar />, label: "Lịch tư vấn", path: "/adminlayout/a" },
  ];

  const menuItems = [
    { label: 'Home', href: '/adminlayout/home' },
    { label: 'Nội dung', path: '/adminlayout/content' },
    { label: 'Chuyên gia', path: '/#' },
    { label: 'Người dùng', path: '/adminlayout/user' },
    { label: 'Lịch tư vấn', path: '/adminlayout/advise' },
  ];

  return (
    <div>
      <Header
      title="Hôm nay bạn thế nào ?"
      onSettingClick={() => navigate("/userlayout/setting")}
      notifications={notifications}
      onNotificationRead={handleNotificationRead}
    />
      <div className="main-content">
        <SidebarFormLayout sidebarItems={sidebarItems} />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
      <Footer menuItems={menuItems} />
    </div>
  );
}

export default AdminLayout;
