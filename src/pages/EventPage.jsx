import React, { useEffect, useState } from "react";
import Header from "../pubcomponent/Header";
import "../pagecss/EventPage.css";
import { events, winners } from "../Data/EventPageData";
import EventFilter from "../components/eventpagecomponents/EventFilter";
import EventCard from "../components/eventpagecomponents/EventCard";
import WinnerItem from "../components/eventpagecomponents/WinnerItem";

const EventPage = () => {
  const [filter, setFilter] = useState("전체");

  // 필터링된 이벤트 목록
  const filteredEvents =
    filter === "전체"
      ? events
      : events.filter((event) => event.category === filter);

  // 상단 패딩 제거
  useEffect(() => {
    document.body.classList.add("no-header-padding");
    return () => {
      document.body.classList.remove("no-header-padding");
    };
  }, []);

  return (
    <div className="etp-events-page">
      <Header />
      <div className="etp-events-content">
        <div className="etp-events-main">
          <div className="etp-events-container">
            <section className="etp-events-section">
              <EventFilter filter={filter} setFilter={setFilter} />
              <div className="etp-events-grid">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </section>

            <section className="etp-winners-section">
              <h2 className="etp-section-title">당첨자 발표</h2>
              <div className="etp-winners-list">
                {winners.map((winner) => (
                  <WinnerItem key={winner.id} winner={winner} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
