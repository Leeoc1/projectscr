import { useState, useEffect } from "react";
import "../../componentcss/homepagecomponentcss/ImageSlide.css";

export default function ImageSlide() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>

      {/* Hero Content */}
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">프리미엄 시네마 경험</h1>
          <p className="hero-description">
            최신 영화를 최고의 화질과 사운드로 만나보세요
          </p>
          <button className="hero-cta">지금 예매하기</button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button onClick={prevSlide} className="hero-nav-arrow hero-nav-prev">
        ‹
      </button>
      <button onClick={nextSlide} className="hero-nav-arrow hero-nav-next">
        ›
      </button>

      {/* Carousel Dots */}
      <div className="hero-dots">
        {[...Array(totalSlides)].map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`hero-dot ${index === currentSlide ? "active" : ""}`}
          />
        ))}
      </div>

      {/* Hero Background Image */}
      <div className="hero-background"></div>
    </section>
  );
}
