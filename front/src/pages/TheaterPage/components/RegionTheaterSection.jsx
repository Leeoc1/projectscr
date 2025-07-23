import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginRequiredModal from "../../LoginPage/components2/LoginRequiredModal";

const RegionTheaterSection = ({ getMoviesByTab }) => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  // 극장 데이터가 변경될 때마다 visibleCount 초기화
  useEffect(() => {
    setVisibleCount(12);
  }, [getMoviesByTab]);

  const handleScheduleClick = (cinema) => {
    // 로그인 상태 체크
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      // 로그인되지 않은 경우 모달 표시
      setShowLoginModal(true);
      return;
    }

    // 로그인된 경우 기존 로직 실행
    sessionStorage.setItem("cinemacd", cinema.cinemacd);
    sessionStorage.setItem("cinemanm", cinema.cinemanm);
    navigate("/reservation/movie");
  };

  // 길찾기 클릭시 극장 상세 페이지로 이동
  // state로 전달
  const handleMapClick = (cinema) => {
    const state = {
      cinemacd: cinema.cinemacd,
      cinemanm: cinema.cinemanm,
      address: cinema.address,
      tel: cinema.tel,
    };
    navigate("/theater/info", { state });
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  const cinemaseData = getMoviesByTab();
  const visibleCinemas = cinemaseData.slice(0, visibleCount);

  return (
    <section className="rts-section">
      <div className="rts-grid">
        {visibleCinemas.map((cinema) => (
          <div key={cinema.cinemacd} className="rts-card">
            <div className="rts-info">
              <h3 className="rts-name">{cinema.cinemanm}</h3>
              <p className="rts-address">{cinema.address}</p>
              <p className="rts-phone">{cinema.tel}</p>
            </div>
            <div className="rts-actions">
              <button
                className="rts-btn primary"
                onClick={() => handleScheduleClick(cinema)}
              >
                상영시간표
              </button>
              <button
                className="rts-btn secondary"
                onClick={() => handleMapClick(cinema)}
              >
                길찾기
              </button>
            </div>
          </div>
        ))}
      </div>

      {cinemaseData.length > visibleCount && (
        <div className="rts-showmore-wrap">
          <button className="mvs-showmore-btn" onClick={handleShowMore}>
            더보기
          </button>
        </div>
      )}

      {/* 로그인 필요 모달 */}
      <LoginRequiredModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </section>
  );
};

export default RegionTheaterSection;
