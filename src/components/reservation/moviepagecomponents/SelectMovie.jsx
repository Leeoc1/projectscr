import React, { useState } from "react";
import Header from "../../../pubcomponent/Header";
import "../../../componentcss/reservationcss/moviepagecomponentcss/SelectMovie.css";

export default function SelectMovie() {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    selectedMovie: null,
    selectedTheater: null,
    selectedDate: null,
    selectedTime: null,
    selectedSeats: [],
    guestCount: { adult: 1, child: 0 },
  });

  const handleMovieSelect = (movie) => {
    setBookingData({ ...bookingData, selectedMovie: movie });
    setCurrentStep(2);
  };

  const handleTheaterSelect = (theater, date, time) => {
    setBookingData({
      ...bookingData,
      selectedTheater: theater,
      selectedDate: date,
      selectedTime: time,
    });
    setCurrentStep(3);
  };

  const handleSeatSelect = (seats, guests) => {
    setBookingData({
      ...bookingData,
      selectedSeats: seats,
      guestCount: guests,
    });
    setCurrentStep(4);
  };

  const renderStep1 = () => (
    <div className="form-section">
      <h3>상영 중인 영화</h3>
      <div className="movies-selection">
        {[
          {
            id: 1,
            title: "아바타: 물의 길",
            genre: "액션/SF",
            rating: "12세 이상 관람가",
            duration: "192분",
          },
          {
            id: 2,
            title: "탑건: 매버릭",
            genre: "액션/드라마",
            rating: "12세 이상 관람가",
            duration: "131분",
          },
          {
            id: 3,
            title: "오펜하이머",
            genre: "드라마/스릴러",
            rating: "12세 이상 관람가",
            duration: "180분",
          },
          {
            id: 4,
            title: "바비",
            genre: "코미디/판타지",
            rating: "전체 관람가",
            duration: "114분",
          },
        ].map((movie) => (
          <div key={movie.id} className="movie-option">
            <img src="/api/placeholder/120/180" alt="영화 포스터" />
            <div className="movie-details">
              <h4>{movie.title}</h4>
              <p>{movie.genre}</p>
              <p>{movie.rating}</p>
              <p>상영시간: {movie.duration}</p>
            </div>
            <button
              className="select-btn reserve-btn"
              onClick={() => handleMovieSelect(movie)}
            >
              예매
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="form-section">
      <h3>극장 및 상영시간 선택</h3>
      <div className="selected-movie">
        <h4>선택한 영화: {bookingData.selectedMovie?.title}</h4>
      </div>
      <div className="theater-selection">
        {[
          { id: 1, name: "CineMax 강남점", location: "서울시 강남구" },
          { id: 2, name: "CineMax 홍대점", location: "서울시 마포구" },
          { id: 3, name: "CineMax 잠실점", location: "서울시 송파구" },
        ].map((theater) => (
          <div key={theater.id} className="theater-option">
            <h4>{theater.name}</h4>
            <p>{theater.location}</p>
            <div className="date-selection">
              {["2024-06-26", "2024-06-27", "2024-06-28"].map((date) => (
                <div key={date} className="date-option">
                  <h5>{date}</h5>
                  <div className="time-slots">
                    {["10:00", "13:30", "17:00", "20:30"].map((time) => (
                      <button
                        key={time}
                        className="time-btn"
                        onClick={() => handleTheaterSelect(theater, date, time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="form-section">
      <h3>좌석 및 인원 선택</h3>
      <div className="booking-summary">
        <p>영화: {bookingData.selectedMovie?.title}</p>
        <p>극장: {bookingData.selectedTheater?.name}</p>
        <p>
          일시: {bookingData.selectedDate} {bookingData.selectedTime}
        </p>
      </div>
      <div className="guest-selection">
        <h4>관람 인원</h4>
        <div className="guest-counter">
          <label>성인</label>
          <div className="counter">
            <button
              onClick={() =>
                setBookingData({
                  ...bookingData,
                  guestCount: {
                    ...bookingData.guestCount,
                    adult: Math.max(0, bookingData.guestCount.adult - 1),
                  },
                })
              }
            >
              -
            </button>
            <span>{bookingData.guestCount.adult}</span>
            <button
              onClick={() =>
                setBookingData({
                  ...bookingData,
                  guestCount: {
                    ...bookingData.guestCount,
                    adult: bookingData.guestCount.adult + 1,
                  },
                })
              }
            >
              +
            </button>
          </div>
        </div>
        <div className="guest-counter">
          <label>어린이</label>
          <div className="counter">
            <button
              onClick={() =>
                setBookingData({
                  ...bookingData,
                  guestCount: {
                    ...bookingData.guestCount,
                    child: Math.max(0, bookingData.guestCount.child - 1),
                  },
                })
              }
            >
              -
            </button>
            <span>{bookingData.guestCount.child}</span>
            <button
              onClick={() =>
                setBookingData({
                  ...bookingData,
                  guestCount: {
                    ...bookingData.guestCount,
                    child: bookingData.guestCount.child + 1,
                  },
                })
              }
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="seat-map">
        <h4>좌석 선택</h4>
        <div className="screen">SCREEN</div>
        <div className="seats-grid">
          {Array.from({ length: 8 }, (_, row) => (
            <div key={row} className="seat-row">
              <span className="row-label">{String.fromCharCode(65 + row)}</span>
              {Array.from({ length: 12 }, (_, seat) => (
                <button
                  key={seat}
                  className={`seat ${
                    bookingData.selectedSeats.includes(
                      `${String.fromCharCode(65 + row)}${seat + 1}`
                    )
                      ? "selected"
                      : "available"
                  }`}
                  onClick={() => {
                    const seatId = `${String.fromCharCode(65 + row)}${
                      seat + 1
                    }`;
                    const newSeats = bookingData.selectedSeats.includes(seatId)
                      ? bookingData.selectedSeats.filter((s) => s !== seatId)
                      : [...bookingData.selectedSeats, seatId];
                    setBookingData({ ...bookingData, selectedSeats: newSeats });
                  }}
                >
                  {seat + 1}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="form-section">
      <h3>결제</h3>
      <div className="payment-summary">
        <h4>예매 정보</h4>
        <div className="summary-item">
          <span>영화:</span>
          <span>{bookingData.selectedMovie?.title}</span>
        </div>
        <div className="summary-item">
          <span>극장:</span>
          <span>{bookingData.selectedTheater?.name}</span>
        </div>
        <div className="summary-item">
          <span>일시:</span>
          <span>
            {bookingData.selectedDate} {bookingData.selectedTime}
          </span>
        </div>
        <div className="summary-item">
          <span>인원:</span>
          <span>
            성인 {bookingData.guestCount.adult}명, 어린이{" "}
            {bookingData.guestCount.child}명
          </span>
        </div>
        <div className="summary-item">
          <span>좌석:</span>
          <span>{bookingData.selectedSeats.join(", ")}</span>
        </div>
        <div className="summary-item total">
          <span>총 금액:</span>
          <span>
            {(
              bookingData.guestCount.adult * 14000 +
              bookingData.guestCount.child * 10000
            ).toLocaleString()}
            원
          </span>
        </div>
      </div>
      <div className="payment-method">
        <h4>결제 방법</h4>
        <div className="payment-options">
          <label>
            <input type="radio" name="payment" defaultChecked /> 신용카드
          </label>
          <label>
            <input type="radio" name="payment" /> 카카오페이
          </label>
          <label>
            <input type="radio" name="payment" /> 네이버페이
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="booking-page">
      <Header isOtherPage={true} isScrolled={true} />
      <div className="booking-content">
        <div className="booking-main">
          <div className="booking-container">
            <div className="booking-steps">
              {[
                { number: 1, title: "영화 선택" },
                { number: 2, title: "극장/시간" },
                { number: 3, title: "좌석/인원" },
                { number: 4, title: "결제" },
              ].map((step) => (
                <div
                  key={step.number}
                  className={`step ${
                    currentStep === step.number ? "active" : ""
                  } ${currentStep > step.number ? "completed" : ""}`}
                >
                  <span className="step-number">{step.number}</span>
                  <span className="step-title">{step.title}</span>
                </div>
              ))}
            </div>

            <div className="booking-form">
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}
            </div>

            <div className="booking-btns">
              {currentStep > 1 && (
                <button
                  className="back-btn booking-btn"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  이전 단계
                </button>
              )}
              {currentStep === 3 && (
                <button
                  className="next-btn booking-btn"
                  onClick={() =>
                    handleSeatSelect(
                      bookingData.selectedSeats,
                      bookingData.guestCount
                    )
                  }
                >
                  다음 단계
                </button>
              )}
              {currentStep === 4 && (
                <button className="payment-btn booking-btn">결제하기</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
