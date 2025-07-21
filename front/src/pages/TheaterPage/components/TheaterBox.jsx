import Header from "../../../shared/Header";
import "../styles/TheaterBox.css";
import "../styles/SpecialTheaterSection.css";
import RegionTheaterSection from "./RegionTheaterSection";
import SpecialTheaterSection from "./SpecialTheaterSection";
import TheaterFilter from "./TheaterFilter";
import { useState, useEffect } from "react";
import { getCinemas } from "../../../api/cinemaApi";


const TheaterBox = () => {
  const [selectedRegion, setSelectedRegion] = useState("00");
  const [cinemas, setCinemas] = useState([]);

  useEffect(() => {
    const fetchCinemas = async () => {
      const data = await getCinemas();
      // 'CGV 이름'과 'CGV이름'을 동일하게 취급하여 정렬
      const normalizeCGV = (name) => name.replace(/^CGV\s*/, 'CGV');
      // 이름을 정규화하여 비교 후 정렬
      const sorted = data.slice().sort((a, b) => {
        const nameA = normalizeCGV(a.cinemanm);
        const nameB = normalizeCGV(b.cinemanm);
        return nameA.localeCompare(nameB, 'ko');
      });
      setCinemas(sorted);
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
