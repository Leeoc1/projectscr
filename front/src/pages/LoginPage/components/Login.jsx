import React, { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLogin from "./GoogleLogin";

// 내부 컴포넌트
const LoginContent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("로그인 시도:", formData);
    navigate("/");
  };

  const handleSocialLogin = (provider) => {
    console.log(`${provider} 로그인 시도`);
  };

  return (
    <div className="lgs-page">
      <div className="lgs-container">
        <div className="lgs-header">
          <h1 className="lgs-title">The SCREEN</h1>
          <p className="lgs-subtitle">영화 예매의 새로운 경험</p>
        </div>

        <div className="lgs-form-container">
          <form className="lgs-form" onSubmit={handleLogin}>
            <div className="lgs-form-group">
              <label htmlFor="username">아이디</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="아이디를 입력하세요"
                required
              />
            </div>

            <div className="lgs-form-group">
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
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
            <button
              className="lgs-social-btn lgs-kakao"
              onClick={() => handleSocialLogin("카카오")}
            >
              <span className="lgs-social-icon">K</span>
              카카오로 로그인
            </button>

            <button
              className="lgs-social-btn lgs-naver"
              onClick={() => handleSocialLogin("네이버")}
            >
              <span className="lgs-social-icon">N</span>
              네이버로 로그인
            </button>

            <GoogleLogin onLoginAttempt={handleSocialLogin} />
          </div>

          <div className="lgs-signup-link">
            <p>
              아직 회원이 아니신가요?
              <button
                className="lgs-link-btn"
                onClick={() => navigate("/signup")}
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

// 외부 컴포넌트
const Login = () => {
  return (
    <GoogleOAuthProvider clientId="955753367282-kld27dcb1ve81mur0qfien2g911jsn2d.apps.googleusercontent.com">
      <LoginContent />
    </GoogleOAuthProvider>
  );
};

export default Login;
