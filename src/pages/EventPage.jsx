import React from "react";
import Header from "../pubcomponent/Header";
import Event from "../components/eventpagecomponents/Event";
import "../pagecss/EventPage.css";

const EventPage = () => {
  return (
    <div>
      <Header />
      <Event />
    </div>
  );
};

export default EventPage;
