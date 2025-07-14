import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { kakaoLogin, kakaoCallback } from "../../../api/api";

const KakaoLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();

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