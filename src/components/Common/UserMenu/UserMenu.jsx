import React from 'react';
import { FiUser, FiLogOut, FiLock } from 'react-icons/fi';
import './UserMenu.css';
import { useNavigate } from 'react-router-dom';

const UserMenu = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  if (!isOpen) return null;
  const handleLogout = () => {
        navigate('/');
    };

  return (
    <div className="user-menu-card">
      <div className="user-menu-item">
        <FiUser className="menu-icon" />
        <span>Thông tin cá nhân</span>
      </div>
      <div className="user-menu-item">
        <FiLock className="menu-icon" />
        <span>Đổi mật khẩu</span>
      </div>
      <div className="user-menu-item" onClick={handleLogout}>
        <FiLogOut className="menu-icon" />
        <span>Đăng xuất</span>

      </div>
    </div>
  );
};

export default UserMenu;
