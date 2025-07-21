import React from 'react';
import { useNavigate } from 'react-router-dom';

const NoticeItem = ({ item, index, type, isExpanded, onToggle }) => {
  const navigate = useNavigate();
  const isFaq = type === 'faq';
  const isReview = type === 'review';

  const handleClick = () => {
    if (isFaq) {
      onToggle(index);
    }
  };

  const handleNoticeClick = () => {
    navigate(`/notice/${item.noticenum}`);
  };

  const formatDate = (date) => {
    return date ? new Date(date).toLocaleDateString('ko-KR') : `2024.01.${String(index + 1).padStart(2, '0')}`;
  };

  return (
    <div
      className={`notice-item ${isFaq ? 'faq-item' : ''} ${isReview ? 'review-item' : ''}`}
      onClick={isFaq ? handleClick : undefined}
      style={{ cursor: isFaq ? 'pointer' : 'default' }}
    >
      <div className="notice-number">
        {isFaq ? `Q${index + 1}` : isReview ? `R${index + 1}` : index + 1}
      </div>
      
      <div className="notice-content">
        {isReview ? (
          <div className="review-content">
            <div className="notice-title">{item.movienm}</div>
            <div className="review-user">작성자: {item.userid}</div>
            <div className="review-rating">
              평점: {item.rating || 10}/10점
            </div>
            <div className="review-text">{item.reviewcontent}</div>
            {item.likes > 0 && (
              <div className="review-likes">👍 {item.likes}</div>
            )}
          </div>
        ) : isFaq ? (
          <div className="faq-content">
            <div className="notice-title">{item.faqsub}</div>
            {isExpanded && item.faqcontents && (
              <div className="faq-answer-block open">
                <div className="answer-content">{item.faqcontents}</div>
              </div>
            )}
          </div>
        ) : (
          <div>
            <span className="notice-type">{item.noticetype}</span>
            <span 
              className="notice-title"
              onClick={handleNoticeClick}
              style={{ cursor: 'pointer' }}
            >
              {item.noticesub}
            </span>
          </div>
        )}
      </div>
      
      <div className="notice-date">
        {formatDate(item.faqdate || item.noticedate || item.reviewdate)}
      </div>
    </div>
  );
};

export default NoticeItem; 