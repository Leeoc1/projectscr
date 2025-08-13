import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import "../styles/BarChart.css";

// 날짜 포맷 함수
const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${mm}-${dd}`;
};

const BarChart = ({ data, onPrevious, onNext, currentChartIndex }) => {
  const safeData = data || [];
  const nivoBarData =
    safeData.length > 0
      ? safeData
          .map((item) => ({
            reservationDate: formatDate(item.date || item.reservationDate),
            매출액: item.amount || item.totalAmount,
          }))
          .reverse()
          .slice(1)
      : [];

  // 아래 JSX는 기존 그대로 두세요!
  return (
    <div className="slo-chart-card">
      <div className="br-header">
        <button
          onClick={onPrevious}
          className={`br-nav-button ${
            currentChartIndex === 0 ? "disabled" : ""
          }`}
          disabled={currentChartIndex === 0}
        >
          ← 이전
        </button>

        <h3 className="br-title">일별 매출 추이</h3>

        <button
          onClick={onNext}
          className={`br-nav-button ${
            currentChartIndex === 1 ? "disabled" : ""
          }`}
          disabled={currentChartIndex === 1}
        >
          다음 →
        </button>
      </div>

      <div className="br-stats-container">
        <span className="br-stats-text">
          {nivoBarData.length > 0 ? (
            <>
              최대: {Math.max(...nivoBarData.map((d) => d.매출액))}원<br />
              최소: {Math.min(...nivoBarData.map((d) => d.매출액))}원
            </>
          ) : (
            "데이터가 없습니다"
          )}
        </span>
      </div>

      <div className="slo-chart-placeholder">
        {nivoBarData.length > 0 ? (
          <div className="nivo-bar">
            <ResponsiveBar
              data={nivoBarData}
              keys={["매출액"]}
              indexBy="reservationDate"
              margin={{ top: 20, right: 20, bottom: 40, left: 70 }}
              padding={0.3}
              groupMode="stacked"
              colors={["#3b82f6"]}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "날짜",
                legendPosition: "middle",
                legendOffset: 32,
              }}
              axisLeft={{
                tickSize: 10,
                tickRotation: 30,
                legend: "매출",
                legendPosition: "middle",
                legendOffset: -55,
                legendRotation: 90,
              }}
              enableLabel={false}
              tooltip={({ id, value, indexValue }) => (
                <div className="br-bar-detail">
                  <strong>{indexValue}</strong>
                  <br />
                  {id}: {value}원
                </div>
              )}
              theme={{
                axis: {
                  ticks: { text: { fontSize: 10 } },
                  legend: { text: { fontSize: 15 } },
                },
              }}
            />
          </div>
        ) : (
          <div className="br-empty-state">
            <div className="br-empty-content">
              <div className="br-empty-icon">📊</div>
              <div className="br-empty-title">차트 준비 중</div>
              <div className="br-empty-subtitle">
                곧 새로운 차트가 추가됩니다
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BarChart;
