import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCurrentMovies,
  getMoviesForAdmin,
  getTopTenMovies,
} from "../../../api/movieApi";
import LoginRequiredModal from "../../LoginPage/components2/LoginRequiredModal";
import "../styles/Movies.css";

const Movies = ({ activeTab: parentActiveTab, showDetailButton = true }) => {
  // 탭 관련 상태
  const [activeTab, setActiveTab] = useState(parentActiveTab || "boxoffice");

  // 영화 데이터 상태
  const [currentMovies, setCurrentMovies] = useState([]);
  const [upcomingMoviesData, setUpcomingMoviesData] = useState([]);
  const [topTenMovies, setTopTenMovies] = useState([]);

  // UI 상태
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [visibleCount, setVisibleCount] = useState(16);
  const [searchKeyword, setSearchKeyword] = useState("");

  const navigate = useNavigate();

  // 부모에서 전달받은 activeTab이 변경될 때 로컬 상태 업데이트
  useEffect(() => {
    if (parentActiveTab) {
      setActiveTab(parentActiveTab);
    }
  }, [parentActiveTab]);

  // 영화 데이터 로드
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [currentData, adminData, topTen] = await Promise.all([
          getCurrentMovies(),
          getMoviesForAdmin(),
          getTopTenMovies(),
        ]);

        // TOP 10 영화 정렬
        const sortedTopTen = [...topTen].sort(
          (a, b) => Number(a.movierank) - Number(b.movierank)
        );
        setTopTenMovies(sortedTopTen);

        // 개봉 예정 영화 필터링
        const upcomingData = adminData.currentMovies.filter(
          (movie) => movie.movieinfo === "E"
        );

        // 영화 정렬
        const sortedCurrent = currentData
          .slice()
          .sort((a, b) => new Date(b.releasedate) - new Date(a.releasedate));
        const sortedUpcoming = upcomingData
          .slice()
          .sort((a, b) => new Date(a.releasedate) - new Date(b.releasedate));

        setCurrentMovies(sortedCurrent);
        setUpcomingMoviesData(sortedUpcoming);
      } catch (error) {
        console.error("영화 데이터 로드 실패:", error);
      }
    };

    fetchMovies();
  }, []);

  // 예매 버튼 클릭 핸들러
  const handleReservationClick = (movie) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    // 세션 스토리지에 영화 정보 저장
    sessionStorage.setItem("moviecd", movie.moviecd);
    sessionStorage.setItem("movienm", movie.movienm);

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
    navigate(`/reservation/movie/${movie.moviecd}`);
  };

  // 영화 상세 페이지로 이동
  const goMovieDetail = (moviecd) => {
    navigate(`/moviedetail?movieno=${moviecd}`);
  };

  // 더보기 버튼 핸들러
  const handleShowMore = () => {
    setVisibleCount(currentMovies.length);
  };

  // 검색어로 영화 필터링
  const filterMoviesByKeyword = (movies) => {
    if (!searchKeyword.trim()) return movies;

    const keyword = searchKeyword.replace(/\s/g, "").toLowerCase();
    return movies.filter((movie) => {
      const title = (movie.movienm || movie.title || "")
        .replace(/\s/g, "")
        .toLowerCase();
      return title.includes(keyword);
    });
  };

  // 박스오피스 영화 정렬
  const getBoxOfficeMovies = () => {
    const topTenMovieCodes = topTenMovies.map((movie) => movie.moviecd);
    const topTenFromCurrent = currentMovies.filter((movie) =>
      topTenMovieCodes.includes(movie.moviecd)
    );
    const otherMovies = currentMovies.filter(
      (movie) => !topTenMovieCodes.includes(movie.moviecd)
    );

    const sortedTopTen = topTenFromCurrent.sort((a, b) => {
      const rankA =
        topTenMovies.find((tm) => tm.moviecd === a.moviecd)?.movierank || 999;
      const rankB =
        topTenMovies.find((tm) => tm.moviecd === b.moviecd)?.movierank || 999;
      return Number(rankA) - Number(rankB);
    });

    const sortedOthers = otherMovies.sort(
      (a, b) => new Date(b.releasedate) - new Date(a.releasedate)
    );

    return [...sortedTopTen, ...sortedOthers];
  };

  // 각 탭에 맞는 영화 목록을 반환하는 함수
  const getMoviesByTab = () => {
    let movies = [];

    switch (activeTab) {
      case "boxoffice":
        movies = getBoxOfficeMovies().slice(0, visibleCount);
        break;
      case "latest":
        movies = [...currentMovies]
          .sort((a, b) => new Date(b.releasedate) - new Date(a.releasedate))
          .slice(0, visibleCount);
        break;
      case "upcoming":
        movies = upcomingMoviesData;
        break;
      default:
        movies = currentMovies.slice(0, visibleCount);
        break;
    }

    return filterMoviesByKeyword(movies);
  };

  // 영화 카드 정보 생성
  const getMovieCardInfo = (movie) => {
    const isAdult = movie.isadult === "Y";
    return {
      posterUrl: movie.posterurl || "/images/movie.jpg",
      title: movie.movienm || movie.title,
      genre: movie.genre,
      releaseDate: movie.releasedate,
      upcomingReleaseDate: movie.releaseDate || movie.releasedate,
      runningTime: movie.runningtime,
      ageRating: isAdult ? "19" : "ALL",
      ageText: isAdult ? "청소년 관람불가" : "전체관람가",
      ageClass: isAdult ? "mvs-age-19" : "mvs-age-all",
      showReservationButton: activeTab !== "upcoming",
      showReleaseDate: activeTab === "latest",
      showUpcomingDate: activeTab === "upcoming",
    };
  };
  // 영화 목록 데이터 준비
  const movieList = getMoviesByTab();
  const showMoreButton =
    activeTab === "boxoffice" && currentMovies.length > visibleCount;

  return (
    <div className="mvs-section">
      {/* 검색박스 */}
      <div className="mvs-searchbox-wrap">
        <div className="mvs-searchbox-container">
          <input
            type="text"
            placeholder="영화 제목 검색"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="mvs-searchbox-input"
          />
          <span className="mvs-searchbox-icon">
            <svg
              className="mvs-searchbox-svg"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="9"
                cy="9"
                r="7"
                className="mvs-searchbox-svg-circle"
              />
              <line
                x1="15.2"
                y1="15.2"
                x2="18"
                y2="18"
                className="mvs-searchbox-svg-line"
              />
            </svg>
          </span>
        </div>
      </div>

      {/* 영화 그리드 */}
      <div className="mvs-grid">
        {movieList.map((movie) => {
          const cardInfo = getMovieCardInfo(movie);
          return (
            <div className="mvs-card" key={movie.moviecd}>
              <div className="mvs-poster">
                <img src={cardInfo.posterUrl} alt={cardInfo.title} />
                <div className="mvs-overlay">
                  <div className="mvs-buttons">
                    {showDetailButton && (
                      <button
                        className="mvs-btn"
                        onClick={() => goMovieDetail(movie.moviecd)}
                      >
                        상세정보
                      </button>
                    )}
                    {cardInfo.showReservationButton && (
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
                <h3 className="mvs-title">{cardInfo.title}</h3>
                <p className="mvs-genre">{cardInfo.genre}</p>
                {cardInfo.showReleaseDate && (
                  <p className="mvs-release-date">
                    개봉일: {cardInfo.releaseDate}
                  </p>
                )}
                {cardInfo.showUpcomingDate ? (
                  <p className="mvs-release-date">
                    개봉 예정일: {cardInfo.upcomingReleaseDate}
                  </p>
                ) : (
                  <>
                    <div className="mvs-rating">
                      <span className={`mvs-age-icon ${cardInfo.ageClass}`}>
                        {cardInfo.ageRating}
                      </span>
                      <span className="mvs-rating-text">
                        {cardInfo.ageText}
                      </span>
                    </div>
                    <p className="mvs-duration">{cardInfo.runningTime}분</p>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 로그인 필요 모달 */}
      <LoginRequiredModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />

      {/* 더보기 버튼 */}
      {showMoreButton && (
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
