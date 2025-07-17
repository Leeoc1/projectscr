import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentMovies, getMoviesForAdmin } from "../../../api/movieApi";
import "../styles/Movies.css";

const Movies = () => {
  const [activeTab, setActiveTab] = useState("boxoffice");
  const [currentMovies, setCurrentMovies] = useState([]);
  const [upcomingMoviesData, setUpcomingMoviesData] = useState([]);
  const navigate = useNavigate();

  const handleReservationClick = (movie) => {
    // 홈페이지와 동일한 방식으로 영화 정보를 세션 스토리지에 저장
    sessionStorage.setItem("moviecd", movie.moviecd);
    sessionStorage.setItem("movienm", movie.movienm);

    // 예매 페이지와 동일한 방식으로 전체 영화 객체도 저장
    const movieData = {
      moviecd: movie.moviecd,
      movienm: movie.movienm,
      posterurl: movie.posterurl,
      genre: movie.genre,
      runningtime: movie.runningtime,
      isadult: movie.isadult,
    };
    sessionStorage.setItem("selectedMovie", JSON.stringify(movieData));

    console.log(
      "🎬 영화카드 클릭 - 영화:",
      movie.movienm,
      "moviecd:",
      movie.moviecd
    );
    navigate("/reservation/place");
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const currentData = await getCurrentMovies();
        const adminData = await getMoviesForAdmin();

        // 관리자 API에서 상영예정작(movieinfo === "E") 필터링
        const upcomingData = adminData.currentMovies.filter(
          (movie) => movie.movieinfo === "E"
        );

        // releasedate 기준 최신순(내림차순) 정렬
        const sortedCurrent = currentData.slice().sort((a, b) => {
          // releasedate가 YYYY-MM-DD 형식이라고 가정
          return new Date(b.releasedate) - new Date(a.releasedate);
        });

        const sortedUpcoming = upcomingData.slice().sort((a, b) => {
          return new Date(a.releasedate) - new Date(b.releasedate); // 개봉예정일 빠른 순
        });

        setCurrentMovies(sortedCurrent);
        setUpcomingMoviesData(sortedUpcoming);
      } catch (error) {
        console.error("영화 데이터 로딩 실패:", error);
      }
    };

    fetchMovies();
  }, []);

  // 영화 상세 정보 페이지로 이동
  const goMovieDetail = (moviecd) => {
    navigate(`/moviedetail?movieno=${moviecd}`);
  };

  return (
    <div className="mvs-section">
      <div className="mvs-tabs">
        <button
          className={`mvs-tab-button ${
            activeTab === "boxoffice" ? "active" : ""
          }`}
          onClick={() => setActiveTab("boxoffice")}
        >
          박스오피스
        </button>
        <button
          className={`mvs-tab-button ${
            activeTab === "upcoming" ? "active" : ""
          }`}
          onClick={() => setActiveTab("upcoming")}
        >
          상영예정작
        </button>
      </div>
      <div className="mvs-grid">
        {activeTab === "boxoffice"
          ? currentMovies.map((movie) => (
              <div className="mvs-card" key={movie.moviecd}>
                <div className="mvs-poster">
                  <img src={movie.posterurl} alt={movie.movienm} />
                  <div className="mvs-overlay">
                    <div className="mvs-buttons">
                      <button
                        className="mvs-btn"
                        onClick={() => goMovieDetail(movie.moviecd)}
                      >
                        상세정보
                      </button>
                      <button
                        className="mvs-btn"
                        onClick={() => handleReservationClick(movie)}
                      >
                        예매하기
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mvs-info">
                  <h3 className="mvs-title">{movie.movienm}</h3>
                  <p className="mvs-genre">{movie.genre}</p>
                  <p className="mvs-rating">
                    {movie.isadult === "Y" ? "청소년 관람불가" : "전체 관람가"}
                  </p>
                  <p className="mvs-duration">{movie.runningtime}분</p>
                </div>
              </div>
            ))
          : upcomingMoviesData.map((movie) => (
              <div className="mvs-card" key={movie.moviecd}>
                <div className="mvs-poster">
                  <img
                    src={movie.posterurl || "/images/movie.jpg"}
                    alt={movie.movienm}
                  />
                  <div className="mvs-overlay">
                    <div className="mvs-buttons">
                      <button
                        className="mvs-btn"
                        onClick={() => goMovieDetail(movie.moviecd)}
                      >
                        상세정보
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mvs-info">
                  <h3 className="mvs-title">{movie.movienm}</h3>
                  <p className="mvs-genre">{movie.genre}</p>
                  <p className="mvs-rating">
                    {movie.isadult === "Y" ? "청소년 관람불가" : "전체 관람가"}
                  </p>
                  <p className="mvs-release">
                    개봉 예정일: {movie.releasedate}
                  </p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Movies;
