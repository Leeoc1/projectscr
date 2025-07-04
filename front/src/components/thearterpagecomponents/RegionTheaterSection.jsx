import React from "react";
import { useNavigate } from "react-router-dom";

const RegionTheaterSection = ({ filteredCinemas }) => {
  const navigate = useNavigate();

  const handleScheduleClick = (cinema) => {
    sessionStorage.setItem("cinemacd", cinema.cinemacd);
    sessionStorage.setItem("cinemanm", cinema.cinemanm);
    navigate("/reservation/movie");
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
              <button className="rts-btn secondary">길찾기</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RegionTheaterSection;
