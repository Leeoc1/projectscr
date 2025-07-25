import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { naverLogin, naverLoginCallback } from "../../../api/userApi";

const NaverLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 네이버 로그인 콜백 처리
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get("code");
    const state = urlParams.get("state");
    const error = urlParams.get("error");
    const loginType = localStorage.getItem("loginType");

    if (error === "access_denied") {
      alert("네이버 로그인 동의가 취소되었습니다.");
      localStorage.removeItem("loginType"); // loginType 제거
      navigate("/login");
      return;
    }

    // 네이버 로그인인지 확인하고, 네이버 콜백만 처리
    if (code && state && loginType === "naver") {
      (async () => {
        try {
          const result = await naverLoginCallback(code, state);
          if (result.success) {
            localStorage.setItem("userInfo", JSON.stringify(result.userInfo));
            localStorage.setItem("loginType", "naver");
            navigate("/");
          } else {
            alert("네이버 로그인 실패: " + result.error);
          }
        } catch (error) {
          alert("네이버 로그인 콜백 처리 실패");
        } finally {
          localStorage.removeItem("loginType"); // 처리 완료 후 loginType 제거
        }
      })();
    }
  }, [location.search, navigate]);

  // 네이버 로그인 버튼 클릭 핸들러
  const handleNaverLogin = async () => {
    try {
      // 네이버 로그인 시작 시 loginType 설정
      localStorage.setItem("loginType", "naver");
      
      const response = await naverLogin();
      window.location.href = response.loginUrl;
    } catch (error) {
      console.error("네이버 로그인 실패:", error);
      console.error("에러 상세:", error.response?.data);
      alert("네이버 로그인을 시작할 수 없습니다. 서버 연결을 확인해주세요.");
      localStorage.removeItem("loginType"); // 에러 시 loginType 제거
    }
  };

  return (
    <button
      className="lgs-social-btn lgs-naver"
      onClick={handleNaverLogin}
    >
      <span className="lgs-social-icon">N</span>
      네이버로 로그인
    </button>
  );
};

export default NaverLogin; 