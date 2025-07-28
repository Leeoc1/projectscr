import React, { useEffect, useState, useRef } from "react";
import { kakaoTemplate } from "../../api/userApi";

const KaKapTemplate = ({ reservationId }) => {
  const [message, setMessage] = useState("");
  const hasExecuted = useRef(false);

  useEffect(() => {
    const sendMessage = async () => {
      // 이미 실행되었다면 중복 실행 방지
      if (hasExecuted.current) {
        return;
      }

      if (!reservationId) {
        setMessage("예약 ID가 없습니다.");
        return;
      }

      // 토큰 상태 확인
      const accessToken = localStorage.getItem("kakao_access_token");
      console.log("저장된 카카오 토큰:", accessToken ? "있음" : "없음");

      if (!accessToken) {
        setMessage("카카오 로그인이 필요합니다. 다시 로그인해주세요.");
        return;
      }

      // 실행 표시
      hasExecuted.current = true;

      try {
        console.log("카카오 메시지 전송 시도, 예약 ID:", reservationId);
        const response = await kakaoTemplate(reservationId);
        console.log("카카오 메시지 응답:", response);
        setMessage(response.data || "메시지 전송 성공");
      } catch (error) {
        console.error("카카오 메시지 전송 실패:", error);
        console.error("에러 응답:", error.response);

        // 권한 부족 오류인 경우 특별한 메시지 표시
        if (
          error.response?.status === 403 ||
          error.message?.includes("insufficient scopes")
        ) {
          setMessage(
            "카카오 메시지 권한이 부족합니다. 카카오 계정으로 다시 로그인해주세요."
          );
        } else {
          const errorMessage =
            error.response?.data ||
            error.response?.data?.error ||
            error.message ||
            "메시지 전송에 실패했습니다.";
          setMessage(`오류: ${errorMessage}`);
        }
      }
    };

    sendMessage();
  }, [reservationId]);

  return (
    <div>
      <h2>{message || "메시지 전송 중..."}</h2>
    </div>
  );
};

export default KaKapTemplate;
