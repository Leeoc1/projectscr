import React from "react";
import "../../componentcss/homepagecomponentcss/Event.css";

const Event = () => {
  const eventImages = [
    {
      src: "/images/event1.png",
      alt: "image1",
      title: "[드래곤 길들이기] 앵콜 럭키드로우 행운를 잡아라",
      date: "2025.06.24 ~ 2025.06.29",
    },
    {
      src: "/images/event2.png",
      alt: "image2",
      title: "YOUR MOVIE TAG/6월, 무비 태그를 보여줘",
      date: "2025.06.02 ~ 2025.06.30",
    },
    {
      src: "/images/event3.png",
      alt: "image3",
      title: "[쥬랴기 월드:새로운 시작] SCREENX시사회 & 무대인사",
      date: "2025.06.24 ~ 2025.06.24",
    },
  ];
  return (
    <div className="eventWrap">
      <div className="eventSection">
        <div className="eventSectionTitle">
          <p
            style={{
              fontSize: "30px",
              fontWeight: "bold",
              marginBottom: "15px",
            }}
          >
            이벤트
          </p>
          <button className="allClick">전체보기</button>
        </div>
        <div className="eventImageSection">
          {eventImages.map((image, index) => (
            <div className="eventImageInfo">
              <img src={image.src} alt={image.alt} className="eventImage" />
              <p className="eventImagetitle">{image.title}</p>
              <p className="eventImagedate">{image.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Event;
