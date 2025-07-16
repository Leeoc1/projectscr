import React, { useState, useEffect } from "react";
import { getRegions } from "../../../api/cinemaApi";

const TheaterFilter = ({ selectedRegion, setSelectedRegion }) => {
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    getRegions().then((data) => setRegions(data));
  }, []);

  return (
    <div>
      <h2 className="rts-section-title">지역별 극장</h2>
      <div className="rts-region-tabs">
        <button
            key={"00"}
            className={`rts-region-tab${
              selectedRegion === "00" ? " active" : ""
            }`}
            onClick={() => setSelectedRegion("00")}
          >
            전체
        </button>
        {regions.map((region) => (
          <button
            key={region.regioncd}
            className={`rts-region-tab${
              selectedRegion === region.regioncd ? " active" : ""
            }`}
            onClick={() => setSelectedRegion(region.regioncd)}
          >
            {region.regionnm}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TheaterFilter;
