import Header from "../../pubcomponent/Header";
import "../../componentcss/thearterpagecomponentcss/TheaterBox.css";
import "../../componentcss/thearterpagecomponentcss/SpecialTheaterSection.css";
import RegionTheaterSection from "./RegionTheaterSection";
import SpecialTheaterSection from "./SpecialTheaterSection";
import TheaterFilter from "./TheaterFilter";
import { theaterData } from "../../Data/TheaterPageData";
import { useState } from "react";

const TheaterBox = () => {
  const [selectedRegion, setSelectedRegion] = useState("전체");

  const filteredTheaters =
    selectedRegion === "전체"
      ? theaterData
      : theaterData.filter((theater) => theater.region === selectedRegion);

  return (
    <div className="rts-page">
      <Header isOtherPage={true} isScrolled={true} />
      <div className="rts-content">
        <div className="rts-main">
          <div className="rts-container">
            <TheaterFilter
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
            />
            <RegionTheaterSection filteredTheaters={filteredTheaters} />
            <SpecialTheaterSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheaterBox;
