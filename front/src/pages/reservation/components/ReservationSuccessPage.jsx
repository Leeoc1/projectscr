import React, { useEffect, useState } from "react";
import Header from "../../../shared/Header";
import { getReservation } from "../../../api/api";
import "../style/ReservationSuccessPage.css";

const ReservationSuccessPage = () => {
  const [reservationData, setReservationData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservationData = async () => {
      try {
        setLoading(true);
        const data = await getReservation();

        if (data && data.length > 0) {
          setReservationData(data[data.length - 1]);
        } else {
          // API에서 데이터를 가져올 수 없으면 sessionStorage에서 확인
          const savedReservationInfo = sessionStorage.getItem(
            "finalReservationInfo"
          );
          if (savedReservationInfo) {
            const reservationInfo = JSON.parse(savedReservationInfo);
            // 임시 데이터 구조 생성
            const tempData = {
              reservationcd: "임시예약번호",
              seatcd: reservationInfo.selectedSeats || "",
              reservationtime: new Date().toISOString(),
              starttime: reservationInfo.starttime || new Date().toISOString(),
              movienm: reservationInfo.movienm || "영화 정보 없음",
              runningtime: reservationInfo.runningtime || 0,
              screenname: reservationInfo.screenname || "상영관 정보 없음",
              cinemanm: reservationInfo.cinemanm || "극장 정보 없음",
            };
            setReservationData(tempData);
          }
        }
      } catch (error) {
        console.error("예약 정보 조회 중 오류:", error);
        // 에러 발생 시에도 sessionStorage에서 확인
        const savedReservationInfo = sessionStorage.getItem(
          "finalReservationInfo"
        );
        if (savedReservationInfo) {
          const reservationInfo = JSON.parse(savedReservationInfo);
          const tempData = {
            reservationcd: "임시예약번호",
            seatcd: reservationInfo.selectedSeats || "",
            reservationtime: new Date().toISOString(),
            starttime: reservationInfo.starttime || new Date().toISOString(),
            movienm: reservationInfo.movienm || "영화 정보 없음",
            runningtime: reservationInfo.runningtime || 0,
            screenname: reservationInfo.screenname || "상영관 정보 없음",
            cinemanm: reservationInfo.cinemanm || "극장 정보 없음",
          };
          setReservationData(tempData);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReservationData();
  }, []);

  if (loading) {
    return (
      <div className="reservation-payment-page">
        <Header isOtherPage={true} isScrolled={true} />
        <div className="payment-container">
          <div className="payment-box">
            <h2>예약 정보를 불러오는 중...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (!reservationData) {
    return (
      <div className="reservation-payment-page">
        <Header isOtherPage={true} isScrolled={true} />
        <div className="payment-container">
          <div className="payment-box">
            <h2>예약 정보를 찾을 수 없습니다.</h2>
            <p>
              예약이 정상적으로 완료되지 않았거나, 잠시 후 다시 시도해주세요.
            </p>
          </div>
        </div>
      </div>
    );
  }
  const reservationNum = String(reservationData.reservationcd).padStart(
    12,
    "0"
  );
  const reservationNumber = reservationNum.match(/.{1,4}/g).join("-");

  // 좌석 개수 계산
  const seatCount = (() => {
    if (!reservationData.seatcd) return 0;

    // seatcd가 배열인 경우
    if (Array.isArray(reservationData.seatcd)) {
      return reservationData.seatcd.length;
    }

    // seatcd가 문자열인 경우
    if (typeof reservationData.seatcd === "string") {
      return reservationData.seatcd.split(",").length;
    }

    // 기타 경우
    return 0;
  })();
  //종료 시간 계산
  const endTime = new Date(reservationData.starttime);
  endTime.setMinutes(endTime.getMinutes() + reservationData.runningtime);
  const endTimeString = endTime.toLocaleString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // 시간 포맷팅 함수
  const formatDateTime = (dateTimeString) => {
    return dateTimeString
      ? new Date(dateTimeString).toLocaleString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "정보 없음";
  };

  // 결제 시각과 상영 시작 시간 포맷팅
  const reservationTime = formatDateTime(reservationData.reservationtime);
  const startTime = formatDateTime(reservationData.starttime);

  // 상영시간 한 줄로 포맷팅
  const start = new Date(reservationData.starttime);
  const end = new Date(
    start.getTime() + (reservationData.runningtime || 0) * 60000
  );
  const formatTime = (date) =>
    date
      .toLocaleString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .replace(/(\d{4})\. (\d{1,2})\. (\d{1,2})\./, "$1년 $2월 $3일");
  const formatHourMinute = (date) =>
    date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  const showTime = `${formatTime(start)} ~ ${formatHourMinute(end)}`;

  return (
    <div className="reservation-payment-page">
      <Header isOtherPage={true} isScrolled={true} />
      {/* 진행바 삭제됨 */}
      <div className="payment-header">
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
                <span className="payment-value">
                  {reservationData.movienm || "정보 없음"}
                </span>
              </div>
              <div>
                <span className="payment-label">상영관</span>{" "}
                <span className="payment-value">
                  {reservationData.cinemanm || "정보 없음"} /{" "}
                  {reservationData.screenname}
                </span>
              </div>
              <div>
                <span className="payment-label">상영 시간</span>{" "}
                <span className="payment-value">{showTime}</span>
              </div>
              <div>
                <span className="payment-label">인원</span>{" "}
                <span className="payment-value">{seatCount}명</span>
              </div>
              <div>
                <span className="payment-label">좌석</span>{" "}
                <span className="payment-value">
                  {(() => {
                    if (!reservationData.seatcd) return "정보 없음";

                    // seatcd가 배열인 경우
                    if (Array.isArray(reservationData.seatcd)) {
                      return reservationData.seatcd.join(", ");
                    }

                    // seatcd가 문자열인 경우
                    if (typeof reservationData.seatcd === "string") {
                      return reservationData.seatcd;
                    }

                    // 기타 경우
                    return "정보 없음";
                  })()}
                </span>
              </div>
              <div>
                <span className="payment-label">결제수단</span>{" "}
                <span className="payment-value">
                  {reservationData.paymentmethod || "정보 없음"}
                </span>
              </div>
              <div>
                <span className="payment-label">결제금액</span>{" "}
                <span className="payment-value">
                  {reservationData.amount
                    ? `${reservationData.amount.toLocaleString()}원`
                    : "정보 없음"}
                </span>
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
