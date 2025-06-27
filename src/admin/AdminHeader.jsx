import React from "react";
import { useNavigate } from "react-router-dom";
import "../pagecss/AdminPage.css";

const AdminHeader = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };
  return (
    <div className="adp-top-bar">
      <div className="adp-logo" onClick={goHome}>
        <h1>CineMax 관리자</h1>
      </div>
      <div className="adp-user-info">
        <span>관리자님 환영합니다</span>
        <button className="adp-btn-logout">로그아웃</button>
      </div>
    </div>
  );
};

export default AdminHeader;
