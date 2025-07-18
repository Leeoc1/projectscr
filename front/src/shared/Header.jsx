import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../api/userApi";
import "./Header.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  // 로컬스토리지 기반 상태 추가
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [userid, setUserid] = useState(localStorage.getItem("userid") || "");
  const [username, setUsername] = useState(""); // DB에서 가져올 username

  // 로그인 상태 변화 감지 및 사용자 정보 로드
  useEffect(() => {
    const checkLoginStatus = async () => {
      const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      const storedUserid = localStorage.getItem("userid") || "";
      
      setIsLoggedIn(storedIsLoggedIn);
      setUserid(storedUserid);
      
      // 로그인 상태이고 userid가 있으면 DB에서 username 조회
      if (storedIsLoggedIn && storedUserid) {
        try {
          const userInfo = await getUserInfo(storedUserid);
          setUsername(userInfo.username || storedUserid); // username이 없으면 userid 사용
        } catch (error) {
          // API 실패 시 localStorage의 username 사용 (카카오 로그인 등)
          const storedUsername = localStorage.getItem("username") || storedUserid;
          setUsername(storedUsername);
        }
      } else {
        setUsername("");
      }
    };

    checkLoginStatus();
    
    // localStorage 변화 감지
    const handleStorageChange = () => {
      checkLoginStatus();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

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
  const goAdmin = () => navigate("/admin");
  const goLogin = () => navigate("/login");
  const goRegister = () => navigate("/register");
  const goNotice = () => navigate("/notice");
  const goHome = () => navigate("/");
  const goMyPage = () => navigate("/mypage");

  // 로그아웃 핸들러
  const handleLogout = () => {
    // 기본 로그인 정보 제거
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userid");
    localStorage.removeItem("username");
    
    // 카카오 로그인 관련 데이터 제거
    localStorage.removeItem("loginType");
    sessionStorage.removeItem("loginType");
    
    // 토스페이먼츠 관련 데이터 제거
    localStorage.removeItem("@tosspayments/merchant-browser-id");
    localStorage.removeItem("@tosspayments/payment-widget-previous-payment-method-id");
    
    // 추가 보안을 위해 다른 사용자 관련 데이터도 제거
    localStorage.removeItem("userToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("authData");
    
    // 세션 스토리지 전체 정리
    sessionStorage.clear();
    
    // 상태 초기화
    setIsLoggedIn(false);
    setUserid("");
    setUsername("");
    
    // 홈페이지로 리다이렉트
    navigate("/");
  };

  return (
    <header className="h-header">
      <div className="h-header-container">
        <div className={`h-header-content ${isScrolled ? "h-scrolled" : ""}`}>
          {/* Logo */}
          <div className="h-logo-container" onClick={goHome}>
            <div className="h-logo-icon">🍿</div>
            <div className="h-logo-text">
              <div className="h-logo-line">The</div>
              <div className="h-logo-line">Screen</div>
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
            <button className="h-admin-btn" onClick={goAdmin}>
              admin
            </button>
            <button className="h-notice-btn" onClick={goNotice}>
              공지사항
            </button>
            {isLoggedIn ? (
              <>
                <button className="h-logout-btn" onClick={handleLogout}>
                  로그아웃
                </button>
                <button className="h-mypage-btn" onClick={goMyPage}>
                  {username || userid}
                </button>
              </>
            ) : (
              <>
                <button className="h-login-btn" onClick={goLogin}>
                  로그인
                </button>
                <button className="h-signup-btn" onClick={goRegister}>
                  회원가입
                </button>
              </>
            )}
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
