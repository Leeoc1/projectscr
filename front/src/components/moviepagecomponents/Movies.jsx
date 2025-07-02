import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentMovies, getUpcomingMovies } from "../../api/api";
import "../../componentcss/moviepagecomponentcss/Movies.css";

const Movies = () => {
  const [activeTab, setActiveTab] = useState("boxoffice");
  const [currentMovies, setCurrentMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 초기 로드 시 모든 데이터를 미리 로드
  useEffect(() => {
    const fetchAllMovies = async () => {
      setLoading(true);
      try {
        const [currentData, upcomingData] = await Promise.all([
          getCurrentMovies(),
          getUpcomingMovies(),
        ]);
        setCurrentMovies(currentData);
        setUpcomingMovies(upcomingData);
      } catch (error) {
        console.error("영화 데이터를 가져오는 중 오류 발생:", error);
        setCurrentMovies([]);
        setUpcomingMovies([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAllMovies();
  }, []);

  const handleReservationClick = (movie) => {
    // 영화 정보를 세션 스토리지에 저장
    const selectedMovie = {
      id: movie.moviecd,
      title: movie.movienm,
      genre: movie.genre,
      rating: movie.isadult === "Y" ? "청소년 관람불가" : "전체 관람가",
      duration: `${movie.runningtime}분`,
      poster: movie.posterUrl ? movie.posterUrl : "/images/movie.jpg",
      // API 정보 추가
      moviecd: movie.moviecd,
      movienm: movie.movienm,
      description: movie.description,
      director: movie.director,
      actors: movie.actors,
      runningtime: movie.runningtime,
      releasedate: movie.releasedate,
      posterUrl: movie.posterUrl,
      runningscreen: movie.runningscreen,
      isadult: movie.isadult,
    };

    sessionStorage.setItem("selectedMovie", JSON.stringify(selectedMovie));
    console.log(
      "선택된 영화 정보가 세션 스토리지에 저장되었습니다:",
      selectedMovie
    );

    // 페이지 전환 (state 없이)
    navigate("/reservation/place");
  };

  const getRatingText = (isAdult) => {
    return isAdult === "Y" ? "청소년 관람불가" : "전체 관람가";
  };

  // 탭 변경 핸들러
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // 이미 데이터가 로드되어 있으므로 추가 API 호출 불필요
  };

  if (loading) {
    return (
      <div className="mvs-section">
        <div style={{ textAlign: "center", padding: "50px" }}>
          영화 정보를 불러오는 중...
        </div>
      </div>
    );
  }

  return (
    <div className="mvs-section">
      <div className="mvs-tabs">
        <button
          className={`mvs-tab-button ${
            activeTab === "boxoffice" ? "active" : ""
          }`}
          onClick={() => handleTabChange("boxoffice")}
        >
          박스오피스
        </button>
        <button
          className={`mvs-tab-button ${
            activeTab === "upcoming" ? "active" : ""
          }`}
          onClick={() => handleTabChange("upcoming")}
        >
          상영예정작
        </button>
      </div>
      <div className="mvs-grid">
        {activeTab === "boxoffice"
          ? currentMovies.map((movie, index) => (
              <div className="mvs-card" key={movie.moviecd}>
                <div className="mvs-poster">
                  <img
                    src={
                      movie.posterUrl ? movie.posterUrl : "/images/movie.jpg"
                    }
                    alt={movie.movienm}
                  />
                  <div className="mvs-overlay">
                    <div className="mvs-buttons">
                      <button className="mvs-btn">상세정보</button>
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
                  <h3 className="mvs-title">
                    {index < 10 && (
                      <span className={`rank-number rank-${index + 1}`}>
                        {index + 1}
                      </span>
                    )}
                    {movie.movienm}
                  </h3>
                  <p className="mvs-genre">{movie.genre}</p>
                  <p className="mvs-rating">{getRatingText(movie.isadult)}</p>
                  <p className="mvs-duration">{movie.runningtime}분</p>
                </div>
              </div>
            ))
          : upcomingMovies.map((movie) => (
              <div className="mvs-card" key={movie.moviecd}>
                <div className="mvs-poster">
                  <img
                    src={
                      movie.posterUrl ? movie.posterUrl : "/images/movie.jpg"
                    }
                    alt={movie.movienm}
                  />
                  <div className="mvs-overlay">
                    <div className="mvs-buttons">
                      <button className="mvs-btn">상세정보</button>
                    </div>
                  </div>
                </div>
                <div className="mvs-info">
                  <h3 className="mvs-title">{movie.movienm}</h3>
                  <p className="mvs-genre">{movie.genre}</p>
                  <p className="mvs-release">
                    개봉 예정일:{" "}
                    {new Date(movie.releasedate).toLocaleDateString("ko-KR")}
                  </p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Movies;
