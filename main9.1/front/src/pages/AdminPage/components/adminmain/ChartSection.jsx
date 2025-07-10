import React, { useEffect, useState } from "react";
import { getTotalVolume, getCinemaVolume } from "../../../../api/api";

const ChartSection = () => {
  const [totalVolume, setTotalVolume] = useState([]);
  const [cinemaVolume, setCinemaVolume] = useState([]);

  useEffect(() => {
    const fetchTotalVolume = async () => {
      const totalVolumeData = await getTotalVolume();
      const cinemaVolumeData = await getCinemaVolume();
      setTotalVolume(totalVolumeData);
      setCinemaVolume(cinemaVolumeData);
    };
    fetchTotalVolume();
  }, []);

  // 날짜 포맷 함수
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${mm}-${dd}`;
  };

  // 최대/최소 매출 데이터
  const maxData = totalVolume.reduce((max, cur) => cur.totalAmount > max.totalAmount ? cur : max, totalVolume[0] || {totalAmount: 0, reservationDate: ''});
  const minData = totalVolume.reduce((min, cur) => cur.totalAmount < min.totalAmount ? cur : min, totalVolume[0] || {totalAmount: 0, reservationDate: ''});

  // 최대 금액 및 막대그래프 데이터 역순
  const maxAmount = totalVolume.length > 0 ? Math.max(...totalVolume.map(item => item.totalAmount || 0)) : 0;
  const maxBarHeight = 180; // px
  const reversedVolume = [...totalVolume].reverse();

  // 파이차트 데이터 (상위 6개)
  const pieColors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#a21caf", "#6366f1"];
  const sortedCinema = [...cinemaVolume].sort((a, b) => b.totalAmount - a.totalAmount).slice(0, 6);
  const totalPie = sortedCinema.reduce((sum, cur) => sum + cur.totalAmount, 0);
  let prevPercent = 0;
  const pieSlices = sortedCinema.map((item, idx) => {
    const percent = totalPie > 0 ? (item.totalAmount / totalPie) * 100 : 0;
    const start = prevPercent;
    const end = prevPercent + percent;
    prevPercent = end;
    return {
      color: pieColors[idx % pieColors.length],
      start,
      end,
      label: item.cinemaName,
      amount: item.totalAmount,
      percent: percent
    };
  });
  const pieGradient = pieSlices.map(slice => `${slice.color} ${slice.start}% ${slice.end}%`).join(", ");

  return (
    <div className="slo-charts-section">
      <div className="slo-chart-card">
        <h3 style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          일별 매출 추이
          <span style={{fontSize: '0.9rem', fontWeight: 400, textAlign: 'right', lineHeight: 1.3}}>
            최대: {maxData ? `${formatDate(maxData.reservationDate)} (${maxData.totalAmount}원)` : '-'}<br/>
            최소: {minData ? `${formatDate(minData.reservationDate)} (${minData.totalAmount}원)` : '-'}
          </span>
        </h3>
        <div className="slo-chart-placeholder">
          <div className="slo-chart-bars">
            {reversedVolume.map((item, index) => (
              <div key={index} className="slo-chart-bar-container">
                <div
                  className="slo-chart-bar"
                  style={{ height: `${maxAmount > 0 ? (item.totalAmount / maxAmount) * maxBarHeight : 4}px` }}
                  title={`${item.reservationDate}: ${item.totalAmount}원`}
                />
                <div className="slo-chart-date">{formatDate(item.reservationDate)}</div>
                <div className="slo-chart-amount">{item.totalAmount}원</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="slo-chart-card">
        <h3>상영관별 매출</h3>
        <div className="slo-chart-placeholder slo-piechart-wrap">
          <div className="slo-piechart-labels">
            {pieSlices.map((slice, idx) => (
              <div key={slice.label} className="slo-piechart-label" style={{ color: slice.color }}>
                {slice.label}
              </div>
            ))}
          </div>
          <div className="slo-pie-chart slo-piechart-center" style={{ background: `conic-gradient(${pieGradient})` }} />
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
