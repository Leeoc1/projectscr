import React from "react";

const Header = () => {
  return (
    <div>
      <h2>Header</h2>


      <div className="header">
        <div className="header_content">
          <div className="contents">
            <div className="logo">
              <a href="/">
                <img src="" alt="The CINEMA" />
              </a>
            </div>

            <ul className="memberinfo">
              <li>
                로그인 #로그인 완료시 로그아웃으로 변경 
              </li>
              <li>
                회원가입
              </li>
              <li>
                고객센터
              </li>
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
