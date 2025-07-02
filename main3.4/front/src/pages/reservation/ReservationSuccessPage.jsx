import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../../pubcomponent/Header";
import "../../pagecss/reservation/ReservationSuccessPage.css";

const ReservationSuccessPage = () => {
  const location = useLocation();
  const data = location.state || {};

  const movie = data.selectedMovie || {
    title: "F1 더 무비",
    poster: "/images/F1_TheMovie.png",
  };
  const theater = data.selectedRegion
    ? `${data.selectedRegion} / ${data.selectedBranch}`
    : "CGV 플러스 / 6관";
  const date = data.selectedDate
    ? typeof data.selectedDate === "string"
      ? data.selectedDate
      : data.selectedDate.toLocaleDateString()
    : "2025년 6월 29일(일)";
  const time = data.selectedTime || "22:20 ~ 25:05";
  const people = data.guestCount
    ? data.guestCount.adult + data.guestCount.child + data.guestCount.senior
    : 1;
  const seat = data.selectedSeats ? data.selectedSeats.join(", ") : "11번";
  const price = data.totalPrice ? data.totalPrice.toLocaleString() : "15,000";

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
        <div className="payment-title">예매 완료</div>
      </div>
      <div className="payment-container">
        <div className="payment-box">
          <h2 className="payment-done-title">예매가 완료 되었습니다.</h2>
          <div className="payment-info-section">
            <div className="payment-movie-poster">
              <img src={movie.poster} alt={movie.title} />
            </div>
            <div className="payment-info-list">
              <div>
                <span className="payment-label">예매번호</span>{" "}
                <span className="payment-value payment-number">
                  0195-9619-3153-481
                </span>
              </div>
              <div>
                <span className="payment-label">영화명</span>{" "}
                <span className="payment-value">{movie.title}</span>
              </div>
              <div>
                <span className="payment-label">극장</span>{" "}
                <span className="payment-value">{theater}</span>
              </div>
              <div>
                <span className="payment-label">일시</span>{" "}
                <span className="payment-value">
                  {date} {time}
                </span>
              </div>
              <div>
                <span className="payment-label">인원</span>{" "}
                <span className="payment-value">일반 {people}명</span>
              </div>
              <div>
                <span className="payment-label">좌석</span>{" "}
                <span className="payment-value">{seat}</span>
              </div>
              <div>
                <span className="payment-label">결제 금액</span>{" "}
                <span className="payment-value">{price} 원</span>
              </div>
              <div>
                <span className="payment-label">결제 수단</span>{" "}
                <span className="payment-value">신용카드</span>
              </div>
            </div>
          </div>
          <div className="payment-btn-area">
            <button className="payment-confirm-btn">예매확인/취소</button>
          </div>
          <div className="payment-notice">
            <b>예매 유의사항</b>
            <br />
            더 자세한 사항은 상영일 익일 적립됩니다. (왕복관람권, 비회원 예매
            제외)
            <br />
            영화 상영 후 소멸된 포인트와 예매 취소는 환불이 불가할 수 있습니다.
            <br />
            비회원 예매의 경우 안내된 이메일로 발송되지 않을 수 있습니다.
          </div>
        </div>
        <div className="payment-bottom-info">
          <b>알고 계시나요?</b> 현재 진행중인 스페셜 이벤트!{" "}
          <button className="payment-more-btn">+ MORE</button>
        </div>
      </div>
    </div>
  );
};

export default ReservationSuccessPage;
