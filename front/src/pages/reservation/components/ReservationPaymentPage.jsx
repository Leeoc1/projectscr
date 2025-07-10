import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../shared/Header";
import { saveReservation } from "../../../api/api";
import ProgressBar from "./ProgressBar";
import "../style/ReservationPaymentPage.css";

const ReservationPaymentPage = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(null);

  // finalReservationInfo에서 데이터 가져오기
  const reservationInfo = JSON.parse(
    sessionStorage.getItem("finalReservationInfo") || "{}"
  );

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
  const time = reservationInfo.starttime
    ? reservationInfo.starttime.substring(11, 16)
    : "시간 미선택";
  const seats = reservationInfo.selectedSeats
    ? reservationInfo.selectedSeats.join(", ")
    : "좌석 미선택";
  const price = reservationInfo.totalPrice
    ? reservationInfo.totalPrice.toLocaleString()
    : "0";

  // 결제 처리
  const handlePay = () => {
    // reservationInfo는 이미 finalReservationInfo에 저장되어 있음
    // 체크아웃 페이지로 이동
    navigate("/checkout");
  };

  // 아코디언 토글 함수
  const toggleStep = (stepNumber) => {
    setActiveStep(activeStep === stepNumber ? null : stepNumber);
  };

  return (
    <div className="reservation-payment-page">
      <Header isOtherPage={true} isScrolled={true} />
      <div className="reservation-payment-content">
        <div className="reservation-payment-container">
          {/* 진행바 */}
          <ProgressBar currentStep={2} />
          <div className="payment-title">결제</div>
          <div className="payment-container">
            <div className="payment-accordion">
              <div className="payment-accordion-item">
                <div
                  className={`payment-accordion-title ${
                    activeStep === 1 ? "active" : ""
                  }`}
                  onClick={() => toggleStep(1)}
                >
                  STEP 1. 할인쿠폰
                </div>
                {activeStep === 1 && (
                  <div className="payment-accordion-content">
                    <div className="coupon-options">
                      <label>
                        <input
                          type="radio"
                          name="coupon"
                          value="none"
                          defaultChecked
                        />
                        할인쿠폰 사용 안함
                      </label>
                      <label>
                        <input type="radio" name="coupon" value="welcome" />
                        웰컴 쿠폰 (1,000원 할인)
                      </label>
                      <label>
                        <input type="radio" name="coupon" value="student" />
                        학생 할인 쿠폰 (2,000원 할인)
                      </label>
                      <label>
                        <input type="radio" name="coupon" value="senior" />
                        시니어 할인 쿠폰 (3,000원 할인)
                      </label>
                    </div>
                  </div>
                )}
              </div>
              <div className="payment-accordion-item">
                <div
                  className={`payment-accordion-title ${
                    activeStep === 2 ? "active" : ""
                  }`}
                  onClick={() => toggleStep(2)}
                >
                  STEP 2. 관람권/기프트콘
                </div>
                {activeStep === 2 && (
                  <div className="payment-accordion-content">
                    <div className="gift-options">
                      <label>
                        <input
                          type="radio"
                          name="gift"
                          value="none"
                          defaultChecked
                        />
                        관람권/기프트콘 사용 안함
                      </label>
                      <label>
                        <input type="radio" name="gift" value="gift1" />
                        영화관람권 10,000원
                      </label>
                      <label>
                        <input type="radio" name="gift" value="gift2" />
                        팝콘+음료 세트 기프트콘
                      </label>
                      <label>
                        <input type="radio" name="gift" value="gift3" />
                        영화관람권 20,000원
                      </label>
                    </div>
                  </div>
                )}
              </div>
              <div className="payment-accordion-item">
                <div
                  className={`payment-accordion-title ${
                    activeStep === 3 ? "active" : ""
                  }`}
                  onClick={() => toggleStep(3)}
                >
                  STEP 3. 포인트 및 기타결제 수단
                </div>
                {activeStep === 3 && (
                  <div className="payment-accordion-content">
                    <div className="point-options">
                      <div className="point-input">
                        <label>포인트 사용:</label>
                        <input
                          type="number"
                          placeholder="사용할 포인트 입력"
                          min="0"
                        />
                        <span>보유 포인트: 5,000P</span>
                      </div>
                      <div className="other-payment">
                        <label>
                          <input
                            type="radio"
                            name="otherPayment"
                            value="none"
                            defaultChecked
                          />
                          기타결제 수단 사용 안함
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="otherPayment"
                            value="mobile"
                          />
                          모바일 결제
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="otherPayment"
                            value="transfer"
                          />
                          계좌이체
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="payment-final-amount-box">
              <div className="payment-final-label">결제하실 금액</div>
              <div className="payment-final-amount">{price}원</div>
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
      </div>
    </div>
  );
};

export default ReservationPaymentPage;
