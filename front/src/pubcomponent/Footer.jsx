import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Company Info */}
          <div className="footer-column">
            <div className="footer-logo">🍿 The Screen</div>
            <p className="footer-description">
              최고의 영화 경험을 제공하는 프리미엄 멀티플렉스 시네마
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h3 className="footer-title">바로가기</h3>
            <ul className="footer-list">
              <li>
                <a href="#" className="footer-link">
                  영화 예매
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  상영시간표
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  극장 찾기
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  이벤트
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="footer-column">
            <h3 className="footer-title">고객센터</h3>
            <ul className="footer-list">
              <li>
                <a href="#" className="footer-link">
                  자주 묻는 질문
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  1:1 문의
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  분실물 문의
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  단체 관람 문의
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-column">
            <h3 className="footer-title">연락처</h3>
            <ul className="footer-list">
              <li className="footer-text">고객센터: 1544-1234</li>
              <li className="footer-text">대표번호: 02-1234-5678</li>
              <li className="footer-text">이메일: help@thescreen.co.kr</li>
              <li className="footer-text">운영시간: 09:00~23:00</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-copyright">
          <p>
            &copy; 2024 The Screen. All rights reserved. | 개인정보처리방침 |
            이용약관
          </p>
        </div>
      </div>
    </footer>
  );
}
