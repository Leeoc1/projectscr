import React, { useEffect } from "react";
import Header from "../../../shared/Header";
import Footer from "../../../shared/Footer";
import ReservationMovies from "../ReservationPage/components/ReservationMovies";
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
    <div className="rmpp-page">
      <Header />
      <div className="rmpp-container">
        <h1 className="rmpp-title">영화 예매</h1>
        <p className="rmpp-subtitle">원하는 영화를 선택하여 예매하세요.</p>
        <ReservationMovies />
      </div>
      <Footer />
    </div>
  );
};

export default ReservationMoviePage;
