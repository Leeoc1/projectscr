import React from "react";
import { useNavigate } from "react-router-dom";

const RegionTheaterSection = ({ filteredTheaters }) => {
  const navigate = useNavigate();

  const handleScheduleClick = (theater) => {
    // 극장 정보를 state로 전달하여 ReservationPlaceToMoviePage로 이동
    navigate("/reservation/movie", {
      state: {
        selectedRegion: theater.region,
        selectedBranch: theater.name,
      },
    });
  };

  return (
    <section className="rts-section">
      <div className="rts-grid">
        {filteredTheaters.map((theater) => (
          <div key={theater.id} className="rts-card">
            {theater.image && (
              <div className="rts-image">
                <img src={theater.image} alt={theater.name} />
              </div>
            )}
            <div className="rts-info">
              <h3 className="rts-name">{theater.name}</h3>
              <p className="rts-address">{theater.address}</p>
              <p className="rts-phone">{theater.phone}</p>
              <div className="rts-features">
                {theater.features.map((feature, index) => (
                  <span key={index} className="rts-feature-tag">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
            <div className="rts-actions">
              <button
                className="rts-btn primary"
                onClick={() => handleScheduleClick(theater)}
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
