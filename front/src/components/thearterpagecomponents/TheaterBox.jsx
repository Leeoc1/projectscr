import Header from "../../pubcomponent/Header";
import "../../componentcss/thearterpagecomponentcss/TheaterBox.css";
import "../../componentcss/thearterpagecomponentcss/SpecialTheaterSection.css";
import RegionTheaterSection from "./RegionTheaterSection";
import SpecialTheaterSection from "./SpecialTheaterSection";
import TheaterFilter from "./TheaterFilter";
import { useState, useEffect } from "react";
import { getCinemas } from "../../api/api";


const TheaterBox = () => {
  const [selectedRegion, setSelectedRegion] = useState("00");
  const [cinemas, setCinemas] = useState([]);

  useEffect(() => {
    const fetchCinemas = async () => {
      const data = await getCinemas();
      setCinemas(data);
    };
    fetchCinemas();
  }, []);

  const filteredCinemas =
    selectedRegion === "00"
      ? cinemas
      : cinemas.filter((cinema) => cinema.regioncd === selectedRegion);

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
            <RegionTheaterSection filteredCinemas={filteredCinemas} />
            <SpecialTheaterSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheaterBox;
