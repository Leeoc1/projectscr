import React from "react";
import "../admincss/MovieManagement.css";
import "../pagecss/AdminPage.css";

const MovieManagement = () => (
  <div className="adp-content">
    <div className="adp-header">
      <h2>영화 관리</h2>
      <button className="adp-btn-primary">영화 추가</button>
    </div>

    <div className="mvm-movie-management-tabs">
      <div className="mvm-tab-nav">
        <button className="mvm-tab-btn mvm-active">현재 상영작</button>
        <button className="mvm-tab-btn">상영 예정작</button>
        <button className="mvm-tab-btn">배너 관리</button>
        <button className="mvm-tab-btn">상영 스케줄</button>
      </div>

      <div className="mvm-movie-list">
        <div className="mvm-movie-item">
          <img src="/api/placeholder/120/180" alt="영화 포스터" />
          <div className="mvm-movie-details">
            <h3>아바타: 물의 길</h3>
            <p>장르: SF, 액션 | 등급: 12세이상관람가</p>
            <p>상영시간: 192분 | 개봉일: 2024-01-15</p>
            <p>상영관: 강남 1, 2, 3관 | 홍대 1, 2관</p>
          </div>
          <div className="mvm-movie-actions">
            <button className="adp-btn-edit">수정</button>
            <button className="adp-btn-schedule">스케줄</button>
            <button className="adp-btn-delete">삭제</button>
          </div>
        </div>

        <div className="mvm-movie-item">
          <img src="/api/placeholder/120/180" alt="영화 포스터" />
          <div className="mvm-movie-details">
            <h3>탑건: 매버릭</h3>
            <p>장르: 액션, 드라마 | 등급: 12세이상관람가</p>
            <p>상영시간: 131분 | 개봉일: 2024-02-01</p>
            <p>상영관: 강남 4, 5관 | 부산 1, 2관</p>
          </div>
          <div className="mvm-movie-actions">
            <button className="adp-btn-edit">수정</button>
            <button className="adp-btn-schedule">스케줄</button>
            <button className="adp-btn-delete">삭제</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default MovieManagement;
