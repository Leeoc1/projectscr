import React, { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "./GoogleLogin";
import KakaoLogin from "./KakaoLogin";
import NaverLogin from "./NaverLogin";
import axios from "axios";
import logoImg from "../../../images/logo_2.png";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userid: "",
    userpw: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          userid: formData.userid,
          userpw: formData.userpw,
        }
      );

      console.log("응답 데이터:", response.data);

      if (response.status === 200 && response.data.success) {
        // 로컬스토리지에 로그인 상태 저장
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userid", response.data.userid);

        // 관리자 여부 저장
        if (response.data.isAdmin) {
          localStorage.setItem("isAdminLogin", "true");
          console.log(
            "관리자 로그인 성공 - 평문 userid 저장:",
            response.data.userid
          );
        } else {
          localStorage.setItem("isAdminLogin", "false");
          console.log(
            "일반 사용자 로그인 성공 - 토큰화된 userid 저장:",
            response.data.userid
          );
        }

        // 브라우저 창 닫기 감지해서 자동 로그아웃
        setupAutoLogout();

        navigate("/"); // 메인으로 이동
      }
    } catch (error) {
      if (error.response) {
        alert("아이디 혹은 비밀번호가 일치하지 않습니다.........");
      } else {
        console.error("네트워크 오류:", error);
      }
    }
  };

  // 자동 로그아웃 설정
  const setupAutoLogout = () => {
    // 새로고침 여부를 추적하는 변수
    let isRefresh = false;

    // 키보드 새로고침 감지 (F5, Ctrl+R)
    window.addEventListener("keydown", (event) => {
      if (event.key === "F5" || (event.ctrlKey && event.key === "r")) {
        isRefresh = true;
        console.log("새로고침 감지 - 로그인 유지");
      }
    });

    // 브라우저 창 닫기 감지
    window.addEventListener("beforeunload", (event) => {
      // Performance Navigation API로 새로고침 타입 확인
      if (performance.navigation && performance.navigation.type === 1) {
        // type 1 = TYPE_RELOAD (새로고침)
        console.log("새로고침으로 감지 - 로그인 유지");
        return;
      }

      // 키보드로 새로고침한 경우
      if (isRefresh) {
        console.log("키보드 새로고침 감지 - 로그인 유지");
        isRefresh = false; // 플래그 리셋
        return;
      }

      // 브라우저 창 닫기인 경우만 로그아웃
      console.log("브라우저 창 닫기 감지 - 자동 로그아웃");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userid");
      localStorage.removeItem("tokenizedUserid"); // JWT 토큰화된 userid 제거
      localStorage.removeItem("username");
      localStorage.removeItem("loginType");
      sessionStorage.clear();
    });
  };

  const handleSocialLogin = (provider) => {
    console.log(`${provider} 로그인 시도`);
  };

  return (
    <div className="lgs-page">
      <div className="lgs-container">
        <div className="lgs-header">
          <img
            src={logoImg}
            alt="logo"
            className="l-logo-img"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
          <p className="lgs-subtitle">영화 예매의 새로운 경험</p>
        </div>

        <div className="lgs-form-container">
          <form className="lgs-form" onSubmit={handleLogin}>
            <div className="lgs-form-group">
              <label htmlFor="userid">아이디</label>
              <input
                type="text"
                id="userid"
                name="userid"
                value={formData.userid}
                onChange={handleInputChange}
                placeholder="아이디를 입력하세요"
                required
              />
            </div>

            <div className="lgs-form-group">
              <label htmlFor="userpw">비밀번호</label>
              <input
                type="password"
                id="userpw"
                name="userpw"
                value={formData.userpw}
                onChange={handleInputChange}
                placeholder="비밀번호를 입력하세요"
                required
              />
            </div>

            <div className="lgs-form-options">
              <label className="lgs-remember-me">
                <input type="checkbox" />
                <span>자동 로그인</span>
              </label>
              <a href="#" className="lgs-forgot-password">
                비밀번호 찾기
              </a>
            </div>

            <button type="submit" className="lgs-btn">
              로그인
            </button>
          </form>

          <div className="lgs-divider">
            <span>또는</span>
          </div>

          <div className="lgs-social-login">
            <KakaoLogin />

            {/* 네이버 로그인 컴포넌트 */}
            <NaverLogin />

            <GoogleLogin onLoginAttempt={handleSocialLogin} />
          </div>

          <div className="lgs-signup-link">
            <p>
              아직 회원이 아니신가요?
              <button
                className="lgs-link-btn"
                onClick={() => navigate("/register")}
              >
                회원가입
              </button>
            </p>
          </div>

          <div className="lgs-back-to-home">
            <button className="lgs-back-btn" onClick={() => navigate("/")}>
              홈으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
