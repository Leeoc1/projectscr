import React from "react";
import { cancelReservation } from "../../../api/reservationApi";
import { getUserInfo, getUserReservations } from "../../../api/userApi";



const MyPageReservationDetail = ({
  showModal,
  selectedReservation,
  handleCloseModal,
}) => {
  // 예약 취소 처리 함수
  const handleCancelReservation = async (reservationcd) => {
    if (!window.confirm("정말로 예약을 취소하시겠습니까?")) {
      return;
    }

    try {
      await cancelReservation(reservationcd, "환불 처리");
      alert("예약이 성공적으로 취소되었습니다.");

      // 예약 목록 새로고침
      const userid = localStorage.getItem("userid");
      if (userid) {
        const reservationsResponse = await getUserReservations(userid);
        setUserReservations(reservationsResponse);
      }
    } catch (error) {
      console.error("예약 취소 오류:", error);
      alert("예약 취소 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };
  return (
    <div>
      {showModal && selectedReservation && (
        <div className="mp-modal-overlay">
          <div className="mp-modal-content">
            <button className="mp-modal-close" onClick={handleCloseModal}>
              &times;
            </button>
            <h2 className="mp-modal-title">예매 상세 내역</h2>
            <div className="mp-modal-row">
              <b>영화명:</b> {selectedReservation.movienm}
            </div>
            <div className="mp-modal-row">
              <b>상영관:</b> {selectedReservation.screenname}
            </div>
            <div className="mp-modal-row">
              <b>좌석:</b> {selectedReservation.seatcd}
            </div>
            <div className="mp-modal-row">
              <b>상영일시:</b>{" "}
              {selectedReservation.starttime
                ? `${
                    selectedReservation.starttime.split(" ")[0]
                  } ${selectedReservation.starttime
                    .split(" ")[1]
                    ?.substring(0, 5)}`
                : ""}
            </div>
            <div className="mp-modal-row">
              <b>상영시간:</b> {selectedReservation.runningtime}분
            </div>
            <div className="mp-modal-row">
              <b>극장:</b> {selectedReservation.cinemanm}
            </div>
            <div className="mp-modal-row">
              <b>결제금액:</b>{" "}
              {selectedReservation.amount
                ? `${selectedReservation.amount.toLocaleString()}원`
                : "0원"}
            </div>
            <div className="mp-modal-row">
              <b>상태:</b> {selectedReservation.reservationstatus}
            </div>
          </div>
          <button
            className="mp-btn mp-btn-cancel"
            onClick={() =>
              handleCancelReservation(selectedReservation.reservationcd)
            }
          >
            취소
          </button>
        </div>
      )}
    </div>
  );
};

export default MyPageReservationDetail;
