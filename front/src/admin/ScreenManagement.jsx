import React from "react";
import { ScreenData } from "../admindata/TheaterData";
import "../admincss/ScreenManagement.css";
import "../pagecss/AdminPage.css";

const ScreenManagement = () => (
  <div className="adp-content">
    <div className="adp-header">
      <h2>상영관 관리</h2>
      <button className="adp-btn-primary">상영관 추가</button>
    </div>

<div className="screen-background">
    <div className="scm-screen-grid">
      {ScreenData.map((screen) => (
        <div className="scm-screen-card" key={screen.screenId}>
          <h3>{screen.theaterName}</h3>
          <div className="scm-screen-info">
            <p>
              <strong>좌석 수:</strong> {screen.seatCount}석
            </p>
            <p>
              <strong>스크린 크기:</strong> {screen.screenSize}
            </p>
            <p>
              <strong>음향 시스템:</strong> {screen.soundSystem}
            </p>
            <p>
              <strong>상태:</strong>{" "}
              <span className={`adp-status ${getStatusClass(screen.status)}`}>
                {screen.status}
              </span>
            </p>
          </div>
          <div className="scm-screen-layout">
            <div className="scm-screen-preview">
              <div className="scm-screen-line"></div>
              <div className="scm-seats-preview">
                {screen.seatLayout.map((row, rowIndex) => (
                  <div key={rowIndex} className="scm-seat-row">
                    {row.map((seat, seatIndex) => (
                      <div
                        key={seatIndex}
                        className={`scm-seat-mini ${
                          seat === "available" ? "" : "scm-seat-occupied"
                        }`}
                      ></div>
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
      ))}
    </div>
    </div>
  </div>
);

const getStatusClass = (status) => {
  switch (status) {
    case "정상":
      return "adp-active";
    case "점검중":
      return "adp-maintenance";
    case "비활성":
      return "adp-terminated";
    default:
      return "adp-pending";
  }
};

export default ScreenManagement;