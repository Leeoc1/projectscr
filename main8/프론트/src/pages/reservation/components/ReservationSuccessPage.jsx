import React, { useEffect, useState } from "react";
import Header from "../../../shared/Header";
import { getReservation } from "../../../api/api";
import "../style/ReservationSuccessPage.css";

const ReservationSuccessPage = () => {
  const [reservationData, setReservationData] = useState(null);

  useEffect(() => {
    const fetchReservationData = async () => {
      const data = await getReservation();
      if (data && data.length > 0) {
        setReservationData(data[data.length - 1]);
      }
    };

    fetchReservationData();
  }, []);

  if (!reservationData) {
    return (
      <div className="reservation-payment-page">
        <Header isOtherPage={true} isScrolled={true} />
        <div className="payment-container">
          <div className="payment-box">
            <h2>예약 정보를 찾을 수 없습니다.</h2>
          </div>
        </div>
      </div>
    );
  }
  const reservationNum = String(reservationData.reservationcd).padStart(12, "0");
  const reservationNumber = reservationNum.match(/.{1,4}/g).join("-");

    // 좌석 개수 계산
  const seatCount = reservationData.seatcd ? reservationData.seatcd.split(',').length : 0;
  //종료 시간 계산
  const endTime = new Date(reservationData.starttime);
  endTime.setMinutes(endTime.getMinutes() + reservationData.runningtime);
  const endTimeString = endTime.toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // 시간 포맷팅 함수
  const formatDateTime = (dateTimeString) => {
    return dateTimeString 
      ? new Date(dateTimeString).toLocaleString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      : "정보 없음";
  };
  
  // 결제 시각과 상영 시작 시간 포맷팅
  const reservationTime = formatDateTime(reservationData.reservationtime);
  const startTime = formatDateTime(reservationData.starttime);

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
              <img src="/images/F1_TheMovie.png" alt="영화 포스터" />
            </div>
            <div className="payment-info-list">
              <div>
                <span className="payment-label">예매번호</span>{" "}
                <span className="payment-value payment-number">
                  {reservationNumber || "정보 없음"}
                </span>
              </div>
              <div>
                <span className="payment-label">영화명</span>{" "}
                <span className="payment-value">{reservationData.movienm || "정보 없음"}</span>
              </div>
              <div>
                <span className="payment-label">지점명</span>{" "}
                <span className="payment-value">{reservationData.cinemanm || "정보 없음"} / {reservationData.screenname}</span>
              </div>
              <div>
                <span className="payment-label">상영 시간</span>{" "}
                <span className="payment-value">{startTime} ~ <br /> 
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {endTimeString}</span>
              </div>
              <div>
                <span className="payment-label">러닝타임</span>{" "}
                <span className="payment-value">{reservationData.runningtime || "정보 없음"}분</span>
              </div>
              <div>
                <span className="payment-label">인원</span>{" "}
                <span className="payment-value">{seatCount}명</span>
              </div>
              <div>
                <span className="payment-label">좌석</span>{" "}
                <span className="payment-value">{reservationData.seatcd || "정보 없음"}</span>
              </div>
              <div>
                <span className="payment-label">결제 시각</span>{" "}
                <span className="payment-value">{reservationTime}</span>
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
