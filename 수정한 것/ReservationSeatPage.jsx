import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../pubcomponent/Header";
import { 
  getSelectedMovie,
  getSelectedDate,
  getSelectedRegion,
  getSelectedBranch,
  getSelectedTime,
  getGuestCount,
  getSelectedSeats,
  getTotalPrice
} from "../../utils/reservationStorage";
import { validateSeatSelection } from "../../utils/validationUtils";
import "../../pagecss/reservation/ReservationSeatPage.css";

// 가격 정보 (상수로 분리)
const PRICES = { adult: 10000, child: 6000, senior: 5000 };

const ReservationSeatPage = () => {
  const navigate = useNavigate();
  
  // 좌석 선택 상태
  const [seatState, setSeatState] = useState({
    guestCount: { adult: 1, child: 0, senior: 0 },
    selectedSeats: [],
    totalPrice: 10000,
  });

  // 예매 데이터
  const [reservationData, setReservationData] = useState({
    selectedDate: null,
    selectedRegion: null,
    selectedBranch: null,
    selectedTime: null,
    selectedMovie: null,
  });

  // 예매 정보 로드
  useEffect(() => {
    const selectedDate = getSelectedDate();
    const selectedRegion = getSelectedRegion();
    const selectedBranch = getSelectedBranch();
    const selectedTime = getSelectedTime();
    const selectedMovie = getSelectedMovie();
    const guestCount = getGuestCount();
    const selectedSeats = getSelectedSeats();
    const totalPrice = getTotalPrice();

    setReservationData({
      selectedDate,
      selectedRegion,
      selectedBranch,
      selectedTime,
      selectedMovie,
    });

    // 저장된 좌석 정보가 있으면 로드
    if (guestCount) {
      setSeatState(prev => ({
        ...prev,
        guestCount,
        selectedSeats: selectedSeats || [],
        totalPrice: totalPrice || 10000,
      }));
    }
  }, []);

  // 총 인원 수 계산
  const totalGuests = seatState.guestCount.adult + seatState.guestCount.child + seatState.guestCount.senior;

  // 인원 수 변경
  const handleGuestChange = (type, change) => {
    const newCount = Math.max(0, seatState.guestCount[type] + change);
    const newGuestCount = {
      ...seatState.guestCount,
      [type]: newCount,
    };

    const newTotalPrice = 
      newGuestCount.adult * PRICES.adult +
      newGuestCount.child * PRICES.child +
      newGuestCount.senior * PRICES.senior;

    setSeatState(prev => {
      const newState = {
        ...prev,
        guestCount: newGuestCount,
        totalPrice: newTotalPrice,
      };

      // 인원 수가 줄어들면 초과된 좌석 선택 해제
      const newTotalGuests = newGuestCount.adult + newGuestCount.child + newGuestCount.senior;
      if (prev.selectedSeats.length > newTotalGuests) {
        newState.selectedSeats = prev.selectedSeats.slice(0, newTotalGuests);
      }

      return newState;
    });
  };

  // 좌석 선택/해제
  const handleSeatClick = (row, column) => {
    const seatId = `${row}${column}`;

    setSeatState(prev => {
      if (prev.selectedSeats.includes(seatId)) {
        // 이미 선택된 좌석이면 해제
        return {
          ...prev,
          selectedSeats: prev.selectedSeats.filter((seat) => seat !== seatId),
        };
      } else {
        // 새로운 좌석 선택 시 인원 수 체크
        if (prev.selectedSeats.length < totalGuests) {
          return {
            ...prev,
            selectedSeats: [...prev.selectedSeats, seatId],
          };
        } else {
          alert(`최대 ${totalGuests}명까지만 좌석을 선택할 수 있습니다.`);
          return prev;
        }
      }
    });
  };

  // 결제 페이지로 이동 준비
  const prepareForPayment = () => {
    const validation = validateSeatSelection({
      totalGuests,
      selectedSeats: seatState.selectedSeats,
    });

    if (!validation.isValid) {
      alert(validation.error);
      return false;
    }

    return true;
  };

  // 조건부 이동 처리
  if (!reservationData?.selectedDate || !reservationData?.selectedBranch) {
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
                {reservationData?.selectedMovie?.movienm || "영화 미선택"}
              </p>
              <p>
                <strong>날짜:</strong>{" "}
                {reservationData?.selectedDate ? reservationData.selectedDate.toLocaleDateString() : "날짜 미선택"}
              </p>
              <p>
                <strong>극장:</strong> {reservationData?.selectedRegion}{" "}
                {reservationData?.selectedBranch}
              </p>
              <p>
                <strong>상영시간:</strong>{" "}
                {reservationData?.selectedTime || "시간 미선택"}
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
                  ({PRICES.adult.toLocaleString()}원)
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
                  ({PRICES.child.toLocaleString()}원)
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
                  ({PRICES.senior.toLocaleString()}원)
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
                  성인 {seatState.guestCount.adult}명 × {PRICES.adult.toLocaleString()}원
                  = {(seatState.guestCount.adult * PRICES.adult).toLocaleString()}원
                </p>
              )}
              {seatState.guestCount.child > 0 && (
                <p>
                  청소년 {seatState.guestCount.child}명 × {PRICES.child.toLocaleString()}
                  원 = {(seatState.guestCount.child * PRICES.child).toLocaleString()}원
                </p>
              )}
              {seatState.guestCount.senior > 0 && (
                <p>
                  우대 {seatState.guestCount.senior}명 × {PRICES.senior.toLocaleString()}
                  원 = {(seatState.guestCount.senior * PRICES.senior).toLocaleString()}원
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
