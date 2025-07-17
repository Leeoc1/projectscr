import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { kakaoLogin, kakaoCallback } from "../../../api/userApi";

const KakaoLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleKakaoLogin = async () => {
        try {
            // 카카오 로그인 시작 시 loginType 설정
            localStorage.setItem("loginType", "kakao");
            
            const response = await kakaoLogin({ prompt: "login" });
            window.location.href = response.redirectUrl; // 백엔드에서 받은 URL로 리다이렉트
        } catch (error) {
            console.error("카카오 로그인 에러:", error);
            alert("카카오 로그인에 실패했습니다.");
            localStorage.removeItem("loginType"); // 에러 시 loginType 제거
        }
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const code = urlParams.get("code");
        const loginType = localStorage.getItem("loginType");
        
        // 카카오 로그인인지 확인하고, 카카오 콜백만 처리
        if (code && loginType === "kakao") {
            console.log("카카오 인가 코드 감지:", code);
            kakaoCallback(code)
                .then(() => {
                    // URL에서 code 파라미터 제거 후 홈으로 이동
                    navigate("/", { replace: true });
                })
                .catch((error) => {
                    console.error("카카오 콜백 에러:", error);
                    alert("로그인에 실패했습니다. 다시 시도해 주세요.");
                    navigate("/login", { replace: true });
                })
                .finally(() => {
                    localStorage.removeItem("loginType"); // 처리 완료 후 loginType 제거
                });
        }
    }, [navigate, location]);

    return (
        <button
            className="lgs-social-btn lgs-kakao"
            onClick={handleKakaoLogin}
        >
            <span className="lgs-social-icon">K</span>
            카카오로 로그인
        </button>
    );
};

export default KakaoLogin; 