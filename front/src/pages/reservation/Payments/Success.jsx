import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { saveReservation, savePayment } from "../../../api/reservationApi";

const SuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [responseData, setResponseData] = useState(() => {
    const savedResponseData = sessionStorage.getItem("paymentResponseData");
    return savedResponseData ? JSON.parse(savedResponseData) : null;
  });
  const [showResponseData, setShowResponseData] = useState(false);

  // 페이지 배경색 설정
  useEffect(() => {
    document.body.style.backgroundColor = "#e8f3ff";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  // 결제 확인 및 정보 저장
  useEffect(() => {
    if (responseData || sessionStorage.getItem("confirmRequested")) return;

    sessionStorage.setItem("confirmRequested", "true");

    const confirmPayment = async () => {
      const requestData = {
        orderId: searchParams.get("orderId"),
        amount: searchParams.get("amount"),
        paymentKey: searchParams.get("paymentKey"),
      };

      const response = await fetch("/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      const json = await response.json();
      if (!response.ok) {
        throw { message: json.message, code: json.code };
      }

      return json;
    };

    confirmPayment()
      .then(async (data) => {
        setResponseData(data);
        sessionStorage.setItem("paymentResponseData", JSON.stringify(data));

        // 결제 정보 저장
        try {
          const paymentMethod = data.easyPay?.provider || "";
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

        // 예약 정보 저장
        try {
          const reservationInfo = JSON.parse(
            sessionStorage.getItem("finalReservationInfo") || "{}"
          );
          const paymentcd = sessionStorage.getItem("paymentcd");
          const userid = localStorage.getItem("userid");

          await saveReservation({
            schedulecd: reservationInfo.schedulecd,
            seatcd: reservationInfo.selectedSeats,
            paymentcd,
            userid,
          });
          const timer = setTimeout(() => {
            navigate("/reservation/success");
          }, 3000);
          return () => clearTimeout(timer);
        } catch (error) {
          console.error("예약 저장 중 오류:", error);
        }
      })
      .catch((error) => {
        navigate(`/fail?code=${error.code}&message=${error.message}`);
      });
  }, []);

  const goToReservationSuccess = () => {
    navigate("/reservation/success");
  };

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
          <div className="p-grid-col text--right">
            {Number(searchParams.get("amount")).toLocaleString()}원
          </div>
        </div>
        <div className="p-grid typography--p" style={{ marginTop: "10px" }}>
          <div className="p-grid-col text--left">
            <b>주문번호</b>
          </div>
          <div
            className="p-grid-col text--right"
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => setShowResponseData(!showResponseData)}
          >
            {searchParams.get("orderId")}
          </div>
        </div>
        <div className="p-grid-col">
          <button
            className="button p-grid-col5"
            style={{ backgroundColor: "#1b64da", color: "white" }}
            onClick={goToReservationSuccess}
          >
            예매확인
          </button>
        </div>
      </div>
      {showResponseData && (
        <div
          className="box_section"
          style={{ width: "600px", textAlign: "left" }}
        >
          <b>토스페이먼츠 결제 응답 데이터:</b>
          <div style={{ whiteSpace: "initial" }}>
            {responseData && <pre>{JSON.stringify(responseData, null, 4)}</pre>}
          </div>
        </div>
      )}
    </div>
  );
};

export { SuccessPage };
