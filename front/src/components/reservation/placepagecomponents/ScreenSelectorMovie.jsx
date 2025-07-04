import React, { useEffect, useState } from "react";
import { getSchedules } from "../../../api/api";

const ScreenSelectorMovie = () => {
  const [movieSchedule, setMovieSchedule] = useState([]);
  const [selectedStartTime, setSelectedStartTime] = useState(null);

  // 상영 정보 가져오기
  useEffect(() => {
    const fetchSchedule = async () => {
      const movienm = sessionStorage.getItem("movienm");
      const selectedFullDate = sessionStorage.getItem("selectedFullDate");
      const selectedTheater = sessionStorage.getItem("cinemanm");
      
      console.log("세션 데이터 확인:", { movienm, selectedFullDate, selectedTheater });
      
      if (!movienm || !selectedFullDate || !selectedTheater) {
        console.log("필요한 세션 데이터가 없습니다");
        setMovieSchedule([]);
        return;
      }

      try {
        const selectedSchedule = await getSchedules();

        console.log("전체 스케줄 데이터:", selectedSchedule);
        
        const filteredSchedules = selectedSchedule.filter((schedule) => {
          const matches = (
            schedule.movienm === movienm &&
            schedule.startdate === selectedFullDate &&
            schedule.cinemanm === selectedTheater
          );
          
          console.log("스케줄 비교:", {
            scheduleMovienm: schedule.movienm,
            scheduleDate: schedule.startdate,
            scheduleCinemanm: schedule.cinemanm,
            matches
          });
          
          return matches;
        });
        
        console.log("필터링된 스케줄:", filteredSchedules);

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
          try {
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
          } catch (error) {
            console.error("상영 정보를 가져오는 중 에러 발생:", error);
            setMovieSchedule([]);
          }
        };

        fetchSchedule();
      }
    };

    // 초기 로드 시에도 실행
    handleSessionStorageChange();

    // storage 이벤트 리스너 추가
    window.addEventListener('storage', handleSessionStorageChange);
    
    // 커스텀 이벤트 리스너 추가 (다른 컴포넌트에서 발생하는 이벤트)
    window.addEventListener('sessionStorageChange', handleSessionStorageChange);

    return () => {
      window.removeEventListener('storage', handleSessionStorageChange);
      window.removeEventListener('sessionStorageChange', handleSessionStorageChange);
    };
  }, []);

  // 상영 시간 선택
  const handleTimeSelect = (schedule) => {
    setSelectedStartTime(schedule.starttime);
    const timeData = {
      starttime: schedule.starttime,
      reservationseat: schedule.reservationseat,
      allseat: schedule.allseat,
      screenname: schedule.screenname,
      schedulecd: schedule.schedulecd,
    };
    sessionStorage.setItem("selectedMovieTime", JSON.stringify(timeData));
  };

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
                        {schedule.reservationseat}/{schedule.allseat}
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
