import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// 파이차트 컴포넌트
const PieMovieChartComponent = ({ data, onPrevious, onNext, currentChartIndex }) => {
  const pieColors = [
    "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#a21caf", 
    "#6366f1", "#ec4899", "#8b5cf6", "#06b6d4", "#84cc16"
  ];
  
  const pieData = (data && data.length > 0 ? data : []).map((item, idx) => ({
    name: item.movieName,
    value: item.totalAmount,
    color: pieColors[idx % pieColors.length],
  }));
  
  console.log('PieMovieChart 원본 데이터:', data);
  console.log('PieMovieChart 처리된 데이터:', pieData);
  
  const total = pieData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="slo-chart-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <button 
          onClick={onPrevious}
          style={{
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '8px 12px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          ← 이전
        </button>
        
        <h3 style={{ margin: 0, flex: 1, textAlign: 'center' }}>
          영화별 매출
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
      
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '10px',
        fontSize: '14px',
        color: '#666',
        fontWeight: '500'
      }}>
        최고 매출: {pieData[0]?.name} ({pieData[0]?.value.toLocaleString()}원)
      </div>
      
      <div className="slo-chart-placeholder slo-piechart-wrap">
        {pieData.length > 0 ? (
          <div style={{ height: 400, width: 500, margin: '0 auto' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value.toLocaleString()}원`, '매출']}
                  labelFormatter={(label) => `${label}`}
                />
                <Legend 
                  verticalAlign="middle" 
                  align="right"
                  layout="vertical"
                  wrapperStyle={{ paddingLeft: '20px' }}
                  iconSize={8}
                  fontSize={5}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div style={{ 
            height: '400px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            border: '2px dashed #ccc',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9'
          }}>
            <div style={{ textAlign: 'center', color: '#666' }}>
              <div style={{ fontSize: '24px', marginBottom: '10px' }}>📊</div>
              <div style={{ fontSize: '16px', fontWeight: '500' }}>영화별 매출 데이터 준비 중</div>
              <div style={{ fontSize: '14px', marginTop: '5px' }}>예약 데이터를 확인해주세요</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PieMovieChartComponent; 