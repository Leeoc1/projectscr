import { useState, useEffect } from "react";
import "../pubcomponentcss/Header.css";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goTheater = () => navigate("/theater");
  const goMovie = () => navigate("/movie");
  const goEvent = () => navigate("/event");
  const goReservation = () => navigate("/reservation");

  return (
    <header className="h-header">
      <div className="h-header-container">
        <div className={`h-header-content ${isScrolled ? "h-scrolled" : ""}`}>
          {/* Logo */}
          <div className="h-logo-container">
            <div className="h-logo-icon">
              🍿
            </div>
            <div className="h-logo-text">
              <div className="h-logo-line">
                The
              </div>
              <div className="h-logo-line">
                Screen
              </div>
            </div>
          </div>

          {/* Navigation - Shows when scrolled */}
          <nav className={`h-nav-scrolled ${isScrolled ? "h-show" : ""}`}>
            <a className="h-nav-item" onClick={goMovie}>
              영화
            </a>
            <a className="h-nav-item" onClick={goTheater}>
              극장
            </a>
            <a className="h-nav-item" onClick={goReservation}>
              예매
            </a>
            <a className="h-nav-item" onClick={goEvent}>
              이벤트
            </a>
          </nav>

          {/* User Actions */}
          <div className="h-user-actions">
            <button className="h-notice-btn">공지사항</button>
            <button className="h-login-btn">로그인</button>
            <button className="h-signup-btn">
              회원가입
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="h-mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Navigation Bar - Shows when not scrolled */}
      <div className={`h-nav-bottom ${isScrolled ? "h-hidden" : ""}`}>
        <div className="h-nav-bottom-container">
          <nav className="h-nav-bottom-content">
            <a className="h-nav-item" onClick={goMovie}>
              영화
            </a>
            <a className="h-nav-item" onClick={goTheater}>
              극장
            </a>
            <a className="h-nav-item" onClick={goReservation}>
              예매
            </a>
            <a className="h-nav-item" onClick={goEvent}>
              이벤트
            </a>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`h-mobile-menu ${isMenuOpen ? "h-show" : ""}`}>
        <nav className="h-mobile-nav">
          <a className="h-nav-item" onClick={goMovie}>
            영화
          </a>
          <a className="h-nav-item" onClick={goTheater}>
            극장
          </a>
          <a className="h-nav-item" onClick={goReservation}>
            예매
          </a>
          <a className="h-nav-item" onClick={goEvent}>
            이벤트
          </a>
        </nav>
      </div>
    </header>
  );
}