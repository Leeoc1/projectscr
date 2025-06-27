import React from "react";
import "../admincss/UserManagement.css";
import "../pagecss/AdminPage.css";

const UserManagement = () => (
  <div className="adp-content">
    <div className="adp-header">
      <h2>회원 관리</h2>
      <div className="usm-search-bar">
        <input type="text" placeholder="회원 검색..." />
        <button className="adp-btn-search">검색</button>
      </div>
    </div>

    <div className="usm-table-container">
      <table className="usm-table">
        <thead>
          <tr>
            <th>회원 ID</th>
            <th>이름</th>
            <th>이메일</th>
            <th>가입일</th>
            <th>예매 횟수</th>
            <th>상태</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>USR001</td>
            <td>김영화</td>
            <td>movie@email.com</td>
            <td>2024-01-15</td>
            <td>23</td>
            <td>
              <span className="adp-status adp-active">정상</span>
            </td>
            <td>
              <button className="adp-btn-view">보기</button>
              <button className="adp-btn-edit">수정</button>
            </td>
          </tr>
          <tr>
            <td>USR002</td>
            <td>이시네마</td>
            <td>cinema@email.com</td>
            <td>2024-02-20</td>
            <td>12</td>
            <td>
              <span className="adp-status adp-active">정상</span>
            </td>
            <td>
              <button className="adp-btn-view">보기</button>
              <button className="adp-btn-edit">수정</button>
            </td>
          </tr>
          <tr>
            <td>USR003</td>
            <td>박관람</td>
            <td>watch@email.com</td>
            <td>2024-03-10</td>
            <td>5</td>
            <td>
              <span className="adp-status adp-inactive">정지</span>
            </td>
            <td>
              <button className="adp-btn-view">보기</button>
              <button className="adp-btn-edit">수정</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default UserManagement;
