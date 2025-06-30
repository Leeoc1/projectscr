import React from "react";
import "../admincss/UserManagement.css";
import "../pagecss/AdminPage.css";
import "../admincss/Stable.css"
import {MemberData} from "../admindata/UserData.js"

const StaffManagement = () => {

  const getStatusClass = (status) => {
    switch(status) {
      case '탈퇴':
        return 'adp-vacation';
      case '비활성':
        return 'adp-off'
      default:
        return 'adp-active';
    }
  }

  return (
  <div className="adp-content">
    <div className="adp-header">
      <h2>회원 관리</h2>
      <button className="adp-btn-primary">직원 추가</button>
    </div>

    <span>총 회원 수 : {MemberData.length}</span>
    <div className="usm-table-container">
      <table className="usm-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>이름</th>
            <th>이메일</th>
            <th>전화번호</th>
            <th>성별</th>
            <th>생년월일</th>
            <th>가입일</th>
            <th>회원 등급</th>
            <th>포인트</th>
            <th>마지막 방문일</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {MemberData.map((member) => (
            <tr>
              <td>{member.memberId}</td>
              <td>{member.memberName}</td>
              <td>{member.email}</td>
              <td>{member.phone}</td>
              <td>{member.gender}</td>
              <td>{member.birthDate}</td>
              <td>{member.joinDate}</td>
              <td>{member.membershipLevel}</td>
              <td>{member.points}</td>
              <td>{member.lastVisitDate}</td>
              <td>
                <span className={`adp-status ${getStatusClass(member.status)}`}>{member.status}</span>
              </td>
              
            </tr>
          ))}

          
        </tbody>
      </table>
    </div>
  </div>
)};

export default StaffManagement;
