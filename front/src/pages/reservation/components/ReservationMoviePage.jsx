import React, { useEffect } from "react";
import Header from "../../../shared/Header";
import Footer from "../../../shared/Footer";
import Movies from "../../MoviePage/components/Movies";
import "../style/ReservationMoviePage.css";

const ReservationMoviePage = () => {
  useEffect(() => {
    document.body.classList.add("no-header-padding");
    return () => {
      document.body.classList.remove("no-header-padding");
    };
  }, []);
  useEffect(() => {
    sessionStorage.clear();
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
      <Footer />
    </div>
  );
};

export default ReservationMoviePage;
