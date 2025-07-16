import React, { useEffect, useState } from "react";
import "../../styles/ScreenManagement.css";
import "../../styles/AdminPage.css";
import { getScreenView, updateScreenStatus } from "../../../../api/api";
import ScreenStatus from "../TheaterManagement/ScreenStatus";

const ScreenManagement = () => {
  const [screens, setScreens] = useState([]);
  const [showStatusPopup, setShowStatusPopup] = useState(false);
  const [selectedScreen, setSelectedScreen] = useState(null);
  
  const getStatusClass = (status) => {
    switch (status) {
      case "운영중":
        return "adp-active";
      case "점검중":
        return "adp-maintenance";
      case "비활성":
        return "adp-terminated";
      default:
        return "adp-pending";
    }
  };

  const handleStatusChange = async (screen, newStatus) => {
    try {
      const response = await updateScreenStatus({
        screencd: screen.screencd,
        screenstatus: newStatus,
      });

      if (response) {
        setScreens(prevScreens => prevScreens.map(s => s.screencd === screen.screencd ? { ...s, screenstatus: newStatus } : s));
        console.log("상영관 상태 변경 성공");
      }
    } catch (error) {
      console.error("상영관 상태 변경 실패:", error);
      // 에러 처리 (알림 등)
    }
    
    setShowStatusPopup(false);
    setSelectedScreen(null);
  };

  const openStatusPopup = (screen) => {
    setSelectedScreen(screen);
    setShowStatusPopup(true);
  };

  const closeStatusPopup = () => {
    setShowStatusPopup(false);
    setSelectedScreen(null);
  };

  useEffect(() => {
    const fetchScreens = async () => {
      const data = await getScreenView();
      setScreens(data);
    };
    fetchScreens();
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
              <div className="scm-status-indicator">
                <div className={`scm-status-badge ${getStatusClass(screen.screenstatus)}`}>
                  <span className="scm-status-text">{screen.screenstatus}</span>
                </div>
              </div>
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
                  <strong>좌석 수:</strong> {screen.allseat}석
                </p>
              </div>
              <div className="scm-screen-actions">
                <button className="adp-btn-edit">좌석 편집</button>
                <button 
                  className="adp-btn-maintenance"
                  onClick={() => openStatusPopup(screen)}
                >
                  점검
                </button>
              </div>
            </div>
          ))}
          {screens.length === 0 && <p>상영관 데이터가 없습니다.</p>}
        </div>
      </div>

      {/* 상태 변경 팝업 */}
      {showStatusPopup && selectedScreen && (
        <ScreenStatus
          screen={selectedScreen}
          onStatusChange={handleStatusChange}
          onClose={closeStatusPopup}
        />
      )}
    </div>
  );
};

export default ScreenManagement; 