import "../MyPage.css";
import Header from "../../../shared/Header";

export default function MyPage() {
  return (
    <div>
      <Header />
      <div className="mp-my-page">
        {/* User Profile Section */}
        <section className="mp-profile-section">
          <div className="mp-profile-container">
            <div className="mp-profile-card">
              <div className="mp-profile-avatar">
                <svg
                  className="mp-avatar-icon"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                </svg>
              </div>
              <div className="mp-profile-info">
                <h1 className="mp-profile-greeting">안녕하세요!</h1>
                <p className="mp-profile-name">"사용자"님</p>
                <p className="mp-profile-link">개인정보설정 &gt;</p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="mp-main-content">
          {/* Welcome Card */}
          <div className="mp-welcome-card">
            <div className="mp-welcome-content">
              <h2 className="mp-welcome-title">예매내역</h2>
              <span className="mp-coupon-info">쿠폰함</span>
            </div>
          </div>

          {/* Movie History Section */}
          <section className="mp-section">
            <div className="mp-section-header">
              <h2 className="mp-section-title">히스토리</h2>
              <button className="mp-more-button">더보기</button>
            </div>

            <div className="mp-movie-grid">
                <div className="mp-movie-card">
                  <div className="mp-movie-content">
                    <div className="mp-movie-poster">
                      <span className="mp-poster-text">
                        영화
                        <br />
                        포스터
                      </span>
                    </div>
                    <div className="mp-movie-details">
                      <h3 className="mp-movie-title">영화제목</h3>
                      <p className="mp-movie-screen">
                        스크린 1
                      </p>
                      <p className="mp-movie-datetime">
                        2025-01-01 12:00 (15세 이상)
                      </p>
                      <div className="mp-movie-buttons">
                        <button
                          className="mp-btn mp-btn-review"
                        >
                          관람평 쓰기
                        </button>
                        <button className="mp-btn mp-btn-cancel">취소</button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </section>

          {/* Inquiry History Section */}
          <section className="mp-section">
            <div className="mp-section-header">
              <h2 className="mp-section-title">문의내역</h2>
              <button className="mp-more-button">더보기</button>
            </div>

            <div className="mp-inquiry-table-container">
              <table className="mp-inquiry-table">
                <thead>
                  <tr>
                    <th>제목</th>
                    <th>문의일자</th>
                    <th>답변여부</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    className="mp-inquiry-row"
                    >
                      <td className="mp-inquiry-title">문의제목</td>
                      <td className="mp-inquiry-date">
                        2025-01-01
                      </td>
                      <td className="mp-inquiry-status">
                        <span className="mp-status-badge">
                          Y
                        </span>
                      </td>
                    </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Account Management Section */}
          <section className="mp-section">
            <h2 className="mp-section-title">
              계정관리
            </h2>

            <div className="mp-account-card">
              <div className="mp-account-links">
                <a href="#" className="mp-account-link">
                  개인정보수정
                </a>
                <a href="#" className="mp-account-link">
                  서비스 이용약관
                </a>
                <a href="#" className="mp-account-link">
                  개인정보 수집 및 이용 동의
                </a>
                <a href="#" className="mp-account-link">
                  개인정보 처리방침
                </a>
                <a href="#" className="mp-account-link mp-withdrawal">
                  회원탈퇴
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}