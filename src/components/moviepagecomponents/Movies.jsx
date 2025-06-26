import { useState, useEffect } from "react";
import "../../componentcss/moviepagecomponentcss/Movies.css";

const movies = [
  { id: "28years", title: "28년 후", image: "/images/28Years.png", rank: 1 },
  {
    id: "dragon",
    title: "드래곤 길들이기",
    image: "/images/Dragon.png",
    rank: 2,
  },
  { id: "elio", title: "엘리오", image: "/images/Elio.png", rank: 3 },
  { id: "f1", title: "F1 더 무비", image: "/images/F1_TheMovie.png", rank: 4 },
  { id: "fureru", title: "후레루", image: "/images/Fureru.png", rank: 5 },
  { id: "hifive", title: "하이파이브", image: "/images/Hifive.png", rank: 6 },
  {
    id: "nausicaa",
    title: "바람계곡의 나우시카",
    image: "/images/Nausicaa.png",
    rank: 7,
  },
  { id: "noise", title: "노이즈", image: "/images/Noise.png", rank: 8 },
  {
    id: "seventeen",
    title: "세븐틴 뭐시기",
    image: "/images/Seventeen.png",
    rank: 9,
  },
  { id: "tiger", title: "바다호랑이", image: "/images/Tiger.png", rank: 10 },
];

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const createPlaceholderImage = (title, rank) => {
    const canvas = document.createElement("canvas");
    canvas.width = 200;
    canvas.height = 280;
    const ctx = canvas.getContext("2d");

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 200, 280);
    gradient.addColorStop(0, "#2d3748");
    gradient.addColorStop(1, "#1a202c");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 200, 280);

    // Title text
    ctx.fillStyle = "#fff";
    ctx.font = "bold 16px Noto Sans KR";
    ctx.textAlign = "center";
    const lines = title.split(" ");
    lines.forEach((line, index) => {
      ctx.fillText(line, 100, 140 + index * 25);
    });

    return canvas.toDataURL();
  };

  return (
    <div>
      <div className="main-container">
        <h2 className="section-title">전체영화</h2>
        <div className="movie-grid">
          {movies.map((movie, index) => (
            <div key={movie.id} className="movie-card">
              <div className="movie-card-wrapper">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="movie-poster"
                />
                <div className="movie-rank">{movie.rank}</div>
              </div>
              <div className="movie-title">{movie.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
