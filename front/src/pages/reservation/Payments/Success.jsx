import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { saveReservation, savePayment } from "../../../api/reservationApi";
import { useCoupon as applyCoupon } from "../../../api/couponApi";
import { getCurrentUserId } from "../../../utils/tokenUtils";

const SuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [responseData, setResponseData] = useState(() => {
    const savedResponseData = sessionStorage.getItem("paymentResponseData");
    return savedResponseData ? JSON.parse(savedResponseData) : null;
  });
  const [showResponseData, setShowResponseData] = useState(false);

  // 뒤로가기 방지 및 보안 처리 (토스 결제 성공 페이지)
  useEffect(() => {
    // 결제 성공 페이지에서 뒤로가기 완전 차단 (보안상 중요)
    const handlePopState = (event) => {
      // 뒤로가기 시도 시 아무 동작도 하지 않고 현재 페이지 유지
      console.log("🔒 보안상 뒤로가기가 차단되었습니다. (결제 완료 페이지)");
      window.history.pushState(null, "", window.location.href);
    };

    // 키보드 단축키 뒤로가기 방지 (Alt+왼쪽화살표, Backspace 등)
    const handleKeyDown = (event) => {
      // Alt + 왼쪽 화살표 (뒤로가기)
      if (event.altKey && event.keyCode === 37) {
        console.log("🔒 키보드 뒤로가기가 차단되었습니다. (Alt+←)");
        event.preventDefault();
        return false;
      }
      // Backspace로 뒤로가기 (input이나 textarea가 아닌 경우)
      if (event.keyCode === 8 && 
          !['INPUT', 'TEXTAREA'].includes(event.target.tagName) && 
          !event.target.isContentEditable) {
        console.log("🔒 키보드 뒤로가기가 차단되었습니다. (Backspace)");
        event.preventDefault();
        return false;
      }
    };

    // 히스토리 조작으로 뒤로가기 차단
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);
    document.addEventListener("keydown", handleKeyDown);

    // 민감한 결제 정보 3초 후 정리
    const timeoutId = setTimeout(() => {
      // 결제 관련 민감한 정보 제거
      sessionStorage.removeItem("paymentResponseData");
      const keysToRemove = [
        "selectedMovieTime",
        "selectedSeats",
        "guestCount",
        "totalGuests",
        "finalPrice",
      ];
      keysToRemove.forEach((key) => sessionStorage.removeItem(key));
    }, 3000);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timeoutId);
    };
  }, [navigate]);

  // 페이지 로드 시 body 백그라운드 설정
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
          const userid = await getCurrentUserId();
        console.log("MyPage 컴포넌트 - userid:", userid);

          // 쿠폰 사용 처리는 이미 결제 시점에서 완료되었으므로 여기서는 하지 않음
          if (reservationInfo.usedCoupon && !reservationInfo.couponAlreadyUsed) {
            console.log("쿠폰이 아직 사용되지 않았습니다. 사용 처리를 진행합니다.");
            try {
              await applyCoupon(userid, reservationInfo.usedCoupon.couponnum);
              console.log("쿠폰 사용 처리 완료:", reservationInfo.usedCoupon.couponname);
            } catch (couponError) {
              console.error("쿠폰 사용 처리 중 오류:", couponError);
              // 쿠폰 사용 실패해도 예약은 계속 진행
            }
          } else if (reservationInfo.usedCoupon) {
            console.log("쿠폰은 이미 사용 처리되었습니다:", reservationInfo.usedCoupon.couponname);
          }

          await saveReservation({
            schedulecd: reservationInfo.schedulecd,
            seatcd: reservationInfo.selectedSeats,
            paymentcd,
            userid,
          });
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
