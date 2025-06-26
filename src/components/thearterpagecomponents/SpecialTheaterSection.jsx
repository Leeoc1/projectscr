import React from "react";

const SpecialTheaterSection = () => {
  return (
    <section className="rts-section">
      <h2 className="sts-title">특별관 안내</h2>
      <div className="sts-theaters">
        <div className="sts-theater-card">
          <h3 className="sts-title">IMAX</h3>
          <p className="sts-description">
            거대한 스크린과 몰입감 넘치는 사운드로 영화를 경험하세요
          </p>
          <ul className="sts-features">
            <li>29m × 22m 대형 스크린</li>
            <li>12채널 사운드 시스템</li>
            <li>레이저 프로젝션</li>
          </ul>
        </div>
        <div className="sts-theater-card">
          <h3 className="sts-title">4DX</h3>
          <p className="sts-description">
            영화 속 상황을 온몸으로 느낄 수 있는 체감형 상영관
          </p>
          <ul className="sts-features">
            <li>모션 시트</li>
            <li>환경 효과 (바람, 물, 향기)</li>
            <li>특수 효과 시스템</li>
          </ul>
        </div>
        <div className="sts-theater-card">
          <h3 className="sts-title">VIP</h3>
          <p className="sts-description">
            프리미엄 리클라이너 시트와 개인 서비스를 제공하는 특별관
          </p>
          <ul className="sts-features">
            <li>리클라이너 좌석</li>
            <li>개인 테이블</li>
            <li>컨시어지 서비스</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default SpecialTheaterSection;