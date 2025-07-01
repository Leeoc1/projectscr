import React from "react";
import "../admincss/SalesOverview.css";
import "../pagecss/AdminPage.css";

const SalesOverview = () => (
  <div className="adp-content">
    <div className="adp-header">
      <h2>매출 현황</h2>
      <div className="slo-date-filter">
        <select>
          <option>오늘</option>
          <option>이번 주</option>
          <option>이번 달</option>
          <option>직접 선택</option>
        </select>
      </div>
    </div>

    <div className="slo-stats-grid">
      <div className="slo-stat-card">
        <h3>오늘 매출</h3>
        <div className="slo-stat-value">₩2,450,000</div>
        <div className="slo-stat-change slo-positive">+12.5%</div>
      </div>
      <div className="slo-stat-card">
        <h3>예매 건수</h3>
        <div className="slo-stat-value">342</div>
        <div className="slo-stat-change slo-positive">+8.2%</div>
      </div>
      <div className="slo-stat-card">
        <h3>평균 객단가</h3>
        <div className="slo-stat-value">₩14,200</div>
        <div className="slo-stat-change slo-negative">-2.1%</div>
      </div>
      <div className="slo-stat-card">
        <h3>점유율</h3>
        <div className="slo-stat-value">78%</div>
        <div className="slo-stat-change slo-positive">+5.3%</div>
      </div>
    </div>

    <div className="slo-charts-section">
      <div className="slo-chart-card">
        <h3>일별 매출 추이</h3>
        <div className="slo-chart-placeholder">
          <div className="slo-chart-bars">
            {[65, 78, 82, 45, 67, 89, 92].map((height, index) => (
              <div
                key={index}
                className="slo-chart-bar"
                style={{ height: `${height}%` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
      <div className="slo-chart-card">
        <h3>상영관별 매출</h3>
        <div className="slo-chart-placeholder">
          <div className="slo-pie-chart">
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

export default SalesOverview;
