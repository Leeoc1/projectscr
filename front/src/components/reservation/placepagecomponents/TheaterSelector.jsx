import React from "react";

const TheaterSelector = ({
  regions,
  branches,
  screenTimes,
  selectedRegion,
  selectedBranch,
  selectedTime,
  onRegionSelect,
  onBranchSelect,
  onTimeSelect,
}) => {
  return (
    <div className="theater-section">
      {/* 상단 타이틀들 */}
      <div className="theater-title section-title">극장선택</div>
      <div className="time-title section-title">상영시간</div>
      <div className="theater-selector">
        {/* 지역 리스트 */}
        <div className="region-list">
          {regions.map((region) => (
            <button
              key={region}
              className={`region-btn${
                selectedRegion === region ? " active" : ""
              }`}
              onClick={() => onRegionSelect(region)}
            >
              {region}
            </button>
          ))}
        </div>
        {/* 지점 리스트 */}
        <div className="branch-list">
          {branches.map((branch) => (
            <button
              key={branch}
              className={`branch-btn${
                selectedBranch === branch ? " active" : ""
              }`}
              onClick={() => onBranchSelect(branch)}
            >
              {branch}
            </button>
          ))}
        </div>
        {/* 상영시간 리스트 */}
        <div className="time-list-area">
          <div className="time-list-content">
            {!selectedRegion && <div>지역을 먼저 선택하세요.</div>}
            {selectedRegion && !selectedBranch && <div>지점을 선택하세요.</div>}
            {selectedRegion && selectedBranch && screenTimes.length === 0 && (
              <div>상영 정보가 없습니다.</div>
            )}
            {selectedRegion && selectedBranch && screenTimes.length > 0 && (
              <>
                {screenTimes.map((item, idx) => (
                  <div
                    className={`screen-time-card${
                      selectedTime === item.time ? " active" : ""
                    }`}
                    key={item.time + idx}
                    onClick={() => onTimeSelect(item.time)}
                  >
                    <div className="screen-time-time">
                      {item.time
                        ? item.time.split(" ")[1]?.substring(0, 5)
                        : item.time}
                    </div>
                    <div className="screen-time-seats">
                      {item.raservationseat || item.reservationseat} /{" "}
                      {item.allseat}
                    </div>
                    <div className="screen-time-screen">
                      {item.screen} ({item.screentype})
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheaterSelector;
