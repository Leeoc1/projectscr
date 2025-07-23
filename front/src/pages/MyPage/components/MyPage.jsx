import "../MyPage.css";
import Header from "../../../shared/Header";
import Footer from "../../../shared/Footer";
import { useState, useEffect } from "react";

import { getUserInfo, getUserReservations } from "../../../api/userApi";
import { getUserWishlist } from "../../../api/movieApi";

import MyPageReservationDetail from "./MyPageReservationDetail";
import MyPageHistory from "./MyPageHistory";
import MyPageReservation from "./MyPageReservation";
import MyPageLike from "./MyPageLike";
import MyPageInquiry from "./MyPageInquiry";

import MyAccount from "./MyAccount";

const MyPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [userReservations, setUserReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  // 예매내역 상세 모달
  const [showModal, setShowModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  // 히스토리 모달 (더보기)
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  // 찜한 영화 목록 상태
  const [wishlist, setWishlist] = useState([]);

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

  // 예매 내역 상세 팝업 열기
  const handleReservationDetails = (reservationcd) => {
    const reservation = userReservations.find(
      (r) => r.reservationcd === reservationcd
    );
    setSelectedReservation(reservation);
    setShowModal(true);
  };

  // 상세 모달 닫기
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedReservation(null);
  };

  // 히스토리 모달 열기/닫기
  const handleOpenHistoryModal = () => setShowHistoryModal(true);
  const handleCloseHistoryModal = () => setShowHistoryModal(false);

  return (
    <div>
      <Header />
      <div className="mp-my-page">
        {/* User Profile Section */}
        <MyAccount loading={loading} userInfo={userInfo} />

        {/* Main Content */}
        <div className="mp-main-content">
          {/* 영화 예매 내역 Section */}
          <section className="mp-section">
            <div className="mp-section-header">
              <h2 className="mp-section-title">예매내역</h2>
              <button
                className="mp-more-button"
                onClick={handleOpenHistoryModal}
              >
                히스토리
              </button>
            </div>
            {/* 예매 상세 내역 모달 */}
            <MyPageReservationDetail
              showModal={showModal}
              selectedReservation={selectedReservation}
              handleCloseModal={handleCloseModal}
              setUserReservations={setUserReservations}
            />
            {/* 히스토리 모달 */}
            <MyPageHistory
              showHistoryModal={showHistoryModal}
              loading={loading}
              userReservations={userReservations}
              handleCloseHistoryModal={handleCloseHistoryModal}
              handleReservationDetails={handleReservationDetails}
            />
            {/* 예매 내역 테이블 */}
            <MyPageReservation
              loading={loading}
              userReservations={userReservations}
              handleReservationDetails={handleReservationDetails}
            />
          </section>

          {/* 찜한 영화 목록 섹션 */}
          <MyPageLike
            loading={loading}
            wishlist={wishlist}
            setWishlist={setWishlist}
          />

          {/* Inquiry History Section */}
          <MyPageInquiry />

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
      <Footer />
    </div>
  );
};

export default MyPage;
