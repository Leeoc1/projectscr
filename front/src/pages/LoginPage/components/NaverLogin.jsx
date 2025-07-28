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
    const errorDescription = urlParams.get("error_description");

    const loginType = localStorage.getItem("loginType");

    // 네이버 로그인이 아닌 경우 early return으로 처리 차단
    if (loginType !== "naver") {
      return;
    }

    // 네이버 콜백에 필요한 파라미터가 없는 경우도 차단
    if (!code && !error) {
      return;
    }

    // 에러 처리 개선
    if (error === "access_denied") {
      console.log("네이버 로그인 동의 취소됨:", errorDescription);
      alert("네이버 로그인 동의가 취소되었습니다.");
      localStorage.removeItem("loginType");
      navigate("/login");
      return;
    }

    // 네이버 로그인인지 확인하고, 네이버 콜백만 처리
    if (code && state) {
      console.log("네이버 콜백 처리 시작");

      (async () => {
        try {
          const result = await naverLoginCallback(code, state);
          if (result.success) {
            // 일반 로그인과 동일한 방식으로 상태 설정
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem(
              "userid",
              result.userInfo.userid || result.userInfo.id
            );
            localStorage.setItem("userInfo", JSON.stringify(result.userInfo));

            console.log("네이버 로그인 성공:", result.userInfo);

            // loginType은 성공 후에 제거
            localStorage.removeItem("loginType");
            navigate("/");
          } else {
            console.error("네이버 로그인 실패:", result.error);
            alert("네이버 로그인 실패: " + result.error);
            localStorage.removeItem("loginType");
            navigate("/login");
          }
        } catch (error) {
          console.error("네이버 로그인 콜백 처리 실패:", error);
          alert("네이버 로그인 처리 중 오류가 발생했습니다.");
          localStorage.removeItem("loginType");
          navigate("/login");
        }
      })();
    }
  }, [location.search, navigate]);

  // 네이버 로그인 버튼 클릭 핸들러
  const handleNaverLogin = async () => {
    try {
      console.log("네이버 로그인 시작");
      localStorage.setItem("loginType", "naver");

      const response = await naverLogin();
      console.log("네이버 로그인 응답:", response);

      if (response && response.loginUrl) {
        console.log("리다이렉트 URL:", response.loginUrl);
        window.location.href = response.loginUrl;
      } else {
        console.error("로그인 URL이 없습니다:", response);
        alert("네이버 로그인 URL을 받아올 수 없습니다.");
      }
    } catch (error) {
      console.error("네이버 로그인 실패:", error);
      console.error("에러 상세:", error.response?.data);
      alert("네이버 로그인을 시작할 수 없습니다. 서버 연결을 확인해주세요.");
      localStorage.removeItem("loginType");
    }
  };

  return (
    <button className="lgs-social-btn lgs-naver" onClick={handleNaverLogin}>
      <span className="lgs-social-icon">N</span>
      네이버로 로그인
    </button>
  );
};

export default NaverLogin;
