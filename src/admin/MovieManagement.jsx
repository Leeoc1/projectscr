import React from "react";
import { MovieData } from "../admindata/MovieMamagementData";
import "../admincss/MovieManagement.css";
import "../pagecss/AdminPage.css";

const MovieManagement = () => (
  <div className="adp-content">
    <div className="adp-header">
      <h2>영화 관리</h2>
      <button className="adp-btn-primary">영화 추가</button>
    </div>

    <div className="mvm-movie-management-tabs">
      <div className="mvm-tab-nav">
        <button className="mvm-tab-btn mvm-active">현재 상영작</button>
        <button className="mvm-tab-btn">상영 예정작</button>
        <button className="mvm-tab-btn">배너 관리</button>
        <button className="mvm-tab-btn">상영 스케줄</button>
      </div>


      <div className="mvm-movie-list">
      <span>총 상영작 : {MovieData.length}</span>
        {MovieData.map((movie) => (
          <div className="mvm-movie-item" key={movie.movieId}>
            <img src={movie.posterUrl} alt={`${movie.title} 포스터`} />
            <div className="mvm-movie-details">
              <h3>{movie.title}</h3>
              <p>장르: {movie.genre} | 등급: {movie.rating}</p>
              <p>상영시간: {movie.duration}분 | 개봉일: {movie.releaseDate}</p>
              <p>상영관: {movie.theaters}</p>
            </div>
            <div className="mvm-movie-actions">
              <button className="adp-btn-edit">수정</button>
              <button className="adp-btn-schedule">스케줄</button>
              <button className="adp-btn-delete">삭제</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default MovieManagement;