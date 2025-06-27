import React from "react";
import "../../componentcss/eventpagecomponentcss/Event.css";

const EventCard = ({ event }) => {
  return (
    <div className={`etp-event-card ${event.isFeatured ? "etp-featured" : ""}`}>
      <div className="etp-event-image">
        <img src={event.image} alt="이벤트 이미지" />
        {event.badge && (
          <div className={`etp-event-badge etp-${event.badge}`}>
            {event.badge.toUpperCase()}
          </div>
        )}
      </div>
      <div className="etp-event-content">
        <div className="etp-event-category">{event.category}</div>
        <h3 className="etp-event-title">{event.title}</h3>
        <p className="etp-event-description">{event.description}</p>
      </div>
      <div className="etp-event-period">
        <span className="etp-period-label">이벤트 기간</span>
        <span className="etp-period-date">{event.period}</span>
      </div>
    </div>
  );
};

export default EventCard;
