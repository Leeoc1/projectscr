import React from "react";
import "../styles/EventCard.css";

const EventCard = ({ event }) => {
  return (
    <div className={`evc-card ${event.isFeatured ? "evc-featured" : ""}`}>
      <div className="evc-image">
        <img src={event.image} alt="이벤트 이미지" />
        {event.badge && (
          <div className={`evc-badge evc-${event.badge}`}>
            {event.badge.toUpperCase()}
          </div>
        )}
      </div>
      <div className="evc-content">
        <div className="evc-category">{event.category}</div>
        <h3 className="evc-title">{event.title}</h3>
        <p className="evc-description">{event.description}</p>
      </div>
      <div className="evc-period">
        <span className="evc-period-label">이벤트 기간</span>
        <span className="evc-period-date">{event.period}</span>
      </div>
    </div>
  );
};

export default EventCard;
