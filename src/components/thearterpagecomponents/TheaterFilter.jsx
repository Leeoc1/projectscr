import React from "react";
import { regions } from "../../Data/TheaterPageData";

const TheaterFilter = ({ selectedRegion, setSelectedRegion }) => {
  return (
    <div>
      <h2 className="rts-section-title">지역별 극장</h2>
      <div className="rts-region-tabs">
        {regions.map((region) => (
          <button
            key={region}
            className={`rts-region-tab${
              selectedRegion === region ? " active" : ""
            }`}
            onClick={() => setSelectedRegion(region)}
          >
            {region}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TheaterFilter;
