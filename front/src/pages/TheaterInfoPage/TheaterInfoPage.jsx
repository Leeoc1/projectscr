import React, { useEffect, useState } from "react";
import TheaterInfo from "./components/TheaterInfo";
import MapInfo from "./components/MapInfo";
import { useLocation, Navigate } from "react-router-dom";
import Header from "../../shared/Header";
import "./style/TheaterInfoPage.css";

const { kakao } = window;

const TheaterInfoPage = () => {
  const { state } = useLocation();

  // 헤더 관련 설정
  useEffect(() => {
    document.body.classList.add("no-header-padding");
    return () => {
      document.body.classList.remove("no-header-padding");
    };
  }, []);

  // 나의 초기 위치
  const [myState, setMyState] = useState({
    center: { lat: 37.5665, lng: 126.978 }, // 서울 시청
    isLoading: true,
  });

  // 영화관의 초기 위치
  const [theaterState, setTheaterState] = useState({
    center: { lat: 0, lng: 0 },
    isLoading: true,
  });

  // 내 위치 매개변수
  // 1. 성공시
  function success(position) {
    setMyState({
      center: { lat: position.coords.latitude, lng: position.coords.longitude },
      isLoading: false,
    });
  }
  // 2. 실패시, 경복궁을 기본 위치로 설정
  function error(err) {
    setMyState({
      center: { lat: 37.57763581244799, lng: 126.976894465155 },
      isLoading: false,
    });
  }
  // 3. 내 위치 옵션
  // 정확도 높게 설정했는데도 이러네
  // 데스크톱의 경우 아이피 기반으로 위치를 찾아서 정확하지 않을 수 있음
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  useEffect(() => {
    // window.kakao가 로드될 때까지 기다림
    const waitForKakao = () => {
      if (window.kakao && window.kakao.maps && window.kakao.maps.services) {
        // 주소 - 좌표 변환 객체 생성
        const geocoder = new kakao.maps.services.Geocoder();

        // 주소에서 첫 번째 부분만 사용
        // 서울특별시 강동구 고덕비즈밸리로 51, 3,4층 (고덕동) 통째로 검색하면 제대로 좌표 변환이 안됨
        const addresscut = state.address.split(",")[0];

        // 주소로 좌표를 검색
        geocoder.addressSearch(`${addresscut}`, function (result, status) {
          // 정상적으로 검색이 완료됐으면
          if (status === kakao.maps.services.Status.OK) {
            const searchResult = result[0];

            setTheaterState({
              center: {
                lat: parseFloat(searchResult.y),
                lng: parseFloat(searchResult.x),
              },
              isLoading: false,
            });
          } else {
            // 실패시 기본값 설정
            setTheaterState({
              center: { lat: 37.5665, lng: 126.0978 },
              isLoading: false,
            });
          }
        });

        // 현재 내 위치
        if (navigator.geolocation) {
          // GeoLocation을 이용해서 접속 위치를 얻어오기
          navigator.geolocation.getCurrentPosition(success, error, options);
        }
      } else {
        console.log("kakao 객체 로딩 대기 중...");
        setTimeout(waitForKakao, 100);
      }
    };

    waitForKakao();
  }, [state.address]);

  return (
    <div className="tip-page">
      <Header />
      <div className="tip-container">
        <TheaterInfo
          cinemacd={state.cinemacd}
          cinemanm={state.cinemanm}
          tel={state.tel}
          address={state.address}
          myState={myState}
          theaterState={theaterState}
        />
        {!state.address ? (
          <Navigate to="/theater" replace />
        ) : (
          <MapInfo
            cinemanm={state.cinemanm}
            tel={state.tel}
            address={state.address}
            myState={myState}
            theaterState={theaterState}
          />
        )}
      </div>
    </div>
  );
};

export default TheaterInfoPage;
