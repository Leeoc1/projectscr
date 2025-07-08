import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NoticeItem = ({ item, index, type }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isFaq = type === 'faq';
  const navigate = useNavigate();


  // 클릭 시 토글
  const handleClick = () => {
    if (isFaq) setIsExpanded(prev => !prev);
  };

  const handleNoticeTitleClick = () => {
    navigate(`/notice/${item.noticenum}`);
  }

  // 헬퍼 함수들
  const getNumber = () => isFaq ? `Q${index + 1}` : index + 1;
  const getTitle = () => isFaq ? item.faqsub : item.noticesub;
  const getDate = () => {
    const date = item.faqdate || item.noticedate;
    return date ? new Date(date).toLocaleDateString('ko-KR') : `2024.01.${String(index + 1).padStart(2, '0')}`;
  };

  return (
    <div
      className={`notice-item ${isFaq ? 'faq-item' : ''}`}
      onClick={isFaq ? handleClick : undefined}
      onMouseLeave={isFaq ? () => setIsExpanded(false) : undefined}
      style={{ cursor: isFaq ? 'pointer' : 'default' }}
    >
      <div className="notice-number">{getNumber()}</div>
      <div className="notice-content">
        {isFaq ? (
          <div className="faq-content">
            <div className="notice-title">{getTitle()}</div>
            <div
              className={`faq-answer-block${isExpanded && item.faqcontents ? ' open' : ''}`}
            >
              <div className="answer-content">{item.faqcontents}</div>
            </div>
          </div>
        ) : (
          <div>
            <span className="notice-type">{item.noticetype}</span>
            <span 
            className="notice-title"
            onClick={handleNoticeTitleClick}
            >{getTitle()}</span>
            
          </div>
        )}
      </div>
      <div className="notice-date">{getDate()}</div>
    </div>
  );
};

export default NoticeItem; 