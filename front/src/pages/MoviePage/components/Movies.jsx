import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentMovies, getMoviesForAdmin } from "../../../api/movieApi";
import "../styles/Movies.css";


const Movies = () => {
  const [activeTab, setActiveTab] = useState("boxoffice");
  const [currentMovies, setCurrentMovies] = useState([]);
  const [upcomingMoviesData, setUpcomingMoviesData] = useState([]);
  const [visibleCount, setVisibleCount] = useState(16);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const currentData = await getCurrentMovies();
        const adminData = await getMoviesForAdmin();
        const upcomingData = adminData.currentMovies.filter(
          (movie) => movie.movieinfo === "E"
        );
        const sortedCurrent = currentData.slice().sort(
          (a, b) => new Date(b.releasedate) - new Date(a.releasedate)
        );
        const sortedUpcoming = upcomingData.slice().sort(
          (a, b) => new Date(a.releasedate) - new Date(b.releasedate)
        );
        setCurrentMovies(sortedCurrent);
        setUpcomingMoviesData(sortedUpcoming);
      } catch (error) {}
    };
    fetchMovies();
  }, []);

  const handleReservationClick = (movie) => {
    sessionStorage.setItem("moviecd", movie.moviecd);
    sessionStorage.setItem("movienm", movie.movienm);
    sessionStorage.setItem(
      "selectedMovie",
      JSON.stringify({
        moviecd: movie.moviecd,
        movienm: movie.movienm,
        posterurl: movie.posterurl,
        genre: movie.genre,
        runningtime: movie.runningtime,
        isadult: movie.isadult,
      })
    );
    navigate("/reservation/place");
  };

  const goMovieDetail = (moviecd) => {
    navigate(`/moviedetail?movieno=${moviecd}`);
  };

  const handleShowMore = () => {
    setVisibleCount(currentMovies.length);
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
          ? currentMovies.slice(0, visibleCount).map((movie) => (
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
                  <p
                    className={`mvs-rating ${
                      movie.isadult === "Y" ? "mvs-rating-19" : "mvs-rating-all"
                    }`}
                  >
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
                  <p
                    className={`mvs-rating ${
                      movie.isadult === "Y" ? "mvs-rating-19" : "mvs-rating-all"
                    }`}
                  >
                    {movie.isadult === "Y" ? "청소년 관람불가" : "전체 관람가"}
                  </p>
                  <p className="mvs-release">
                    개봉 예정일: {movie.releasedate}
                  </p>
                </div>
              </div>
            ))}
      </div>
      {activeTab === "boxoffice" && currentMovies.length > visibleCount && (
        <div style={{ textAlign: "center", margin: "2rem 0" }}>
          <button className="mvs-showmore-btn" onClick={handleShowMore}>
            더보기
          </button>
        </div>
      )}
    </div>
  );
};

export default Movies;
