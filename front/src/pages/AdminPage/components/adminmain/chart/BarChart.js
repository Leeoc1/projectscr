import React from "react";
import { ResponsiveBar } from '@nivo/bar';

// 날짜 포맷 함수
const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${mm}-${dd}`;
};

const BarChart = ({ data, onPrevious, onNext, currentChartIndex }) => {
  const safeData = data || [];
  const nivoBarData = safeData.length > 0 ? safeData.map(item => ({
    reservationDate: formatDate(item.date || item.reservationDate),
    매출액: item.amount || item.totalAmount,
  })).reverse() : [];

  // 아래 JSX는 기존 그대로 두세요!
  return (
    <div className="slo-chart-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <button 
          onClick={onPrevious}
          style={{
            background: currentChartIndex === 0 ? '#9ca3af' : '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '8px 12px',
            cursor: currentChartIndex === 0 ? 'not-allowed' : 'pointer',
            fontSize: '14px'
          }}
          disabled={currentChartIndex === 0}
        >
          ← 이전
        </button>
        
        <h3 style={{ margin: 0, flex: 1, textAlign: 'center' }}>
          일별 매출 추이
        </h3>
        
        <button 
          onClick={onNext}
          style={{
            background: currentChartIndex === 1 ? '#9ca3af' : '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '8px 12px',
            cursor: currentChartIndex === 1 ? 'not-allowed' : 'pointer',
            fontSize: '14px'
          }}
          disabled={currentChartIndex === 1}
        >
          다음 →
        </button>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <span style={{fontSize: '0.9rem', fontWeight: 400, textAlign: 'right', lineHeight: 1.3}}>
          {nivoBarData.length > 0 ? (
            <>
              최대: {Math.max(...nivoBarData.map(d => d.매출액))}원<br/>
              최소: {Math.min(...nivoBarData.map(d => d.매출액))}원
            </>
          ) : (
            '데이터가 없습니다'
          )}
        </span>
      </div>
      
      <div className="slo-chart-placeholder">
        {nivoBarData.length > 0 ? (
          <div className="nivo-bar">
            <ResponsiveBar
              data={nivoBarData}
              keys={['매출액']}
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
                  ticks: { text: { fontSize: 10 } },
                  legend: { text: { fontSize: 15 } },
                },
              }}
            />
          </div>
        ) : (
          <div style={{ 
            height: '300px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            border: '2px dashed #ccc',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9'
          }}>
            <div style={{ textAlign: 'center', color: '#666' }}>
              <div style={{ fontSize: '24px', marginBottom: '10px' }}>📊</div>
              <div style={{ fontSize: '16px', fontWeight: '500' }}>차트 준비 중</div>
              <div style={{ fontSize: '14px', marginTop: '5px' }}>곧 새로운 차트가 추가됩니다</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BarChart; 