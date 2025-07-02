import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { theaterData } from "../../../Data/TheaterPageData";

const ScreenSelector = () => {
  const location = useLocation();
  const selectedRegion = location.state?.selectedRegion || "서울";
  const selectedBranch = location.state?.selectedBranch || "가양";
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedMovie] = useState(location.state?.selectedMovie || null);

  const branches =
    theaterData.find((r) => r.region === selectedRegion)?.branches || [];
  const selectedBranchObj = branches.find((b) => b.name === selectedBranch);
  const screens = selectedBranchObj?.screens || [];

  return (
    <div className="rptm-time-list-area">
      <div className="rptm-time-list-content">
        {!selectedMovie && <div>영화를 먼저 선택하세요.</div>}
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
        )}
      </div>
    </div>
  );
};

export default ScreenSelector;
