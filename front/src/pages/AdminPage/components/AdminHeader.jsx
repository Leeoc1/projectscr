import React from "react";
import "../styles/AdminHeader.css";
import "../styles/AdminPage.css";
import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };
  return (
    <div className="adp-top-bar">
      <div className="adp-logo" onClick={goHome}>
        <h1>시네맥스 관리자</h1>
      </div>
      <div className="adp-user-info">
        <span>관리자: 김관리</span>
        <button className="adp-btn-logout">로그아웃</button>
      </div>
    </div>
  );
};

export default AdminHeader;
