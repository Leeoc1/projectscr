import React from "react";
import "../../componentcss/homepagecomponentcss/Notice.css";

const Notice = () => {
  const info = [
    { info: "1. [시스템점검] 2025년 7월 시스템 점검" },
    {
      info: "2. [극장] [더 시네마 강남] IMAX관 사운드 업그레이드 뭐시기 뭐 뭐",
    },
    { info: "3. [행사/이벤트] 여름맞이 포토존 인증샷" },
    { info: "4. [극장] 7/1 (화) 리클라이너 좌석 시범 운영 뭐시기" },
    {
      info: "5. [시스템점검] CJ포인트 적립 시스템 점검 공지 합니다. 무슨 점검 일까요.",
    },
  ];
  return (
    <div className="NoticeWrap">
      <div className="NoticeSection">
        <p className="infoNotice">공지사항</p>
        <div>
          <p>1. </p>
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default Notice;
