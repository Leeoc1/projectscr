import React, { useEffect, useState } from "react";
import "../styles/Login.css";
import { useNavigate, useLocation } from "react-router-dom";
import { kakaoLogin, kakaoCallback } from "../../../api/api";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleKakaoLogin = async () => {
        try {
            const response = await kakaoLogin({ prompt: "login" });
            window.location.href = response.redirectUrl; // 백엔드에서 받은 URL로 리다이렉트
        } catch (error) {
            console.error("카카오 로그인 에러:", error);
            alert("카카오 로그인에 실패했습니다.");
        }
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const code = urlParams.get("code");
        if (code) {
            console.log("인가 코드 감지:", code);
            kakaoCallback(code)
                .then(() => {
                    // URL에서 code 파라미터 제거 후 홈으로 이동
                    navigate("/", { replace: true });
                })
                .catch((error) => {
                    console.error("카카오 콜백 에러:", error);
                    alert("로그인에 실패했습니다. 다시 시도해 주세요.");
                    navigate("/login", { replace: true });
                });
        }
    }, [navigate, location]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("로그인 시도:", formData);
        navigate("/home", { replace: true });
    };

    const handleSocialLogin = (provider) => {
        console.log(`${provider} 로그인 시도`);
        navigate("/home", { replace: true });
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
                onClick={handleKakaoLogin}
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
  
              <button
                className="lgs-social-btn lgs-google"
                onClick={() => handleSocialLogin("구글")}
              >
                <span className="lgs-social-icon">G</span>
                구글로 로그인
              </button>
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

export default Login;