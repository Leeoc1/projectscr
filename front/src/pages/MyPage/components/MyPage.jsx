import "../MyPage.css";
import Header from "../../../shared/Header";
import { useState, useEffect } from "react";
import { getUserInfo, getUserReservations } from "../../../api/userApi";

export default function MyPage() {
  const [userInfo, setUserInfo] = useState(null);
  const [userReservations, setUserReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userid = localStorage.getItem("userid");
        if (userid) {
          // 사용자 정보 조회
          const userResponse = await getUserInfo(userid);
          setUserInfo(userResponse);

          // 사용자 예약 정보 조회
          const reservationsResponse = await getUserReservations(userid);
          setUserReservations(reservationsResponse);
        }
      } catch (error) {
        console.error("사용자 데이터 조회 오류:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);
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
              {loading ? (
                <div className="mp-loading">예약 정보를 불러오는 중...</div>
              ) : userReservations.length > 0 ? (
                userReservations.map((reservation, index) => (
                  <div
                    key={reservation.reservationcd || index}
                    className="mp-movie-card"
                  >
                    <div className="mp-movie-content">
                      <div className="mp-movie-poster">
                        <span className="mp-poster-text">
                          {reservation.movienm || "영화"}
                          <br />
                          포스터
                        </span>
                      </div>
                      <div className="mp-movie-details">
                        <h3 className="mp-movie-title">
                          {reservation.movienm || "영화제목"}
                        </h3>
                        <p className="mp-movie-screen">
                          {reservation.screenname || "스크린 1"}
                        </p>
                        <p className="mp-movie-datetime">
                          {reservation.starttime
                            ? `${reservation.starttime.split("T")[0]} ${
                                reservation.starttime
                                  .split("T")[1]
                                  ?.substring(0, 5) || ""
                              }`
                            : "2025-01-01 12:00"}{" "}
                          (
                          {reservation.runningtime
                            ? `${reservation.runningtime}분`
                            : "15세 이상"}
                          )
                        </p>
                        <p className="mp-movie-cinema">
                          {reservation.cinemanm || "CGV"} | 좌석:{" "}
                          {reservation.seatcd || "A1"}
                        </p>
                        <p className="mp-movie-amount">
                          결제금액:{" "}
                          {reservation.amount
                            ? `${reservation.amount.toLocaleString()}원`
                            : "0원"}
                        </p>
                        <div className="mp-movie-buttons">
                          <button className="mp-btn mp-btn-review">
                            관람평 쓰기
                          </button>
                          <button className="mp-btn mp-btn-cancel">취소</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="mp-no-reservations">
                  <p>예약 내역이 없습니다.</p>
                </div>
              )}
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
                  <tr className="mp-inquiry-row">
                    <td className="mp-inquiry-title">문의제목</td>
                    <td className="mp-inquiry-date">2025-01-01</td>
                    <td className="mp-inquiry-status">
                      <span className="mp-status-badge">Y</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Account Management Section */}
          <section className="mp-section">
            <h2 className="mp-section-title">계정관리</h2>

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
