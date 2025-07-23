import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { saveReservation, savePayment } from "../../../api/reservationApi";

export function SuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [responseData, setResponseData] = useState(() => {
    // 페이지 로드 시 sessionStorage에서 responseData 복원
    const savedResponseData = sessionStorage.getItem("paymentResponseData");
    return savedResponseData ? JSON.parse(savedResponseData) : null;
  });
  const [showResponseData, setShowResponseData] = useState(false);

  // 페이지 로드 시 body 백그라운드 설정
  useEffect(() => {
    document.body.style.backgroundColor = "#e8f3ff";

    // 컴포넌트 언마운트 시 원래 스타일로 복원
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  useEffect(() => {
    console.log("[Success.jsx] useEffect 실행됨");

    // 이미 responseData가 있으면 API 호출하지 않음
    if (responseData) {
      console.log("[Success.jsx] 이미 responseData가 존재함");
      return;
    }

    if (sessionStorage.getItem("confirmRequested")) {
      console.log("[Success.jsx] 중복 요청 방지: 이미 confirm 요청이 실행됨");
      return;
    }
    sessionStorage.setItem("confirmRequested", "true");
    async function confirm() {
      const requestData = {
        orderId: searchParams.get("orderId"),
        amount: searchParams.get("amount"),
        paymentKey: searchParams.get("paymentKey"),
      };
      console.log("/confirm 요청 파라미터:", requestData);

      const response = await fetch("/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const json = await response.json();

      if (!response.ok) {
        throw { message: json.message, code: json.code };
      }

      return json;
    }

    confirm()
      .then(async (data) => {
        setResponseData(data);
        // responseData를 sessionStorage에 저장
        sessionStorage.setItem("paymentResponseData", JSON.stringify(data));

        // === provider 값 콘솔 출력 ===
        if (data.easyPay) {
          console.log("[Success.jsx] easyPay:", data.easyPay);
          console.log("[Success.jsx] easyPay.provider:", data.easyPay.provider);
        } else {
          console.log("[Success.jsx] easyPay 없음");
        }
        // === 결제 정보 저장 ===
        try {
          // 결제수단: easyPay.provider 값만 사용
          const paymentMethod =
            data.easyPay && data.easyPay.provider ? data.easyPay.provider : "";
          const paymentData = {
            orderId: searchParams.get("orderId"),
            method: paymentMethod,
            amount: searchParams.get("amount"),
          };
          const paymentResult = await savePayment(paymentData);
          if (paymentResult.success) {
            sessionStorage.setItem("paymentcd", paymentResult.paymentcd);
          }
        } catch (error) {
          console.error("결제 정보 저장 중 오류:", error);
        }

        // === 예약 정보 저장 ===
        try {
          const reservationInfo = JSON.parse(
            sessionStorage.getItem("finalReservationInfo") || "{}"
          );
          const paymentcd = sessionStorage.getItem("paymentcd");
          const userid = localStorage.getItem("userid"); // userid 가져오기

          await saveReservation({
            schedulecd: reservationInfo.schedulecd,
            seatcd: reservationInfo.selectedSeats,
            paymentcd: paymentcd, // 결제코드도 함께 전송
            userid: userid, // userid 추가 ✅
          });
        } catch (error) {
          console.error("예약 저장 중 오류:", error);
        }
      })
      .catch((error) => {
        navigate(`/fail?code=${error.code}&message=${error.message}`);
      });
  }, [searchParams]);

  useEffect(() => {
    if (responseData) {
      if (responseData.easyPay) {
        console.log("[Success.jsx] easyPay:", responseData.easyPay);
        console.log(
          "[Success.jsx] easyPay.provider:",
          responseData.easyPay.provider
        );
      } else {
        console.log("[Success.jsx] easyPay 없음");
      }
    }
  }, [responseData]);

  return (
    <div className="pay-body">
      <div className="box_section" style={{ width: "600px" }}>
        <img
          width="100px"
          src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
        />
        <h2>결제를 완료했어요</h2>
        <div className="p-grid typography--p" style={{ marginTop: "50px" }}>
          <div className="p-grid-col text--left">
            <b>결제금액</b>
          </div>
          <div className="p-grid-col text--right" id="amount">
            {`${Number(searchParams.get("amount")).toLocaleString()}원`}
          </div>
        </div>
        <div className="p-grid typography--p" style={{ marginTop: "10px" }}>
          <div className="p-grid-col text--left">
            <b>주문번호</b>
          </div>
          <div
            className="p-grid-col text--right"
            id="orderId"
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => setShowResponseData(!showResponseData)}
          >
            {`${searchParams.get("orderId")}`}
          </div>
        </div>
        <div className="p-grid-col">
          <Link to="/reservation/success">
            <button
              className="button p-grid-col5"
              style={{ backgroundColor: "#1b64da", color: "white" }}
            >
              예매확인
            </button>
          </Link>
        </div>
      </div>
      {showResponseData && (
        <div
          className="box_section"
          style={{ width: "600px", textAlign: "left" }}
        >
          <b>토스페이먼츠 결제 응답 데이터 :</b>
          <div id="response" style={{ whiteSpace: "initial" }}>
            {responseData && <pre>{JSON.stringify(responseData, null, 4)}</pre>}
          </div>
        </div>
      )}
    </div>
  );
}
