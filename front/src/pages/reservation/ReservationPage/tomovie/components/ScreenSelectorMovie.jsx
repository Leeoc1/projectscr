import React, { useEffect, useState } from "react";
import { getSchedules } from "../../../../../api/cinemaApi";
import { getReservationSeat } from "../../../../../api/reservationApi";

const ScreenSelectorMovie = () => {
  const [movieSchedule, setMovieSchedule] = useState([]);
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [reservedSeatsCount, setReservedSeatsCount] = useState({});

  // 상영 정보 가져오기
  useEffect(() => {
    const fetchSchedule = async () => {
      const movienm = sessionStorage.getItem("movienm");
      const selectedFullDate = sessionStorage.getItem("selectedFullDate");
      const selectedTheater = sessionStorage.getItem("cinemanm");

      if (!movienm || !selectedFullDate || !selectedTheater) {
        setMovieSchedule([]);
        return;
      }

      const selectedSchedule = await getSchedules();

      const filteredSchedules = selectedSchedule.filter((schedule) => {
        return (
          schedule.movienm === movienm &&
          schedule.startdate === selectedFullDate &&
          schedule.cinemanm === selectedTheater &&
          schedule.screenstatus === "운영중"
        );
      });

      // 상영 시간순으로 정렬
      filteredSchedules.sort(
        (a, b) => new Date(a.starttime) - new Date(b.starttime)
      );
      setMovieSchedule(filteredSchedules);
    };

    fetchSchedule();
  }, []);

  // 세션 스토리지 변경 감지
  useEffect(() => {
    const handleSessionStorageChange = () => {
      const movienm = sessionStorage.getItem("movienm");
      const selectedFullDate = sessionStorage.getItem("selectedFullDate");
      const selectedTheater = sessionStorage.getItem("cinemanm");

      if (movienm && selectedFullDate && selectedTheater) {
        const fetchSchedule = async () => {
          const selectedSchedule = await getSchedules();

          const filteredSchedules = selectedSchedule.filter((schedule) => {
            return (
              schedule.movienm === movienm &&
              schedule.startdate === selectedFullDate &&
              schedule.cinemanm === selectedTheater
            );
          });

          // 상영 시간순으로 정렬
          filteredSchedules.sort(
            (a, b) => new Date(a.starttime) - new Date(b.starttime)
          );
          setMovieSchedule(filteredSchedules);

          // 상영관이 변경되면 선택된 시간 초기화
          setSelectedStartTime(null);
        };

        fetchSchedule();
      }
    };

    // 초기 로드 시에도 실행
    handleSessionStorageChange();

    // storage 이벤트 리스너 추가
    window.addEventListener("storage", handleSessionStorageChange);

    // 커스텀 이벤트 리스너 추가 (다른 컴포넌트에서 발생하는 이벤트)
    window.addEventListener("sessionStorageChange", handleSessionStorageChange);

    return () => {
      window.removeEventListener("storage", handleSessionStorageChange);
      window.removeEventListener(
        "sessionStorageChange",
        handleSessionStorageChange
      );
    };
  }, []);

  // 상영 시간 선택
  const handleTimeSelect = (schedule) => {
    setSelectedStartTime(schedule.starttime);
    const timeData = {
      starttime: schedule.starttime,
      reservationseat: schedule.reservationseat,
      allseat: schedule.allseat,
      movienm: sessionStorage.getItem("movienm"),
      screenname: schedule.screenname,
      schedulecd: schedule.schedulecd, // 예약 진행을 위해 schedulecd 추가
      runningtime: schedule.runningtime, // 상영시간
      cinemanm: sessionStorage.getItem("cinemanm"),
    };
    sessionStorage.setItem("selectedMovieTime", JSON.stringify(timeData));

    // 커스텀 이벤트 발생
    window.dispatchEvent(new CustomEvent("selectedMovieTimeChanged"));
  };

  // 이미 예약된 좌석들 가져오기
  useEffect(() => {
    const fetchReservedSeats = async () => {
      const reservations = await getReservationSeat();
      const reservedCounts = {};

      reservations.forEach((reservation) => {
        const schedulecd = reservation.schedulecd;
        const seatCount = reservation.seatcd
          ? reservation.seatcd.split(",").length
          : 0;

        if (reservedCounts[schedulecd]) {
          reservedCounts[schedulecd] += seatCount;
        } else {
          reservedCounts[schedulecd] = seatCount;
        }
      });

      setReservedSeatsCount(reservedCounts);
    };

    fetchReservedSeats();
  }, [movieSchedule]);

  // screentype 목록을 추출하고 중복 제거
  const uniqueScreentypes = [
    ...new Set(movieSchedule.map((schedule) => schedule.screentype)),
  ];

  return (
    <div className="place-time-list-content">
      {movieSchedule.length === 0 && (
        <div>선택한 조건에 맞는 상영 정보가 없습니다.</div>
      )}
      {uniqueScreentypes.length > 0 && (
        <>
          {uniqueScreentypes.map((screentype) => (
            <div key={screentype}>
              <div className="place-screen-type-title">{screentype}</div>
              <div className="place-screen-times-grid">
                {movieSchedule
                  .filter((schedule) => schedule.screentype === screentype)
                  .map((schedule) => (
                    <div
                      key={schedule.schedulecd}
                      className={`place-screen-time-card ${
                        selectedStartTime === schedule.starttime
                          ? "place-active"
                          : ""
                      }`}
                      onClick={() => handleTimeSelect(schedule)}
                    >
                      <div className="place-screen-time-time">
                        {schedule.starttime.split(" ")[1]?.substring(0, 5)}
                      </div>
                      <div className="place-screen-time-seats">
                        {schedule.allseat}/
                        {reservedSeatsCount[schedule.schedulecd] || 0}
                      </div>
                      <div className="place-screen-time-screen">
                        {schedule.screenname}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ScreenSelectorMovie;
