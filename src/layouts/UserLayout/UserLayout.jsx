import SidebarFormLayout from '../../components/Common/Sidebar/SidebarFormLayout';
import { FaHome, FaHeart, FaBook, FaUserFriends, FaPaw, FaSmile } from 'react-icons/fa';
import Header from '../../components/Common/Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../../components/Common/Footer/Footer';
import '../layout.css';

function UserLayout() {


  const sidebarItems = [
    { icon: <FaHome />, label: "Home", path: "/userlayout/home" },
    { icon: <FaHeart />, label: "Góc thư giãn", path: "/#" },
    { icon: <FaHeart />, label: "Góc thư giãn", path: "/userlayout/relax" },
    { icon: <FaBook />, label: "Góc nhật ký", path: "/userlayout/diary" },
    { icon: <FaUserFriends />, label: "Góc tư vấn", path: "/#" },
    { icon: <FaPaw />, label: "Góc thú cưng", path: "/userlayout/login" },
    { icon: <FaSmile />, label: "Góc cảm xúc", path: "/userlayout/emotion" },
  ];

  const menuItems = [
    { label: 'Home', href: '/userlayout/home' },
    { label: 'Góc thư giãn', path: '/userlayout/relax' },
    { label: 'Góc nhật ký', path: '/#' },
    { label: 'Góc tư vấn', path: '/#' },
    { label: 'Góc thú cưng', path: '/userlayout/login' },
    { label: 'Góc cảm xúc', path: '/userlayout/emotion' },
  ];

  return (
    <div>
      <Header/>
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
