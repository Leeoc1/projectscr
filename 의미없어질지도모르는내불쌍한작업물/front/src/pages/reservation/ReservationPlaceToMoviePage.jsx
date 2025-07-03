// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { boxofficeMovies } from "../../Data/MoviesData";
// import Header from "../../pubcomponent/Header";
// import "../../pagecss/reservation/ReservationPlaceToMovie.css";



// // 요일명과 색상 정보
// const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

// // 날짜 배열 생성 함수 (오늘 기준, 앞뒤로 이동 가능)
// function getDateArray(startDate, length = 8, today = new Date()) {
//   const arr = [];
//   for (let i = 0; i < length; i++) {
//     const date = new Date(startDate);
//     date.setDate(startDate.getDate() + i);
//     // 과거 날짜 비활성화
//     const isPast =
//       date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
//     arr.push({
//       date,
//       day: WEEKDAYS[date.getDay()],
//       isToday: i === 0 && date.getDate() === today.getDate(),
//       isTomorrow: i === 1 && date.getDate() === today.getDate() + 1,
//       isDayAfterTomorrow: i === 2 && date.getDate() === today.getDate() + 2,
//       isSaturday: date.getDay() === 6,
//       isSunday: date.getDay() === 0,
//       isDisabled: isPast,
//     });
//   }
//   return arr;
// }

// const ReservationPlaceToMoviePage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // 임의 데이터
//   const selectedRegion = location.state?.selectedRegion || "서울";
//   const selectedBranch = location.state?.selectedBranch || "가양";

//   // 날짜 상태
//   const today = new Date();
//   const [offset, setOffset] = useState(0); // 화살표로 이동 시 offset 조정
//   const [selectedDateObj, setSelectedDateObj] = useState(
//     new Date(today.getFullYear(), today.getMonth(), today.getDate())
//   ); // 오늘이 기본 선택

//   // 지역/지점 상태 (초기값: 선택 안함)
//   const [selectedTime, setSelectedTime] = useState(null);
//   const [selectedMovie, setSelectedMovie] = useState(null);

//   // 선택된 지역의 지점 리스트
//   const branches =
//     theaterData.find((r) => r.region === selectedRegion)?.branches || [];

//   // 선택된 지점의 상영정보
//   const selectedBranchObj = branches.find((b) => b.name === selectedBranch);
//   const screens = selectedBranchObj?.screens || [];

//   // offset만큼 이동한 날짜 배열 생성 (8개)
//   const baseDate = new Date(today);
//   baseDate.setDate(today.getDate() + offset);
//   const dateArr = getDateArray(baseDate, 8, today);

//   // 상단 날짜 표시 (오늘/내일/모레/요일)
//   const selectedDate = selectedDateObj;
//   const selectedDay = WEEKDAYS[selectedDate.getDay()];
//   let label = "";
//   // 오늘/내일/모레 판별
//   const diffDays = Math.floor(
//     (selectedDate -
//       new Date(today.getFullYear(), today.getMonth(), today.getDate())) /
//       (1000 * 60 * 60 * 24)
//   );
//   if (diffDays === 0) label = "(오늘)";
//   else if (diffDays === 1) label = "(내일)";
//   else if (diffDays === 2) label = "(모레)";
//   else label = `(${selectedDay})`;
//   const headerText = `${selectedDate.getFullYear()}-${String(
//     selectedDate.getMonth() + 1
//   ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(
//     2,
//     "0"
//   )}${label}`;

//   // 화살표: 오늘 이전으로 이동 불가
//   const canGoPrev = offset > 0;

//   // 날짜 비교 함수 (연,월,일만 비교)
//   function isSameDay(d1, d2) {
//     return (
//       d1.getFullYear() === d2.getFullYear() &&
//       d1.getMonth() === d2.getMonth() &&
//       d1.getDate() === d2.getDate()
//     );
//   }

//   // 선택 완료 여부 체크 (상영시간까지 선택된 경우)
//   const isReadyToSeat =
//     selectedDate && selectedRegion && selectedBranch && selectedTime;

//   // 좌석 선택 버튼 클릭 시 이동
//   const handleGoToSeat = () => {
//     navigate("/reservation/seat", {
//       state: {
//         selectedDate,
//         selectedRegion,
//         selectedBranch,
//         selectedTime,
//         selectedMovie: location.state?.selectedMovie || null,
//       },
//     });
//   };

