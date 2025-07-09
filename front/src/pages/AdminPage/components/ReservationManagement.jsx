import React from "react";
import { ReservationData } from "../../../data/UserData.js";
import "../styles/ReservationManagement.css";
import "../styles/AdminPage.css";

const ReservationManagement = () => {
  const getStatusClass = (status) => {
    switch (status) {
      case "예약완료":
        return "adp-active";
      case "취소요청":
        return "adp-pending";
      case "환불완료":
        return "adp-terminated";
      default:
        return "adp-pending";
    }
  };
  return (
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
              <th>결제 수단</th>
              <th>작업</th>
            </tr>
          </thead>
          <tbody>
            {ReservationData.map((reservation) => (
              <tr key={reservation.reservationId}>
                <td>{reservation.reservationId}</td>
                <td>{reservation.customerName}</td>
                <td>{reservation.movieTitle}</td>
                <td>{reservation.theater}</td>
                <td>{reservation.showTime}</td>
                <td>{reservation.seats}</td>
                <td>{reservation.paymentMethod}</td>
                <td>{reservation.amount}</td>
                <td>
                  <span className={`adp-status ${getStatusClass(reservation.status)}`}>
                    {reservation.status}
                  </span>
                </td>
                <td>
                  <button className="adp-btn-view">상세</button>
                  {reservation.status === "취소요청" ? (
                    <button className="adp-btn-refund">환불</button>
                  ) : (
                    <button className="adp-btn-cancel">취소</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)};

export default ReservationManagement;