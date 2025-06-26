import React, { useState } from "react";
import Header from "../../../pubcomponent/Header";
import "../../../componentcss/reservationcss/moviepagecomponentcss/SelectMovie.css";

export default function SelectMovie() {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState({
    selectedMovie: null,
    selectedTheater: null,
    selectedDate: null,
    selectedTime: null,
    selectedSeats: [],
    guestCount: { adult: 1, child: 0 },
  });

  const handleMovieSelect = (movie) => {
    setData({ ...data, selectedMovie: movie });
    setCurrentStep(2);
  };

  const handleTheaterSelect = (theater, date, time) => {
    setData({
      ...data,
      selectedTheater: theater,
      selectedDate: date,
      selectedTime: time,
    });
    setCurrentStep(3);
  };

  const handleSeatSelect = (seats, guests) => {
    setData({
      ...data,
      selectedSeats: seats,
      guestCount: guests,
    });
    setCurrentStep(4);
  };

  const renderStep1 = () => (
    <div className="rsms-form-section">
      <h3>상영 중인 영화</h3>
      <div className="rsms-movies-selection">
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
          <div key={movie.id} className="rsms-movie-option">
            <img src="/api/placeholder/120/180" alt="영화 포스터" />
            <div className="rsms-movie-details">
              <h4>{movie.title}</h4>
              <p>{movie.genre}</p>
              <p>{movie.rating}</p>
              <p>상영시간: {movie.duration}</p>
            </div>
            <button
              className="rsms-select-btn rsms-reserve-btn"
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
    <div className="rsms-form-section">
      <h3>극장 및 상영시간 선택</h3>
      <div className="rsms-selected-movie">
        <h4>선택한 영화: {data.selectedMovie?.title}</h4>
      </div>
      <div className="rsms-theater-selection">
        {[
          { id: 1, name: "CineMax 강남점", location: "서울시 강남구" },
          { id: 2, name: "CineMax 홍대점", location: "서울시 마포구" },
          { id: 3, name: "CineMax 잠실점", location: "서울시 송파구" },
        ].map((theater) => (
          <div key={theater.id} className="rsms-theater-option">
            <h4>{theater.name}</h4>
            <p>{theater.location}</p>
            <div className="rsms-date-selection">
              {["2024-06-26", "2024-06-27", "2024-06-28"].map((date) => (
                <div key={date} className="rsms-date-option">
                  <h5>{date}</h5>
                  <div className="rsms-time-slots">
                    {["10:00", "13:30", "17:00", "20:30"].map((time) => (
                      <button
                        key={time}
                        className="rsms-time-btn"
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
    <div className="rsms-form-section">
      <h3>좌석 및 인원 선택</h3>
      <div className="rsms-summary">
        <p>영화: {data.selectedMovie?.title}</p>
        <p>극장: {data.selectedTheater?.name}</p>
        <p>
          일시: {data.selectedDate} {data.selectedTime}
        </p>
      </div>
      <div className="rsms-guest-selection">
        <h4>관람 인원</h4>
        <div className="rsms-guest-counter">
          <label>성인</label>
          <div className="rsms-counter">
            <button
              onClick={() =>
                setData({
                  ...data,
                  guestCount: {
                    ...data.guestCount,
                    adult: Math.max(0, data.guestCount.adult - 1),
                  },
                })
              }
            >
              -
            </button>
            <span>{data.guestCount.adult}</span>
            <button
              onClick={() =>
                setData({
                  ...data,
                  guestCount: {
                    ...data.guestCount,
                    adult: data.guestCount.adult + 1,
                  },
                })
              }
            >
              +
            </button>
          </div>
        </div>
        <div className="rsms-guest-counter">
          <label>어린이</label>
          <div className="rsms-counter">
            <button
              onClick={() =>
                setData({
                  ...data,
                  guestCount: {
                    ...data.guestCount,
                    child: Math.max(0, data.guestCount.child - 1),
                  },
                })
              }
            >
              -
            </button>
            <span>{data.guestCount.child}</span>
            <button
              onClick={() =>
                setData({
                  ...data,
                  guestCount: {
                    ...data.guestCount,
                    child: data.guestCount.child + 1,
                  },
                })
              }
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="rsms-seat-map">
        <h4>좌석 선택</h4>
        <div className="rsms-screen">SCREEN</div>
        <div className="rsms-seats-grid">
          {Array.from({ length: 8 }, (_, row) => (
            <div key={row} className="rsms-seat-row">
              <span className="rsms-row-label">{String.fromCharCode(65 + row)}</span>
              {Array.from({ length: 12 }, (_, seat) => (
                <button
                  key={seat}
                  className={`rsms-seat ${
                    data.selectedSeats.includes(
                      `${String.fromCharCode(65 + row)}${seat + 1}`
                    )
                      ? "rsms-selected"
                      : "rsms-available"
                  }`}
                  onClick={() => {
                    const seatId = `${String.fromCharCode(65 + row)}${
                      seat + 1
                    }`;
                    const newSeats = data.selectedSeats.includes(seatId)
                      ? data.selectedSeats.filter((s) => s !== seatId)
                      : [...data.selectedSeats, seatId];
                    setData({ ...data, selectedSeats: newSeats });
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
    <div className="rsms-form-section">
      <h3>결제</h3>
      <div className="rsms-payment-summary">
        <h4>예매 정보</h4>
        <div className="rsms-summary-item">
          <span>영화:</span>
          <span>{data.selectedMovie?.title}</span>
        </div>
        <div className="rsms-summary-item">
          <span>극장:</span>
          <span>{data.selectedTheater?.name}</span>
        </div>
        <div className="rsms-summary-item">
          <span>일시:</span>
          <span>
            {data.selectedDate} {data.selectedTime}
          </span>
        </div>
        <div className="rsms-summary-item">
          <span>인원:</span>
          <span>
            성인 {data.guestCount.adult}명, 어린이{" "}
            {data.guestCount.child}명
          </span>
        </div>
        <div className="rsms-summary-item">
          <span>좌석:</span>
          <span>{data.selectedSeats.join(", ")}</span>
        </div>
        <div className="rsms-summary-item rsms-total">
          <span>총 금액:</span>
          <span>
            {(
              data.guestCount.adult * 14000 +
              data.guestCount.child * 10000
            ).toLocaleString()}
            원
          </span>
        </div>
      </div>
      <div className="rsms-payment-method">
        <h4>결제 방법</h4>
        <div className="rsms-payment-options">
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
    <div className="rsms-page">
      <Header isOtherPage={true} isScrolled={true} />
      <div className="rsms-content">
        <div className="rsms-main">
          <div className="rsms-container">
            <div className="rsms-steps">
              {[
                { number: 1, title: "영화 선택" },
                { number: 2, title: "극장/시간" },
                { number: 3, title: "좌석/인원" },
                { number: 4, title: "결제" },
              ].map((step) => (
                <div
                  key={step.number}
                  className={`rsms-step ${
                    currentStep === step.number ? "rsms-active" : ""
                  } ${currentStep > step.number ? "rsms-completed" : ""}`}
                >
                  <span className="rsms-step-number">{step.number}</span>
                  <span className="rsms-step-title">{step.title}</span>
                </div>
              ))}
            </div>

            <div className="rsms-form">
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}
            </div>

            <div className="rsms-btns">
              {currentStep > 1 && (
                <button
                  className="rsms-back-btn rsms-btn"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  이전 단계
                </button>
              )}
              {currentStep === 3 && (
                <button
                  className="rsms-next-btn rsms-btn"
                  onClick={() =>
                    handleSeatSelect(
                      data.selectedSeats,
                      data.guestCount
                    )
                  }
                >
                  다음 단계
                </button>
              )}
              {currentStep === 4 && (
                <button className="rsms-payment-btn rsms-btn">결제하기</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}