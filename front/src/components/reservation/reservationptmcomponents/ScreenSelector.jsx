import React, { useEffect, useState } from "react";
import { getSchedules } from "../../../api/api";

const ScreenSelector = () => {
  const [selectedMovieName, setSelectedMovieName] = useState(
    sessionStorage.getItem("selectedMovieName") || null
  );
  const [movieSchedule, setMovieSchedule] = useState([]);
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    sessionStorage.getItem("selectedFullDate") || "날짜를 선택하세요"
  );

  // 상영 정보 가져오기
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const selectedSchedule = await getSchedules();
        const filteredSchedules = selectedSchedule.filter(
          (schedule) =>
            schedule.movienm === selectedMovieName &&
            schedule.startdate === selectedDate
        );
        // 상영 시간순으로 정렬
        filteredSchedules.sort(
          (a, b) => new Date(a.starttime) - new Date(b.starttime)
        );
        setMovieSchedule(filteredSchedules);
      } catch (error) {
        console.error("상영 정보를 가져오는 중 에러 발생:", error);
        setMovieSchedule([]);
      }
    };

    if (selectedMovieName && selectedDate !== "날짜를 선택하세요") {
      fetchSchedule();
    } else {
      setMovieSchedule([]);
    }
  }, [selectedMovieName, selectedDate]);

  // 세션 스토리지 변경 감지
  useEffect(() => {
    const handleSessionStorageChange = (event) => {
      const newMovieName =
        event.detail.selectedMovieName ||
        sessionStorage.getItem("selectedMovieName");
      const newDate =
        event.detail.selectedFullDate ||
        sessionStorage.getItem("selectedFullDate");
      if (newMovieName !== selectedMovieName || newDate !== selectedDate) {
        setSelectedMovieName(newMovieName);
        setSelectedDate(newDate || "날짜를 선택하세요");
        setSelectedStartTime(null); // 새로운 영화 또는 날짜 선택 시 시간 초기화
      }
    };

    window.addEventListener("sessionStorageChange", handleSessionStorageChange);
    return () =>
      window.removeEventListener(
        "sessionStorageChange",
        handleSessionStorageChange
      );
  }, [selectedMovieName, selectedDate]);

  // 상영 시간 선택
  const handleTimeSelect = (schedule) => {
    setSelectedStartTime(schedule.starttime);
    sessionStorage.setItem(
      "selectedMovieTime",
      JSON.stringify({
        starttime: schedule.starttime,
        reservationseat: schedule.reservationseat,
        allseat: schedule.allseat,
        screenname: schedule.screenname,
        schedulecd: schedule.schedulecd, // 예약 진행을 위해 schedulecd 추가
      })
    );
  };

  const uniqueScreentypes = [
    ...new Set(movieSchedule.map((schedule) => schedule.screentype)),
  ];

  return (
    <div className="rptm-time-list-area">
      <div className="rptm-time-list-content">
        {!selectedMovieName && <div>영화를 먼저 선택하세요.</div>}
        {selectedMovieName && movieSchedule.length === 0 && (
          <div>선택한 날짜에 상영 정보가 없습니다.</div>
        )}
        {uniqueScreentypes.length > 0 && (
          <>
            {uniqueScreentypes.map((screentype) => (
              <div key={screentype}>
                <div className="rptm-screen-type-title">{screentype}</div>
                <div className="rptm-screen-times-grid">
                  {movieSchedule
                    .filter((schedule) => schedule.screentype === screentype)
                    .map((schedule) => (
                      <div
                        className={`rptm-screen-time-card ${
                          selectedStartTime === schedule.starttime
                            ? "rptm-active"
                            : ""
                        }`}
                        onClick={() => handleTimeSelect(schedule)}
                      >
                        <div className="rptm-screen-time-time">
                          {schedule.starttime.split(" ")[1]?.substring(0, 5)}
                        </div>
                        <div className="rptm-screen-time-seats">
                          {schedule.reservationseat}/{schedule.allseat} 석
                        </div>
                        <div className="rptm-screen-time-screen">
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
    </div>
  );
};

export default ScreenSelector;
