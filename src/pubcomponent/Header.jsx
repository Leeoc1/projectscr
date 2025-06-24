import React from "react";
import "../pubcomponentcss/Header.css";

const Header = () => {
  return (
    <div>
      <div className="h-header">
        <div className="h-header-content">
          <div className="h-contents">
            <div className="h-logo">
              <img className="h-img" src="/images/logo.png" alt="The CINEMA" />
            </div>

            <ul className="h-memberinfo">
              <li>로그인</li>
              <li>회원가입</li>
              <li>고객센터</li>
            </ul>
          </div>
        </div>

        <div className="h-nav">
          <div className="h-contents">
            <ul className="h-menu">
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
