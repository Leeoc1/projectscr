import React from "react";
import Header from "../pubcomponent/Header";
import ImageSlide from "../components/homepagecomponents/ImageSlide";
import MovieChart from "../components/homepagecomponents/MovieChart";
import Event from "../components/homepagecomponents/Event";
import "../pagecss/HomePage.css";
import Notice from "../components/homepagecomponents/Notice";

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
