import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { naverLogin, naverLoginCallback } from "../../../api/api";

const NaverLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 네이버 로그인 콜백 처리
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get("code");
    const state = urlParams.get("state");
    const error = urlParams.get("error");

    if (error === "access_denied") {
      alert("네이버 로그인 동의가 취소되었습니다.");
      navigate("/login");
      return;
    }

    if (code && state) {
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
        }
      })();
    }
  }, [location.search, navigate]);

  // 네이버 로그인 버튼 클릭 핸들러
  const handleNaverLogin = async () => {
    try {
      const response = await naverLogin();
      window.location.href = response.loginUrl;
    } catch (error) {
      console.error("네이버 로그인 실패:", error);
      console.error("에러 상세:", error.response?.data);
      alert("네이버 로그인을 시작할 수 없습니다. 서버 연결을 확인해주세요.");
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