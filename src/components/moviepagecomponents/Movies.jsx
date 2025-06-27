import React, { useState } from "react";
import Header from "../../pubcomponent/Header";
import "../../componentcss/moviepagecomponentcss/Movies.css";

const Movies = () => {
  const [activeTab, setActiveTab] = useState("current");
  return (
    <div className="mvs-page">
      <Header isOtherPage={true} isScrolled={true} />
      <div className="mvs-content">
        <div className="mvs-main">
          <div className="mvs-container">
            <div className="mvs-tabs">
              <button
                className={`mvs-tab-button ${
                  activeTab === "current" ? "active" : ""
                }`}
                onClick={() => setActiveTab("current")}
              >
                현재 상영작
              </button>
              <button
                className={`mvs-tab-button ${
                  activeTab === "upcoming" ? "active" : ""
                }`}
                onClick={() => setActiveTab("upcoming")}
              >
                개봉 예정작
              </button>
            </div>

            {activeTab === "current" && (
              <section className="mvs-section">
                <div className="mvs-grid">
                  <div className="mvs-card">
                    <div className="mvs-poster">
                      <img src="/api/placeholder/200/300" alt="영화 포스터" />
                    </div>
                    <div className="mvs-info">
                      <h3 className="mvs-title">아바타: 물의 길</h3>
                      <p className="mvs-genre">SF/액션</p>
                      <p className="mvs-rating">12세 이상 관람가</p>
                      <button className="mvs-book-btn">예매하기</button>
                    </div>
                  </div>

                  <div className="mvs-card">
                    <div className="mvs-poster">
                      <img src="/api/placeholder/200/300" alt="영화 포스터" />
                    </div>
                    <div className="mvs-info">
                      <h3 className="mvs-title">탑건: 매버릭</h3>
                      <p className="mvs-genre">액션/드라마</p>
                      <p className="mvs-rating">12세 이상 관람가</p>
                      <button className="mvs-book-btn">예매하기</button>
                    </div>
                  </div>

                  <div className="mvs-card">
                    <div className="mvs-poster">
                      <img src="/api/placeholder/200/300" alt="영화 포스터" />
                    </div>
                    <div className="mvs-info">
                      <h3 className="mvs-title">블랙 팬서: 와칸다 포에버</h3>
                      <p className="mvs-genre">액션/모험</p>
                      <p className="mvs-rating">12세 이상 관람가</p>
                      <button className="mvs-book-btn">예매하기</button>
                    </div>
                  </div>

                  <div className="mvs-card">
                    <div className="mvs-poster">
                      <img src="/api/placeholder/200/300" alt="영화 포스터" />
                    </div>
                    <div className="mvs-info">
                      <h3 className="mvs-title">닥터 스트레인지 2</h3>
                      <p className="mvs-genre">액션/판타지</p>
                      <p className="mvs-rating">12세 이상 관람가</p>
                      <button className="mvs-book-btn">예매하기</button>
                    </div>
                  </div>

                  <div className="mvs-card">
                    <div className="mvs-poster">
                      <img src="/api/placeholder/200/300" alt="영화 포스터" />
                    </div>
                    <div className="mvs-info">
                      <h3 className="mvs-title">마블스</h3>
                      <p className="mvs-genre">액션/모험</p>
                      <p className="mvs-rating">12세 이상 관람가</p>
                      <button className="mvs-book-btn">예매하기</button>
                    </div>
                  </div>

                  <div className="mvs-card">
                    <div className="mvs-poster">
                      <img src="/api/placeholder/200/300" alt="영화 포스터" />
                    </div>
                    <div className="mvs-info">
                      <h3 className="mvs-title">인디아나 존스 5</h3>
                      <p className="mvs-genre">액션/모험</p>
                      <p className="mvs-rating">12세 이상 관람가</p>
                      <button className="mvs-book-btn">예매하기</button>
                    </div>
                  </div>

                  <div className="mvs-card">
                    <div className="mvs-poster">
                      <img src="/api/placeholder/200/300" alt="영화 포스터" />
                    </div>
                    <div className="mvs-info">
                      <h3 className="mvs-title">오펜하이머</h3>
                      <p className="mvs-genre">드라마/스릴러</p>
                      <p className="mvs-rating">12세 이상 관람가</p>
                      <button className="mvs-book-btn">예매하기</button>
                    </div>
                  </div>

                  <div className="mvs-card">
                    <div className="mvs-poster">
                      <img src="/api/placeholder/200/300" alt="영화 포스터" />
                    </div>
                    <div className="mvs-info">
                      <h3 className="mvs-title">바비</h3>
                      <p className="mvs-genre">코미디/판타지</p>
                      <p className="mvs-rating">전체 관람가</p>
                      <button className="mvs-book-btn">예매하기</button>
                    </div>
                  </div>

                  <div className="mvs-card">
                    <div className="mvs-poster">
                      <img src="/api/placeholder/200/300" alt="영화 포스터" />
                    </div>
                    <div className="mvs-info">
                      <h3 className="mvs-title">미션 임파서블 7</h3>
                      <p className="mvs-genre">액션/스파이</p>
                      <p className="mvs-rating">12세 이상 관람가</p>
                      <button className="mvs-book-btn">예매하기</button>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeTab === "upcoming" && (
              <section className="mvs-section">
                <div className="mvs-grid">
                  <div className="mvs-card upcoming">
                    <div className="mvs-poster">
                      <img src="/api/placeholder/200/300" alt="영화 포스터" />
                      <div className="mvs-coming-soon-badge">개봉예정</div>
                    </div>
                    <div className="mvs-info">
                      <h3 className="mvs-title">
                        스파이더맨: 어크로스 더 유니버스
                      </h3>
                      <p className="mvs-genre">애니메이션/액션</p>
                      <p className="mvs-release">개봉일: 2024.03.15</p>
                      <button className="mvs-book-btn disabled">
                        예매 오픈 예정
                      </button>
                    </div>
                  </div>

                  <div className="mvs-card upcoming">
                    <div className="mvs-poster">
                      <img src="/api/placeholder/200/300" alt="영화 포스터" />
                      <div className="mvs-coming-soon-badge">개봉예정</div>
                    </div>
                    <div className="mvs-info">
                      <h3 className="mvs-title">가디언즈 오브 갤럭시 3</h3>
                      <p className="mvs-genre">액션/SF</p>
                      <p className="mvs-release">개봉일: 2024.04.05</p>
                      <button className="mvs-book-btn disabled">
                        예매 오픈 예정
                      </button>
                    </div>
                  </div>

                  <div className="mvs-card upcoming">
                    <div className="mvs-poster">
                      <img src="/api/placeholder/200/300" alt="영화 포스터" />
                      <div className="mvs-coming-soon-badge">개봉예정</div>
                    </div>
                    <div className="mvs-info">
                      <h3 className="mvs-title">존 윅 4</h3>
                      <p className="mvs-genre">액션/스릴러</p>
                      <p className="mvs-release">개봉일: 2024.04.20</p>
                      <button className="mvs-book-btn disabled">
                        예매 오픈 예정
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movies;