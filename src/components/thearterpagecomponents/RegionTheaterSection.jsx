import React, { useState } from "react";

const regions = [
  "전체",
  "서울",
  "경기",
  "인천",
  "부산",
  "대구",
  "대전",
  "광주",
];

const RegionTheaterSection = () => {
  const [selectedRegion, setSelectedRegion] = useState("전체");
  return (
    <section className="rts-section">
      <h2 className="rts-section-title">지역별 극장</h2>
      <div className="rts-region-tabs">
        {regions.map((region) => (
          <button
            key={region}
            className={`rts-region-tab${
              selectedRegion === region ? " active" : ""
            }`}
            onClick={() => setSelectedRegion(region)}
          >
            {region}
          </button>
        ))}
      </div>
      <div className="rts-grid">
        <div className="rts-card">
          <div className="rts-image">
            <img src="/images/cinemascreen1.png" alt="The Screen 강남점" />
          </div>
          <div className="rts-info">
            <h3 className="rts-name">The Screen 강남점</h3>
            <p className="rts-address">서울시 강남구 테헤란로 123</p>
            <p className="rts-phone">02-1234-5678</p>
            <div className="rts-features">
              <span className="rts-feature-tag">IMAX</span>
              <span className="rts-feature-tag">4DX</span>
              <span className="rts-feature-tag">VIP</span>
            </div>
          </div>
          <div className="rts-actions">
            <button className="rts-btn primary">상영시간표</button>
            <button className="rts-btn secondary">길찾기</button>
          </div>
        </div>
        <div className="rts-card">
          <div className="rts-image">
            <img src="/images/cinemascreen2.png" alt="The Screen 홍대점" />
          </div>
          <div className="rts-info">
            <h3 className="rts-name">The Screen 홍대점</h3>
            <p className="rts-address">서울시 마포구 홍익로 456</p>
            <p className="rts-phone">02-2345-6789</p>
            <div className="rts-features">
              <span className="rts-feature-tag">4DX</span>
              <span className="rts-feature-tag">VIP</span>
            </div>
          </div>
          <div className="rts-actions">
            <button className="rts-btn primary">상영시간표</button>
            <button className="rts-btn secondary">길찾기</button>
          </div>
        </div>
        <div className="rts-card">
          <div className="rts-image">
            <img src="/images/cinemascreen3.png" alt="The Screen 잠실점" />
          </div>
          <div className="rts-info">
            <h3 className="rts-name">The Screen 잠실점</h3>
            <p className="rts-address">서울시 송파구 올림픽로 789</p>
            <p className="rts-phone">02-3456-7890</p>
            <div className="rts-features">
              <span className="rts-feature-tag">IMAX</span>
              <span className="rts-feature-tag">VIP</span>
              <span className="rts-feature-tag">스카이박스</span>
            </div>
          </div>
          <div className="rts-actions">
            <button className="rts-btn primary">상영시간표</button>
            <button className="rts-btn secondary">길찾기</button>
          </div>
        </div>
        <div className="rts-card">
          <div className="rts-image">
            <img src="/images/cinemascreen1.png" alt="The Screen 신촌점" />
          </div>
          <div className="rts-info">
            <h3 className="rts-name">The Screen 신촌점</h3>
            <p className="rts-address">서울시 서대문구 신촌로 321</p>
            <p className="rts-phone">02-4567-8901</p>
            <div className="rts-features">
              <span className="rts-feature-tag">VIP</span>
              <span className="rts-feature-tag">패밀리박스</span>
            </div>
          </div>
          <div className="rts-actions">
            <button className="rts-btn primary">상영시간표</button>
            <button className="rts-btn secondary">길찾기</button>
          </div>
        </div>
        <div className="rts-card">
          <div className="rts-info">
            <h3 className="rts-name">The Screen 건대점</h3>
            <p className="rts-address">서울시 광진구 능동로 654</p>
            <p className="rts-phone">02-5678-9012</p>
            <div className="rts-features">
              <span className="rts-feature-tag">4DX</span>
              <span className="rts-feature-tag">VIP</span>
            </div>
          </div>
          <div className="rts-actions">
            <button className="rts-btn primary">상영시간표</button>
            <button className="rts-btn secondary">길찾기</button>
          </div>
        </div>
        <div className="rts-card">
          <div className="rts-info">
            <h3 className="rts-name">The Screen 여의도점</h3>
            <p className="rts-address">서울시 영등포구 여의대로 987</p>
            <p className="rts-phone">02-6789-0123</p>
            <div className="rts-features">
              <span className="rts-feature-tag">IMAX</span>
              <span className="rts-feature-tag">VIP</span>
              <span className="rts-feature-tag">스크린X</span>
            </div>
          </div>
          <div className="rts-actions">
            <button className="rts-btn primary">상영시간표</button>
            <button className="rts-btn secondary">길찾기</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegionTheaterSection;
