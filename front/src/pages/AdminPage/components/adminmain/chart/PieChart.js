import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// 파이차트 중앙 합계 표시 컴포넌트
const CenteredMetric = ({ cx, cy, total }) => {
  return (
    <text
      x={cx}
      y={cy}
      textAnchor="middle"
      dominantBaseline="central"
      style={{ fontSize: 18, fontWeight: 700 }}
    >
      {total.toLocaleString()}원
    </text>
  );
};

// 파이차트 컴포넌트
const PieChartComponent = ({ data, onPrevious, onNext, currentChartIndex }) => {
  const pieColors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#a21caf", "#6366f1"];
  
  const pieData = [...data]
    .sort((a, b) => b.totalAmount - a.totalAmount)
    .slice(0, 6)
    .map((item, idx) => ({
      name: item.cinemaName,
      value: item.totalAmount,
      color: pieColors[idx % pieColors.length],
    }));
  
  console.log('PieChart 데이터:', pieData);
  
  const total = pieData.reduce((sum, item) => sum + item.value, 0);

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
          상영관별 매출
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
        <div style={{ height: 400, width: 400, margin: '0 auto' }}>
          <ResponsiveContainer width="100%" height="100%">
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
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PieChartComponent; 