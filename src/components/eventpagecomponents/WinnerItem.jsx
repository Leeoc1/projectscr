import React from "react";
import "../../componentcss/eventpagecomponentcss/Event.css";

const WinnerItem = ({ winner }) => {
  return (
    <div className="etp-winner-item">
      <div className="etp-winner-event">{winner.event}</div>
      <div className="etp-winner-prize">{winner.prize}</div>
      <div className="etp-winner-name">{winner.name}</div>
      <div className="etp-winner-date">{winner.date}</div>
    </div>
  );
};

export default WinnerItem;
