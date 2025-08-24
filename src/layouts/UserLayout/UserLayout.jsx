import SidebarFormLayout from '../../components/Common/Sidebar/SidebarFormLayout';
import { FaHome, FaHeart, FaBook, FaSmile } from 'react-icons/fa';
import Header from '../../components/Common/Header/Header';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from '../../components/Common/Footer/Footer';
import '../layout.css';
import { useEffect, useState } from 'react';

function UserLayout() {
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
    { icon: <FaHome />, label: "Home", path: "/userlayout/home" },
    { icon: <FaHeart />, label: "Góc thư giãn", path: "/userlayout/relax" },
    { icon: <FaBook />, label: "Góc nhật ký", path: "/userlayout/diary" },
    { icon: <FaUserFriends />, label: "Góc tư vấn", path: "/userlayout/consulting" },
    { icon: <FaSmile />, label: "Góc cảm xúc", path: "/userlayout/emotion" },
  ];

  const menuItems = [
    { label: 'Home', href: '/userlayout/home' },
    { label: 'Góc thư giãn', path: '/userlayout/relax' },
    { label: 'Góc nhật ký', path: '/#' },
    { label: 'Góc tư vấn', path: '/userlayout/consulting' },
    { label: 'Góc thú cưng', path: '/userlayout/login' },
    { label: 'Góc cảm xúc', path: '/userlayout/emotion' },
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
