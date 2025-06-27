import React from "react";
import "../admincss/ReservationManagement.css";
import "../pagecss/AdminPage.css";

const ReservationManagement = () => (
  <div className="adp-content">
    <div className="adp-header">
      <h2>예약 관리</h2>
      <div className="rsm-filter-section">
        <select>
          <option>전체</option>
          <option>예약 완료</option>
          <option>취소 요청</option>
          <option>환불 완료</option>
        </select>
        <input type="date" />
      </div>
    </div>

    <div className="rsm-reservation-tabs">
      <div className="rsm-tab-nav">
        <button className="rsm-tab-btn rsm-active">예약 목록</button>
        <button className="rsm-tab-btn">취소/환불</button>
        <button className="rsm-tab-btn">실시간 좌석</button>
        <button className="rsm-tab-btn">점검 스케줄</button>
      </div>

      <div className="rsm-table-container">
        <table className="rsm-table">
          <thead>
            <tr>
              <th>예약번호</th>
              <th>고객명</th>
              <th>영화</th>
              <th>극장/상영관</th>
              <th>상영시간</th>
              <th>좌석</th>
              <th>금액</th>
              <th>상태</th>
              <th>작업</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>RSV001</td>
              <td>김영화</td>
              <td>아바타: 물의 길</td>
              <td>강남점 1관</td>
              <td>2024-06-26 14:00</td>
              <td>E5, E6</td>
              <td>₩28,000</td>
              <td>
                <span className="adp-status adp-active">예약완료</span>
              </td>
              <td>
                <button className="adp-btn-view">상세</button>
                <button className="adp-btn-cancel">취소</button>
              </td>
            </tr>
            <tr>
              <td>RSV002</td>
              <td>이시네마</td>
              <td>탑건: 매버릭</td>
              <td>홍대점 2관</td>
              <td>2024-06-26 16:30</td>
              <td>F3, F4, F5</td>
              <td>₩42,000</td>
              <td>
                <span className="adp-status adp-pending">취소요청</span>
              </td>
              <td>
                <button className="adp-btn-view">상세</button>
                <button className="adp-btn-refund">환불</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default ReservationManagement;
