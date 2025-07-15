import React, { useEffect, useState } from "react";
import { getCinemas, getScreens } from "../../../api/api";
import "../styles/TheaterManagement.css";
import "../styles/AdminPage.css";

const CARDS_PER_ROW = 3;

const TheaterManagement = () => {
  const [cinemas, setCinemas] = useState([]);
  const [openDetailIdx, setOpenDetailIdx] = useState(null);
  const [screenList, setScreenList] = useState([]);

  useEffect(() => {
    const fetchCinemas = async () => {
      const response = await getCinemas();
      setCinemas(response);
    };
    fetchCinemas();
  }, []);

  // 드롭다운이 열릴 때 해당 극장 상영관 정보 불러오기
  useEffect(() => {
    if (openDetailIdx !== null && cinemas[openDetailIdx]) {
      getScreens().then((allScreens) => {
        const filtered = allScreens.filter(
          (screen) => screen.cinemacd === cinemas[openDetailIdx].cinemacd
        );
        setScreenList(filtered);
      });
    } else {
      setScreenList([]);
    }
  }, [openDetailIdx, cinemas]);

  // 카드 3개씩 한 줄로 묶기
  const rows = [];
  for (let i = 0; i < cinemas.length; i += CARDS_PER_ROW) {
    rows.push(cinemas.slice(i, i + CARDS_PER_ROW));
  }

  return (
    <div className="adp-content">
      <div className="adp-header">
        <h2>극장 관리</h2>
        <button className="adp-btn-primary">극장 추가</button>
      </div>
      <div className="thm-theater-grid-wrapper">
        <div className="thm-theater-grid">
          {rows.map((row, rowIdx) => (
            <React.Fragment key={rowIdx}>
              {row.map((theater, idx) => (
                <div className="thm-theater-card" key={theater.cinemacd}>
                  <h3>{theater.cinemanm}</h3>
                  <div className="thm-theater-info">
                    <p>
                      <strong>주소:</strong> {theater.address}
                    </p>
                    <p>
                      <strong>전화번호:</strong> {theater.tel}
                    </p>
                  </div>
                  <div className="thm-theater-actions">
                    <button className="adp-btn-edit">수정</button>
                    <button
                      className="adp-btn-view"
                      onClick={() =>
                        setOpenDetailIdx(
                          openDetailIdx === rowIdx * CARDS_PER_ROW + idx
                            ? null
                            : rowIdx * CARDS_PER_ROW + idx
                        )
                      }
                    >
                      상세보기
                    </button>
                    <button className="adp-btn-delete">삭제</button>
                  </div>
                </div>
              ))}
              {/* 드롭다운 상세: 해당 줄에서 상세보기 열린 카드 아래에만 표시 */}
              {openDetailIdx !== null &&
                openDetailIdx >= rowIdx * CARDS_PER_ROW &&
                openDetailIdx < (rowIdx + 1) * CARDS_PER_ROW && (
                  <div className="thm-theater-detail-dropdown">
                    {/* 지점명, 주소 */}
                    <div className="thm-theater-detail-header">
                      <h4>{cinemas[openDetailIdx]?.cinemanm}</h4>
                      <p>{cinemas[openDetailIdx]?.address}</p>
                    </div>
                    {/* 스크롤 섹션: 상영관 리스트 */}
                    <div className="thm-theater-detail-screenscroll">
                      <ul>
                        {screenList.length === 0 ? (
                          <li>상영관 정보가 없습니다.</li>
                        ) : (
                          screenList.map((screen, i) => (
                            <li key={i}>
                              <strong>{screen.screenname}</strong> | {screen.screentype} | 전체좌석: {screen.allseat} | 예약좌석: {screen.reservationseat}
                            </li>
                          ))
                        )}
                      </ul>
                    </div>
                  </div>
                )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TheaterManagement;
