import SidebarFormLayout from '../../components/Common/Sidebar/SidebarFormLayout';
import { FaHome, FaHeart, FaUser, FaUsers, FaCalendarAlt, FaChartLine} from 'react-icons/fa';
import Header from '../../components/Common/Header/Header';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from '../../components/Common/Footer/Footer';
import '../layout.css';
import { useEffect, useState } from 'react';

function UserLayout() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  // Lấy dữ liệu từ localStorage khi load app
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
    { icon: <FaUsers />, label: "Người dùng", path: "/#" },
    { icon: <FaCalendarAlt />, label: "Lịch tư vấn", path: "/adminlayout/advise" },
    { icon: <FaChartLine />, label: "Thống kê", path: "/#" },
  ];

  const menuItems = [
    { label: 'Home', href: '/admin/home' },
    { label: 'Nội dung', path: '/adminlayout/content' },
    { label: 'Chuyên gia', path: '/#' },
    { label: 'Người dùng', path: '/#' },
    { label: 'Lịch tư vấn', path: '/adminlayout/advise' },
    { label: 'Thống kê', path: '/#' },
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

export default UserLayout;
