import React from "react";
import "../styles/WinnerItem.css";

const WinnerItem = ({ winner }) => {
  return (
    <div className="evws-item">
      <div className="evws-event">{winner.event}</div>
      <div className="evws-prize">{winner.prize}</div>
      <div className="evws-name">{winner.name}</div>
      <div className="evws-date">{winner.date}</div>
    </div>
  );
};

export default WinnerItem;
