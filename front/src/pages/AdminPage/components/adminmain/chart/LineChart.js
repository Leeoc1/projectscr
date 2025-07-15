import React from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// 날짜 포맷 함수
const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${mm}-${dd}`;
};

const LineChartComponent = ({
  data,
  onPrevious,
  onNext,
  currentChartIndex,
}) => {
  // 가데이터 생성 (테스트용)
  const mockData = [
    { date: "2025-01-08", count: 5 },
    { date: "2025-01-09", count: 8 },
    { date: "2025-01-10", count: 3 },
    { date: "2025-01-11", count: 12 },
    { date: "2025-01-12", count: 7 },
    { date: "2025-01-13", count: 9 },
    { date: "2025-01-14", count: 15 },
  ];

  const safeData = data && data.length > 0 ? data : mockData;
  const chartData = safeData.map((item) => ({
    date: formatDate(item.date),
    유저수: item.count,
  }));

  console.log("LineChart 데이터:", chartData);
  console.log("LineChart 데이터 상세:", JSON.stringify(chartData, null, 2));

  return (
    <div className="slo-chart-card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <button
          onClick={onPrevious}
          style={{
            background: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "8px 12px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          ← 이전
        </button>

        <h3 style={{ margin: 0, flex: 1, textAlign: "center" }}>
          일별 전체 유저 수 추
        </h3>

        <button
          onClick={onNext}
          style={{
            background: currentChartIndex === 1 ? "#9ca3af" : "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "8px 12px",
            cursor: currentChartIndex === 1 ? "not-allowed" : "pointer",
            fontSize: "14px",
          }}
          disabled={currentChartIndex === 1}
        >
          다음 →
        </button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <span
          style={{
            fontSize: "0.9rem",
            fontWeight: 400,
            textAlign: "right",
            lineHeight: 1.3,
          }}
        >
          최대: {Math.max(...chartData.map((d) => d.유저수))}명<br />
          최소: {Math.min(...chartData.map((d) => d.유저수))}명
        </span>
      </div>

      <div className="slo-chart-placeholder" style={{ height: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              label={{ value: "날짜", position: "insideBottom", offset: -4 }}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              label={{ value: "유저 수", angle: -90, position: "insideLeft" }}
            />
            <Tooltip
              formatter={(value) => [`${value}명`, "유저수"]}
              labelFormatter={(label) => `${label}`}
            />
            <Line
              type="monotone"
              dataKey="유저수"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ fill: "#10b981", strokeWidth: 2, r: 6 }}
              activeDot={{
                r: 8,
                stroke: "#10b981",
                strokeWidth: 2,
                fill: "#fff",
              }}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartComponent;
