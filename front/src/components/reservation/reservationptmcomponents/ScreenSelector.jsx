import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getSchedules } from "../../../api/api";

const ScreenSelector = () => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(
    sessionStorage.getItem("selectedMovie")
  );

  useEffect(() => {
    const fetchSchedule = async () => {
      const selectedSchedule = await getSchedules();
      // const scheduleFilter = selectedSchedule.filter((schedule) => schedule.)
    };

    const handleSessionStorageChange = (event) => {
      setSelectedMovie(event.detail.selectedMovie || null); // selectedMovie 사용
    };

    window.addEventListener("sessionStorageChange", handleSessionStorageChange);
    return () =>
      window.removeEventListener(
        "sessionStorageChange",
        handleSessionStorageChange
      );
  }, []);

  window.onload = () => {
    sessionStorage.removeItem("selectedMovie");
    setSelectedMovie(null);
  };

  return (
    <div className="rptm-time-list-area">
      <div className="rptm-time-list-content">
        <p>{selectedMovie}</p>
        {/* {!selectedMovie && <div>영화를 먼저 선택하세요.</div>}
        {selectedMovie && screens.length === 0 && (
          <div>상영 정보가 없습니다.</div>
        )}
        {selectedMovie && screens.length > 0 && (
          <>
            {screens.map((screen) => (
              <div key={screen.type} className="rptm-screen-type-title">
                {screen.type}
              </div>
            ))}
            <div className="rptm-screen-times-grid">
              {screens[0]?.times.map((item) => (
                <div
                  className={`rptm-screen-time-card${
                    selectedTime === item.time ? " rptm-active" : ""
                  }`}
                  key={item.time}
                  onClick={() => setSelectedTime(item.time)}
                >
                  <div className="rptm-screen-time-time">{item.time}</div>
                  <div className="rptm-screen-time-seats">{item.seats}</div>
                  <div className="rptm-screen-time-screen">{item.screen}</div>
                </div>
              ))}
            </div>
          </>
        )} */}
      </div>
    </div>
  );
};

export default ScreenSelector;
