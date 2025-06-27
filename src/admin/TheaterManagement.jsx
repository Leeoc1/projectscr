import React from "react";
import "../admincss/TheaterManagement.css";
import "../pagecss/AdminPage.css";

const TheaterManagement = () => (
  <div className="adp-content">
    <div className="adp-header">
      <h2>극장 관리</h2>
      <button className="adp-btn-primary">극장 추가</button>
    </div>

    <div className="thm-theater-grid">
      <div className="thm-theater-card">
        <h3>시네맥스 강남점</h3>
        <div className="thm-theater-info">
          <p>
            <strong>주소:</strong> 서울시 강남구 테헤란로 123
          </p>
          <p>
            <strong>상영관:</strong> 8개
          </p>
          <p>
            <strong>좌석 수:</strong> 1,240석
          </p>
          <p>
            <strong>운영 상태:</strong>{" "}
            <span className="adp-status adp-active">정상 운영</span>
          </p>
        </div>
        <div className="thm-theater-actions">
          <button className="adp-btn-edit">수정</button>
          <button className="adp-btn-view">상세보기</button>
          <button className="adp-btn-delete">삭제</button>
        </div>
      </div>

      <div className="thm-theater-card">
        <h3>시네맥스 홍대점</h3>
        <div className="thm-theater-info">
          <p>
            <strong>주소:</strong> 서울시 마포구 홍익로 456
          </p>
          <p>
            <strong>상영관:</strong> 6개
          </p>
          <p>
            <strong>좌석 수:</strong> 980석
          </p>
          <p>
            <strong>운영 상태:</strong>{" "}
            <span className="adp-status adp-active">정상 운영</span>
          </p>
        </div>
        <div className="thm-theater-actions">
          <button className="adp-btn-edit">수정</button>
          <button className="adp-btn-view">상세보기</button>
          <button className="adp-btn-delete">삭제</button>
        </div>
      </div>

      <div className="thm-theater-card">
        <h3>시네맥스 부산점</h3>
        <div className="thm-theater-info">
          <p>
            <strong>주소:</strong> 부산시 해운대구 센텀로 789
          </p>
          <p>
            <strong>상영관:</strong> 10개
          </p>
          <p>
            <strong>좌석 수:</strong> 1,560석
          </p>
          <p>
            <strong>운영 상태:</strong>{" "}
            <span className="adp-status adp-maintenance">점검중</span>
          </p>
        </div>
        <div className="thm-theater-actions">
          <button className="adp-btn-edit">수정</button>
          <button className="adp-btn-view">상세보기</button>
          <button className="adp-btn-delete">삭제</button>
        </div>
      </div>
    </div>
  </div>
);

export default TheaterManagement;
