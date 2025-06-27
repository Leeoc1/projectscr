import React from "react";
import "../../componentcss/eventpagecomponentcss/Event.css";

const EventFilter = ({ filter, setFilter }) => {
  const categories = ["전체", "할인 이벤트", "신작 이벤트", "멤버십", "특별관"];

  return (
    <div className="etp-events-filter">
      {categories.map((category) => (
        <button
          key={category}
          className={`etp-filter-btn ${
            filter === category ? "etp-active" : ""
          }`}
          onClick={() => setFilter(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default EventFilter;
