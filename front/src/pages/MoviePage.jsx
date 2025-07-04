import React, { useEffect } from "react";
import Header from "../pubcomponent/Header";
import Movies from "../components/moviepagecomponents/Movies";
import "../pagecss/MoviePage.css";

const MoviePage = () => {
  useEffect(() => {
    document.body.classList.add("no-header-padding");
    return () => {
      document.body.classList.remove("no-header-padding");
    };
  }, []);
  useEffect(() => {
    sessionStorage.clear();
  }, []);

  return (
    <div className="mvp-page">
      <Header />
      <div>
        <div className="mvp-container">
          <h1 className="mvp-title">전체 영화</h1>
          <Movies />
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
