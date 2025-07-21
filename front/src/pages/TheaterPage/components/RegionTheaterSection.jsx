import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginRequiredModal from "../../LoginPage/components2/LoginRequiredModal";

const RegionTheaterSection = ({ filteredCinemas }) => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

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

  return (
    <section className="rts-section">
      <div className="rts-grid">
        {filteredCinemas.map((cinema) => (
          <div key={cinema.cinemacd} className="rts-card">
            <div className="rts-info">
              <h3 className="rts-name">{cinema.cinemanm}</h3>
              <p className="rts-address">{cinema.address}</p>
              <p className="rts-phone">{cinema.tel}</p>
              {/* <div className="rts-features">
                {cinema.features.map((feature, index) => (
                  <span key={index} className="rts-feature-tag">
                    {feature}
                  </span>
                ))}
              </div> */}
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

      {/* 로그인 필요 모달 */}
      <LoginRequiredModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </section>
  );
};

export default RegionTheaterSection;
