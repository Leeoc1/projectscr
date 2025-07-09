import React, { useEffect, useState } from "react";
import { getTotalVolume, getCinemaVolume } from "../../../../api/api";
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';

const ChartSection = () => {
  const [totalVolume, setTotalVolume] = useState([]);
  const [cinemaVolume, setCinemaVolume] = useState([]);

  useEffect(() => {
    const fetchTotalVolume = async () => {
      const totalVolumeData = await getTotalVolume();
      const cinemaVolumeData = await getCinemaVolume();console.log('cinemaVolumeData:', cinemaVolumeData); // 데이터 확인
      console.log('pieData:', cinemaVolumeData.sort((a, b) => b.totalAmount - a.totalAmount).slice(0, 6).map((item, idx) => ({
        id: item.cinemaName,
        value: item.totalAmount,
        color: pieColors[idx % pieColors.length],
      })));
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
  const reversedVolume = [...totalVolume].reverse();

  // Nivo Bar 차트용 데이터 변환
  const nivoBarData = reversedVolume.map(item => ({
    reservationDate: formatDate(item.reservationDate),
    매출액: item.totalAmount,
  }));
  const barKeys = ['매출액'];

  // 파이차트 데이터 (상위 6개)
  const pieColors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#a21caf", "#6366f1"];
  const sortedCinema = [...cinemaVolume].sort((a, b) => b.totalAmount - a.totalAmount).slice(0, 6);
  const totalPie = sortedCinema.reduce((sum, cur) => sum + cur.totalAmount, 0);
  // Nivo Pie용 데이터 변환
  const pieData = sortedCinema.map((item, idx) => ({
    id: item.cinemaName,
    value: item.totalAmount,
    color: pieColors[idx % pieColors.length],
  }));

  // Nivo Pie 중앙에 합계 표시 custom layer
  const CenteredMetric = ({ dataWithArc, centerX, centerY }) => {
    const total = dataWithArc.reduce((acc, datum) => acc + datum.value, 0);
    return (
      <text
        x={centerX}
        y={centerY}
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fontSize: 22, fontWeight: 700 }}
      >
        {total.toLocaleString()}원
      </text>
    );
  };

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
          {/* Nivo Bar 차트로 교체 */}
          <div className="nivo-bar">
            <ResponsiveBar
              data={nivoBarData}
              keys={barKeys}
              indexBy="reservationDate"
              margin={{ top: 20, right: 20, bottom: 40, left: 70 }}
              padding={0.3}
              groupMode="stacked"
              colors={["#3b82f6"]}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '날짜',
                legendPosition: 'middle',
                legendOffset: 32,
              }}
              axisLeft={{
                tickSize: 10,
                tickRotation: 30,
                legend: '매출',
                legendPosition: 'middle',
                legendOffset: -55,
                legendRotation: 90,
              }}
              enableLabel={false}
              tooltip={({ id, value, indexValue }) => (
                <div className="bar-detail">
                  <strong>{indexValue}</strong><br/>
                  {id}: {value}원
                </div>
              )}
              theme={{
                axis: {
                  ticks: {
                    text: { fontSize: 10 },
                  },
                  legend: {
                    text: { fontSize: 15 },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
      <div className="slo-chart-card">
        <h3>상영관별 매출</h3>
        <div className="slo-chart-placeholder slo-piechart-wrap">
          {/* Nivo Pie 차트로 교체 */}
          <div style={{ height: 400, width: 400, margin: '0 auto' }}>
            <ResponsivePie
              data={pieData}
              colors={pieData.map(d => d.color)}
              innerRadius={0.5}
              margin={{ top: 20, right: 150, bottom: 20, left: 20 }}
              padAngle={1.5}
              cornerRadius={3}
              activeOuterRadiusOffset={8}
              enableArcLinkLabels={false}
              arcLabelsSkipAngle={10}
              arcLabelsTextColor="#222"
              layers={['arcs', 'arcLabels', CenteredMetric]}
              theme={{
                labels: { text: { fontSize: 14, fontWeight: 500 } },
              }}
              legends={[
                {
                  anchor: 'top-right',
                  direction: 'column',
                  justify: false,
                  translateX: 20,
                  translateY: 0,
                  itemsSpacing: 8,
                  itemWidth: 10,
                  itemHeight: 20,
                  itemTextColor: '#222',
                  symbolSize: 18,
                  symbolShape: 'circle',
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
