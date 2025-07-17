import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/TheaterInfo.css";

const TheaterInfo = ({ cinemacd, cinemanm, tel, address, myState, theaterState }) => {
  const navigate = useNavigate();

  // 예매하기 버튼 클릭시 예매페이지로 이동(영화 선택)
  const handleReservationClick = () => {
    sessionStorage.setItem("cinemacd", cinemacd);
    sessionStorage.setItem("cinemanm", cinemanm);
    navigate("/reservation/movie");
  };

  // 길찾기 버튼, 클릭시 카카오맵으로 이동(현위치에 현위치, 도착지에 해당 영화관)
  const handleFindRoadClick = () => {
    window.open(
      `https://map.kakao.com/link/from/현위치,${myState.center.lat},${myState.center.lng}/to/${cinemanm},${theaterState.center.lat},${theaterState.center.lng}`,
      "_blank"
    );
  };


  return (
    <div>
      <div className="ti-info-wrap">
        <h1>{cinemanm}</h1>
        <p>{address}</p>
        <p>{tel}</p>
      </div>

      <button
        className="ti-reservation-button"
        onClick={handleReservationClick}
      >
        <strong>예매하기</strong>
      </button>
      <button className="ti-findroad-button" onClick={handleFindRoadClick}>
        <strong>길찾기</strong>
      </button>
    </div>
  );
};

export default TheaterInfo;
