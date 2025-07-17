import { useEffect, useState } from "react";
import "../styles/MovieDetail.css";
import Header from "../../../shared/Header";
import { useSearchParams } from "react-router-dom";
import { getMovieDetail } from "../../../api/movieApi";
import { useNavigate } from "react-router-dom";

export default function MovieDetail() {
  const navigate = useNavigate();
  // 영화 번호 가져오기
  const [searchParams] = useSearchParams();
  const movieno = searchParams.get("movieno");
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      if (movieno) {
        const data = await getMovieDetail(movieno);
        setMovie(data);
      }
    };

    fetchMovieDetail();
  }, [movieno]);

  const handleReservationClick = () => {
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
      movieData.movienm,
      "moviecd:",
      movieData.moviecd
    );
    navigate("/reservation/place");
  };

  const handleSearch = () => {
    console.log("Search clicked");
    // TODO: Implement search functionality
  };

  return (
    <div>
      <Header />
      {movie && (
        <div className="mvd-movie-detail-page">
          {/* Movie Detail Section */}
          <section className="mvd-movie-detail-section">
            <div className="mvd-container">
              <div className="mvd-movie-content">
                {/* Movie Poster */}
                <div className="mvd-movie-poster">
                  <img src={movie.posterurl} alt={movie.movienm} />
                </div>

                {/* Movie Info */}
                <div className="mvd-movie-info">
                  <h1 className="mvd-movie-title">{movie.movienm}</h1>
                  {/* <p className="mvd-movie-subtitle">{movieData.subtitle}</p> */}

                  <div className="mvd-movie-meta">
                    <div className="mvd-meta-item">
                      <span className="mvd-meta-label">개봉일</span>
                      <span className="mvd-meta-value">
                        {movie.releasedate}
                      </span>
                    </div>
                    <div className="mvd-meta-item">
                      <span className="mvd-meta-label">관람등급</span>
                      <span className="mvd-meta-value">
                        {movie.isadult === "Y"
                          ? "청소년 관람불가"
                          : "전체 관람가"}
                      </span>
                    </div>
                    <div className="mvd-meta-item">
                      <span className="mvd-meta-label">상영시간</span>
                      <span className="mvd-meta-value">
                        {movie.runningtime}분
                      </span>
                    </div>
                  </div>

                  <div className="mvd-movie-details">
                    <div className="mvd-detail-row">
                      <span className="mvd-detail-label">장르</span>
                      <span className="mvd-detail-value">{movie.genre}</span>
                    </div>
                    <div className="mvd-detail-row">
                      <span className="mvd-detail-label">감독</span>
                      <span className="mvd-detail-value">{movie.director}</span>
                    </div>
                    <div className="mvd-detail-row">
                      <span className="mvd-detail-label">출연</span>
                      <span className="mvd-detail-value">{movie.actors}</span>
                    </div>
                  </div>

                  <div className="mvd-movie-booking-info">
                    <div className="mvd-booking-info-item">
                      <span className="mvd-booking-info-label">실관람평</span>
                      <span className="mvd-booking-info-value">9.8</span>
                    </div>
                    <div className="mvd-booking-info-item">
                      <span className="mvd-booking-info-label">예매율</span>
                      <span className="mvd-booking-info-value">2위</span>
                    </div>
                    <div className="mvd-booking-info-item">
                      <span className="mvd-booking-info-label">누적관객수</span>
                      <span className="mvd-booking-info-value">1,23명</span>
                    </div>
                  </div>

                  {movie.movieinfo === "E" ? (
                    <div className="mvd-upcoming-notice">
                      <span>개봉 예정작입니다</span>
                      <p>개봉일: {movie.releasedate}</p>
                    </div>
                  ) : (
                    <button
                      className="mvd-booking-button"
                      onClick={handleReservationClick}
                    >
                      예매하기
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Synopsis Section */}
          <section className="mvd-synopsis-section">
            <div className="mvd-container">
              <h2 className="mvd-synopsis-title">줄거리</h2>
              <div className="mvd-synopsis-content">
                <p>{movie.description}</p>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
