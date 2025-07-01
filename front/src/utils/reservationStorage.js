// 예매 정보 세션스토리지 관리 유틸
export const getReservationInfo = () =>
  JSON.parse(sessionStorage.getItem("reservationInfo") || "{}");

export const setReservationInfo = (data) =>
  sessionStorage.setItem("reservationInfo", JSON.stringify(data));

export const clearReservationInfo = () =>
  sessionStorage.removeItem("reservationInfo"); 