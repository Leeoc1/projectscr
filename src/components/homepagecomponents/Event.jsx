import { eventsData } from "../../Data/mockData";
import "../../componentcss/homepagecomponentcss/Event.css";

export default function Event() {
  return (
    <section className="events-section">
      <div className="events-container">
        <div className="events-header">
          <h2 className="events-title">특별 이벤트</h2>
          <p className="events-subtitle">놓치면 안 될 특별한 혜택들</p>
        </div>

        <div className="events-grid">
          {eventsData.map((event, index) => (
            <div key={index} className="event-card">
              <img
                src={event.image}
                alt={event.title}
                className="event-image"
                onError={(e) => {
                  e.target.src =
                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMzMzMzMzIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmaWxsPSIjNjY2NjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2UgTm90IEZvdW5kPC90ZXh0Pgo8L3N2Zz4=";
                }}
              />
              <div className="event-content">
                <h3 className="event-title">{event.title}</h3>
                <p className="event-description">{event.description}</p>
                <div className="event-footer">
                  <span className={`event-badge ${event.badgeColor}`}>
                    {event.location}
                  </span>
                  <a href="#" className="event-link">
                    자세히 보기
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