//   return (
//     <div className="rptm-reservation-page">
//       <Header isOtherPage={true} isScrolled={true} />
//       <div className="rptm-reservation-content">
//         <div className="rptm-reservation-container">
//           {/* 진행바 */}
//           <div className="rptm-progress-bar">
//             <div className="rptm-progress-steps">
//               {["날짜/극장", "인원/좌석", "결제"].map((step, idx) => (
//                 <div
//                   key={step}
//                   className={`rptm-progress-step${idx === 0 ? " rptm-active" : ""}`}
//                 >
//                   <span className="rptm-step-number">{idx + 1}</span>
//                   <span className="rptm-step-title">{step}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* 날짜/요일 선택 - 직접 구현 */}
//           <div className="rptm-date-selector-section">
//             {/* 상단 날짜 헤더 */}
//             <div className="rptm-date-header">{headerText}</div>
//             {/* 하단 날짜 선택 */}
//             <div className="rptm-date-selector">
//               <div className="rptm-date-list">
//                 <button
//                   className="rptm-arrow"
//                   onClick={() => canGoPrev && setOffset(offset - 1)}
//                   disabled={!canGoPrev}
//                 >
//                   {"<"}
//                 </button>
//                 <div className="rptm-dates">
//                   {dateArr.map((item, idx) => (
//                     <div
//                       key={idx}
//                       className={
//                         "rptm-date-item" +
//                         (isSameDay(item.date, selectedDateObj)
//                           ? " rptm-selected"
//                           : "") +
//                         (item.isSaturday ? " rptm-saturday" : "") +
//                         (item.isSunday ? " rptm-sunday" : "") +
//                         (item.isDisabled ? " rptm-disabled" : "")
//                       }
//                       onClick={() =>
//                         !item.isDisabled &&
//                         setSelectedDateObj(
//                           new Date(
//                             item.date.getFullYear(),
//                             item.date.getMonth(),
//                             item.date.getDate()
//                           )
//                         )
//                       }
//                     >
//                       <div className="rptm-date-num">{item.date.getDate()}</div>
//                       <div className="rptm-date-label">
//                         {(() => {
//                           // 오늘/내일/모레 판별 (리스트 내에서도)
//                           const diff = Math.floor(
//                             (item.date -
//                               new Date(
//                                 today.getFullYear(),
//                                 today.getMonth(),
//                                 today.getDate()
//                               )) /
//                               (1000 * 60 * 60 * 24)
//                           );
//                           if (diff === 0) return "오늘";
//                           if (diff === 1) return "내일";
//                           if (diff === 2) return "모레";
//                           return item.day;
//                         })()}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//                 <button className="rptm-arrow" onClick={() => setOffset(offset + 1)}>
//                   {">"}
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* 극장선택과 상영시간 선택 */}
//           <div className="rptm-theater-section">
//             {/* 상단 타이틀들 */}
//             <div className="rptm-movie-title rptm-section-title">영화선택</div>
//             <div className="rptm-time-title rptm-section-title">상영시간</div>
//             <div className="rptm-movie-selector">
//               {/* 영화 리스트 */}
//               <div className="rptm-movie-list">
//                 {boxofficeMovies.map((movie) => (
//                   <button
//                     key={movie.id}
//                     className={`rptm-movie-btn${
//                       selectedMovie === movie.title ? " rptm-active" : ""
//                     }`}
//                     onClick={() => {
//                       setSelectedMovie(movie.title);
//                     }}
//                   >
//                     {movie.title}
//                   </button>
//                 ))}
//               </div>
//               {/* 상영시간 리스트 */}
//               <div className="rptm-time-list-area">
//                 <div className="rptm-time-list-content">
//                   {!selectedMovie && <div>영화를 먼저 선택하세요.</div>}
//                   {selectedMovie && screens.length === 0 && (
//                     <div>상영 정보가 없습니다.</div>
//                   )}
//                   {selectedMovie && screens.length > 0 && (
//                     <>
//                       {/* 상영관 타입 */}
//                       {screens.map((screen) => (
//                         <div key={screen.type} className="rptm-screen-type-title">
//                           {screen.type}
//                         </div>
//                       ))}
//                       <div className="rptm-screen-times-grid">
//                         {screens[0]?.times.map((item) => (
//                           <div
//                             className={`rptm-screen-time-card${
//                               selectedTime === item.time ? " rptm-active" : ""
//                             }`}
//                             key={item.time}
//                             onClick={() => setSelectedTime(item.time)}
//                           >
//                             <div className="rptm-screen-time-time">{item.time}</div>
//                             <div className="rptm-screen-time-seats">
//                               {item.seats}
//                             </div>
//                             <div className="rptm-screen-time-screen">
//                               {item.screen}
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* 우측 하단 고정 좌석 선택 버튼 */}
//       {isReadyToSeat && (
//         <button className="rptm-reservation-seat-btn-fixed" onClick={handleGoToSeat}>
//           좌석 선택
//         </button>
//       )}
//     </div>
//   );
// };

// export default ReservationPlaceToMoviePage;