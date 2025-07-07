import React, { useEffect } from "react";
import TheaterInfo from "./components/TheaterInfo";
import MapInfo from "./components/MapInfo";
import { useLocation, Navigate } from "react-router-dom";
import Header from "../../shared/Header";

const TheaterInfoPage = () => {
  const { state } = useLocation();

  useEffect(() => {
    document.body.classList.add("no-header-padding");
    return () => {
      document.body.classList.remove("no-header-padding");
    };
  }, []);

  return (
    <div>
      <Header />
      <div>
        <TheaterInfo cinemanm={state.cinemanm} tel={state.tel} />
        {!state.address ? (
          <Navigate to="/theater" replace />
        ) : (
          <MapInfo address={state.address} />
        )}
      </div>
    </div>
  );
};

export default TheaterInfoPage;
