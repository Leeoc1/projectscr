import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../pubcomponent/Header";
import { getSchedules } from "../../api/api";
import "../../pagecss/reservation/ReservationPlacePage.css";


// 요일명과 색상 정보
const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

// 날짜 배열 생성 함수 (오늘 기준, 앞뒤로 이동 가능)
function getDateArray(startDate, length = 8, today = new Date()) {
  const arr = [];
  for (let i = 0; i < length; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    // 과거 날짜 비활성화
    const isPast =
      date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
    arr.push({
      date,
      day: WEEKDAYS[date.getDay()],
      isToday: i === 0 && date.getDate() === today.getDate(),
      isTomorrow: i === 1 && date.getDate() === today.getDate() + 1,
      isDayAfterTomorrow: i === 2 && date.getDate() === today.getDate() + 2,
      isSaturday: date.getDay() === 6,
      isSunday: date.getDay() === 0,
      isDisabled: isPast,
    });
  }
  return arr;
}

// 세션스토리지에서 예매 정보 불러오기 함수
function getSavedReservationInfo() {
  try {
    const saved = sessionStorage.getItem("reservationInfo");
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return null;
}

const ReservationPlacePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 세션스토리지에서 선택한 영화 정보 가져오기
  const getSelectedMovie = () => {
    try {
      const storedMovie = sessionStorage.getItem("selectedMovie");
      if (storedMovie) {
        return JSON.parse(storedMovie);
      }
    } catch (error) {
      console.error("세션 스토리지에서 영화 정보를 가져오는 중 오류:", error);
    }
    return {
      title: "영화를 선택해주세요",
      genre: "장르",
      poster: "/images/movie.jpg",
      moviecd: null,
    };
  };
  const selectedMovie = getSelectedMovie();

  // 날짜 상태
  const today = new Date();
  // 세션스토리지에서 불러온 값 적용
  const savedInfo = getSavedReservationInfo();
  const [offset, setOffset] = useState(0);
  const [selectedDateObj, setSelectedDateObj] = useState(
    savedInfo && savedInfo.selectedDate ? new Date(savedInfo.selectedDate) : new Date(today.getFullYear(), today.getMonth(), today.getDate())
  );
  const [selectedRegion, setSelectedRegion] = useState(savedInfo?.selectedRegion || null);
  const [selectedBranch, setSelectedBranch] = useState(savedInfo?.selectedBranch || null);
  const [selectedTime, setSelectedTime] = useState(savedInfo?.selectedTime || null);
  useEffect(() => {
    const y = selectedDateObj.getFullYear();
    const m = String(selectedDateObj.getMonth() + 1).padStart(2, "0");
    const d = String(selectedDateObj.getDate()).padStart(2, "0");
    console.log(`선택된 예매 날짜: ${y}-${m}-${d}`);
  }, [selectedDateObj]);

  // 스케줄 데이터 상태
  const [schedules, setSchedules] = useState([]);
  const [regions, setRegions] = useState([]); // 해당 영화+날짜가 상영되는 지역 리스트
  const [branches, setBranches] = useState([]); // 해당 지역의 지점 리스트
  const [screenTimes, setScreenTimes] = useState([]); // 상영시간 리스트

  // 선택 정보가 바뀔 때마다 세션스토리지에 저장
  useEffect(() => {
    const info = {
      selectedDate: selectedDateObj,
      selectedRegion,
      selectedBranch,
      selectedTime,
      selectedMovie,
    };
    sessionStorage.setItem("reservationInfo", JSON.stringify(info));
  }, [selectedDateObj, selectedRegion, selectedBranch, selectedTime, selectedMovie]);

  // 스케줄 데이터 불러오기
  useEffect(() => {
    getSchedules().then((data) => {
      setSchedules(data);
    });
  }, []);

  // 영화+날짜에 해당하는 스케줄만 필터링 (useMemo로 최적화)
  const y = selectedDateObj.getFullYear();
  const m = String(selectedDateObj.getMonth() + 1).padStart(2, "0");
  const d = String(selectedDateObj.getDate()).padStart(2, "0");
  const selectedDateStr = `${y}-${m}-${d}`;
  const filteredSchedules = useMemo(() =>
    schedules.filter(
      (item) =>
        item.movienm === selectedMovie.title &&
        item.startdate && item.startdate.startsWith(selectedDateStr)
    ), [schedules, selectedMovie.title, selectedDateStr]
  );

  // 지역 리스트 추출
  useEffect(() => {
    const regionList = [...new Set(filteredSchedules.map((item) => item.regionnm))];
    setRegions(regionList);
    setSelectedRegion(null);
    setSelectedBranch(null);
    setScreenTimes([]);
  }, [filteredSchedules]);

  // 지역 선택 시 해당 지역의 지점 리스트 추출
  useEffect(() => {
    if (!selectedRegion) {
      setBranches([]);
      return;
    }
    const branchList = [
      ...new Set(
        filteredSchedules
          .filter((item) => item.regionnm === selectedRegion)
          .map((item) => item.cinemanm)
      ),
    ];
    setBranches(branchList);
    setSelectedBranch(null);
    setScreenTimes([]);
  }, [selectedRegion, filteredSchedules]);

  // 지점 선택 시 해당 지점의 상영시간 리스트 추출
  useEffect(() => {
    if (!selectedRegion || !selectedBranch) {
      setScreenTimes([]);
      return;
    }
    const times = filteredSchedules
      .filter(
        (item) =>
          item.regionnm === selectedRegion &&
          item.cinemanm === selectedBranch
      )
      .map((item) => ({
        time: item.starttime,
        screen: item.screenname,
        screentype: item.screentype,
        allseat: item.allseat,
        raservationseat: item.raservationseat,
      }));
    setScreenTimes(times);
    setSelectedTime(null);
  }, [selectedBranch, selectedRegion, filteredSchedules]);

  // offset만큼 이동한 날짜 배열 생성 (8개)
  const baseDate = new Date(today);
  baseDate.setDate(today.getDate() + offset);
  const dateArr = getDateArray(baseDate, 8, today);

  // 상단 날짜 표시 (오늘/내일/모레/요일)
  const selectedDate = selectedDateObj;
  const selectedDay = WEEKDAYS[selectedDate.getDay()];
  let label = "";
  const diffDays = Math.floor(
    (selectedDate -
      new Date(today.getFullYear(), today.getMonth(), today.getDate())) /
      (1000 * 60 * 60 * 24)
  );
  if (diffDays === 0) label = "(오늘)";
  else if (diffDays === 1) label = "(내일)";
  else if (diffDays === 2) label = "(모레)";
  else label = `(${selectedDay})`;
  const headerText = `${selectedDate.getFullYear()}-${String(
    selectedDate.getMonth() + 1
  ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}${label}`;

  // 화살표: 오늘 이전으로 이동 불가
  const canGoPrev = offset > 0;

  // 날짜 비교 함수 (연,월,일만 비교)
  function isSameDay(d1, d2) {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }

  // 선택 완료 여부 체크 (상영시간까지 선택된 경우)
  const isReadyToSeat =
    selectedDate && selectedRegion && selectedBranch && selectedTime;

  // 좌석 선택 버튼 클릭 시 이동
  const handleGoToSeat = () => {
    navigate("/reservation/seat", {
      state: {
        selectedDate,
        selectedRegion,
        selectedBranch,
        selectedTime,
      },
    });
  };

  return (
    <div className="reservation-page">
      <Header isOtherPage={true} isScrolled={true} />
      <div className="reservation-content">
        {/* 선택한 영화 섹션 */}
        <div className="selected-movie-section">
          <h1 className="selected-movie-section-title">선택한 영화</h1>
          <div className="selected-movie-content">
            <img
              src={selectedMovie.poster || "/images/movie.jpg"}
              alt={selectedMovie.title}
              className="selected-movie-poster"
            />
            <div className="selected-movie-info">
              <h2 className="selected-movie-title">{selectedMovie.title}</h2>
              <p className="selected-movie-genre">{selectedMovie.genre}</p>
            </div>
          </div>
        </div>

        <div className="reservation-container">
          {/* 진행바 */}
          <div className="progress-bar">
            <div className="progress-steps">
              {["날짜/극장", "인원/좌석", "결제"].map((step, idx) => (
                <div
                  key={step}
                  className={`progress-step${idx === 0 ? " active" : ""}`}
                >
                  <span className="step-number">{idx + 1}</span>
                  <span className="step-title">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 날짜/요일 선택 - 직접 구현 */}
          <div className="date-selector-section">
            {/* 상단 날짜 헤더 */}
            <div className="date-header">{headerText}</div>
            {/* 하단 날짜 선택 */}
            <div className="date-selector">
              <div className="date-list">
                <button
                  className="arrow"
                  onClick={() => canGoPrev && setOffset(offset - 1)}
                  disabled={!canGoPrev}
                >
                  {"<"}
                </button>
                <div className="dates">
                  {dateArr.map((item, idx) => (
                    <div
                      key={idx}
                      className={
                        "date-item" +
                        (isSameDay(item.date, selectedDateObj)
                          ? " selected"
                          : "") +
                        (item.isSaturday ? " saturday" : "") +
                        (item.isSunday ? " sunday" : "") +
                        (item.isDisabled ? " disabled" : "")
                      }
                      onClick={() =>
                        !item.isDisabled &&
                        setSelectedDateObj(
                          new Date(
                            item.date.getFullYear(),
                            item.date.getMonth(),
                            item.date.getDate()
                          )
                        )
                      }
                    >
                      <div className="date-num">{item.date.getDate()}</div>
                      <div className="date-label">
                        {(() => {
                          // 오늘/내일/모레 판별 (리스트 내에서도)
                          const diff = Math.floor(
                            (item.date -
                              new Date(
                                today.getFullYear(),
                                today.getMonth(),
                                today.getDate()
                              )) /
                              (1000 * 60 * 60 * 24)
                          );
                          if (diff === 0) return "오늘";
                          if (diff === 1) return "내일";
                          if (diff === 2) return "모레";
                          return item.day;
                        })()}
                      </div>
                    </div>
                  ))}
                </div>
                <button className="arrow" onClick={() => setOffset(offset + 1)}>
                  {">"}
                </button>
              </div>
            </div>
          </div>

          {/* 극장선택과 상영시간 선택 */}
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
                    onClick={() => {
                      setSelectedRegion(region);
                      setSelectedBranch(null);
                    }}
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
                  {selectedRegion && !selectedBranch && (
                    <div>지점을 선택하세요.</div>
                  )}
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
                          onClick={() => setSelectedTime(item.time)}
                        >
                          <div className="screen-time-time">{item.time}</div>
                          <div className="screen-time-seats">
                            {item.raservationseat} / {item.allseat}
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
        </div>
      </div>
      {/* 우측 하단 고정 좌석 선택 버튼 */}
      {isReadyToSeat && (
        <button className="reservation-seat-btn-fixed" onClick={handleGoToSeat}>
          좌석 선택
        </button>
      )}
    </div>
  );
};

export default ReservationPlacePage;
