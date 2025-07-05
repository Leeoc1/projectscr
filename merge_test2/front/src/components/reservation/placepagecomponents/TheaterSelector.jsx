import React, { useState, useEffect } from "react";
import { getRegions } from "../../../api/api";

const TheaterSelector = ({ filteredSchedules }) => {
  // filteredSchedules == 영화이름, 날짜로 필터링
  // schedules == 지역(regionnm), 지점(cinemanm)으로 필터링
  
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchRegions = async () => {
      const data = await getRegions();
      setRegions(data);
    };
    fetchRegions();
  }, []);

  // 상영 정보 가져오기
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const selectedSchedule = filteredSchedules;

        const filtered = selectedSchedule.filter((schedule) => {
          const regionMatch = schedule.regionnm === selectedRegion;
          const branchMatch = schedule.cinemanm === selectedBranch;
          return regionMatch && branchMatch;
        });

        // 상영 시간순으로 정렬
        filtered.sort(
          (a, b) => new Date(a.starttime) - new Date(b.starttime)
        );
        setSchedules(filtered);
      } catch (error) {
        setSchedules([]);
      }
    };

    if (selectedRegion && selectedBranch) {
      fetchSchedule();
    } else {
      setSchedules([]);
    }
  }, [selectedRegion, selectedBranch]);

  // 세션 스토리지 변경 감지
  useEffect(() => {
    const handleSessionStorageChange = (event) => {
      const newRegion = event.detail.selectedRegion || sessionStorage.getItem("selectedRegion");
      const newBranch = event.detail.selectedBranch || sessionStorage.getItem("selectedBranch");
      if (newRegion !== selectedRegion || newBranch !== selectedBranch) {
        setSelectedRegion(newRegion);
        setSelectedBranch(newBranch);
        setSelectedStartTime(null); // 새로운 영화 또는 날짜 선택 시 시간 초기화
      }
    };

    window.addEventListener("sessionStorageChange", handleSessionStorageChange);
    return () =>
      window.removeEventListener(
        "sessionStorageChange",
        handleSessionStorageChange
      );
  }, [selectedRegion, selectedBranch]);

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
        runningtime: schedule.runningtime, // 상영시간
      })
    );
  };

  // screentype 목록을 추출하고 중복 제거
  const uniqueScreentypes = [
    ...new Set(schedules.map((schedule) => schedule.screentype)),
  ];

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
              className={`region-btn${selectedRegion === region ? " active" : ""
                }`}
              onClick={() => setSelectedRegion(region)}
            >
              {region}
            </button>
          ))}
        </div>
        {/* 지점 리스트 */}
        <div className="branch-list">
          {filteredSchedules.cinemanm.map((branch) => (
            <button
              key={branch}
              className={`branch-btn${selectedBranch === branch ? " active" : ""
                }`}
              onClick={() => setSelectedBranch(branch)}
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
            {selectedRegion && selectedBranch && schedules.length === 0 && (
              <div>상영 정보가 없습니다.</div>
            )}
            {uniqueScreentypes.length > 0 && (
              <>
                {uniqueScreentypes.map((screentype) => (
                  <div key={screentype}>
                    <div className="rptm-screen-type-title">{screentype}</div>
                    <div className="rptm-screen-times-grid">
                      {schedules
                        .filter((schedule) => schedule.screentype === screentype)
                        .map((schedule) => (
                          <div
                            key={schedule.schedulecd}
                            className={`rptm-screen-time-card ${selectedStartTime === schedule.starttime
                              ? "rptm-active"
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
      </div>
    </div>
  );
};

export default TheaterSelector;
