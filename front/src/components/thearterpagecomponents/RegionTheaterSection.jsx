import React from "react";

const RegionTheaterSection = ({ filteredTheaters }) => {
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
              <button className="rts-btn primary">상영시간표</button>
              <button className="rts-btn secondary">길찾기</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RegionTheaterSection;
