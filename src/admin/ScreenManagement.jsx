import React from "react";
import "../admincss/ScreenManagement.css";
import "../pagecss/AdminPage.css";

const ScreenManagement = () => (
  <div className="adp-content">
    <div className="adp-header">
      <h2>상영관 관리</h2>
      <button className="adp-btn-primary">상영관 추가</button>
    </div>

    <div className="scm-screen-grid">
      <div className="scm-screen-card">
        <h3>강남점 1관</h3>
        <div className="scm-screen-info">
          <p>
            <strong>좌석 수:</strong> 180석
          </p>
          <p>
            <strong>스크린 크기:</strong> 대형
          </p>
          <p>
            <strong>음향 시스템:</strong> Dolby Atmos
          </p>
          <p>
            <strong>상태:</strong>{" "}
            <span className="adp-status adp-active">정상</span>
          </p>
        </div>
        <div className="scm-screen-layout">
          <div className="scm-screen-preview">
            <div className="scm-screen-line"></div>
            <div className="scm-seats-preview">
              {Array.from({ length: 8 }, (_, row) => (
                <div key={row} className="scm-seat-row">
                  {Array.from({ length: 12 }, (_, seat) => (
                    <div key={seat} className="scm-seat-mini"></div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="scm-screen-actions">
          <button className="adp-btn-edit">좌석 편집</button>
          <button className="adp-btn-maintenance">점검</button>
        </div>
      </div>

      <div className="scm-screen-card">
        <h3>강남점 2관</h3>
        <div className="scm-screen-info">
          <p>
            <strong>좌석 수:</strong> 220석
          </p>
          <p>
            <strong>스크린 크기:</strong> IMAX
          </p>
          <p>
            <strong>음향 시스템:</strong> IMAX Enhanced
          </p>
          <p>
            <strong>상태:</strong>{" "}
            <span className="adp-status adp-maintenance">점검중</span>
          </p>
        </div>
        <div className="scm-screen-layout">
          <div className="scm-screen-preview">
            <div className="scm-screen-line"></div>
            <div className="scm-seats-preview">
              {Array.from({ length: 10 }, (_, row) => (
                <div key={row} className="scm-seat-row">
                  {Array.from({ length: 14 }, (_, seat) => (
                    <div key={seat} className="scm-seat-mini"></div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="scm-screen-actions">
          <button className="adp-btn-edit">좌석 편집</button>
          <button className="adp-btn-maintenance">점검</button>
        </div>
      </div>
    </div>
  </div>
);

export default ScreenManagement;
