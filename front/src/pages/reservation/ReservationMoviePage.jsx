import React, { useEffect } from "react";
import Header from "../../pubcomponent/Header";
import Movies from "../../components/moviepagecomponents/Movies";
import "../../pagecss/reservation/ReservationMoviePage.css";

const ReservationMoviePage = () => {
  useEffect(() => {
    document.body.classList.add("no-header-padding");
    return () => {
      document.body.classList.remove("no-header-padding");
    };
  }, []);

  return (
    <div className="rmp-page">
      <Header />
      <div>
        <div className="rmp-container">
          <h1 className="rmp-title">영화 예매</h1>
          <Movies />
        </div>
      </div>
    </div>
  );
};

export default ReservationMoviePage;
