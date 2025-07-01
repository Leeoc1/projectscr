import React from "react";
import "../admincss/StaffManagement.css";
import "../pagecss/AdminPage.css";
import "../admincss/Stable.css"
import {StaffData} from "../admindata/StaffManagementData.js"

const StaffManagement = () => {

  const getStatusClass = (status) => {
    switch(status) {
      case '근무중':
        return 'adp-active';
      case '휴가':
        return 'adp-vacation';
      case '퇴사':
        return 'adp-terminated';
      case '퇴근':
        return 'adp-off';
      default:
        return 'adp-pending';
    }
  }

  return (
  <div className="adp-content">
    <div className="adp-header">
      <h2>직원 관리</h2>
      <button className="adp-btn-primary">직원 추가</button>
    </div>

    <span>총 직원 수 : {StaffData.length}</span>
    <div className="stm-table-container">
    
      <table className="stm-table">
        <thead>
          <tr>
            <th>직원 ID</th>
            <th>이름</th>
            <th>부서</th>
            <th>지점명</th>
            <th>직급</th>
            <th>담당</th>
            <th>휴대폰</th>
            <th>이메일</th>
            <th>채용 날짜</th>
            <th>고용 형태</th>
            <th>근무 상태</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {StaffData.map((item) => (
            <tr>
              <td>{item.id}</td>
              <td>{item.staffName}</td>
              <td>{item.dept}</td>
              <td>{item.theater}</td>
              <td>{item.position}</td>
              <td>{item.role}</td>
              <td>{item.phone}</td>
              <td>{item.email}</td>
              <td>{item.hireDate}</td>
              <td>{item.shiftType}</td>
              <td>
                <span className={`adp-status ${getStatusClass(item.status)}`}>{item.status}</span>
              </td>
              <td>
                <button className="adp-btn-edit">수정</button>
              </td>
            </tr>
          ))}

          
        </tbody>
      </table>
    </div>
  </div>
)};

export default StaffManagement;
