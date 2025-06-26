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
    <header className="header">
      <div className="header-container">
        <div className={`header-content ${isScrolled ? "scrolled" : ""}`}>
          {/* Logo */}
          <div className="logo-container">
            <div className={`logo-icon ${isScrolled ? "scrolled" : ""}`}>
              🍿
            </div>
            <div className="logo-text">
              <div className={`logo-line ${isScrolled ? "scrolled" : ""}`}>
                The
              </div>
              <div className={`logo-line ${isScrolled ? "scrolled" : ""}`}>
                Screen
              </div>
            </div>
          </div>

          {/* Navigation - Shows when scrolled */}
          <nav className={`nav-scrolled ${isScrolled ? "show" : ""}`}>
            <a className="nav-item" onClick={goMovie}>
              영화
            </a>
            <a className="nav-item" onClick={goTheater}>
              극장
            </a>
            <a className="nav-item" onClick={goReservation}>
              예매
            </a>
            <a className="nav-item" onClick={goEvent}>
              이벤트
            </a>
          </nav>

          {/* User Actions */}
          <div className="user-actions">
            {!isScrolled && <button className="notice-btn">공지사항</button>}
            <button className="login-btn">로그인</button>
            <button className={`signup-btn ${isScrolled ? "scrolled" : ""}`}>
              회원가입
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Navigation Bar - Shows when not scrolled */}
      <div className={`nav-bottom ${isScrolled ? "hidden" : ""}`}>
        <div className="nav-bottom-container">
          <nav className="nav-bottom-content">
            <a className="nav-item" onClick={goMovie}>
              영화
            </a>
            <a className="nav-item" onClick={goTheater}>
              극장
            </a>
            <a className="nav-item" onClick={goReservation}>
              예매
            </a>
            <a className="nav-item" onClick={goEvent}>
              이벤트
            </a>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? "show" : ""}`}>
        <nav className="mobile-nav">
          <a className="nav-item" onClick={goMovie}>
            영화
          </a>
          <a className="nav-item" onClick={goTheater}>
            극장
          </a>
          <a className="nav-item" onClick={goReservation}>
            예매
          </a>
          <a className="nav-item" onClick={goEvent}>
            이벤트
          </a>
        </nav>
      </div>
    </header>
  );
}
