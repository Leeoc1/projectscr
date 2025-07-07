import React from "react";
import { useLocation } from "react-router-dom";

const TheaterInfo = ({ cinemanm, tel }) => {


  return (
    <div>
      <h1>{cinemanm}</h1>
      <p>{tel}</p>
    </div>
  );
};

export default TheaterInfo;
