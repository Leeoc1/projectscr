import React, { useEffect, useState } from "react";
import { getSchedules } from "../../../api/api";

const ScreenSelector = () => {
  // schedulecd로만 선택 상태 관리
  const [selectedScheduleCd, setSelectedScheduleCd] = useState(() => {
    const savedTime = sessionStorage.getItem("selectedMovieTime");
    if (savedTime) {
      try {
        const timeData = JSON.parse(savedTime);
        return timeData.schedulecd;
      } catch (error) {
        return null;
      }
    }
    return null;
  });
  const [selectedMovieName, setSelectedMovieName] = useState(() => {
    const savedMovie = sessionStorage.getItem("selectedMovieName");
    return savedMovie && savedMovie.trim() !== "" ? savedMovie : null;
  });
  const [movieSchedule, setMovieSchedule] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    sessionStorage.getItem("selectedFullDate") || "날짜를 선택하세요"
  );

  // 상영 정보 가져오기
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const selectedSchedule = await getSchedules();

        const filteredSchedules = selectedSchedule.filter((schedule) => {
          return (
            schedule.movienm === selectedMovieName &&
            schedule.startdate === selectedDate
          );
        });

        // 상영 시간순으로 정렬
        filteredSchedules.sort(
          (a, b) => new Date(a.starttime) - new Date(b.starttime)
        );
        setMovieSchedule(filteredSchedules);

        // 현재 선택된 schedulecd가 새로운 스케줄에 있는지 확인
        if (selectedScheduleCd && filteredSchedules.length > 0) {
          const exists = filteredSchedules.some(
            (schedule) => schedule.schedulecd === selectedScheduleCd
          );
          if (!exists) {
            setSelectedScheduleCd(null);
            sessionStorage.removeItem("selectedMovieTime");
          }
        }
      } catch (error) {
        setMovieSchedule([]);
      }
    };

    if (
      selectedMovieName &&
      selectedMovieName.trim() !== "" &&
      selectedDate &&
      selectedDate !== "날짜를 선택하세요"
    ) {
      fetchSchedule();
    } else {
      setMovieSchedule([]);
    }
  }, [selectedMovieName, selectedDate, selectedScheduleCd]);

  // 세션 스토리지 변경 감지
  useEffect(() => {
    const handleSessionStorageChange = (event) => {
      const newMovieName =
        event.detail.selectedMovieName !== undefined
          ? event.detail.selectedMovieName
          : sessionStorage.getItem("selectedMovieName");
      const newDate =
        event.detail.selectedFullDate ||
        sessionStorage.getItem("selectedFullDate");
      const validMovieName =
        newMovieName && newMovieName.trim() !== "" ? newMovieName : null;

      // 날짜가 변경되었거나 영화가 초기화된 경우
      if (newDate !== selectedDate || event.detail.selectedMovieName === null) {
        setSelectedMovieName(validMovieName);
        setSelectedDate(newDate || "날짜를 선택하세요");
        setSelectedScheduleCd(null); // 날짜 변경 시 초기화
      } else if (validMovieName !== selectedMovieName) {
        setSelectedMovieName(validMovieName);
        setSelectedScheduleCd(null); // 영화 변경 시 초기화
      }

      // 날짜 변경으로 인한 명시적 초기화
      if (event.detail.selectedMovieTime === null) {
        setSelectedScheduleCd(null);
      } else if (event.detail.selectedMovieTime) {
        try {
          const timeData = JSON.parse(event.detail.selectedMovieTime);
          setSelectedScheduleCd(timeData.schedulecd);
        } catch (error) {}
      }
    };

    window.addEventListener("sessionStorageChange", handleSessionStorageChange);
    return () =>
      window.removeEventListener(
        "sessionStorageChange",
        handleSessionStorageChange
      );
  }, [selectedMovieName, selectedDate]);

  // 상영 시간 선택 (schedulecd만 사용)
  const handleTimeSelect = (schedule) => {
    setSelectedScheduleCd(schedule.schedulecd);
    const timeData = {
      starttime: schedule.starttime,
      reservationseat: schedule.reservationseat,
      allseat: schedule.allseat,
      screenname: schedule.screenname,
      schedulecd: schedule.schedulecd, // schedulecd로만 관리
      movienm: schedule.movienm,
    };
    sessionStorage.setItem("selectedMovieTime", JSON.stringify(timeData));
    window.dispatchEvent(
      new CustomEvent("sessionStorageChange", {
        detail: {
          selectedFullDate: sessionStorage.getItem("selectedFullDate"),
          selectedMovieName: sessionStorage.getItem("selectedMovieName"),
          selectedMovieTime: JSON.stringify(timeData),
        },
      })
    );
  };

  // screentype 목록을 추출하고 중복 제거
  const uniqueScreentypes = [
    ...new Set(movieSchedule.map((schedule) => schedule.screentype)),
  ];

  return (
    <div className="rptm-time-list-area">
      <div className="rptm-time-list-content">
        {(!selectedMovieName || selectedMovieName.trim() === "") && (
          <div>영화를 먼저 선택하세요.</div>
        )}
        {selectedMovieName &&
          selectedMovieName.trim() !== "" &&
          movieSchedule.length === 0 && (
            <div>선택한 날짜에 상영 정보가 없습니다.</div>
          )}
        {selectedMovieName &&
          selectedMovieName.trim() !== "" &&
          uniqueScreentypes.length > 0 && (
            <>
              {uniqueScreentypes.map((screentype) => (
                <div key={screentype}>
                  <div className="rptm-screen-type-title">{screentype}</div>
                  <div className="rptm-screen-times-grid">
                    {movieSchedule
                      .filter((schedule) => schedule.screentype === screentype)
                      .map((schedule) => (
                        <div
                          key={schedule.schedulecd}
                          className={`rptm-screen-time-card${
                            selectedScheduleCd === schedule.schedulecd
                              ? " rptm-active"
                              : ""
                          }`}
                          onClick={() => handleTimeSelect(schedule)}
                        >
                          <div className="rptm-screen-time-time">
                            {schedule.starttime.split(" ")[1]?.substring(0, 5)}
                          </div>
                          <div className="rptm-screen-time-seats">
                            {schedule.reservationseat}/{schedule.allseat}
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
