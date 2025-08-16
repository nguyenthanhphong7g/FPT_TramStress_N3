import React, { useState, useEffect, useRef } from 'react';
import { FiSettings, FiBell, FiUser } from 'react-icons/fi';
import NotificationPanel from '../NotificationPanel/NotificationPanel.';
import UserMenu from '../UserMenu/UserMenu';
import './Header.css';

const Header = () => {
  const [isNotiOpen, setIsNotiOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const notiRef = useRef(null);
  const userRef = useRef(null);

  const toggleNoti = () => {
  setIsNotiOpen(prev => {
    if (!prev) setIsUserMenuOpen(false); 
    return !prev;
  });
};

const toggleUserMenu = () => {
  setIsUserMenuOpen(prev => {
    if (!prev) setIsNotiOpen(false); 
    return !prev;
  });
};


  useEffect(() => {
    const storedNotis = JSON.parse(localStorage.getItem('notifications')) || [];
    setNotifications(storedNotis);
    setUnreadCount(storedNotis.filter(n => !n.read).length);
  }, []);

  useEffect(() => {
    if (isNotiOpen) {
      const storedNotis = JSON.parse(localStorage.getItem('notifications')) || [];
      setNotifications(storedNotis);
      setUnreadCount(storedNotis.filter(n => !n.read).length);
    }
  }, [isNotiOpen]);

  const handleNotificationClick = (index) => {
    if (!Array.isArray(notifications) || !notifications[index]) return;

    const updated = [...notifications];
    if (!updated[index].read) {
      updated[index].read = true;
      localStorage.setItem('notifications', JSON.stringify(updated));
      setNotifications(updated);

      const unread = updated.filter(n => !n.read).length;
      setUnreadCount(unread);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notiRef.current && !notiRef.current.contains(event.target) &&
        userRef.current && !userRef.current.contains(event.target)
      ) {
        setIsNotiOpen(false);
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="header-container">
      <div className="header-left"><span>Trạm Stress</span></div>

      <div className="header-center">
        <h2>Hôm nay bạn thế nào?</h2>
      </div>

      <div className="header-right">
        <button className="header-action-btn" title="Cài đặt">
          <FiSettings className="icon" />
        </button>

        <div ref={notiRef} style={{ display: 'inline-block' }}>
          <button
            className={`header-action-btn header-action-btn-bell ${isNotiOpen ? 'active' : ''}`}
            title="Thông báo"
            onClick={toggleNoti}
          >
            <div style={{ position: 'relative' }}>
              <FiBell className="icon" />
              {unreadCount > 0 && !isNotiOpen && (
                <span className="noti-badge">{unreadCount}</span>
              )}
            </div>
          </button>
          <NotificationPanel
            isOpen={isNotiOpen}
            notifications={notifications}
            onNotificationClick={handleNotificationClick}
            onClose={() => setIsNotiOpen(false)}
          />
        </div>

        <div ref={userRef} style={{ display: 'inline-block' }}>
          <button
            className={`header-action-btn header-action-btn-user ${isUserMenuOpen ? 'active' : ''}`}
            title="Tài khoản"
            onClick={toggleUserMenu}
          >
            <FiUser className="icon" />
          </button>
          <UserMenu
            isOpen={isUserMenuOpen}
            onClose={() => setIsUserMenuOpen(false)}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
