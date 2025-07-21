import React, { useState, useRef, useEffect } from "react";
import "../styles/AdminHeader.css";
import "../styles/AdminPage.css";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../../contexts/NotificationContext";

const AdminHeader = () => {
  const navigate = useNavigate();
  const { notifications, hasNewNotifications } = useNotification();
  const [showNotificationDropdown, setShowNotificationDropdown] =
    useState(false);
  const dropdownRef = useRef(null);

  const goHome = () => {
    navigate("/");
  };

  const toggleNotificationDropdown = () => {
    setShowNotificationDropdown(!showNotificationDropdown);
  };

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotificationDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="adp-top-bar">
      <div className="adp-logo" onClick={goHome}>
        <h1>시네맥스 관리자</h1>
      </div>
      <div className="adp-user-info">
        <div className="adp-notification-container" ref={dropdownRef}>
          <div
            className="adp-bell-wrapper"
            onClick={toggleNotificationDropdown}
          >
            <img src="/images/bell.png" alt="알림" className="adp-bell-icon" />
            {hasNewNotifications && (
              <div className="adp-notification-dot"></div>
            )}
          </div>

          {showNotificationDropdown && (
            <div className="adp-notification-dropdown">
              <div className="adp-notification-header">
                <h4>알림</h4>
              </div>
              <div className="adp-notification-list">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="adp-notification-item"
                    >
                      <div className="adp-notification-content">
                        <div className="adp-notification-title">
                          {notification.title}
                        </div>
                        <div className="adp-notification-message">
                          {notification.message}
                        </div>
                        <div className="adp-notification-timestamp">
                          {new Date(notification.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="adp-notification-empty">
                    새로운 알림이 없습니다.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <span>관리자: 김관리</span>
        <button className="adp-btn-logout">로그아웃</button>
      </div>
    </div>
  );
};

export default AdminHeader;
