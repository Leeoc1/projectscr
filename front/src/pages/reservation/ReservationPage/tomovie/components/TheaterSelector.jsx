import React, { useState, useEffect } from "react";
import { getSchedules } from "../../../../../api/cinemaApi";
import ScreenSelectorMovie from "./ScreenSelectorMovie";

const TheaterSelector = () => {
  const [availableRegions, setAvailableRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [availableTheaters, setAvailableTheaters] = useState([]);
  const [selectedTheater, setSelectedTheater] = useState(null);

  useEffect(() => {
    fetchAvailableRegions();
  }, []);

  // 세션 스토리지 변경 이벤트 감지
  useEffect(() => {
    const handleSessionStorageChange = (event) => {
      if (event.detail.selectedFullDate) {
        // 날짜가 변경되면 지역과 상영관 선택 초기화
        setSelectedRegion(null);
        setSelectedTheater(null);
        setAvailableTheaters([]);
        // 새로운 날짜에 맞는 지역 다시 로드
        fetchAvailableRegions();
      }
    };

    window.addEventListener("sessionStorageChange", handleSessionStorageChange);
    
    return () => {
      window.removeEventListener("sessionStorageChange", handleSessionStorageChange);
    };
  }, []);

  const fetchAvailableRegions = async () => {
    const selectedDate = sessionStorage.getItem("selectedFullDate");
    const movienm = sessionStorage.getItem("movienm");
    
    if (!selectedDate || !movienm) return;

    const schedules = await getSchedules();
    
    const filteredSchedules = schedules.filter(schedule => {
      const scheduleDate = new Date(schedule.startdate);
      const selectedDateObj = new Date(selectedDate);
      
      return schedule.movienm === movienm && 
             scheduleDate.toDateString() === selectedDateObj.toDateString();
    });
    
    const regions = [...new Set(filteredSchedules.map(schedule => schedule.regionnm))];
    setAvailableRegions(regions);
  };

  const handleRegionClick = async (region) => {
    setSelectedRegion(region);
    
    // 지역 변경 시 상영관 선택 상태 초기화
    setSelectedTheater(null);
    
    // 지역 변경 시 cinemanm과 selectedMovieTime 초기화
    sessionStorage.removeItem("cinemanm");
    sessionStorage.removeItem("selectedMovieTime");
    
    // 초기화 이벤트 발생
    window.dispatchEvent(new CustomEvent("selectedMovieTimeCleared"));
    
    const selectedDate = sessionStorage.getItem("selectedFullDate");
    const movienm = sessionStorage.getItem("movienm");
    
    if (!selectedDate || !movienm) return;

    const schedules = await getSchedules();
    
    const filteredSchedules = schedules.filter(schedule => {
      const scheduleDate = new Date(schedule.startdate);
      const selectedDateObj = new Date(selectedDate);
      
      return schedule.movienm === movienm && 
             scheduleDate.toDateString() === selectedDateObj.toDateString() &&
             schedule.regionnm === region;
    });
    
    const theaters = [...new Set(filteredSchedules.map(schedule => schedule.cinemanm))];
    setAvailableTheaters(theaters);
  };

  const handleTheaterClick = (theater) => {
    setSelectedTheater(theater);
    
    // 상영관 변경 시 selectedMovieTime 초기화
    sessionStorage.removeItem("selectedMovieTime");
    
    // 초기화 이벤트 발생
    window.dispatchEvent(new CustomEvent("selectedMovieTimeCleared"));
    
    sessionStorage.setItem("cinemanm", theater);
    
    // 세션 스토리지 변경 이벤트 발생
    window.dispatchEvent(
      new CustomEvent("sessionStorageChange", {
        detail: {
          cinemanm: theater,
        },
      })
    );
  };

  return (
    <div className="selector-container">
      <div className="region-section">
        <h3>지역</h3>
        <div className="region-list">
          {availableRegions.map((region, index) => (
            <div 
              key={index} 
              className={`region-item ${selectedRegion === region ? 'active' : ''}`}
              onClick={() => handleRegionClick(region)}
            >
              {region}
            </div>
          ))}
        </div>
      </div>
      
      {selectedRegion && availableTheaters.length > 0 && (
        <div className="theater-section">
          <h3>상영관</h3>
          <div className="theater-list">
            {availableTheaters.map((theater, index) => (
              <div 
                key={index} 
                className={`theater-item ${selectedTheater === theater ? 'active' : ''}`}
                onClick={() => handleTheaterClick(theater)}
              >
                {theater}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {selectedTheater && (
        <div className="screen-section">
          <h3>상영시간</h3>
          <ScreenSelectorMovie />
        </div>
      )}
    </div>
  );
};

export default TheaterSelector;
