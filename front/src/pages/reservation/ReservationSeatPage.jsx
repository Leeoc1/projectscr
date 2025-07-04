import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../pubcomponent/Header";
import { useSeatSelection } from "../../hooks/useSeatSelection";
import "../../pagecss/reservation/ReservationSeatPage.css";

const ReservationSeatPage = () => {
  const navigate = useNavigate();
  
  // 커스텀 훅 사용
  const {
    seatState,
    reservationInfo,
    prices,
    totalGuests,
    handleGuestChange,
    handleSeatClick,
    prepareForPayment,
  } = useSeatSelection();

  // 조건부 이동 처리
  if (!sessionStorage.getItem("selectedMovieTime")) {
    navigate("/reservation/place");
    return null;
  }

  // 좌석 데이터 (8행 12열)
  const seatRows = Array.from({ length: 8 }, (_, i) =>
    String.fromCharCode(65 + i)
  );
  const seatColumns = Array.from({ length: 12 }, (_, i) => i + 1);

  // 결제 페이지로 이동
  const handleGoToPayment = () => {
    if (prepareForPayment()) {
      navigate("/reservation/payment");
    }
  };



  return (
    <div className="reservation-seat-page">
      <Header isOtherPage={true} isScrolled={true} />
      <div className="reservation-seat-content">
        <div className="reservation-seat-container">
          {/* 진행바 */}
          <div className="progress-bar">
            <div className="progress-steps">
              {["날짜/극장", "인원/좌석", "결제"].map((step, idx) => (
                <div
                  key={step}
                  className={`progress-step${
                    idx === 1 ? " active" : idx < 1 ? " completed" : ""
                  }`}
                >
                  <span className="step-number">{idx + 1}</span>
                  <span className="step-title">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <h1 className="page-title">인원 및 좌석 선택</h1>

          {/* 예매 정보 요약 */}
          <div className="reservation-summary">
            <h2>예매 정보</h2>
            <div className="summary-info">
              <p>
                <strong>영화:</strong>{" "}
                {reservationInfo?.selectedMovie?.title || "영화 미선택"}
              </p>
              <p>
                <strong>날짜:</strong>{" "}
                {reservationInfo?.selectedDate ? reservationInfo.selectedDate.toLocaleDateString() : "날짜 미선택"}
              </p>
              <p>
                <strong>극장:</strong> {reservationInfo?.selectedRegion}{" "}
                {reservationInfo?.selectedBranch}
              </p>
              <p>
                <strong>상영시간:</strong>{" "}
                {reservationInfo?.selectedTime || "시간 미선택"}
              </p>
            </div>
          </div>

          {/* 인원 선택 */}
          <div className="guest-selection">
            <h2>관람 인원</h2>
            <div className="guest-counters">
              <div className="guest-counter">
                <label>성인</label>
                <div className="counter-controls">
                  <button onClick={() => handleGuestChange("adult", -1)}>
                    -
                  </button>
                  <span>{seatState.guestCount.adult}</span>
                  <button onClick={() => handleGuestChange("adult", 1)}>
                    +
                  </button>
                </div>
                <span className="price-info">
                  ({prices.adult.toLocaleString()}원)
                </span>
              </div>
              <div className="guest-counter">
                <label>청소년</label>
                <div className="counter-controls">
                  <button onClick={() => handleGuestChange("child", -1)}>
                    -
                  </button>
                  <span>{seatState.guestCount.child}</span>
                  <button onClick={() => handleGuestChange("child", 1)}>
                    +
                  </button>
                </div>
                <span className="price-info">
                  ({prices.child.toLocaleString()}원)
                </span>
              </div>
              <div className="guest-counter">
                <label>우대</label>
                <div className="counter-controls">
                  <button onClick={() => handleGuestChange("senior", -1)}>
                    -
                  </button>
                  <span>{seatState.guestCount.senior}</span>
                  <button onClick={() => handleGuestChange("senior", 1)}>
                    +
                  </button>
                </div>
                <span className="price-info">
                  ({prices.senior.toLocaleString()}원)
                </span>
              </div>
            </div>
            <div className="total-guests">
              <strong>총 인원: {totalGuests}명</strong>
            </div>
          </div>

          {/* 좌석 선택 */}
          <div className="seat-selection">
            <h2>
              좌석 선택 ({seatState.selectedSeats.length}/{totalGuests})
            </h2>
            <div className="screen">SCREEN</div>
            <div className="seat-map">
              {seatRows.map((row) => (
                <div key={row} className="seat-row">
                  <span className="row-label">{row}</span>
                  {seatColumns.map((column) => {
                    const seatId = `${row}${column}`;
                    const isSelected = seatState.selectedSeats.includes(seatId);
                    return (
                      <button
                        key={column}
                        className={`seat ${isSelected ? "selected" : ""}`}
                        onClick={() => handleSeatClick(row, column)}
                      >
                        {column}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* 선택된 좌석 정보 */}
          <div className="selected-seats-info">
            <h3>선택된 좌석: {seatState.selectedSeats.join(", ") || "없음"}</h3>
            <p>
              선택된 좌석: {seatState.selectedSeats.length}개 / 총 인원: {totalGuests}명
            </p>
          </div>

          {/* 가격 정보 */}
          <div className="price-summary">
            <h3>가격 정보</h3>
            <div className="price-details">
              {seatState.guestCount.adult > 0 && (
                <p>
                  성인 {seatState.guestCount.adult}명 × {prices.adult.toLocaleString()}원
                  = {(seatState.guestCount.adult * prices.adult).toLocaleString()}원
                </p>
              )}
              {seatState.guestCount.child > 0 && (
                <p>
                  청소년 {seatState.guestCount.child}명 × {prices.child.toLocaleString()}
                  원 = {(seatState.guestCount.child * prices.child).toLocaleString()}원
                </p>
              )}
              {seatState.guestCount.senior > 0 && (
                <p>
                  우대 {seatState.guestCount.senior}명 × {prices.senior.toLocaleString()}
                  원 = {(seatState.guestCount.senior * prices.senior).toLocaleString()}원
                </p>
              )}
              <div className="total-price">
                <strong>총 결제 금액: {seatState.totalPrice.toLocaleString()}원</strong>
              </div>
            </div>
          </div>

          {/* 하단 버튼 */}
          <div className="seat-page-buttons">
            <button className="back-btn" onClick={() => navigate(-1)}>
              이전
            </button>
            <button
              className="payment-btn"
              onClick={handleGoToPayment}
              disabled={
                totalGuests === 0 || seatState.selectedSeats.length !== totalGuests
              }
            >
              결제하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationSeatPage;
