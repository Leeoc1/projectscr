import React from "react";
import "../pubcomponentcss/Header.css";

const Header = () => {
  return (
    <div>
      <div className="header">
        <div className="header_content">
          <div className="contents">
            <div className="logo">
              <img src="/images/logo.png" alt="The CINEMA" />
            </div>

            <ul className="memberinfo">
              <li>로그인</li>
              <li>회원가입</li>
              <li>고객센터</li>
            </ul>
          </div>
        </div>

        <div className="nav">
          <div className="contents">
            <ul className="menu">
              <li>영화</li>
              <li>극장</li>
              <li>예매</li>
              <li>이벤트</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
