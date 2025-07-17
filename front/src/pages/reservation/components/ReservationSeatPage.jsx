import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../shared/Header";
import ProgressBar from "./ProgressBar";
import "../style/ReservationSeatPage.css";
import { getReservationSeat } from "../../../api/reservationApi";

const ReservationSeatPage = () => {
  const navigate = useNavigate();

  // 가격
  const PRICES = { adult: 10000, child: 6000, senior: 5000 };

  // 세션 가져오기
  const selectedMovieTime = JSON.parse(
    sessionStorage.getItem("selectedMovieTime")
  );
  const runningtime = selectedMovieTime.runningtime;
  const starttime = selectedMovieTime.starttime.substring(0, 16);
  const movieName = selectedMovieTime.movienm;
  const cinemanm = selectedMovieTime.cinemanm;

  // 전체 좌석
  const allseat = selectedMovieTime.allseat;

  // 인원수 상태
  const [guestCount, setGuestCount] = useState({
    adult: 1,
    child: 0,
    senior: 0,
  });

  // 총 인원수
  const totalGuests = guestCount.adult + guestCount.child + guestCount.senior;

  // 선택된 좌석들 (배열로 관리)
  const [selectedSeats, setSelectedSeats] = useState([]);
  // 이미 예약된 좌석들 (배열로 관리)
  const [reservedSeats, setReservedSeats] = useState([]);

  // 인원수가 변경될 때 선택된 좌석 초기화
  useEffect(() => {
    setSelectedSeats([]);
  }, [totalGuests]);

  // 이미 예약된 좌석들 가져오기
  useEffect(() => {
    const fetchReservedSeats = async () => {
      try {
        const reservations = await getReservationSeat();
        // 현재 스케줄과 같은 예약들만 필터링
        const currentScheduleReservations = reservations.filter(
          (reservation) =>
            reservation.schedulecd === selectedMovieTime.schedulecd
        );
        // 예약된 좌석들을 배열로 변환
        const reservedSeatsArray = currentScheduleReservations.flatMap(
          (reservation) =>
            reservation.seatcd ? reservation.seatcd.split(",") : []
        );
        setReservedSeats(reservedSeatsArray);
      } catch (error) {
        console.error("예약된 좌석 정보를 가져오는 중 오류:", error);
        setReservedSeats([]);
      }
    };

    fetchReservedSeats();
  }, [selectedMovieTime.schedulecd]);

  // 총 가격
  const totalPrice =
    guestCount.adult * PRICES.adult +
    guestCount.child * PRICES.child +
    guestCount.senior * PRICES.senior;

  // 조건부 이동 처리
  if (!sessionStorage.getItem("selectedMovieTime")) {
    navigate("/reservation/place");
    return null;
  }

  // // 좌석 데이터 (8행 12열)
  // const seatRows = Array.from({ length: 8 }, (_, i) =>
  //   String.fromCharCode(65 + i)
  // );
  // const seatColumns = Array.from({ length: 12 }, (_, i) => i + 1);

  // 좌석 데이터 (12열 고정)
  // totalRows 총 행 수 (나머지 있을 시 반올림)
  // seatRows 행 이름
  const totalRows = Math.ceil(allseat / 12);
  const seatRows = Array.from({ length: totalRows }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  // 인원 변경 함수
  const handleGuestChange = (type, diff) => {
    setGuestCount((prev) => {
      const next = { ...prev, [type]: Math.max(0, prev[type] + diff) };
      return next;
    });
  };

  // 결제 페이지로 이동
  const handleGoToPayment = () => {
    // finalReservationInfo 저장
    sessionStorage.setItem(
      "finalReservationInfo",
      JSON.stringify({
        // selectedMovieTime의 모든 정보
        ...selectedMovieTime,
        // 인원수 정보
        guestCount: guestCount,
        totalGuests: totalGuests,
        // 선택된 좌석 정보
        selectedSeats: selectedSeats,
        // 가격 정보
        totalPrice: totalPrice,
      })
    );

    navigate("/reservation/payment");
  };

  // 좌석 선택 함수
  const handleSeatClick = (seatId) => {
    // 이미 예약된 좌석인지 확인
    if (reservedSeats.includes(seatId)) {
      alert("이미 예약된 좌석입니다.");
      return;
    }

    setSelectedSeats((prev) => {
      // prev == selectedSeats 배열

      // 이미 선택한 좌석인지 확인
      const isSelected = prev.includes(seatId);

      if (isSelected) {
        // 이미 선택된 좌석이면 제거
        return prev.filter((id) => id !== seatId);
      } else {
        // 인원수보다 많이 선택하려고 하면 막기
        if (prev.length >= totalGuests) {
          alert(`최대 ${totalGuests}개의 좌석만 선택할 수 있습니다.`);
          return prev;
        }

        // 좌석 추가
        return [...prev, seatId];
      }
    });
  };

  return (
    <div className="reservation-seat-page">
      <Header isOtherPage={true} isScrolled={true} />
      <div className="reservation-seat-content">
        <div className="reservation-seat-container">
          {/* 진행바 */}
          <ProgressBar currentStep={1} />

          <h1 className="page-title">인원 및 좌석 선택</h1>

          {/* 예매 정보 요약 */}
          <div className="reservation-summary">
            <h2>예매 정보</h2>
            <div className="summary-info">
              <p>
                <strong>영화:</strong> {movieName || "영화 미선택"}
              </p>
              <p>
                <strong>날짜:</strong> {starttime || "날짜 미선택"}
              </p>
              <p>
                <strong>극장:</strong> {cinemanm}
              </p>
              <p>
                <strong>상영시간:</strong> {runningtime} 분
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
                  ({PRICES.adult.toLocaleString()}원)
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
                  ({PRICES.child.toLocaleString()}원)
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
                  ({PRICES.senior.toLocaleString()}원)
                </span>
              </div>
            </div>
            {/* <div className="total-guests">
              <strong>총 인원: {totalGuests}명</strong>
            </div> */}
          </div>

          {/* 좌석 선택 */}
          <div className="seat-selection">
            <h2>
              좌석 선택 ({selectedSeats.length}/{totalGuests})
            </h2>
            <div className="screen">SCREEN</div>
            <div className="seat-map">
              {seatRows.map((row, rowIndex) => (
                <div key={row} className="seat-row">
                  <span className="row-label">{row}</span>
                  {/* 마지막 행이고 나머지가 있으면 나머지만큼의 좌석, 마지막행이 아니거나 나머지가 0이면 12개의 좌석 */}
                  {Array.from(
                    {
                      length:
                        rowIndex === totalRows - 1 && allseat % 12 !== 0
                          ? allseat % 12
                          : 12,
                    },
                    (_, i) => {
                      const column = i + 1;
                      const seatId = `${row}${column}`;
                      const isSelected = selectedSeats.includes(seatId);
                      const isReserved = reservedSeats.includes(seatId);
                      return (
                        <button
                          key={column}
                          className={`seat ${isSelected ? "selected" : ""} ${
                            isReserved ? "reserved" : ""
                          }`}
                          onClick={() => handleSeatClick(seatId)}
                          disabled={isReserved}
                        >
                          {column}
                        </button>
                      );
                    }
                  )}
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
                  성인 {guestCount.adult}명 × {PRICES.adult.toLocaleString()}원
                  = {(guestCount.adult * PRICES.adult).toLocaleString()}원
                </p>
              )}
              {guestCount.child > 0 && (
                <p>
                  청소년 {guestCount.child}명 × {PRICES.child.toLocaleString()}
                  원 = {(guestCount.child * PRICES.child).toLocaleString()}원
                </p>
              )}
              {guestCount.senior > 0 && (
                <p>
                  우대 {guestCount.senior}명 × {PRICES.senior.toLocaleString()}
                  원 = {(guestCount.senior * PRICES.senior).toLocaleString()}원
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
