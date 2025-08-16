import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import './NotificationPanel.css';

const NotificationPanel = ({ isOpen, notifications, onNotificationClick, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="notification-card">
      <div className="notification-header">
        <h2 className="notification-title">Thông báo</h2>
      </div>
      <div className="notification-list">
        {notifications.length === 0 ? (
          <p className="notification-empty">Không có thông báo mới</p>
        ) : (
          notifications.map((noti, index) => (
            <div
              key={index}
              className={`notification-item ${noti.read ? 'read' : 'unread'}`}
              onClick={() => onNotificationClick(index)}
            >
              <FiAlertCircle className="noti-icon" />
              <div className="noti-content">
                <p className="noti-text">{noti.text}</p>
                <span className="noti-time">{noti.time}</span>
              </div>
              {!noti.read && <span className="unread-dot"></span>}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
