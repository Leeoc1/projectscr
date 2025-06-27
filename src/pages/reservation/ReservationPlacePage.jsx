import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../pubcomponent/Header";
import "../../pagecss/reservation/ReservationPlacePage.css";

// mock 지역/지점/상영시간 데이터 (이미지와 동일하게 하드코딩)
const theaterData = [
  {
    region: "서울",
    branches: [
      { name: "가양", times: ["10:00", "13:00", "16:00"] },
      { name: "강동", times: ["11:00", "14:00"] },
      { name: "건대입구", times: ["09:30", "12:30", "18:00"] },
      { name: "김포공항", times: ["10:15", "13:45"] },
      { name: "노원", times: ["10:00", "13:00"] },
      { name: "도곡", times: ["11:00", "14:00"] },
      { name: "독산", times: ["09:30", "12:30"] },
      { name: "서울대입구", times: ["10:15", "13:45"] },
      { name: "수락산", times: ["10:00", "13:00"] },
      { name: "수유", times: ["11:00", "14:00"] },
      { name: "신대방(구로디지털역)", times: ["09:30", "12:30"] },
      { name: "신도림", times: ["10:15", "13:45"] },
      { name: "신림", times: ["10:00", "13:00"] },
      { name: "에비뉴엘(명동)", times: ["11:00", "14:00"] },
      { name: "영등포", times: ["09:30", "12:30"] },
    ],
  },
  {
    region: "경기/인천",
    branches: [
      { name: "고양" },
      { name: "광명" },
      { name: "구리" },
      { name: "동수원" },
      { name: "부천" },
      { name: "수원" },
      { name: "안산" },
      { name: "인천" },
      { name: "일산" },
      { name: "파주" },
      { name: "평택" },
      { name: "하남" },
    ],
  },
  {
    region: "충청/대전",
    branches: [
      { name: "대전" },
      { name: "천안" },
      { name: "청주" },
      { name: "충주" },
    ],
  },
  {
    region: "전라/광주",
    branches: [
      { name: "광주" },
      { name: "목포" },
      { name: "순천" },
      { name: "여수" },
    ],
  },
  {
    region: "경북/대구",
    branches: [
      { name: "경산" },
      { name: "구미" },
      { name: "대구" },
      { name: "포항" },
    ],
  },
  {
    region: "경남/부산/울산",
    branches: [
      { name: "김해" },
      { name: "마산" },
      { name: "부산" },
      { name: "울산" },
      { name: "창원" },
    ],
  },
  {
    region: "강원",
    branches: [{ name: "강릉" }, { name: "원주" }, { name: "춘천" }],
  },
  {
    region: "제주",
    branches: [{ name: "제주" }],
  },
];

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

const ReservationPlacePage = () => {
  const location = useLocation();
  const selectedMovie = location.state?.selectedMovie || {
    title: "영화 미선택",
  };

  // 날짜 상태
  const today = new Date();
  const [offset, setOffset] = useState(0); // 화살표로 이동 시 offset 조정
  const [selectedDateObj, setSelectedDateObj] = useState(
    new Date(today.getFullYear(), today.getMonth(), today.getDate())
  ); // 오늘이 기본 선택

  // 지역/지점 상태 (초기값: 선택 안함)
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);

  // 선택된 지역의 지점 리스트
  const branches =
    theaterData.find((r) => r.region === selectedRegion)?.branches || [];

  // 선택된 지점의 상영시간 리스트
  const selectedBranchObj = branches.find((b) => b.name === selectedBranch);
  const times = selectedBranchObj?.times || [];

  // offset만큼 이동한 날짜 배열 생성 (8개)
  const baseDate = new Date(today);
  baseDate.setDate(today.getDate() + offset);
  const dateArr = getDateArray(baseDate, 8, today);

  // 상단 날짜 표시 (오늘/내일/모레/요일)
  const selectedDate = selectedDateObj;
  const selectedDay = WEEKDAYS[selectedDate.getDay()];
  let label = "";
  // 오늘/내일/모레 판별
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
  ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(
    2,
    "0"
  )}${label}`;

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

  return (
    <div className="reservation-page">
      <Header isOtherPage={true} isScrolled={true} />
      <div className="reservation-content">
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
                {theaterData.map((region) => (
                  <button
                    key={region.region}
                    className={`region-btn${
                      selectedRegion === region.region ? " active" : ""
                    }`}
                    onClick={() => {
                      setSelectedRegion(region.region);
                      setSelectedBranch(null);
                    }}
                  >
                    {region.region}
                    <span className="region-count">
                      ({region.branches.length})
                    </span>
                  </button>
                ))}
              </div>
              {/* 지점 리스트 */}
              <div className="branch-list">
                {branches.map((branch) => (
                  <button
                    key={branch.name}
                    className={`branch-btn${
                      selectedBranch === branch.name ? " active" : ""
                    }`}
                    onClick={() => setSelectedBranch(branch.name)}
                  >
                    {branch.name}
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
                  {selectedRegion && selectedBranch && times.length === 0 && (
                    <div>상영 정보가 없습니다.</div>
                  )}
                  {selectedRegion && selectedBranch && times.length > 0 && (
                    <div className="time-btns">
                      {times.map((time) => (
                        <button key={time} className="time-btn">
                          {time}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationPlacePage;
