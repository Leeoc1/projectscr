import Header from "../../pubcomponent/Header";
import "../../componentcss/thearterpagecomponentcss/TheaterBox.css";
import "../../componentcss/thearterpagecomponentcss/SpecialTheaterSection.css";
import RegionTheaterSection from "./RegionTheaterSection";
import SpecialTheaterSection from "./SpecialTheaterSection";

const TheaterBox = () => {
  return (
    <div className="rts-page">
      <Header isOtherPage={true} isScrolled={true} />
      <div className="rts-content">
        <div className="rts-main">
          <div className="rts-container">
            <RegionTheaterSection />
            <SpecialTheaterSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheaterBox;