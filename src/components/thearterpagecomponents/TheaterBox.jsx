import Header from "../../pubcomponent/Header";
import "../../componentcss/thearterpagecomponentcss/TheaterBox.css";
import RegionTheaterSection from "./RegionTheaterSection";
import SpecialTheaterSection from "./SpecialTheaterSection";

export default function TheaterBox() {
  return (
    <div className="theaters-page">
      <Header isOtherPage={true} isScrolled={true} />
      <div className="theaters-content">
        <div className="theaters-main">
          <div className="theaters-container">
            <RegionTheaterSection />
            <SpecialTheaterSection />
          </div>
        </div>
      </div>
    </div>
  );
}
