import React from "react";
import "../admincss/Inquiries.css";
import "../pagecss/AdminPage.css";

const Inquiries = () => (
  <div className="adp-content">
    <div className="adp-header">
      <h2>고객 지원</h2>
      <div className="inq-filter-section">
        <select>
          <option>전체</option>
          <option>미답변</option>
          <option>답변완료</option>
          <option>처리중</option>
        </select>
      </div>
    </div>

    <div className="inq-table-container">
      <table className="inq-table">
        <thead>
          <tr>
            <th>문의번호</th>
            <th>고객명</th>
            <th>문의유형</th>
            <th>제목</th>
            <th>등록일</th>
            <th>상태</th>
            <th>담당자</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>INQ001</td>
            <td>김고객</td>
            <td>예매 문의</td>
            <td>예매 취소 문의드립니다</td>
            <td>2024-06-26</td>
            <td>
              <span className="adp-status adp-pending">미답변</span>
            </td>
            <td>-</td>
            <td>
              <button className="adp-btn-reply">답변</button>
              <button className="adp-btn-assign">배정</button>
            </td>
          </tr>
          <tr>
            <td>INQ002</td>
            <td>이문의</td>
            <td>시설 문의</td>
            <td>장애인 편의시설 안내</td>
            <td>2024-06-25</td>
            <td>
              <span className="adp-status adp-active">답변완료</span>
            </td>
            <td>김관리</td>
            <td>
              <button className="adp-btn-view">보기</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default Inquiries;
