import React from "react";
import "../admincss/StaffManagement.css";
import "../pagecss/AdminPage.css";

const StaffManagement = () => (
  <div className="adp-content">
    <div className="adp-header">
      <h2>직원 관리</h2>
      <button className="adp-btn-primary">직원 추가</button>
    </div>

    <div className="stm-table-container">
      <table className="stm-table">
        <thead>
          <tr>
            <th>직원 ID</th>
            <th>이름</th>
            <th>부서</th>
            <th>직급</th>
            <th>연락처</th>
            <th>근무 상태</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>EMP001</td>
            <td>김관리</td>
            <td>운영팀</td>
            <td>매니저</td>
            <td>010-1234-5678</td>
            <td>
              <span className="adp-status adp-active">근무중</span>
            </td>
            <td>
              <button className="adp-btn-edit">수정</button>
              <button className="adp-btn-delete">삭제</button>
            </td>
          </tr>
          <tr>
            <td>EMP002</td>
            <td>이직원</td>
            <td>매표소</td>
            <td>사원</td>
            <td>010-2345-6789</td>
            <td>
              <span className="adp-status adp-active">근무중</span>
            </td>
            <td>
              <button className="adp-btn-edit">수정</button>
              <button className="adp-btn-delete">삭제</button>
            </td>
          </tr>
          <tr>
            <td>EMP003</td>
            <td>박상영</td>
            <td>기술팀</td>
            <td>주임</td>
            <td>010-3456-7890</td>
            <td>
              <span className="adp-status adp-inactive">휴무</span>
            </td>
            <td>
              <button className="adp-btn-edit">수정</button>
              <button className="adp-btn-delete">삭제</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default StaffManagement;
