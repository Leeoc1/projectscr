import React, { useEffect, useState } from "react";
import {
  Map,
  MapMarker,
  CustomOverlayMap,
  MapTypeControl,
  ZoomControl,
} from "react-kakao-maps-sdk";
import "../style/MapInfo.css";

const { kakao } = window;

const MapInfo = ({ cinemanm, tel, address }) => {
  // 나의 초기 위치
  const [myState, setMyState] = useState({
    center: { lat: 0, lng: 0 },
    isLoading: true,
  });

  // 영화관의 초기 위치
  const [theaterState, setTheaterState] = useState({
    center: { lat: 0, lng: 0 },
    isLoading: true,
  });

  // 내가 보고 있는 지도 위치 (보여주는 용도, 마커 안 찍음)
  const [state, setState] = useState({
    center: { lat: 0, lng: 0 },
  });

  // 오버레이 확장 여부
  // 지도 키면 오버레이 확장 되어 있음
  const [isOpen, setIsOpen] = useState(true);

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

  const handleMyState = () => {
    setState({
      center: { lat: myState.center.lat, lng: myState.center.lng },
    });
  };

  useEffect(() => {
    // window.kakao가 로드될 때까지 기다림
    const waitForKakao = () => {
      if (window.kakao && window.kakao.maps && window.kakao.maps.services) {
        // 주소 - 좌표 변환 객체 생성
        const geocoder = new kakao.maps.services.Geocoder();

        // 주소로 좌표를 검색
        geocoder.addressSearch(`${address}`, function (result, status) {
          // 정상적으로 검색이 완료됐으면
          if (status === kakao.maps.services.Status.OK) {
            const searchResult = result[0];
            setTheaterState({
              center: { lat: searchResult.y, lng: searchResult.x },
              isLoading: false,
            });

            // state 초기 위치는 영화관 위치
            setState({
              center: { lat: searchResult.y, lng: searchResult.x },
            });
          }
        });

        // 현재 내 위치
        if (navigator.geolocation) {
          // GeoLocation을 이용해서 접속 위치를 얻어오기
          navigator.geolocation.getCurrentPosition(success, error, options);
        }
      } else {
        setTimeout(waitForKakao, 100);
      }
    };

    waitForKakao();
  }, [address]);

  return (
    <div className="mpi-map-wrap">
      <Map
        center={state.center}
        style={{ width: "100%", height: "500px" }}
        level={5}
        onCenterChanged={(m) => {
          setState({
            center: {
              lat: m.getCenter().getLat(),
              lng: m.getCenter().getLng(),
            },
          });
        }}
        isPanto={true}
      >
        <MapTypeControl position={"TOPRIGHT"} />
        <ZoomControl position={"RIGHT"} />
        {!myState.isLoading && <MapMarker position={myState.center} />}
        {!theaterState.isLoading && (
          <MapMarker
            position={theaterState.center}
            onClick={() => setIsOpen(true)}
          />
        )}
        {isOpen && (
          <CustomOverlayMap position={theaterState.center}>
            <div className="mpi-wrap">
              <div className="mpi-info">
                <div className="mpi-title">
                  {cinemanm}
                  <div
                    className="mpi-close"
                    onClick={() => setIsOpen(false)}
                    title="닫기"
                  ></div>
                </div>
                <div className="mpi-body">
                  <div className="mpi-desc">
                    <div className="mpi-ellipsis">{address}</div>
                    <div className="mpi-jibun mpi-ellipsis">{tel}</div>
                  </div>
                </div>
              </div>
            </div>
          </CustomOverlayMap>
        )}
      </Map>
      <div
        className="mpi-mystate-button"
        onClick={() => {
          handleMyState();
        }}
      >
        <img src="/images/mygps.png" alt="mygps" />
      </div>
    </div>
  );
};

export default MapInfo;
