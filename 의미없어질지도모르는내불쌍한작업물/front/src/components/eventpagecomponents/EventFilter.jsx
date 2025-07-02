import React from "react";
import "../../componentcss/eventpagecomponentcss/EventFilter.css";

const EventFilter = ({ filter, setFilter }) => {
  const categories = ["전체", "할인 이벤트", "신작 이벤트", "멤버십", "특별관"];

  return (
    <div className="evfs-filter">
      {categories.map((category) => (
        <button
          key={category}
          className={`evfs-filter-btn ${
            filter === category ? "evfs-active" : ""
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
