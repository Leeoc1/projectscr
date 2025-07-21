import React, { useState, useEffect } from "react";
import {
  getSchedules,
  getRegions,
  getCinemas,
} from "../../../../../api/cinemaApi";
import ScreenSelectorMovie from "./ScreenSelectorMovie";

const TheaterSelector = () => {
  const [availableRegions, setAvailableRegions] = useState([]);
  const [regionsData, setRegionsData] = useState([]); // 전체 regions 데이터 저장
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [availableTheaters, setAvailableTheaters] = useState([]);
  const [selectedTheater, setSelectedTheater] = useState(null);

  useEffect(() => {
    fetchAllRegions();
  }, []);

  // 세션 스토리지 변경 이벤트 감지
  useEffect(() => {
    const handleSessionStorageChange = (event) => {
      if (event.detail.selectedFullDate) {
        // 날짜가 변경되면 지역과 상영관 선택 초기화
        setSelectedRegion(null);
        setSelectedTheater(null);
        setAvailableTheaters([]);
        // 모든 지역은 그대로 유지
      }
    };

    window.addEventListener("sessionStorageChange", handleSessionStorageChange);

    return () => {
      window.removeEventListener(
        "sessionStorageChange",
        handleSessionStorageChange
      );
    };
  }, []);

  const fetchAllRegions = async () => {
    try {
      const regions = await getRegions();
      console.log("All regions:", regions); // 디버깅용
      console.log("First region object:", regions[0]); // 첫 번째 객체의 구조 확인
      console.log("Region object keys:", Object.keys(regions[0] || {})); // 객체의 키들 확인

      // regions가 배열인지 확인하고, 적절한 속성 추출
      if (Array.isArray(regions)) {
        setRegionsData(regions); // 전체 데이터 저장
        const regionNames = regions.map(
          (region) =>
            region.regionnm || region.regionNm || region.name || region
        );
        console.log("Region names:", regionNames); // 디버깅용
        setAvailableRegions(regionNames);
      } else {
        console.error("Regions is not an array:", regions);
        setAvailableRegions([]);
      }
    } catch (error) {
      console.error("Error fetching regions:", error);
      setAvailableRegions([]);
    }
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

    if (!selectedDate || !movienm) {
      console.error("선택된 날짜나 영화가 없습니다.");
      setAvailableTheaters([]);
      return;
    }

    try {
      // 스케줄 데이터를 기반으로 해당 영화의 상영관 필터링
      const schedules = await getSchedules();

      const filteredSchedules = schedules.filter((schedule) => {
        const scheduleDate = new Date(schedule.startdate);
        const selectedDateObj = new Date(selectedDate);

        return (
          schedule.movienm === movienm &&
          scheduleDate.toDateString() === selectedDateObj.toDateString() &&
          schedule.regionnm === region &&
          schedule.screenstatus === "운영중"
        );
      });

      console.log("Filtered schedules for region:", filteredSchedules);

      const theaters = [
        ...new Set(filteredSchedules.map((schedule) => schedule.cinemanm)),
      ];
      console.log("Available theaters:", theaters);

      setAvailableTheaters(theaters);
    } catch (error) {
      console.error("Error fetching theaters:", error);
      setAvailableTheaters([]);
    }
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
              className={`region-item ${
                selectedRegion === region ? "active" : ""
              }`}
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
                className={`theater-item ${
                  selectedTheater === theater ? "active" : ""
                }`}
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
