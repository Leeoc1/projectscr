import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../pubcomponent/Header";
import "../../pagecss/reservation/ReservationPaymentPage.css";
import { getReservationInfo, clearReservationInfo } from "../../utils/reservationStorage";

const ReservationPaymentPage = () => {
  const navigate = useNavigate();
  const reservationInfo = getReservationInfo();

  // 반드시 최상단에서 Hook 호출!
  const [payMethod, setPayMethod] = useState("card");

  // 그 다음에 조건부 이동 처리
  if (!reservationInfo.selectedSeats || !reservationInfo.guestCount) {
    navigate("/reservation/seat");
    return null;
  }

  // 예매 정보에서 값 추출
  const movie = reservationInfo.selectedMovie || {
    title: "F1 더 무비",
    poster: "/images/F1_TheMovie.png",
  };
  const theater = reservationInfo.selectedRegion
    ? `${reservationInfo.selectedRegion} / ${reservationInfo.selectedBranch}`
    : "CGV 플러스 / 6관";
  const date = reservationInfo.selectedDate
    ? typeof reservationInfo.selectedDate === "string"
      ? reservationInfo.selectedDate
      : reservationInfo.selectedDate.toLocaleDateString()
    : "2025년 6월 29일(일)";
  const time = reservationInfo.selectedTime || "22:20 ~ 25:05";
  const people = reservationInfo.guestCount
    ? reservationInfo.guestCount.adult + reservationInfo.guestCount.child + reservationInfo.guestCount.senior
    : 1;
  const seat = reservationInfo.selectedSeats ? reservationInfo.selectedSeats.join(", ") : "11번";
  const price = reservationInfo.totalPrice ? reservationInfo.totalPrice.toLocaleString() : "15,000";

  // 결제하기 버튼 클릭 시 예매완료 페이지로 이동 및 세션스토리지 정보 삭제
  const handlePay = () => {
    clearReservationInfo();
    navigate("/reservation/success");
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
          <div className="payment-step-circle active">1</div>
          <div className="payment-step-line" />
          <div className="payment-step-circle active">2</div>
          <div className="payment-step-line" />
          <div className="payment-step-circle active">3</div>
          <div className="payment-step-line" />
          <div className="payment-step-circle active">4</div>
        </div>
        <div className="payment-step-labels">
          <span>결제</span>
          <span>극장/좌석/시간</span>
          <span>안내사항</span>
          <span>결제</span>
        </div>
        <div className="payment-accordion">
          <div className="payment-accordion-item">
            <div className="payment-accordion-title">STEP 1. 할인쿠폰</div>
          </div>
          <div className="payment-accordion-item">
            <div className="payment-accordion-title">
              STEP 2. 관람권/기프트콘
            </div>
          </div>
          <div className="payment-accordion-item">
            <div className="payment-accordion-title">
              STEP 3. 포인트 및 기타결제 수단
            </div>
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
                />{" "}
                신용카드
              </label>
              <label>
                <input
                  type="radio"
                  name="payMethod"
                  checked={payMethod === "kakao"}
                  onChange={() => setPayMethod("kakao")}
                />{" "}
                간편결제
              </label>
              <label>
                <input
                  type="radio"
                  name="payMethod"
                  checked={payMethod === "naver"}
                  onChange={() => setPayMethod("naver")}
                />{" "}
                네이버결제
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
