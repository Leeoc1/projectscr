import React from "react";
import Header from "../../shared/Header";
import ImageSlide from "./components/ImageSlide";
import MovieChart from "./components/MovieChart";
import Event from "./components/Event";
import "./styles/HomePage.css";
import Notice from "./components/Notice";

const HomePage = () => {
  return (
    <div>
      <Header />
      <ImageSlide />
      <MovieChart />
      <Event />
      <Notice />
    </div>
  );
};

export default HomePage;
