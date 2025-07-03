import React from "react";
import { TheaterData } from "../admindata/TheaterData";
import "../admincss/TheaterManagement.css";
import "../pagecss/AdminPage.css";

const TheaterManagement = () => (
  <div className="adp-content">
    <div className="adp-header">
      <h2>극장 관리</h2>
      <button className="adp-btn-primary">극장 추가</button>
    </div>

    <div className="thm-theater-grid">
      {TheaterData.map((theater) => (
        <div className="thm-theater-card" key={theater.theaterId}>
          <h3>{theater.theaterName}</h3>
          <div className="thm-theater-info">
            <p>
              <strong>주소:</strong> {theater.address}
            </p>
            <p>
              <strong>상영관:</strong> {theater.screenCount}개
            </p>
            <p>
              <strong>좌석 수:</strong> {theater.seatCount}석
            </p>
            <p>
              <strong>운영 상태:</strong>{" "}
              <span className={`adp-status ${getStatusClass(theater.status)}`}>
                {theater.status}
              </span>
            </p>
          </div>
          <div className="thm-theater-actions">
            <button className="adp-btn-edit">수정</button>
            <button className="adp-btn-view">상세보기</button>
            <button className="adp-btn-delete">삭제</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const getStatusClass = (status) => {
  switch (status) {
    case "정상 운영":
      return "adp-active";
    case "점검중":
      return "adp-maintenance";
    case "비활성":
      return "adp-terminated";
    default:
      return "adp-pending";
  }
};

export default TheaterManagement;