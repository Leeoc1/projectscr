import React from "react";
import "../MyPage.css";

const MyAccount = ({ loading, userInfo }) => {
  return (
      <section className="mp-profile-section">
        <div className="mp-profile-container">
          <div className="mp-profile-card">
            <div className="mp-profile-avatar">
              <svg
                className="mp-avatar-icon"
                fill="currentColor"
                viewBox="0 0 24 24"
              ></svg>
            </div>
            <div className="mp-profile-info">
              <h1 className="mp-profile-greeting">안녕하세요!</h1>
              <p className="mp-profile-name">
                {loading
                  ? "로딩 중..."
                  : userInfo
                  ? `"${userInfo.username}"님`
                  : '"사용자"님'}
              </p>
              <p className="mp-profile-link">개인정보설정 &gt;</p>
              <p className="mp-profile-link">쿠폰함 &gt;</p>
            </div>
          </div>
        </div>
      </section>
  );
};

export default MyAccount;
