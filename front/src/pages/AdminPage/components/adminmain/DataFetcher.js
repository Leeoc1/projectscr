import { useState, useEffect } from "react";
import { getReservation } from "../../../../api/api";
import { getStaffs } from "../../../../api/api";
import { getAllUsers } from "../../../../api/api";

export const useSalesData = () => {
  const [totalVolume, setTotalVolume] = useState(0);
  const [increaseVolume, setIncreaseVolume] = useState(0);
  const [todayReservationCount, setTodayReservationCount] = useState(0);
  const [increaseReservationCount, setIncreaseReservationCount] = useState(0);
  const [averagePrice, setAveragePrice] = useState(0);
  const [increaseAveragePrice, setIncreaseAveragePrice] = useState(0);
  const [staffCount, setStaffCount] = useState(0);
  const [increaseStaffCount, setIncreaseStaffCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [increaseUserCount, setIncreaseUserCount] = useState(0);

  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(
    new Date(today).setDate(new Date(today).getDate() - 1)
  )
    .toISOString()
    .split("T")[0];

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const reservationView = await getReservation();
        console.log("예약 데이터:", reservationView); // 디버깅용

        // 날짜 비교 로직 수정 - reservationtime이 LocalDateTime 형태이므로 날짜 부분만 추출
        const todayReservation = reservationView.filter((reservation) => {
          if (!reservation.reservationtime) return false;
          const reservationDate = reservation.reservationtime.split("T")[0];
          return reservationDate === today;
        });

        const yesterdayReservation = reservationView.filter((reservation) => {
          if (!reservation.reservationtime) return false;
          const reservationDate = reservation.reservationtime.split("T")[0];
          return reservationDate === yesterday;
        });

        console.log("오늘 예약:", todayReservation); // 디버깅용
        console.log("어제 예약:", yesterdayReservation); // 디버깅용

        //매출 계산
        const todayTotalVolume = todayReservation.reduce(
          (sum, item) => sum + (item.amount ?? 0),
          0
        );
        const yesterdayTotalVolume = yesterdayReservation.reduce(
          (sum, item) => sum + (item.amount ?? 0),
          0
        );

        // 0으로 나누기 방지
        const increaseVolume =
          yesterdayTotalVolume > 0
            ? (
                ((todayTotalVolume - yesterdayTotalVolume) /
                  yesterdayTotalVolume) *
                100
              ).toFixed(2)
            : todayTotalVolume > 0
            ? "100.00"
            : "0.00";

        //예매 건수 계산
        const todayReservationCount = todayReservation.length;
        const yesterdayReservationCount = yesterdayReservation.length;
        const increaseReservationCount =
          yesterdayReservationCount > 0
            ? (
                ((todayReservationCount - yesterdayReservationCount) /
                  yesterdayReservationCount) *
                100
              ).toFixed(2)
            : todayReservationCount > 0
            ? "100.00"
            : "0.00";

        //평균 객단가 계산
        const averagePrice =
          todayReservationCount > 0
            ? todayTotalVolume / todayReservationCount
            : 0;
        const yesterdayAveragePrice =
          yesterdayReservationCount > 0
            ? yesterdayTotalVolume / yesterdayReservationCount
            : 0;
        const increaseAveragePrice =
          yesterdayAveragePrice > 0
            ? (
                ((averagePrice - yesterdayAveragePrice) /
                  yesterdayAveragePrice) *
                100
              ).toFixed(2)
            : averagePrice > 0
            ? "100.00"
            : "0.00";

        //직원 수 계산 - 전체 직원 수
        const staffCount = await getStaffs();
        const todayStaffCount = staffCount.length; // 전체 직원 수
        const yesterdayStaffCount = staffCount.length; // 임시로 같은 값 사용

        //유저 수 계산 - 전체 사용자 수
        const userCount = await getAllUsers();
        const todayUserCount = userCount.length; // 전체 사용자 수
        const yesterdayUserCount = userCount.length; // 임시로 같은 값 사용

        console.log("오늘 매출:", todayTotalVolume); // 디버깅용
        console.log("어제 매출:", yesterdayTotalVolume); // 디버깅용

        setTotalVolume(todayTotalVolume);
        setIncreaseVolume(increaseVolume);
        setTodayReservationCount(todayReservationCount);
        setIncreaseReservationCount(increaseReservationCount);
        setAveragePrice(averagePrice);
        setIncreaseAveragePrice(increaseAveragePrice);
        setStaffCount(todayStaffCount);
        setIncreaseStaffCount(yesterdayStaffCount);
        setUserCount(todayUserCount);
        setIncreaseUserCount(yesterdayUserCount);
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
      }
    };

    fetchReservation();
  }, [today]);

  return {
    totalVolume,
    increaseVolume,
    todayReservationCount,
    increaseReservationCount,
    averagePrice,
    increaseAveragePrice,
    staffCount,
    increaseStaffCount,
    userCount,
    increaseUserCount,
  };
};
