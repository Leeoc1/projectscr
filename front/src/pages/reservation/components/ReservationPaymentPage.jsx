import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../shared/Header";
import { saveReservation } from "../../../api/api";
import "../style/ReservationPaymentPage.css";

const ReservationPaymentPage = () => {
  const navigate = useNavigate();
  const [payMethod, setPayMethod] = useState("card");

  // finalReservationInfo에서 데이터 가져오기
  const reservationInfo = JSON.parse(sessionStorage.getItem("finalReservationInfo") || "{}");

  // 필수 데이터가 없으면 좌석 선택 페이지로 이동
  if (!reservationInfo.selectedSeats || !reservationInfo.guestCount) {
    navigate("/reservation/seat");
    return null;
  }

  // 관람 인원 합계
  const totalGuests = reservationInfo.totalGuests || 0;

  // 예매 정보 추출
  const movieTitle = reservationInfo.movienm || "영화 미선택";
  const theater = reservationInfo.cinemanm || "극장 미선택";
  const date = reservationInfo.starttime
    ? new Date(reservationInfo.starttime).toLocaleDateString()
    : "날짜 미선택";
  const time = reservationInfo.starttime ? reservationInfo.starttime.substring(11, 16) : "시간 미선택";
  const seats = reservationInfo.selectedSeats ? reservationInfo.selectedSeats.join(", ") : "좌석 미선택";
  const price = reservationInfo.totalPrice ? reservationInfo.totalPrice.toLocaleString() : "0";

  // 결제 처리
  const handlePay = async () => {
    try {
      // 디버깅을 위한 로그
      console.log("전송할 데이터:", {
        schedulecd: reservationInfo.schedulecd,
        seatcd: reservationInfo.selectedSeats,
      });
      console.log("전체 reservationInfo:", reservationInfo);

      // 예약 정보를 서버로 전송
      await saveReservation({
        schedulecd: reservationInfo.schedulecd, // 스케줄 코드
        seatcd: reservationInfo.selectedSeats, // 선택된 좌석 배열
      });

      // 성공 시 세션 삭제 후 성공 페이지로 이동
      sessionStorage.removeItem("finalReservationInfo");
      navigate("/reservation/success", { state: { reservationInfo } });
    } catch (error) {
      console.error("예약 저장 중 오류:", error);
      console.error("에러 응답:", error.response?.data);
      alert("예약 저장에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <div className="reservation-payment-page">
      <Header isOtherPage={true} isScrolled={true} />
      <div className="payment-header">
        <div className="progress-bar">
          <div className="progress-steps">
            {["정보", "극장/좌석/시간", "안내사항", "결제"].map((step, idx) => (
              <div
                key={step}
                className={`progress-step${
                  idx === 3 ? " active" : idx < 3 ? " completed" : ""
                }`}
              >
                <span className="step-number">{idx + 1}</span>
                <span className="step-title">{step}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="payment-title">결제</div>
      </div>
      <div className="payment-container">
        <div className="payment-step-bar">
          <div className="payment-summary">
            <h2>최종 예매 정보</h2>
            <ul>
              <li><strong>영화:</strong> {movieTitle}</li>
              <li><strong>날짜:</strong> {date}</li>
              <li><strong>상영 시작 시간:</strong> {time}</li>
              <li><strong>극장:</strong> {theater}</li>
              <li>
                <strong>관람 인원:</strong>{" "}
                {reservationInfo.guestCount
                  ? `성인 ${reservationInfo.guestCount.adult}명, 청소년 ${reservationInfo.guestCount.child}명, 우대 ${reservationInfo.guestCount.senior}명 (총 ${totalGuests}명)`
                  : "인원 미선택"}
              </li>
              <li><strong>좌석:</strong> {seats}</li>
              <li><strong>총 결제 금액:</strong> {price}원</li>
            </ul>
          </div>
        </div>
        <div className="payment-accordion">
          <div className="payment-accordion-item">
            <div className="payment-accordion-title">STEP 1. 할인쿠폰</div>
          </div>
          <div className="payment-accordion-item">
            <div className="payment-accordion-title">STEP 2. 관람권/기프트콘</div>
          </div>
          <div className="payment-accordion-item">
            <div className="payment-accordion-title">STEP 3. 포인트 및 기타결제 수단</div>
          </div>
          <div className="payment-accordion-item payment-accordion-active">
            <div className="payment-accordion-title">STEP 4. 최종결제 수단</div>
            <div className="payment-pay-methods">
              <label>
                <input
                  type="radio"
                  name="payMethod"
                  checked={payMethod === "card"}
                  onChange={() => setPayMethod("card")}
                /> 신용카드
              </label>
              <label>
                <input
                  type="radio"
                  name="payMethod"
                  checked={payMethod === "kakao"}
                  onChange={() => setPayMethod("kakao")}
                /> 간편결제
              </label>
              <label>
                <input
                  type="radio"
                  name="payMethod"
                  checked={payMethod === "naver"}
                  onChange={() => setPayMethod("naver")}
                /> 네이버결제
              </label>
            </div>
            <div className="payment-pay-form">
              <select className="payment-card-select">
                <option>카드선택(신용/체크)</option>
                <option>국민카드</option>
                <option>신한카드</option>
                <option>삼성카드</option>
              </select>
              <div className="payment-final-amount-box">
                <div className="payment-final-label">결제하실 금액</div>
                <div className="payment-final-amount">{price}원</div>
              </div>
            </div>
            <div className="payment-pay-notice">
              * 신용카드 결제 가능 최소 금액은 1,000원 입니다.
              <br />* 결제수단별 할인/적립은 각 결제사 정책에 따릅니다.
            </div>
          </div>
        </div>
        <div className="payment-bottom-btns">
          <button className="payment-back-btn" onClick={() => navigate(-1)}>
            돌아가기
          </button>
          <button className="payment-main-btn" onClick={handlePay}>
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationPaymentPage;
