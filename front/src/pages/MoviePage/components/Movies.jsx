import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCurrentMovies,
  getMoviesForAdmin,
  getTopTenMovies,
} from "../../../api/movieApi";
import LoginRequiredModal from "../../LoginPage/components2/LoginRequiredModal";
import "../styles/Movies.css";

const Movies = ({ activeTab: parentActiveTab }) => {
  const [activeTab, setActiveTab] = useState(parentActiveTab || "boxoffice");
  const [currentMovies, setCurrentMovies] = useState([]);
  const [upcomingMoviesData, setUpcomingMoviesData] = useState([]);
  const [topTenMovies, setTopTenMovies] = useState([]); // 박스오피스 TOP 10 추가
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(16);

  // 부모에서 전달받은 activeTab이 변경될 때 로컬 상태 업데이트
  useEffect(() => {
    if (parentActiveTab) {
      setActiveTab(parentActiveTab);
    }
  }, [parentActiveTab]);

  const handleReservationClick = (movie) => {
    // 로그인 상태 체크
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      // 로그인되지 않은 경우 모달 표시
      setShowLoginModal(true);
      return;
    }

    // 로그인된 경우 기존 로직 실행
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
        const topTen = await getTopTenMovies(); // 박스오피스 TOP 10 가져오기

        // movierank로 정렬된 TOP 10
        const sortedTopTen = [...topTen].sort(
          (a, b) => Number(a.movierank) - Number(b.movierank)
        );
        setTopTenMovies(sortedTopTen);

        const upcomingData = adminData.currentMovies.filter(
          (movie) => movie.movieinfo === "E"
        );
        const sortedCurrent = currentData
          .slice()
          .sort((a, b) => new Date(b.releasedate) - new Date(a.releasedate));
        const sortedUpcoming = upcomingData
          .slice()
          .sort((a, b) => new Date(a.releasedate) - new Date(b.releasedate));
        setCurrentMovies(sortedCurrent);
        setUpcomingMoviesData(sortedUpcoming);
      } catch (error) {}
    };
    fetchMovies();
  }, []);

  const goMovieDetail = (moviecd) => {
    navigate(`/moviedetail?movieno=${moviecd}`);
  };

  const handleShowMore = () => {
    setVisibleCount(currentMovies.length);
  };

  // 각 탭에 맞는 영화 목록을 반환하는 함수
  const getMoviesByTab = () => {
    switch (activeTab) {
      case "boxoffice":
        // 박스오피스 1-10위는 순위대로, 그 이후는 최신순으로 정렬
        const topTenMovieCodes = topTenMovies.map((movie) => movie.moviecd);
        const topTenFromCurrent = currentMovies.filter((movie) =>
          topTenMovieCodes.includes(movie.moviecd)
        );
        const otherMovies = currentMovies.filter(
          (movie) => !topTenMovieCodes.includes(movie.moviecd)
        );

        // TOP 10을 박스오피스 순위대로 정렬
        const sortedTopTen = topTenFromCurrent.sort((a, b) => {
          const rankA =
            topTenMovies.find((tm) => tm.moviecd === a.moviecd)?.movierank ||
            999;
          const rankB =
            topTenMovies.find((tm) => tm.moviecd === b.moviecd)?.movierank ||
            999;
          return Number(rankA) - Number(rankB);
        });

        // 나머지는 최신순 (개봉일 기준 내림차순)
        const sortedOthers = otherMovies.sort(
          (a, b) => new Date(b.releasedate) - new Date(a.releasedate)
        );

        return [...sortedTopTen, ...sortedOthers].slice(0, visibleCount);
      case "latest":
        // 최신 개봉순으로 정렬 (개봉일 기준 내림차순)
        return [...currentMovies]
          .sort((a, b) => new Date(b.releasedate) - new Date(a.releasedate))
          .slice(0, visibleCount);
      case "upcoming":
        return upcomingMoviesData;
      default:
        return currentMovies.slice(0, visibleCount);
    }
  };

  return (
    <div className="mvs-section">
      <div className="mvs-grid">
        {getMoviesByTab().map((movie) => (
          <div className="mvs-card" key={movie.moviecd}>
            <div className="mvs-poster">
              <img
                src={movie.posterurl || "/images/movie.jpg"}
                alt={movie.movienm || movie.title}
              />
              <div className="mvs-overlay">
                <div className="mvs-buttons">
                  <button
                    className="mvs-btn"
                    onClick={() => goMovieDetail(movie.moviecd)}
                  >
                    상세정보
                  </button>
                  {activeTab !== "upcoming" && (
                    <button
                      className="mvs-btn"
                      onClick={() => handleReservationClick(movie)}
                    >
                      예매하기
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="mvs-info">
              <h3 className="mvs-title">{movie.movienm || movie.title}</h3>
              <p className="mvs-genre">{movie.genre}</p>
              {activeTab === "upcoming" ? (
                <p className="mvs-release">
                  개봉 예정일: {movie.releaseDate || movie.releasedate}
                </p>
              ) : (
                <>
                  <div className="mvs-rating">
                    <span
                      className={`mvs-age-icon ${
                        movie.isadult === "Y" ? "mvs-age-19" : "mvs-age-all"
                      }`}
                    >
                      {movie.isadult === "Y" ? "19" : "ALL"}
                    </span>
                    <span className="mvs-rating-text">
                      {movie.isadult === "Y" ? "청소년 관람불가" : "전체관람가"}
                    </span>
                  </div>
                  <p className="mvs-duration">{movie.runningtime}분</p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 로그인 필요 모달 */}
      <LoginRequiredModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
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
