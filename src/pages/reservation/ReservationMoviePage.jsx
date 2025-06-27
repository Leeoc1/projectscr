import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../pubcomponent/Header";
import "../../pagecss/reservation/ReservationMoviePage.css";

const ReservationMoviePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("boxoffice"); // "boxoffice" 또는 "upcoming"

  // 박스오피스 영화 데이터
  const boxofficeMovies = [
    {
      id: 1,
      title: "아바타: 물의 길",
      genre: "액션/SF",
      poster: "/images/Dragon.png",
      rank: 1,
      rating: "12세 이상 관람가",
      duration: "192분",
    },
    {
      id: 2,
      title: "탑건: 매버릭",
      genre: "액션/드라마",
      poster: "/images/Tiger.png",
      rank: 2,
      rating: "12세 이상 관람가",
      duration: "131분",
    },
    {
      id: 3,
      title: "오펜하이머",
      genre: "드라마/스릴러",
      poster: "/images/Elio.png",
      rank: 3,
      rating: "12세 이상 관람가",
      duration: "180분",
    },
    {
      id: 4,
      title: "바비",
      genre: "코미디/판타지",
      poster: "/images/Seventeen.png",
      rank: 4,
      rating: "전체 관람가",
      duration: "114분",
    },
    {
      id: 5,
      title: "미션 임파서블: 데드 레코닝",
      genre: "액션/스릴러",
      poster: "/images/F1_TheMovie.png",
      rank: 5,
      rating: "12세 이상 관람가",
      duration: "163분",
    },
    {
      id: 6,
      title: "인디아나 존스: 운명의 다이얼",
      genre: "액션/어드벤처",
      poster: "/images/Nausicaa.png",
      rank: 6,
      rating: "12세 이상 관람가",
      duration: "154분",
    },
    {
      id: 7,
      title: "엘리멘탈",
      genre: "애니메이션/판타지",
      poster: "/images/Fureru.png",
      rank: 7,
      rating: "전체 관람가",
      duration: "109분",
    },
    {
      id: 8,
      title: "인시디어스: 빨간 문",
      genre: "호러/스릴러",
      poster: "/images/Noise.png",
      rank: 8,
      rating: "15세 이상 관람가",
      duration: "107분",
    },
    {
      id: 9,
      title: "스파이더맨: 어크로스 더 유니버스",
      genre: "애니메이션/액션",
      poster: "/images/Hifive.png",
      rank: 9,
      rating: "12세 이상 관람가",
      duration: "140분",
    },
    {
      id: 10,
      title: "플래시",
      genre: "액션/어드벤처",
      poster: "/images/28Years.png",
      rank: 10,
      rating: "12세 이상 관람가",
      duration: "144분",
    },
    {
      id: 11,
      title: "트랜스포머: 비스트의 서막",
      genre: "액션/SF",
      poster: "/images/event1.png",
      rank: 11,
      rating: "12세 이상 관람가",
      duration: "127분",
    },
    {
      id: 12,
      title: "가디언즈 오브 갤럭시: Volume 3",
      genre: "액션/어드벤처",
      poster: "/images/event2.png",
      rank: 12,
      rating: "12세 이상 관람가",
      duration: "150분",
    },
  ];

  // 상영예정작 영화 데이터
  const upcomingMovies = [
    {
      id: 101,
      title: "듄: 파트 2",
      genre: "SF/드라마",
      poster: "/images/Dragon.png",
      releaseDate: "2024.03.15",
    },
    {
      id: 102,
      title: "데드풀 & 울버린",
      genre: "액션/코미디",
      poster: "/images/Tiger.png",
      releaseDate: "2024.07.26",
    },
    {
      id: 103,
      title: "퓨리오사: 매드맥스 사가",
      genre: "액션/어드벤처",
      poster: "/images/Elio.png",
      releaseDate: "2024.05.24",
    },
    {
      id: 104,
      title: "인사이드 아웃 2",
      genre: "애니메이션/가족",
      poster: "/images/Seventeen.png",
      releaseDate: "2024.06.14",
    },
    {
      id: 105,
      title: "미션 임파서블 8",
      genre: "액션/스릴러",
      poster: "/images/F1_TheMovie.png",
      releaseDate: "2025.06.28",
    },
    {
      id: 106,
      title: "캡틴 아메리카: 브레이브 뉴 월드",
      genre: "액션/어드벤처",
      poster: "/images/Nausicaa.png",
      releaseDate: "2025.02.14",
    },
    {
      id: 107,
      title: "토이스토리 5",
      genre: "애니메이션/가족",
      poster: "/images/Fureru.png",
      releaseDate: "2025.06.20",
    },
    {
      id: 108,
      title: "블레이드",
      genre: "액션/호러",
      poster: "/images/Noise.png",
      releaseDate: "2025.02.14",
    },
  ];

  const handleDetailClick = (movie) => {
    console.log("상세정보:", movie);
    // 상세정보 페이지로 이동하는 로직
  };

  const handleReserveClick = (movie) => {
    console.log("예매하기:", movie);
    // 극장선택 페이지로 이동 (영화 정보와 함께)
    navigate("/reservation/place", {
      state: {
        selectedMovie: movie,
      },
    });
  };

  const renderBoxofficeMovie = (movie) => (
    <div key={movie.id} className="movie-card">
      <div className="movie-poster">
        <img src={movie.poster} alt={movie.title} />
        <div className="movie-overlay">
          <div className="movie-buttons">
            <button
              className="movie-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleDetailClick(movie);
              }}
            >
              상세정보
            </button>
            <button
              className="movie-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleReserveClick(movie);
              }}
            >
              예매하기
            </button>
          </div>
        </div>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">
          {movie.rank <= 10 && (
            <span className={`rank-number rank-${movie.rank}`}>
              {movie.rank}
            </span>
          )}
          {movie.title}
        </h3>
        <p className="movie-genre">{movie.genre}</p>
        <p className="movie-rating">{movie.rating}</p>
        <p className="movie-duration">{movie.duration}</p>
      </div>
    </div>
  );

  const renderUpcomingMovie = (movie) => (
    <div key={movie.id} className="movie-card">
      <div className="movie-poster">
        <img src={movie.poster} alt={movie.title} />
        <div className="movie-overlay">
          <div className="movie-buttons">
            <button
              className="movie-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleDetailClick(movie);
              }}
            >
              상세정보
            </button>
          </div>
        </div>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-genre">{movie.genre}</p>
        <p className="movie-release-date">개봉 예정일: {movie.releaseDate}</p>
      </div>
    </div>
  );

  return (
    <div className="reservation-page">
      <Header isOtherPage={true} isScrolled={true} />
      <div className="reservation-content">
        <div className="reservation-container">
          <h1 className="page-title">영화 예매</h1>

          <div className="movie-tabs">
            <button
              className={`movie-tab ${
                activeTab === "boxoffice" ? "active" : ""
              }`}
              onClick={() => setActiveTab("boxoffice")}
            >
              박스오피스
            </button>
            <button
              className={`movie-tab ${
                activeTab === "upcoming" ? "active" : ""
              }`}
              onClick={() => setActiveTab("upcoming")}
            >
              상영예정작
            </button>
          </div>

          <div className="movies-grid">
            {activeTab === "boxoffice"
              ? boxofficeMovies.map(renderBoxofficeMovie)
              : upcomingMovies.map(renderUpcomingMovie)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationMoviePage;
