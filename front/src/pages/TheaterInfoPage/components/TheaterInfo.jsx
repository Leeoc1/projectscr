import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/TheaterInfo.css";

const TheaterInfo = ({ cinemacd, cinemanm, tel, address }) => {

  const navigate = useNavigate();

  const handleReservationClick = () => {
    sessionStorage.setItem("cinemacd", cinemacd);
    sessionStorage.setItem("cinemanm", cinemanm);
    navigate("/reservation/movie");
  };


  return (
    <div>
      <div className="ti-info-wrap"> 
        <h1>{cinemanm}</h1>
        <p>{address}</p>
        <p>{tel}</p>
      </div>
      
      <button className="ti-reservation-button" onClick={handleReservationClick}><strong>예매하기</strong></button>
    </div>
  );
};

export default TheaterInfo;
