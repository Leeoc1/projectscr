import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import logoImg from "../images/logo_1.png";
import { getUserInfo } from "../api/userApi";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  // 로컬스토리지 기반 상태 추가
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [userid, setUserid] = useState(localStorage.getItem("userid") || "");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 로그인한 사용자의 정보를 가져오는 useEffect
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (isLoggedIn && userid) {
        try {
          console.log("🔍 사용자 정보 요청 중:", userid);
          const userInfo = await getUserInfo(userid);
          console.log("📥 사용자 정보 응답:", userInfo);
          console.log("📋 응답 키 목록:", Object.keys(userInfo || {}));

          // 다양한 필드명 확인
          const possibleNameFields = [
            "username",
            "name",
            "userName",
            "user_name",
            "displayName",
          ];
          let foundName = null;

          for (const field of possibleNameFields) {
            if (userInfo && userInfo[field]) {
              foundName = userInfo[field];
              console.log(`✅ 이름 필드 발견: ${field} = ${foundName}`);
              break;
            }
          }

          if (foundName) {
            setUsername(foundName);
            console.log("✅ 사용자 이름 설정 완료:", foundName);
          } else {
            console.log("❌ 이름 필드를 찾을 수 없어서 userid 사용:", userid);
            setUsername(userid);
          }
        } catch (error) {
          console.error("❌ 사용자 정보 조회 실패:", error);
          console.error("❌ 에러 상세:", error.response?.data || error.message);
          setUsername(userid); // API 실패 시 userid를 fallback으로 사용
        }
      } else {
        console.log("⚠️ 로그인 상태가 아니거나 userid가 없음");
        setUsername("");
      }
    };

    fetchUserInfo();
  }, [isLoggedIn, userid]);

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
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userid");
    setIsLoggedIn(false);
    setUserid("");
    setUsername("");
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
          </nav>

          {/* User Actions */}
          <div className="h-user-actions">
            <button className="h-admin-btn" onClick={goAdmin}>
              admin
            </button>
            {isLoggedIn ? (
              <>
                <div className="h-user-profile" onClick={goMyPage}>
                  <img
                    src="https://img.megabox.co.kr/static/pc/images/common/ico/ico-mymega.png"
                    alt="User Icon"
                    className="h-user-icon-img"
                  />
                  <span className="h-username">{username || userid}님</span>
                </div>
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
