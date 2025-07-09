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

  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(new Date(today).setDate(new Date(today).getDate() - 1)).toISOString().split('T')[0];

  useEffect(() => {
    const fetchReservation = async () => {
      const reservationView = await getReservation();
      
      const todayReservation = reservationView.filter(reservation => 
        reservation.reservationtime.split(' ')[0] === today
      );
      const yesterdayReservation = reservationView.filter(reservation => 
        reservation.reservationtime.split(' ')[0] === yesterday
      );
      
      //매출 계산
      const todayTotalVolume = todayReservation.reduce((sum, item) => sum + (item.amount ?? 0), 0);
      const yesterdayTotalVolume = yesterdayReservation.reduce((sum, item) => sum + (item.amount ?? 0), 0);
      const increaseVolume = ((todayTotalVolume - yesterdayTotalVolume) / yesterdayTotalVolume * 100).toFixed(2);

      //예매 건수 계산
      const todayReservationCount = todayReservation.length;
      const yesterdayReservationCount = yesterdayReservation.length;
      const increaseReservationCount = ((todayReservationCount - yesterdayReservationCount) / yesterdayReservationCount * 100).toFixed(2);

      //평균 객단가 계산
      const averagePrice = todayTotalVolume / todayReservationCount;
      const yesterdayAveragePrice = yesterdayTotalVolume / yesterdayReservationCount;
      const increaseAveragePrice = ((averagePrice - yesterdayAveragePrice) / yesterdayAveragePrice * 100).toFixed(2);

      //직원 수 계산
      const staffCount = await getStaffs();
      const todayStaffCount = staffCount.filter(staff => 
        staff.hiredate
      );
      const yesterdayStaffCount = staffCount.filter(staff => 
        staff.hiredate === today
      );

      //유저 수 계산
      const userCount = await getAllUsers();
      const todayUserCount = userCount.filter(user => 
        user.reg_date
      );
      const yesterdayUserCount = userCount.filter(user => 
        user.reg_date === today
      );
      
      setTotalVolume(todayTotalVolume);
      setIncreaseVolume(increaseVolume);
      setTodayReservationCount(todayReservationCount);
      setIncreaseReservationCount(increaseReservationCount);
      setAveragePrice(averagePrice);
      setIncreaseAveragePrice(increaseAveragePrice);
      setStaffCount(todayStaffCount.length);
     setIncreaseStaffCount(yesterdayStaffCount.length);
     setUserCount(todayUserCount.length);
     setIncreaseUserCount(yesterdayUserCount.length);
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
    increaseUserCount
  };
};
