import React from "react";
import Header from "../../shared/Header";
import Footer from "../../shared/Footer";
import ImageSlide from "./components/ImageSlide";
import MovieChart from "./components/MovieChart";
import Event from "./components/Event";
import "./styles/HomePage.css";
import Notice from "./components/Notice";
import ChatBot from "./components/ChatBot";

const HomePage = () => {
  return (
    <div>
      <Header />
      <ImageSlide />
      <MovieChart />
      <Event />
      <Notice />
      <ChatBot />
      <Footer />
    </div>
  );
};

export default HomePage;
