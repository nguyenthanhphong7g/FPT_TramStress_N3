import React, { useState, useEffect, useRef } from "react";
import { FiBell, FiUser } from "react-icons/fi";
import NotificationPanel from "../NotificationPanel/NotificationPanel";
import UserMenu from "../UserMenu/UserMenu";
import "./Header.css";

const Header = ({
  title = "Hôm nay bạn thế nào?",
  onSettingClick,
  notifications = [],
  onNotificationRead = () => { },
}) => {
  const [isNotiOpen, setIsNotiOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const notiRef = useRef(null);
  const userRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const toggleNoti = () =>
    setIsNotiOpen((prev) => {
      if (!prev) setIsUserMenuOpen(false);
      return !prev;
    });

  const toggleUserMenu = () =>
    setIsUserMenuOpen((prev) => {
      if (!prev) setIsNotiOpen(false);
      return !prev;
    });

  const handleNotificationClick = (index) => {
    if (notifications[index] && !notifications[index].read) {
      onNotificationRead(index);
    }
  };

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (savedUser) setCurrentUser(savedUser);

    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem("currentUser"));
      setCurrentUser(updatedUser);
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notiRef.current &&
        !notiRef.current.contains(event.target) &&
        userRef.current &&
        !userRef.current.contains(event.target)
      ) {
        setIsNotiOpen(false);
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header-container">
      <div className="header-left">
        <span>Trạm Stress</span>
      </div>

      <div className="header-center">
        <h2>{title}</h2>
      </div>

      <div className="header-right">
        {/* <button
          className="header-action-btn"
          title="Cài đặt"
          onClick={onSettingClick}
        >
          <FiSettings className="icon" />
        </button> */}

        <div ref={notiRef} style={{ display: "inline-block" }}>
          <button
            className={`header-action-btn header-action-btn-bell ${isNotiOpen ? "active" : ""
              }`}
            title="Thông báo"
            onClick={toggleNoti}
          >
            <div style={{ position: "relative" }}>
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

        <div ref={userRef} style={{ display: "inline-block" }}>
          <button
            className={`header-action-btn header-action-btn-user ${isUserMenuOpen ? "active" : ""
              }`}
            title="Tài khoản"
            onClick={toggleUserMenu}
          >
            {currentUser?.avatar ? (
              <img
                src={currentUser.avatar}
                alt="avatar"
                className="header-avatar"
              />
            ) : (
              <FiUser className="icon" />
            )}
          </button>
          <UserMenu
            isOpen={isUserMenuOpen}
            currentUser={currentUser}
            onClick={() => onSettingClick()
            }
          />

        </div>
      </div>
    </header>
  );
};

export default Header;
