import React, { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "./GoogleLogin";
import KakaoLogin from "./KakaoLogin";
import NaverLogin from "./NaverLogin";
import axios from "axios";

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

      if (response.status === 200) {
        // 로컬스토리지에 로그인 상태 저장
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userid", formData.userid);

        alert(response.data); // 로그인 성공
        navigate("/"); // 메인으로 이동
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          alert("비밀번호가 틀렸습니다.");
        } else if (error.response.status === 404) {
          alert("아이디가 존재하지 않습니다.");
        } else {
          alert("알 수 없는 오류가 발생했습니다.");
        }
      } else {
        console.error("네트워크 오류:", error);
      }
    }
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
