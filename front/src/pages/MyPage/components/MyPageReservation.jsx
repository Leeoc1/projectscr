import React from 'react'
import "../MyPage.css";

const MyPageReservation = ({loading, userReservations, handleReservationDetails}) => {
  return (
    <div className="mp-reservation-table-container">
              <table className="mp-reservation-table">
                <thead>
                  <tr>
                    <th>영화제목</th>
                    <th>결제일시</th>
                    <th>결제금액</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="3">
                        <div className="mp-loading">
                          예약 정보를 불러오는 중...
                        </div>
                      </td>
                    </tr>
                  ) : userReservations.length > 0 ? (
                    userReservations.map((reservation, index) => (
                      <tr
                        key={reservation.reservationcd || index}
                        className="mp-reservation-row"
                        onClick={() =>
                          handleReservationDetails(reservation.reservationcd)
                        }
                      >
                        <td className="mp-reservation-title">
                          {reservation.movienm || "영화제목"}
                        </td>
                        <td className="mp-reservation-date">
                          {reservation.reservationtime
                            ? `${
                                reservation.reservationtime.split("T")[0]
                              } ${reservation.reservationtime
                                .split("T")[1]
                                ?.substring(0, 5)}`
                            : "2025-01-01"}
                        </td>
                        <td className="mp-reservation-status">
                          {reservation.reservationstatus === "예약완료"
                            ? reservation.amount
                              ? `${reservation.amount.toLocaleString()}원`
                              : "0원"
                            : reservation.reservationstatus}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <div className="mp-no-reservations">
                      <p>예약 내역이 없습니다.</p>
                    </div>
                  )}
                </tbody>
              </table>
            </div>
  )
}

export default MyPageReservation