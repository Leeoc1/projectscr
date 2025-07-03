import React, { useState, useEffect } from "react";
import { getMovieList, getSchedules } from "../../../api/api";

const MovieSelector = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieList, setMovieList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    sessionStorage.getItem("selectedFullDate") || "날짜를 선택하세요"
  );

  useEffect(() => {
    // 영화 목록 가져오기
    const fetchMovies = async () => {
      const schedule = await getSchedules();

      const filtered = schedule.filter((schedule) => schedule.startdate === selectedDate)
      setMovieList(filtered);
    };
    fetchMovies();

    // 마운트 시 sessionStorage 확인
    const savedDate = sessionStorage.getItem("selectedFullDate");
    if (savedDate && savedDate !== selectedDate) {
      setSelectedDate(savedDate);
    }

  }, [selectedDate]); // 빈 의존성 배열로 마운트 시에만 실행

  useEffect(() => {
    const handleSessionStorageChange = (event) => {
      setSelectedDate(event.detail.selectedFullDate || "날짜를 선택하세요");
    };

    window.addEventListener("sessionStorageChange", handleSessionStorageChange);
    return () => window.removeEventListener("sessionStorageChange", handleSessionStorageChange);
  }, []);

    const handleMovieSelect = (movienm) => {
    setSelectedMovie(movienm);
    sessionStorage.setItem("selectedMovie", movienm);
    const event = new CustomEvent("sessionStorageChange", {
      detail: {
        selectedFullDate: sessionStorage.getItem("selectedFullDate"),
        selectedMovie: movienm,
      },
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="rptm-movie-list">
      {movieList.map((movie) => (
        <button
          key={movie.schedulecd}
          className={`rptm-movie-btn${selectedMovie === movie.movienm ? " rptm-active" : ""}`}
          onClick={() => handleMovieSelect(movie.movienm)}
        >
          {movie.movienm}
        </button>
      ))}
    </div>
  );
};

export default MovieSelector;