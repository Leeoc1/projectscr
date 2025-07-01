import React from "react";
import "../admincss/EventManagement.css";
import "../pagecss/AdminPage.css";

const EventManagement = () => (
  <div className="adp-content">
    <div className="adp-header">
      <h2>이벤트 관리</h2>
      <button className="adp-btn-primary">이벤트 추가</button>
    </div>

    <div className="evm-event-grid">
      <div className="evm-event-card">
        <img src="/api/placeholder/300/200" alt="이벤트 배너" />
        <div className="evm-event-details">
          <h3>개봉 기념 할인 이벤트</h3>
          <p>기간: 2024-06-20 ~ 2024-06-30</p>
          <p>할인: 전 영화 20% 할인</p>
          <p>
            <strong>상태:</strong>{" "}
            <span className="adp-status adp-active">진행중</span>
          </p>
        </div>
        <div className="evm-event-actions">
          <button className="adp-btn-edit">수정</button>
          <button className="adp-btn-stats">통계</button>
          <button className="adp-btn-stop">중단</button>
        </div>
      </div>

      <div className="evm-event-card">
        <img src="/api/placeholder/300/200" alt="이벤트 배너" />
        <div className="evm-event-details">
          <h3>VIP 회원 전용 시사회</h3>
          <p>기간: 2024-07-01 ~ 2024-07-05</p>
          <p>대상: VIP 회원</p>
          <p>
            <strong>상태:</strong>{" "}
            <span className="adp-status adp-pending">준비중</span>
          </p>
        </div>
        <div className="evm-event-actions">
          <button className="adp-btn-edit">수정</button>
          <button className="adp-btn-stats">통계</button>
          <button className="adp-btn-start">시작</button>
        </div>
      </div>
    </div>
  </div>
);

export default EventManagement;
