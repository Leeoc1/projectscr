import React, { useEffect, useState } from "react";
import { kakaoTemplate } from "../../api/userApi";

const KaKapTemplate = ({ reservationId }) => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const sendMessage = async () => {
      if (!reservationId) {
        setMessage("예약 ID가 없습니다.");
        return;
      }

      try {
        console.log("카카오 메시지 전송 시도, 예약 ID:", reservationId);
        const response = await kakaoTemplate(reservationId);
        console.log("카카오 메시지 응답:", response);
        setMessage(response.data || "메시지 전송 성공");
      } catch (error) {
        console.error("카카오 메시지 전송 실패:", error);
        console.error("에러 응답:", error.response);
        const errorMessage =
          error.response?.data ||
          error.response?.data?.error ||
          error.message ||
          "메시지 전송에 실패했습니다.";
        setMessage(`오류: ${errorMessage}`);
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
