import React, { useState, useEffect } from "react";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

// 날짜 배열 생성 함수
function getDateArray(startDate, length = 8, today = new Date()) {
  const arr = [];
  for (let i = 0; i < length; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
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

const DateSelector = () => {
  const today = new Date();
  const [offset, setOffset] = useState(0);
  const [selectedDateObj, setSelectedDateObj] = useState(
    new Date(today.getFullYear(), today.getMonth(), today.getDate())
  );

  const baseDate = new Date(today);
  baseDate.setDate(today.getDate() + offset);
  const dateArr = getDateArray(baseDate, 8, today);

  // 상단 날짜 표시
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
  ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(
    2,
    "0"
  )}${label}`;

  // 날짜 비교 함수
  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const canGoPrev = offset > 0;

  // 선택된 날짜 정보 저장
  const handleSetSelectedDate = (item) => {
    const year = item.date.getFullYear();
    const month = item.date.getMonth();
    const date = item.date.getDate();

    // 현재 선택한 날짜 
    setSelectedDateObj(
      new Date(
        year,
        month,
        date
      )
    );
    
    // 현재 선택한 날짜 세션 저장
    // sessionStorage.setItem("selectedYear", item.date.getFullYear());
    // sessionStorage.setItem("selectedMonth", item.date.getMonth() + 1);
    // sessionStorage.setItem("selectedDate", item.date.getDate());
    // sessionStorage.setItem("selectedDay", item.day);
    sessionStorage.setItem("selectedFullDate", `${year}-${String(month + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`);
  }

  useEffect(() => {
    sessionStorage.setItem("selectedFullDate", `${baseDate.getFullYear()}-${String(baseDate.getMonth() + 1).padStart(2, "0")}-${String(baseDate.getDate()).padStart(2, "0")}`);
    },[]);

  return (
    <div className="rptm-date-selector-section">
      <div className="rptm-date-header">{headerText}</div>
      <div className="rptm-date-selector">
        <div className="rptm-date-list">
          <button
            className="rptm-arrow"
            onClick={() => canGoPrev && setOffset(offset - 1)}
            disabled={!canGoPrev}
          >
            {"<"}
          </button>
          <div className="rptm-dates">
            {dateArr.map((item, idx) => (
              <div
                key={idx}
                className={
                  "rptm-date-item" +
                  (isSameDay(item.date, selectedDateObj)
                    ? " rptm-selected"
                    : "") +
                  (item.isSaturday ? " rptm-saturday" : "") +
                  (item.isSunday ? " rptm-sunday" : "") +
                  (item.isDisabled ? " rptm-disabled" : "")
                }
                onClick={() =>
                  !item.isDisabled &&
                  handleSetSelectedDate(item)
                }
              >
                <div className="rptm-date-num">{item.date.getDate()}</div>
                <div className="rptm-date-label">
                  {(() => {
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
          <button className="rptm-arrow" onClick={() => setOffset(offset + 1)}>
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateSelector;
