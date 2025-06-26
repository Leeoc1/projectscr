import Header from "../../pubcomponent/Header";
import "../../componentcss/thearterpagecomponentcss/TheaterBox.css";

export default function TheaterBox() {
  return (
    <div className="theaters-page">
      <Header isOtherPage={true} isScrolled={true} />
      <div className="theaters-content">
        <div className="theaters-main">
          <div className="theaters-container">
            <section className="theaters-section">
              <h2 className="section-title">지역별 극장</h2>

              <div className="region-tabs">
                <button className="region-tab active">서울</button>
                <button className="region-tab">경기</button>
                <button className="region-tab">인천</button>
                <button className="region-tab">부산</button>
                <button className="region-tab">대구</button>
                <button className="region-tab">대전</button>
                <button className="region-tab">광주</button>
              </div>

              <div className="theaters-grid">
                <div className="theater-card">
                  <div className="theater-image">
                    <img
                      src="/api/placeholder/300/200"
                      alt="The Screen 강남점"
                    />
                  </div>
                  <div className="theater-info">
                    <h3 className="theater-name">The Screen 강남점</h3>
                    <p className="theater-address">
                      서울시 강남구 테헤란로 123
                    </p>
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
                    <img
                      src="/api/placeholder/280/180"
                      alt="The Screen 홍대점"
                    />
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
                    <img
                      src="/api/placeholder/320/200"
                      alt="The Screen 잠실점"
                    />
                  </div>
                  <div className="theater-info">
                    <h3 className="theater-name">The Screen 잠실점</h3>
                    <p className="theater-address">
                      서울시 송파구 올림픽로 789
                    </p>
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
                    <img
                      src="/api/placeholder/310/190"
                      alt="The Screen 신촌점"
                    />
                  </div>
                  <div className="theater-info">
                    <h3 className="theater-name">The Screen 신촌점</h3>
                    <p className="theater-address">
                      서울시 서대문구 신촌로 321
                    </p>
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
                    <p className="theater-address">
                      서울시 영등포구 여의대로 987
                    </p>
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

            <section className="theaters-section">
              <h2 className="section-title">특별관 안내</h2>
              <div className="special-theaters">
                <div className="special-theater-card">
                  <h3 className="special-title">IMAX</h3>
                  <p className="special-description">
                    거대한 스크린과 몰입감 넘치는 사운드로 영화를 경험하세요
                  </p>
                  <ul className="special-features">
                    <li>29m × 22m 대형 스크린</li>
                    <li>12채널 사운드 시스템</li>
                    <li>레이저 프로젝션</li>
                  </ul>
                </div>

                <div className="special-theater-card">
                  <h3 className="special-title">4DX</h3>
                  <p className="special-description">
                    영화 속 상황을 온몸으로 느낄 수 있는 체감형 상영관
                  </p>
                  <ul className="special-features">
                    <li>모션 시트</li>
                    <li>환경 효과 (바람, 물, 향기)</li>
                    <li>특수 효과 시스템</li>
                  </ul>
                </div>

                <div className="special-theater-card">
                  <h3 className="special-title">VIP</h3>
                  <p className="special-description">
                    프리미엄 리클라이너 시트와 개인 서비스를 제공하는 특별관
                  </p>
                  <ul className="special-features">
                    <li>리클라이너 좌석</li>
                    <li>개인 테이블</li>
                    <li>컨시어지 서비스</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
