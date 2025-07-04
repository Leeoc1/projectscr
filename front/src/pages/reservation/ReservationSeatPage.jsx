import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../pubcomponent/Header";
import "../../pagecss/reservation/ReservationSeatPage.css";

const ReservationSeatPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const reservationData = location.state || {};

  const [guestCount, setGuestCount] = useState({
    adult: 1,
    child: 0,
    senior: 0,
  });
  const [selectedSeats, setSelectedSeats] = useState([]);

//   // 예매 정보 로드
//   useEffect(() => {
//     const selectedDate = getSelectedDate();
//     const selectedRegion = getSelectedRegion();
//     const selectedBranch = getSelectedBranch();
//     const selectedTime = getSelectedTime();
//     const selectedMovie = getSelectedMovie();
//     const guestCount = getGuestCount();
//     const selectedSeats = getSelectedSeats();
//     const totalPrice = getTotalPrice();

  // 가격 정보
  const prices = { adult: 10000, child: 6000, senior: 5000 };
  const totalGuests = guestCount.adult + guestCount.child + guestCount.senior;
  const totalPrice =
    guestCount.adult * prices.adult +
    guestCount.child * prices.child +
    guestCount.senior * prices.senior;

  // 인원 수 변경
  const handleGuestChange = (type, change) => {
    const newCount = Math.max(0, guestCount[type] + change);
    const newGuestCount = {
      ...guestCount,
      [type]: newCount,
    };

    setGuestCount(newGuestCount);

    // 인원 수가 줄어들면 초과된 좌석 선택 해제
    const newTotalGuests =
      newGuestCount.adult + newGuestCount.child + newGuestCount.senior;
    if (selectedSeats.length > newTotalGuests) {
      setSelectedSeats((prev) => prev.slice(0, newTotalGuests));
    }
  };

  // 좌석 선택/해제
  const handleSeatClick = (row, column) => {
    const seatId = `${row}${column}`;

    if (selectedSeats.includes(seatId)) {
      // 이미 선택된 좌석이면 해제
      setSelectedSeats((prev) => prev.filter((seat) => seat !== seatId));
    } else {
      // 새로운 좌석 선택 시 인원 수 체크
      if (selectedSeats.length < totalGuests) {
        setSelectedSeats((prev) => [...prev, seatId]);
      } else {
        alert(`최대 ${totalGuests}명까지만 좌석을 선택할 수 있습니다.`);
      }
    }
  };

  // 결제 페이지로 이동
  const handleGoToPayment = () => {
    if (totalGuests === 0) {
      alert("인원을 선택해주세요.");
      return;
    }

    if (selectedSeats.length === 0) {
      alert("좌석을 선택해주세요.");
      return;
    }

    if (selectedSeats.length !== totalGuests) {
      alert(`인원 수(${totalGuests}명)만큼 좌석을 선택해주세요.`);
      return;
    }

    navigate("/reservation/payment", {
      state: {
        ...reservationData,
        guestCount,
        selectedSeats,
        totalPrice,
      },
    });
  };


          {/* 예매 정보 요약 */}
          <div className="reservation-summary">
            <h2>예매 정보</h2>
            <div className="summary-info">
              <p>
                <strong>영화:</strong>{" "}
                {reservationData.selectedMovie?.title || "F1 더 무비"}
              </p>
              <p>
                <strong>날짜:</strong>{" "}
                {reservationData.selectedDate?.toLocaleDateString() ||
                  "날짜 미선택"}
              </p>
              <p>
                <strong>극장:</strong> {reservationData.selectedRegion}{" "}
                {reservationData.selectedBranch}
              </p>
              <p>
                <strong>상영시간:</strong>{" "}
                {reservationData.selectedTime || "시간 미선택"}
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
                  <span>{guestCount.adult}</span>
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
                  <span>{guestCount.child}</span>
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
                  <span>{guestCount.senior}</span>
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
              좌석 선택 ({selectedSeats.length}/{totalGuests})
            </h2>
            <div className="screen">SCREEN</div>
            <div className="seat-map">
              {seatRows.map((row) => (
                <div key={row} className="seat-row">
                  <span className="row-label">{row}</span>
                  {seatColumns.map((column) => {
                    const seatId = `${row}${column}`;
                    const isSelected = selectedSeats.includes(seatId);
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
            <h3>선택된 좌석: {selectedSeats.join(", ") || "없음"}</h3>
            <p>
              선택된 좌석: {selectedSeats.length}개 / 총 인원: {totalGuests}명
            </p>
          </div>

          {/* 가격 정보 */}
          <div className="price-summary">
            <h3>가격 정보</h3>
            <div className="price-details">
              {guestCount.adult > 0 && (
                <p>
                  성인 {guestCount.adult}명 × {prices.adult.toLocaleString()}원
                  = {(guestCount.adult * prices.adult).toLocaleString()}원
                </p>
              )}
              {guestCount.child > 0 && (
                <p>
                  청소년 {guestCount.child}명 × {prices.child.toLocaleString()}
                  원 = {(guestCount.child * prices.child).toLocaleString()}원
                </p>
              )}
              {guestCount.senior > 0 && (
                <p>
                  우대 {guestCount.senior}명 × {prices.senior.toLocaleString()}
                  원 = {(guestCount.senior * prices.senior).toLocaleString()}원
                </p>
              )}
              <div className="total-price">
                <strong>총 결제 금액: {totalPrice.toLocaleString()}원</strong>
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
                totalGuests === 0 || selectedSeats.length !== totalGuests
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
