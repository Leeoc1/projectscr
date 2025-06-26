import { useState } from "react";
import "../pagecss/AdminPage.css";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("sales");

  const sidebarItems = [
    { id: "sales", label: "매출 현황", icon: "📊" },
    { id: "staff", label: "직원 관리", icon: "👥" },
    { id: "users", label: "회원 관리", icon: "👤" },
    { id: "theaters", label: "극장 관리", icon: "🏢" },
    { id: "movies", label: "영화 관리", icon: "🎬" },
    { id: "screens", label: "상영관 관리", icon: "🎭" },
    { id: "reservations", label: "예약 관리", icon: "🎫" },
    { id: "inquiries", label: "고객 지원", icon: "💬" },
    { id: "events", label: "이벤트 관리", icon: "🎉" },
  ];

  const renderSalesOverview = () => (
    <div className="admin-content">
      <div className="admin-header">
        <h2>매출 현황</h2>
        <div className="date-filter">
          <select>
            <option>오늘</option>
            <option>이번 주</option>
            <option>이번 달</option>
            <option>직접 선택</option>
          </select>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>오늘 매출</h3>
          <div className="stat-value">₩2,450,000</div>
          <div className="stat-change positive">+12.5%</div>
        </div>
        <div className="stat-card">
          <h3>예매 건수</h3>
          <div className="stat-value">342</div>
          <div className="stat-change positive">+8.2%</div>
        </div>
        <div className="stat-card">
          <h3>평균 객단가</h3>
          <div className="stat-value">₩14,200</div>
          <div className="stat-change negative">-2.1%</div>
        </div>
        <div className="stat-card">
          <h3>점유율</h3>
          <div className="stat-value">78%</div>
          <div className="stat-change positive">+5.3%</div>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-card">
          <h3>일별 매출 추이</h3>
          <div className="chart-placeholder">
            <div className="chart-bars">
              {[65, 78, 82, 45, 67, 89, 92].map((height, index) => (
                <div
                  key={index}
                  className="chart-bar"
                  style={{ height: `${height}%` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className="chart-card">
          <h3>상영관별 매출</h3>
          <div className="chart-placeholder">
            <div className="pie-chart">
              <div className="pie-slice slice-1"></div>
              <div className="pie-slice slice-2"></div>
              <div className="pie-slice slice-3"></div>
              <div className="pie-slice slice-4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStaffManagement = () => (
    <div className="admin-content">
      <div className="admin-header">
        <h2>직원 관리</h2>
        <button className="btn-primary">직원 추가</button>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>직원 ID</th>
              <th>이름</th>
              <th>부서</th>
              <th>직급</th>
              <th>연락처</th>
              <th>근무 상태</th>
              <th>작업</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>EMP001</td>
              <td>김관리</td>
              <td>운영팀</td>
              <td>매니저</td>
              <td>010-1234-5678</td>
              <td>
                <span className="status active">근무중</span>
              </td>
              <td>
                <button className="btn-edit">수정</button>
                <button className="btn-delete">삭제</button>
              </td>
            </tr>
            <tr>
              <td>EMP002</td>
              <td>이직원</td>
              <td>매표소</td>
              <td>사원</td>
              <td>010-2345-6789</td>
              <td>
                <span className="status active">근무중</span>
              </td>
              <td>
                <button className="btn-edit">수정</button>
                <button className="btn-delete">삭제</button>
              </td>
            </tr>
            <tr>
              <td>EMP003</td>
              <td>박상영</td>
              <td>기술팀</td>
              <td>주임</td>
              <td>010-3456-7890</td>
              <td>
                <span className="status inactive">휴무</span>
              </td>
              <td>
                <button className="btn-edit">수정</button>
                <button className="btn-delete">삭제</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="admin-content">
      <div className="admin-header">
        <h2>회원 관리</h2>
        <div className="search-bar">
          <input type="text" placeholder="회원 검색..." />
          <button className="btn-search">검색</button>
        </div>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>회원 ID</th>
              <th>이름</th>
              <th>이메일</th>
              <th>가입일</th>
              <th>예매 횟수</th>
              <th>상태</th>
              <th>작업</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>USR001</td>
              <td>김영화</td>
              <td>movie@email.com</td>
              <td>2024-01-15</td>
              <td>23</td>
              <td>
                <span className="status active">정상</span>
              </td>
              <td>
                <button className="btn-view">보기</button>
                <button className="btn-edit">수정</button>
              </td>
            </tr>
            <tr>
              <td>USR002</td>
              <td>이시네마</td>
              <td>cinema@email.com</td>
              <td>2024-02-20</td>
              <td>12</td>
              <td>
                <span className="status active">정상</span>
              </td>
              <td>
                <button className="btn-view">보기</button>
                <button className="btn-edit">수정</button>
              </td>
            </tr>
            <tr>
              <td>USR003</td>
              <td>박관람</td>
              <td>watch@email.com</td>
              <td>2024-03-10</td>
              <td>5</td>
              <td>
                <span className="status inactive">정지</span>
              </td>
              <td>
                <button className="btn-view">보기</button>
                <button className="btn-edit">수정</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTheaterManagement = () => (
    <div className="admin-content">
      <div className="admin-header">
        <h2>극장 관리</h2>
        <button className="btn-primary">극장 추가</button>
      </div>

      <div className="theater-grid">
        <div className="theater-card">
          <h3>시네맥스 강남점</h3>
          <div className="theater-info">
            <p>
              <strong>주소:</strong> 서울시 강남구 테헤란로 123
            </p>
            <p>
              <strong>상영관:</strong> 8개
            </p>
            <p>
              <strong>좌석 수:</strong> 1,240석
            </p>
            <p>
              <strong>운영 상태:</strong>{" "}
              <span className="status active">정상 운영</span>
            </p>
          </div>
          <div className="theater-actions">
            <button className="btn-edit">수정</button>
            <button className="btn-view">상세보기</button>
          </div>
        </div>

        <div className="theater-card">
          <h3>시네맥스 홍대점</h3>
          <div className="theater-info">
            <p>
              <strong>주소:</strong> 서울시 마포구 홍익로 456
            </p>
            <p>
              <strong>상영관:</strong> 6개
            </p>
            <p>
              <strong>좌석 수:</strong> 980석
            </p>
            <p>
              <strong>운영 상태:</strong>{" "}
              <span className="status active">정상 운영</span>
            </p>
          </div>
          <div className="theater-actions">
            <button className="btn-edit">수정</button>
            <button className="btn-view">상세보기</button>
          </div>
        </div>

        <div className="theater-card">
          <h3>시네맥스 부산점</h3>
          <div className="theater-info">
            <p>
              <strong>주소:</strong> 부산시 해운대구 센텀로 789
            </p>
            <p>
              <strong>상영관:</strong> 10개
            </p>
            <p>
              <strong>좌석 수:</strong> 1,560석
            </p>
            <p>
              <strong>운영 상태:</strong>{" "}
              <span className="status maintenance">점검중</span>
            </p>
          </div>
          <div className="theater-actions">
            <button className="btn-edit">수정</button>
            <button className="btn-view">상세보기</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMovieManagement = () => (
    <div className="admin-content">
      <div className="admin-header">
        <h2>영화 관리</h2>
        <button className="btn-primary">영화 추가</button>
      </div>

      <div className="movie-management-tabs">
        <div className="tab-nav">
          <button className="tab-btn active">현재 상영작</button>
          <button className="tab-btn">상영 예정작</button>
          <button className="tab-btn">배너 관리</button>
          <button className="tab-btn">상영 스케줄</button>
        </div>

        <div className="movie-list">
          <div className="movie-item">
            <img src="/api/placeholder/120/180" alt="영화 포스터" />
            <div className="movie-details">
              <h3>아바타: 물의 길</h3>
              <p>장르: SF, 액션 | 등급: 12세이상관람가</p>
              <p>상영시간: 192분 | 개봉일: 2024-01-15</p>
              <p>상영관: 강남 1, 2, 3관 | 홍대 1, 2관</p>
            </div>
            <div className="movie-actions">
              <button className="btn-edit">수정</button>
              <button className="btn-schedule">스케줄</button>
              <button className="btn-delete">삭제</button>
            </div>
          </div>

          <div className="movie-item">
            <img src="/api/placeholder/120/180" alt="영화 포스터" />
            <div className="movie-details">
              <h3>탑건: 매버릭</h3>
              <p>장르: 액션, 드라마 | 등급: 12세이상관람가</p>
              <p>상영시간: 131분 | 개봉일: 2024-02-01</p>
              <p>상영관: 강남 4, 5관 | 부산 1, 2관</p>
            </div>
            <div className="movie-actions">
              <button className="btn-edit">수정</button>
              <button className="btn-schedule">스케줄</button>
              <button className="btn-delete">삭제</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderScreenManagement = () => (
    <div className="admin-content">
      <div className="admin-header">
        <h2>상영관 관리</h2>
        <button className="btn-primary">상영관 추가</button>
      </div>

      <div className="screen-grid">
        <div className="screen-card">
          <h3>강남점 1관</h3>
          <div className="screen-info">
            <p>
              <strong>좌석 수:</strong> 180석
            </p>
            <p>
              <strong>스크린 크기:</strong> 대형
            </p>
            <p>
              <strong>음향 시스템:</strong> Dolby Atmos
            </p>
            <p>
              <strong>상태:</strong> <span className="status active">정상</span>
            </p>
          </div>
          <div className="screen-layout">
            <div className="screen-preview">
              <div className="screen-line"></div>
              <div className="seats-preview">
                {Array.from({ length: 8 }, (_, row) => (
                  <div key={row} className="seat-row">
                    {Array.from({ length: 12 }, (_, seat) => (
                      <div key={seat} className="seat-mini"></div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="screen-actions">
            <button className="btn-edit">좌석 편집</button>
            <button className="btn-maintenance">점검</button>
          </div>
        </div>

        <div className="screen-card">
          <h3>강남점 2관</h3>
          <div className="screen-info">
            <p>
              <strong>좌석 수:</strong> 220석
            </p>
            <p>
              <strong>스크린 크기:</strong> IMAX
            </p>
            <p>
              <strong>음향 시스템:</strong> IMAX Enhanced
            </p>
            <p>
              <strong>상태:</strong>{" "}
              <span className="status maintenance">점검중</span>
            </p>
          </div>
          <div className="screen-layout">
            <div className="screen-preview">
              <div className="screen-line"></div>
              <div className="seats-preview">
                {Array.from({ length: 10 }, (_, row) => (
                  <div key={row} className="seat-row">
                    {Array.from({ length: 14 }, (_, seat) => (
                      <div key={seat} className="seat-mini"></div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="screen-actions">
            <button className="btn-edit">좌석 편집</button>
            <button className="btn-maintenance">점검</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReservationManagement = () => (
    <div className="admin-content">
      <div className="admin-header">
        <h2>예약 관리</h2>
        <div className="filter-section">
          <select>
            <option>전체</option>
            <option>예약 완료</option>
            <option>취소 요청</option>
            <option>환불 완료</option>
          </select>
          <input type="date" />
        </div>
      </div>

      <div className="reservation-tabs">
        <div className="tab-nav">
          <button className="tab-btn active">예약 목록</button>
          <button className="tab-btn">취소/환불</button>
          <button className="tab-btn">실시간 좌석</button>
          <button className="tab-btn">점검 스케줄</button>
        </div>

        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>예약번호</th>
                <th>고객명</th>
                <th>영화</th>
                <th>극장/상영관</th>
                <th>상영시간</th>
                <th>좌석</th>
                <th>금액</th>
                <th>상태</th>
                <th>작업</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>RSV001</td>
                <td>김영화</td>
                <td>아바타: 물의 길</td>
                <td>강남점 1관</td>
                <td>2024-06-26 14:00</td>
                <td>E5, E6</td>
                <td>₩28,000</td>
                <td>
                  <span className="status active">예약완료</span>
                </td>
                <td>
                  <button className="btn-view">상세</button>
                  <button className="btn-cancel">취소</button>
                </td>
              </tr>
              <tr>
                <td>RSV002</td>
                <td>이시네마</td>
                <td>탑건: 매버릭</td>
                <td>홍대점 2관</td>
                <td>2024-06-26 16:30</td>
                <td>F3, F4, F5</td>
                <td>₩42,000</td>
                <td>
                  <span className="status pending">취소요청</span>
                </td>
                <td>
                  <button className="btn-view">상세</button>
                  <button className="btn-refund">환불처리</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderInquiries = () => (
    <div className="admin-content">
      <div className="admin-header">
        <h2>고객 지원</h2>
        <div className="filter-section">
          <select>
            <option>전체</option>
            <option>미답변</option>
            <option>답변완료</option>
            <option>처리중</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>문의번호</th>
              <th>고객명</th>
              <th>문의유형</th>
              <th>제목</th>
              <th>등록일</th>
              <th>상태</th>
              <th>담당자</th>
              <th>작업</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>INQ001</td>
              <td>김고객</td>
              <td>예매 문의</td>
              <td>예매 취소 문의드립니다</td>
              <td>2024-06-26</td>
              <td>
                <span className="status pending">미답변</span>
              </td>
              <td>-</td>
              <td>
                <button className="btn-reply">답변</button>
                <button className="btn-assign">배정</button>
              </td>
            </tr>
            <tr>
              <td>INQ002</td>
              <td>이문의</td>
              <td>시설 문의</td>
              <td>장애인 편의시설 안내</td>
              <td>2024-06-25</td>
              <td>
                <span className="status active">답변완료</span>
              </td>
              <td>김관리</td>
              <td>
                <button className="btn-view">보기</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderEventManagement = () => (
    <div className="admin-content">
      <div className="admin-header">
        <h2>이벤트 관리</h2>
        <button className="btn-primary">이벤트 추가</button>
      </div>

      <div className="event-grid">
        <div className="event-card">
          <img src="/api/placeholder/300/200" alt="이벤트 배너" />
          <div className="event-details">
            <h3>개봉 기념 할인 이벤트</h3>
            <p>기간: 2024-06-20 ~ 2024-06-30</p>
            <p>할인: 전 영화 20% 할인</p>
            <p>
              상태: <span className="status active">진행중</span>
            </p>
          </div>
          <div className="event-actions">
            <button className="btn-edit">수정</button>
            <button className="btn-stats">통계</button>
            <button className="btn-stop">중단</button>
          </div>
        </div>

        <div className="event-card">
          <img src="/api/placeholder/300/200" alt="이벤트 배너" />
          <div className="event-details">
            <h3>VIP 회원 전용 시사회</h3>
            <p>기간: 2024-07-01 ~ 2024-07-05</p>
            <p>대상: VIP 회원</p>
            <p>
              상태: <span className="status pending">준비중</span>
            </p>
          </div>
          <div className="event-actions">
            <button className="btn-edit">수정</button>
            <button className="btn-stats">통계</button>
            <button className="btn-start">시작</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "sales":
        return renderSalesOverview();
      case "staff":
        return renderStaffManagement();
      case "users":
        return renderUserManagement();
      case "theaters":
        return renderTheaterManagement();
      case "movies":
        return renderMovieManagement();
      case "screens":
        return renderScreenManagement();
      case "reservations":
        return renderReservationManagement();
      case "inquiries":
        return renderInquiries();
      case "events":
        return renderEventManagement();
      default:
        return renderSalesOverview();
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="admin-top-bar">
        <div className="admin-logo">
          <h1>CineMax 관리자</h1>
        </div>
        <div className="admin-user-info">
          <span>관리자님 환영합니다</span>
          <button className="btn-logout">로그아웃</button>
        </div>
      </div>

      <div className="admin-layout">
        {/* Sidebar */}
        <div className="admin-sidebar">
          <nav className="sidebar-nav">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                className={`sidebar-item ${
                  activeTab === item.id ? "active" : ""
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                <span className="sidebar-icon">{item.icon}</span>
                <span className="sidebar-label">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="admin-main">{renderContent()}</div>
      </div>
    </div>
  );
}
