import React, { useEffect, useState } from "react";
import { ScreenData } from "../admindata/TheaterData";
import "../admincss/ScreenManagement.css";
import "../pagecss/AdminPage.css";
import { getScreens } from "../api/api";

const ScreenManagement = () => {
  const [screens, setScreens] = useState([]);
  // const getStatusClass = (status) => {
  //   switch (status) {
  //     case "정상":
  //       return "adp-active";
  //     case "점검중":
  //       return "adp-maintenance";
  //     case "비활성":
  //       return "adp-terminated";
  //     default:
  //       return "adp-pending";
  //   }
  // };

  useEffect(() => {
    getScreens()
      .then((response) => {
        // response.data가 배열인지 확인, 아니면 빈 배열 설정
        setScreens(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.error("Error fetching screens:", error);
        setScreens([]); // 에러 발생 시 빈 배열 설정
      });
  }, []);
  return (
    <div className="adp-content">
      <div className="adp-header">
        <h2>상영관 관리</h2>
        <button className="adp-btn-primary">상영관 추가</button>
      </div>

      <div className="screen-background">
        <div className="scm-screen-grid">
          {screens.map((screen) => (
            <div className="scm-screen-card" key={screen.screencd}>
              <h3>
                {screen.cinemanm} - {screen.screenname}
              </h3>
              <div className="scm-screen-info">
                <p>
                  <strong>지역:</strong> {screen.regionnm} ({screen.regioncd})
                </p>
                <p>
                  <strong>극장 코드:</strong> {screen.cinemacd}
                </p>
                <p>
                  <strong>상영관 코드:</strong> {screen.screencd}
                </p>
                <p>
                  <strong>상영관 이름:</strong> {screen.screenname}
                </p>
                <p>
                  <strong>좌석 수:</strong> {screen.seatcount}석
                </p>
              </div>
              <div className="scm-screen-actions">
                <button className="adp-btn-edit">좌석 편집</button>
                <button className="adp-btn-maintenance">점검</button>
              </div>
            </div>
          ))}
          {screens.length === 0 && <p>상영관 데이터가 없습니다.</p>}
        </div>
      </div>
    </div>
  );
};

export default ScreenManagement;
