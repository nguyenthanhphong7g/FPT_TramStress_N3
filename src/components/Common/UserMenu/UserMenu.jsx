import React from 'react';
import { FiLogOut, FiSettings, FiUser } from 'react-icons/fi';
import './UserMenu.css';
import { useNavigate } from 'react-router-dom';

const UserMenu = ({ isOpen, currentUser, onClick }) => {
  const navigate = useNavigate();
  if (!isOpen) return null;

  const handleLogout = () => {
    localStorage.removeItem("currentUser"); 
    navigate('/');
  };


  return (
    <div className="user-menu-card">
      <div className="user-menu-profile">
        {currentUser.avatar ? <img src={currentUser?.avatar} alt="avatar" className="user-menu-avatar" /> : <FiUser className="user-menu-avatar" />}
        <div className="user-menu-name">{currentUser?.name || "Người dùng"}</div>
      </div>

      <div className="user-menu-item" onClick={onClick}>
        <FiSettings className="menu-icon" />
        <span>Cài đặt</span>
      </div>

      <div className="user-menu-item logout" onClick={handleLogout}>
        <FiLogOut className="menu-icon" />
        <span>Đăng xuất</span>
      </div>
    </div>
  );
};

export default UserMenu;
