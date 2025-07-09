import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMoviesForAdmin } from "../../api/api";
import "../../componentcss/moviepagecomponentcss/Movies.css";

const Movies = () => {
  const [activeTab, setActiveTab] = useState("boxoffice");
  const [currentMovies, setCurrentMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // DB에서 영화 데이터 가져오기
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const data = await getMoviesForAdmin();
        setCurrentMovies(data.currentMovies || []);
        setUpcomingMovies(data.upcomingMovies || []);
      } catch (error) {
        console.error("영화 데이터 로딩 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const handleReservationClick = (movie) => {
    // 영화 제목과 코드를 세션 스토리지에 저장 (DB 필드명 사용)
    try {
      sessionStorage.setItem("selectedMovieName", movie.movienm);
      sessionStorage.setItem("selectedMovieCode", movie.moviecd);
      console.log("🎬 예매하기 버튼 클릭 - 영화:", movie.movienm, "코드:", movie.moviecd);
    } catch (error) {
      console.error("영화 정보 저장 중 오류:", error);
    }
    // 영화 정보를 state로 전달하여 ReservationPlacePage로 이동
    navigate("/reservation/place");
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
        {isLoading ? (
          <div className="mvs-loading">영화 정보를 불러오는 중...</div>
        ) : activeTab === "boxoffice" ? (
          currentMovies.map((movie) => (
            <div className="mvs-card" key={movie.moviecd}>
              <div className="mvs-poster">
                <img 
                  src={movie.posterurl || "/images/movie.jpg"} 
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
                <h3 className="mvs-title">{movie.movienm}</h3>
                <p className="mvs-genre">{movie.genre}</p>
                <p className="mvs-rating">
                  {movie.isadult === "Y" ? "청소년 관람불가" : "전체 관람가"}
                </p>
                <p className="mvs-duration">{movie.runningtime}분</p>
              </div>
            </div>
          ))
        ) : (
          upcomingMovies.map((movie) => (
            <div className="mvs-card" key={movie.moviecd}>
              <div className="mvs-poster">
                <img 
                  src={movie.posterurl || "/images/movie.jpg"} 
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
                  개봉 예정일: {movie.releasedate}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Movies;
