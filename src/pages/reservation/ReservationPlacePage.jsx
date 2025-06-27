import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../pubcomponent/Header";
import "../../pagecss/reservation/ReservationPlacePage.css";

// mock 지역/지점/상영관/시간 데이터
const theaterData = [
  {
    region: "서울",
    branches: [
      {
        name: "강남점",
        screens: [
          {
            screenType: "2D",
            times: ["10:45", "13:00", "15:30"],
          },
          {
            screenType: "4D",
            times: ["11:00", "14:00"],
          },
        ],
      },
      {
        name: "홍대점",
        screens: [
          {
            screenType: "2D",
            times: ["09:30", "12:00", "18:00"],
          },
          {
            screenType: "IMAX",
            times: ["16:00", "20:00"],
          },
        ],
      },
    ],
  },
  {
    region: "경기",
    branches: [
      {
        name: "수원점",
        screens: [
          {
            screenType: "2D",
            times: ["10:00", "13:30"],
          },
        ],
      },
      {
        name: "일산점",
        screens: [
          {
            screenType: "4DX",
            times: ["11:30", "15:00"],
          },
        ],
      },
    ],
  },
  {
    region: "인천",
    branches: [
      {
        name: "송도점",
        screens: [
          {
            screenType: "2D",
            times: ["10:15", "13:45"],
          },
        ],
      },
    ],
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

  const [selectedRegion, setSelectedRegion] = useState(theaterData[0].region);
  const [selectedBranch, setSelectedBranch] = useState(
    theaterData[0].branches[0].name
  );

  // 선택된 지역의 지점 리스트
  const branches =
    theaterData.find((r) => r.region === selectedRegion)?.branches || [];
  // 선택된 지점의 상영관 리스트
  const screens =
    branches.find((b) => b.name === selectedBranch)?.screens || [];

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
          <div className="progress-bar" style={{ margin: "32px 0 40px 0" }}>
            <div className="progress-steps">
              {["영화선택", "날짜/극장/시간", "인원/좌석", "결제"].map(
                (step, idx) => (
                  <div
                    key={step}
                    className={`progress-step${
                      idx === 1 ? " active" : idx < 1 ? " completed" : ""
                    }`}
                  >
                    <span className="step-number">{idx + 1}</span>
                    <span className="step-title">{step}</span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* 날짜/요일 선택 - 직접 구현 */}
          <div style={{ width: 980, margin: "0 auto 32px auto" }}>
            <div className="date-selector">
              <div
                className="date-header"
                style={{
                  color: "#fff",
                  fontWeight: 400,
                  fontSize: 22,
                  minHeight: 38,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {headerText}
              </div>
              <div
                className="date-list"
                style={{ justifyContent: "space-between", display: "flex" }}
              >
                <button
                  className="arrow"
                  onClick={() => canGoPrev && setOffset(offset - 1)}
                  disabled={!canGoPrev}
                >
                  {"<"}
                </button>
                <div
                  className="dates"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 0,
                    flex: 1,
                  }}
                >
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

          {/* 지역/지점 선택 */}
          <div style={{ display: "flex", gap: 32, marginTop: 32 }}>
            {/* 지역 리스트 */}
            <div style={{ minWidth: 100 }}>
              {theaterData.map((region) => (
                <button
                  key={region.region}
                  className={`region-btn${
                    selectedRegion === region.region ? " active" : ""
                  }`}
                  onClick={() => {
                    setSelectedRegion(region.region);
                    setSelectedBranch(region.branches[0].name);
                  }}
                  style={{ display: "block", marginBottom: 8 }}
                >
                  {region.region}
                </button>
              ))}
            </div>
            {/* 지점 리스트 */}
            <div style={{ minWidth: 120 }}>
              {branches.map((branch) => (
                <button
                  key={branch.name}
                  className={`branch-btn${
                    selectedBranch === branch.name ? " active" : ""
                  }`}
                  onClick={() => setSelectedBranch(branch.name)}
                  style={{ display: "block", marginBottom: 8 }}
                >
                  {branch.name}
                </button>
              ))}
            </div>
            {/* 상영관/시간 정보 */}
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: "bold", marginBottom: 8 }}>
                {selectedMovie.title} - {selectedBranch} 상영관/시간
              </div>
              {screens.length === 0 ? (
                <div>상영 정보가 없습니다.</div>
              ) : (
                screens.map((screen) => (
                  <div key={screen.screenType} style={{ marginBottom: 16 }}>
                    <div style={{ fontWeight: 500, marginBottom: 4 }}>
                      {screen.screenType}
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      {screen.times.map((time) => (
                        <button key={time} className="time-btn">
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationPlacePage;
