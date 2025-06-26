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

export default function RegionTheaterSection() {
  const [selectedRegion, setSelectedRegion] = useState("전체");
  return (
    <section className="theaters-section">
      <h2 className="section-title">지역별 극장</h2>
      <div className="region-tabs">
        {regions.map((region) => (
          <button
            key={region}
            className={`region-tab${
              selectedRegion === region ? " active" : ""
            }`}
            onClick={() => setSelectedRegion(region)}
          >
            {region}
          </button>
        ))}
      </div>
      <div className="theaters-grid">
        {/* 기존 극장 카드들 복사 붙여넣기 (TheaterBox.jsx에서) */}
        <div className="theater-card">
          <div className="theater-image">
            <img src="/api/placeholder/300/200" alt="The Screen 강남점" />
          </div>
          <div className="theater-info">
            <h3 className="theater-name">The Screen 강남점</h3>
            <p className="theater-address">서울시 강남구 테헤란로 123</p>
            <p className="theater-phone">02-1234-5678</p>
            <div className="theater-features">
              <span className="feature-tag">IMAX</span>
              <span className="feature-tag">4DX</span>
              <span className="feature-tag">VIP</span>
            </div>
          </div>
          <div className="theater-actions">
            <button className="theater-btn primary">상영시간표</button>
            <button className="theater-btn secondary">길찾기</button>
          </div>
        </div>
        <div className="theater-card">
          <div className="theater-image">
            <img src="/api/placeholder/280/180" alt="The Screen 홍대점" />
          </div>
          <div className="theater-info">
            <h3 className="theater-name">The Screen 홍대점</h3>
            <p className="theater-address">서울시 마포구 홍익로 456</p>
            <p className="theater-phone">02-2345-6789</p>
            <div className="theater-features">
              <span className="feature-tag">4DX</span>
              <span className="feature-tag">VIP</span>
            </div>
          </div>
          <div className="theater-actions">
            <button className="theater-btn primary">상영시간표</button>
            <button className="theater-btn secondary">길찾기</button>
          </div>
        </div>
        <div className="theater-card">
          <div className="theater-image">
            <img src="/api/placeholder/320/200" alt="The Screen 잠실점" />
          </div>
          <div className="theater-info">
            <h3 className="theater-name">The Screen 잠실점</h3>
            <p className="theater-address">서울시 송파구 올림픽로 789</p>
            <p className="theater-phone">02-3456-7890</p>
            <div className="theater-features">
              <span className="feature-tag">IMAX</span>
              <span className="feature-tag">VIP</span>
              <span className="feature-tag">스카이박스</span>
            </div>
          </div>
          <div className="theater-actions">
            <button className="theater-btn primary">상영시간표</button>
            <button className="theater-btn secondary">길찾기</button>
          </div>
        </div>
        <div className="theater-card">
          <div className="theater-image">
            <img src="/api/placeholder/310/190" alt="The Screen 신촌점" />
          </div>
          <div className="theater-info">
            <h3 className="theater-name">The Screen 신촌점</h3>
            <p className="theater-address">서울시 서대문구 신촌로 321</p>
            <p className="theater-phone">02-4567-8901</p>
            <div className="theater-features">
              <span className="feature-tag">VIP</span>
              <span className="feature-tag">패밀리박스</span>
            </div>
          </div>
          <div className="theater-actions">
            <button className="theater-btn primary">상영시간표</button>
            <button className="theater-btn secondary">길찾기</button>
          </div>
        </div>
        <div className="theater-card">
          <div className="theater-info">
            <h3 className="theater-name">The Screen 건대점</h3>
            <p className="theater-address">서울시 광진구 능동로 654</p>
            <p className="theater-phone">02-5678-9012</p>
            <div className="theater-features">
              <span className="feature-tag">4DX</span>
              <span className="feature-tag">VIP</span>
            </div>
          </div>
          <div className="theater-actions">
            <button className="theater-btn primary">상영시간표</button>
            <button className="theater-btn secondary">길찾기</button>
          </div>
        </div>
        <div className="theater-card">
          <div className="theater-info">
            <h3 className="theater-name">The Screen 여의도점</h3>
            <p className="theater-address">서울시 영등포구 여의대로 987</p>
            <p className="theater-phone">02-6789-0123</p>
            <div className="theater-features">
              <span className="feature-tag">IMAX</span>
              <span className="feature-tag">VIP</span>
              <span className="feature-tag">스크린X</span>
            </div>
          </div>
          <div className="theater-actions">
            <button className="theater-btn primary">상영시간표</button>
            <button className="theater-btn secondary">길찾기</button>
          </div>
        </div>
      </div>
    </section>
  );
}
