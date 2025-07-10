import React, { useEffect } from "react";
import TheaterInfo from "./components/TheaterInfo";
import MapInfo from "./components/MapInfo";
import { useLocation, Navigate } from "react-router-dom";
import Header from "../../shared/Header";
import "./style/TheaterInfoPage.css";

const TheaterInfoPage = () => {
  const { state } = useLocation();

  useEffect(() => {
    document.body.classList.add("no-header-padding");
    return () => {
      document.body.classList.remove("no-header-padding");
    };
  }, []);

  return (
    <div className="tip-page">
      <Header />
      <div className="tip-container">
        <TheaterInfo cinemacd={state.cinemacd} cinemanm={state.cinemanm} tel={state.tel} address={state.address} />
        {!state.address ? (
          <Navigate to="/theater" replace />
        ) : (
          <MapInfo cinemanm={state.cinemanm} tel={state.tel} address={state.address} />
        )}
      </div>
    </div>
  );
};

export default TheaterInfoPage;
