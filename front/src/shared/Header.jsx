import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import logoImg from "../images/logo_1.png";
import { getUserInfo } from "../api/userApi";
import { secureLogout, getCurrentUserId } from "../utils/tokenUtils";
import QuickReservation from "./QuickReservation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  // 로컬스토리지 기반 상태 추가
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [userid, setUserid] = useState(localStorage.getItem("userid") || "");
  const [realUserid, setRealUserid] = useState(""); // 실제 userid (토큰 디코딩된)
  const [username, setUsername] = useState(""); // DB에서 가져올 username
  const [isLoadingUser, setIsLoadingUser] = useState(false); // 사용자 정보 로딩 상태

  const [showQuickReservation, setShowQuickReservation] = useState(false);

  // 로그인 상태 변화 감지 및 사용자 정보 로드
  useEffect(() => {
    const checkLoginStatus = async () => {
      const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      const tokenizedUserid = localStorage.getItem("userid") || "";

      setIsLoggedIn(storedIsLoggedIn);
      setUserid(tokenizedUserid); // 토큰화된 상태로 설정 (표시용)

      // 로그인 상태이고 토큰화된 userid가 있으면 실제 userid로 DB 조회
      if (storedIsLoggedIn && tokenizedUserid) {
        setIsLoadingUser(true); // 로딩 시작
        try {
          // 토큰에서 실제 userid 추출
          const realUserid = await getCurrentUserId();

          if (realUserid) {
            setRealUserid(realUserid); // 실제 userid 저장
            const userInfo = await getUserInfo(realUserid);
            setUsername(userInfo.username || realUserid);
          } else {
            // 토큰이 유효하지 않으면 로그아웃
            handleLogout();
          }
        } catch (error) {
          // 오류 발생 시 로그아웃 처리
          handleLogout();
        } finally {
          setIsLoadingUser(false); // 로딩 종료
        }
      } else {
        setRealUserid("");
        setUsername("");
        setIsLoadingUser(false);
      }
    };

    checkLoginStatus();

    // localStorage 변화 감지
    const handleStorageChange = () => {
      checkLoginStatus();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // localStorage 변경 시 Header 상태 동기화
  useEffect(() => {
    const syncLoginState = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
      setUserid(localStorage.getItem("userid") || "");
    };
    window.addEventListener("storage", syncLoginState);
    return () => window.removeEventListener("storage", syncLoginState);
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
  const toggleQuickReservation = () =>
    setShowQuickReservation(!showQuickReservation);

  // 로그아웃 핸들러
  const handleLogout = () => {
    // 보안 로그아웃 실행
    secureLogout();

    // 상태 초기화
    setIsLoggedIn(false);
    setUserid("");
    setRealUserid("");
    setUsername("");
    setIsLoadingUser(false);

    // 홈페이지로 리다이렉트
    navigate("/");
  };

  return (
    <header className="h-header">
      <div className="h-header-container">
        <div className={`h-header-content ${isScrolled ? "h-scrolled" : ""}`}>
          {/* Logo */}
          <div className="h-logo-container" onClick={goHome}>
            <img src={logoImg} alt="logo" className="h-logo-img" />
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
            <a className="h-nav-item" onClick={toggleQuickReservation}>
              빠른예매
            </a>
          </nav>
          {showQuickReservation && isScrolled && <QuickReservation />}

          {/* User Actions */}
          <div className="h-user-actions">
            {isLoggedIn && realUserid === "master001" && (
              <button className="h-manager-btn" onClick={goAdmin}>
                관리페이지
              </button>
            )}
            {isLoggedIn ? (
              <>
                <div className="h-user-profile" onClick={goMyPage}>
                  <img
                    src="https://img.megabox.co.kr/static/pc/images/common/ico/ico-mymega.png"
                    alt="User Icon"
                    className="h-user-icon-img"
                  />
                  <span className="h-username">
                    {isLoadingUser ? "로딩중..." : username || "사용자"}님
                  </span>
                </div>
                <button className="h-logout-btn" onClick={goNotice}>
                  고객센터
                </button>
                <button className="h-logout-btn" onClick={handleLogout}>
                  로그아웃
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
                <button className="h-notice-btn" onClick={goNotice}>
                  공지사항
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
            <a className="h-nav-item" onClick={toggleQuickReservation}>
              빠른예매
            </a>
          </nav>
        </div>
        {showQuickReservation && !isScrolled && <QuickReservation />}
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
