import React, { useState, useEffect } from "react";
import { events, winners } from "../../../data/EventPageData.js";
import Header from "../../../shared/Header";
import Footer from "../../../shared/Footer";
import EventFilter from "./EventFilter";
import EventCard from "./EventCard";
import WinnerItem from "./WinnerItem";
import "../styles/EventPage.css";
import "../styles/EventFilter.css";

const Event = () => {
  const [filter, setFilter] = useState("전체");

  const filteredEvents =
    filter === "전체"
      ? events
      : events.filter((event) => event.category === filter);

  useEffect(() => {
    document.body.classList.add("no-header-padding");
    return () => {
      document.body.classList.remove("no-header-padding");
    };
  }, []);

  return (
    <div className="evp-page">
      <Header />
      <div className="evp-content">
        <div className="evp-main">
          <div className="evp-container">
            <section className="evp-section">
              <EventFilter filter={filter} setFilter={setFilter} />
              <div className="evp-grid">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </section>

            <section className="evws-section">
              <h2 className="evws-title">당첨자 발표</h2>
              <div className="evws-list">
                {winners.map((winner) => (
                  <WinnerItem key={winner.id} winner={winner} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Event;
