import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../pubcomponent/Header";
import "../../pagecss/reservation/ReservationPaymentPage.css";
import { 
  getSelectedMovie,
  getSelectedDate,
  getSelectedRegion,
  getSelectedBranch,
  getSelectedTime,
  getGuestCount,
  getSelectedSeats,
  getTotalPrice,
  clearAllReservationData
} from "../../utils/reservationStorage";

// 날짜 변환 유틸
function parseDate(date) {
  if (!date) return null;
  if (typeof date === "string") return new Date(date);
  return date;
}

const ReservationPaymentPage = () => {
  const navigate = useNavigate();
  
  // 개별 세션 스토리지에서 데이터 가져오기
  const selectedMovie = getSelectedMovie();
  const selectedDate = getSelectedDate();
  const selectedRegion = getSelectedRegion();
  const selectedBranch = getSelectedBranch();
  const selectedTime = getSelectedTime();
  const guestCount = getGuestCount();
  const selectedSeats = getSelectedSeats();
  const totalPrice = getTotalPrice();

  // 반드시 최상단에서 Hook 호출!
  const [payMethod, setPayMethod] = useState("card");

  // 그 다음에 조건부 이동 처리
  if (!selectedSeats || !guestCount) {
    navigate("/reservation/seat");
    return null;
  }

  // 관람 인원 합계 구하기
  const totalGuests = guestCount
    ? Object.values(guestCount).reduce((a, b) => a + b, 0)
    : 0;

  // 예매 정보에서 값 추출
  const movie = selectedMovie || {
    title: "F1 더 무비",
    poster: "/images/F1_TheMovie.png",
  };
  const theater = selectedRegion
    ? `${selectedRegion} / ${selectedBranch}`
    : "CGV 플러스 / 6관";
  const date = selectedDate
    ? selectedDate.toLocaleDateString()
    : "2025년 6월 29일(일)";
  const time = selectedTime || "22:20 ~ 25:05";
  const people = guestCount
    ? guestCount.adult + guestCount.child + guestCount.senior
    : 1;
  const seat = selectedSeats ? selectedSeats.join(", ") : "11번";
  const price = totalPrice ? totalPrice.toLocaleString() : "15,000";

  // 결제하기 버튼 클릭 시 예매완료 페이지로 이동 및 세션스토리지 정보 삭제
  const handlePay = async () => {
    const reservationInfoToSave = {
      selectedMovie,
      selectedDate,
      selectedRegion,
      selectedBranch,
      selectedTime,
      guestCount,
      selectedSeats,
      totalPrice,
    };
    // 1. DB 저장 (예시: fetch, 실제 API 엔드포인트에 맞게 수정 필요)
    try {
      const response = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservationInfoToSave),
      });
      if (!response.ok) {
        alert("예매 저장에 실패했습니다. 다시 시도해 주세요.");
        return;
      }
      // 2. 세션스토리지 정보 삭제
      clearAllReservationData();
      // 3. 성공 페이지로 이동 (state로 정보 전달)
      navigate("/reservation/success", { state: { reservationInfo: reservationInfoToSave } });
    } catch (error) {
      alert("예매 저장 중 오류가 발생했습니다. 다시 시도해 주세요.");
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
              <li>
                <strong>영화:</strong> {selectedMovie?.movienm || "영화 미선택"}
              </li>
              <li>
                <strong>날짜:</strong>{" "}
                {selectedDate
                  ? selectedDate.toLocaleDateString()
                  : "날짜 미선택"}
              </li>
              <li>
                <strong>상영 시작 시간:</strong>{" "}
                {selectedTime ? selectedTime : "시간 미선택"}
              </li>
              <li>
                <strong>지역:</strong> {selectedRegion || "지역 미선택"}
              </li>
              <li>
                <strong>지점:</strong> {selectedBranch || "지점 미선택"}
              </li>
              <li>
                <strong>관람 인원:</strong>{" "}
                {guestCount
                  ? `성인 ${guestCount.adult}명, 청소년 ${guestCount.child}명, 우대 ${guestCount.senior}명 (총 ${totalGuests}명)`
                  : "인원 미선택"}
              </li>
              <li>
                <strong>좌석:</strong>{" "}
                {selectedSeats
                  ? selectedSeats.join(", ")
                  : "좌석 미선택"}
              </li>
              <li>
                <strong>총 결제 금액:</strong>{" "}
                {totalPrice
                  ? totalPrice.toLocaleString() + "원"
                  : "금액 미선택"}
              </li>
            </ul>
          </div>
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
