import "../MyPage.css";
import Header from "../../../shared/Header";
import Footer from "../../../shared/Footer";
import { useState, useEffect } from "react";

import {
  getUserInfo,
  getUserReservations,
  deleteUser,
  logoutUser,
} from "../../../api/userApi";
import { cancelReservation } from "../../../api/reservationApi";
import MyPageReservationDetail from "./MyPageReservationDetail";

import { getUserWishlist, toggleWishlist } from "../../../api/movieApi";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [userReservations, setUserReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  // 모달 상태 및 상세 데이터 상태
  const [showModal, setShowModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  // 찜한 영화 목록 상태
  const [wishlist, setWishlist] = useState([]);

  // 회원탈퇴 모달 상태
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [withdrawalText, setWithdrawalText] = useState("");

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

          // 찜한 영화 목록 조회
          const wishlistResponse = await getUserWishlist(userid);
          setWishlist(wishlistResponse);
        }
      } catch (error) {
        console.error("사용자 데이터 조회 오류:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // 예매 내역 팝업 열기
  const handleReservationDetails = (reservationcd) => {
    const reservation = userReservations.find(
      (r) => r.reservationcd === reservationcd
    );
    setSelectedReservation(reservation);
    setShowModal(true);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedReservation(null);
  };

  // 찜 해제 핸들러
  const handleRemoveFromWishlist = async (moviecd) => {
    try {
      const userid = localStorage.getItem("userid");
      if (userid) {
        await toggleWishlist(userid, moviecd);
        // 찜 목록에서 해당 영화 제거
        setWishlist((prev) => prev.filter((wish) => wish.moviecd !== moviecd));
      }
    } catch (error) {
      console.error("찜 해제 오류:", error);
    }
  };

  // 예매하기 핸들러
  const handleReservationFromWishlist = (movie) => {
    // 세션 스토리지에 영화 정보 저장
    sessionStorage.setItem("moviecd", movie.moviecd);
    sessionStorage.setItem("movienm", movie.movienm);

    const movieData = {
      moviecd: movie.moviecd,
      movienm: movie.movienm,
      posterurl: movie.posterurl,
    };
    sessionStorage.setItem("selectedMovie", JSON.stringify(movieData));

    // 예매 페이지로 이동
    navigate("/reservation/place");
  };

  // 회원탈퇴 모달 열기
  const handleWithdrawalClick = () => {
    setShowWithdrawalModal(true);
    setWithdrawalText("");
  };

  // 회원탈퇴 모달 닫기
  const handleWithdrawalCancel = () => {
    setShowWithdrawalModal(false);
    setWithdrawalText("");
  };

  // 회원탈퇴 처리
  const handleWithdrawalConfirm = async () => {
    if (withdrawalText !== "탈퇴합니다") {
      alert("'탈퇴합니다'를 정확히 입력해주세요.");
      return;
    }

    try {
      const userid = localStorage.getItem("userid");
      console.log("회원탈퇴 처리 시작 - userid:", userid);

      if (userid) {
        console.log("DELETE 요청 전송 중...");
        const response = await deleteUser(userid);
        console.log("회원탈퇴 응답:", response);

        // 자동 로그아웃 처리
        const logoutSuccess = logoutUser();
        if (logoutSuccess) {
          console.log("자동 로그아웃 처리 완료");
        }

        // 회원탈퇴 모달 닫기
        setShowWithdrawalModal(false);
        setWithdrawalText("");

        alert("회원탈퇴가 완료되었습니다. 로그아웃됩니다.");

        // 홈페이지로 이동
        navigate("/");

        // 페이지 새로고침으로 완전한 상태 초기화
        window.location.reload();
      } else {
        console.error("userid가 없습니다.");
        alert("로그인 정보를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("회원탈퇴 오류:", error);
      console.error("에러 응답:", error.response);
      console.error("에러 상태 코드:", error.response?.status);
      console.error("에러 메시지:", error.response?.data || error.message);

      if (error.response?.status === 404) {
        alert(
          "사용자를 찾을 수 없습니다. 이미 탈퇴되었거나 존재하지 않는 계정입니다."
        );
      } else {
        alert(
          `회원탈퇴 중 오류가 발생했습니다: ${
            error.response?.data?.error || error.message
          }`
        );
      }
    }
  };

  return (
    <div>
      <Header />
      {/* 예매내역 모달 */}
      <MyPageReservationDetail
        showModal={showModal}
        selectedReservation={selectedReservation}
        handleCloseModal={handleCloseModal}
        setUserReservations={setUserReservations}
      />
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
                <p className="mp-profile-link">쿠폰함 &gt;</p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="mp-main-content">
          {/* Movie History Section */}
          <section className="mp-section">
            <div className="mp-section-header">
              <h2 className="mp-section-title">히스토리</h2>
            </div>

            <div className="mp-movie-list">
              {loading ? (
                <div className="mp-loading">예약 정보를 불러오는 중...</div>
              ) : userReservations.length > 0 ? (
                userReservations.map((reservation, index) => (
                  <div
                    key={reservation.reservationcd || index}
                    className="mp-movie-item"
                  >
                    <div className="mp-movie-poster-small">
                      <span className="mp-poster-text-small">
                        {reservation.movienm || "영화"}
                      </span>
                    </div>
                    <div className="mp-movie-info">
                      <div className="mp-movie-main-info">
                        <h3 className="mp-movie-title">
                          {reservation.movienm || "영화제목"}
                        </h3>
                        <div className="mp-movie-info-row">
                          <div className="mp-movie-left-info">
                            <p className="mp-movie-details-text">
                              {reservation.screenname || "스크린 1"} | 좌석:{" "}
                              {reservation.seatcd || "A1"}
                            </p>
                            <p className="mp-movie-datetime">
                              {reservation.starttime
                                ? `${reservation.starttime.split(" ")[0]} ${
                                    reservation.starttime
                                      .split(" ")[1]
                                      ?.substring(0, 5) || ""
                                  }`
                                : "2025-01-01 12:00"}{" "}
                              &nbsp;(
                              {reservation.runningtime
                                ? `${reservation.runningtime}분`
                                : "000분"}
                              )
                            </p>
                            <p className="mp-movie-cinema">
                              {reservation.cinemanm || "CGV"}
                            </p>
                          </div>
                          <div className="mp-movie-bottom-info">
                            {reservation.reservationstatus === "예약완료" ? (
                              <p className="mp-movie-amount">
                                결제금액:{" "}
                                {reservation.amount
                                  ? `${reservation.amount.toLocaleString()}원`
                                  : "0원"}
                              </p>
                            ) : (
                              <p className="mp-movie-amount">
                                {reservation.reservationstatus}
                              </p>
                            )}

                            <div className="mp-movie-actions">
                              {reservation.reservationstatus === "예약완료" && (
                                <button className="mp-btn mp-btn-review">
                                  관람평 쓰기
                                </button>
                              )}
                              <button
                                className="mp-btn mp-btn-reservation"
                                onClick={() =>
                                  handleReservationDetails(
                                    reservation.reservationcd
                                  )
                                }
                              >
                                예매내역
                              </button>
                            </div>
                          </div>
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

          {/* 찜한 영화 목록 섹션 */}
          <section className="mp-section">
            <div className="mp-section-header">
              <h2 className="mp-section-title">내가 찜한 영화</h2>
            </div>
            <div className="mp-movie-list">
              {loading ? (
                <div className="mp-loading">찜한 영화를 불러오는 중...</div>
              ) : wishlist.length > 0 ? (
                wishlist.map((wish, idx) => (
                  <div key={wish.moviecd || idx} className="mp-movie-item">
                    <div className="mp-movie-poster-small">
                      {wish.posterurl ? (
                        <img
                          src={wish.posterurl}
                          alt={wish.movienm}
                          style={{
                            width: "60px",
                            height: "90px",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                        />
                      ) : (
                        <span className="mp-poster-text-small">No Image</span>
                      )}
                    </div>
                    <div className="mp-movie-info">
                      <div className="mp-movie-main-info">
                        <h3 className="mp-movie-title">{wish.movienm}</h3>
                        <div className="mp-movie-actions">
                          <button
                            className="mp-btn mp-btn-reservation"
                            onClick={() => handleReservationFromWishlist(wish)}
                          >
                            예매하기
                          </button>
                          <button
                            className="mp-btn mp-btn-remove-wishlist"
                            onClick={() =>
                              handleRemoveFromWishlist(wish.moviecd)
                            }
                          >
                            찜 해제
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="mp-no-reservations">
                  <p>찜한 영화가 없습니다.</p>
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
                  서비스 이용약관
                </a>
                <a href="#" className="mp-account-link">
                  개인정보 수집 및 이용 동의
                </a>
                <a href="#" className="mp-account-link">
                  개인정보 처리방침
                </a>
                <button
                  className="mp-account-link mp-withdrawal"
                  onClick={handleWithdrawalClick}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    textAlign: "left",
                    width: "100%",
                  }}
                >
                  회원탈퇴
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* 회원탈퇴 모달 */}
        {showWithdrawalModal && (
          <div className="mp-modal-overlay">
            <div className="mp-withdrawal-modal">
              <div className="mp-modal-header">
                <h3>회원탈퇴</h3>
                <button
                  className="mp-modal-close"
                  onClick={handleWithdrawalCancel}
                >
                  ×
                </button>
              </div>
              <div className="mp-modal-content">
                <p className="mp-withdrawal-warning">
                  정말로 회원탈퇴를 하시겠습니까?
                </p>
                <p className="mp-withdrawal-info">
                  회원탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다.
                </p>
                <p className="mp-withdrawal-confirm-text">
                  탈퇴를 원하시면 아래에 <strong>'탈퇴합니다'</strong>를
                  입력해주세요.
                </p>
                <input
                  type="text"
                  className="mp-withdrawal-input"
                  value={withdrawalText}
                  onChange={(e) => setWithdrawalText(e.target.value)}
                  placeholder="탈퇴합니다"
                />
              </div>
              <div className="mp-modal-footer">
                <button
                  className="mp-btn mp-btn-cancel"
                  onClick={handleWithdrawalCancel}
                >
                  취소
                </button>
                <button
                  className="mp-btn mp-btn-withdrawal-confirm"
                  onClick={handleWithdrawalConfirm}
                  disabled={withdrawalText !== "탈퇴합니다"}
                >
                  탈퇴하기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyPage;
