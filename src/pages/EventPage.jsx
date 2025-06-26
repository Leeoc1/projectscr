import Header from "../pubcomponent/Header";
import "../pagecss/EventPage.css";

export default function EventPage() {
  return (
    <div className="events-page">
      <Header isOtherPage={true} isScrolled={true} />
      <div className="events-content">
        <div className="events-main">
          <div className="events-container">
            <section className="events-section">
              <div className="events-filter">
                <button className="filter-btn active">전체</button>
                <button className="filter-btn">할인 이벤트</button>
                <button className="filter-btn">신작 이벤트</button>
                <button className="filter-btn">멤버십</button>
                <button className="filter-btn">특별관</button>
              </div>

              <div className="events-grid">
                <div className="event-card featured">
                  <div className="event-image">
                    <img src="/api/placeholder/400/300" alt="이벤트 이미지" />
                    <div className="event-badge hot">HOT</div>
                  </div>
                  <div className="event-content">
                    <div className="event-category">할인 이벤트</div>
                    <h3 className="event-title">
                      신작 영화 런칭 기념 50% 할인
                    </h3>
                    <p className="event-description">
                      최신 블록버스터 영화 개봉을 기념하여 모든 상영관 티켓을
                      50% 할인된 가격으로 만나보세요.
                    </p>
                    <div className="event-period">
                      <span className="period-label">이벤트 기간</span>
                      <span className="period-date">
                        2024.06.26 ~ 2024.07.26
                      </span>
                    </div>
                  </div>
                  <div className="event-actions">
                      <button className="event-btn primary">이벤트 참여</button>
                      <button className="event-btn secondary">
                        자세히 보기
                      </button>
                    </div>
                </div>

                <div className="event-card">
                  <div className="event-image">
                    <img src="/api/placeholder/400/300" alt="이벤트 이미지" />
                    <div className="event-badge new">NEW</div>
                  </div>
                  <div className="event-content">
                    <div className="event-category">멤버십</div>
                    <h3 className="event-title">골드 멤버십 혜택 업그레이드</h3>
                    <p className="event-description">
                      골드 멤버십 가입 고객에게 더 많은 혜택과 특별 서비스를
                      제공합니다.
                    </p>
                    <div className="event-period">
                      <span className="period-label">이벤트 기간</span>
                      <span className="period-date">
                        2024.06.20 ~ 2024.08.31
                      </span>
                    </div>
                    
                  </div>
                  <div className="event-actions">
                      <button className="event-btn primary">이벤트 참여</button>
                      <button className="event-btn secondary">
                        자세히 보기
                      </button>
                    </div>
                </div>

                <div className="event-card">
                  <div className="event-image">
                    <img src="/api/placeholder/400/300" alt="이벤트 이미지" />
                  </div>
                  <div className="event-content">
                    <div className="event-category">특별관</div>
                    <h3 className="event-title">IMAX 특별 상영회</h3>
                    <p className="event-description">
                      IMAX 관에서만 경험할 수 있는 특별한 영화 상영회에
                      초대합니다.
                    </p>
                    <div className="event-period">
                      <span className="period-label">이벤트 기간</span>
                      <span className="period-date">
                        2024.07.01 ~ 2024.07.15
                      </span>
                    </div>
                  </div>
                  <div className="event-actions">
                      <button className="event-btn primary">이벤트 참여</button>
                      <button className="event-btn secondary">
                        자세히 보기
                      </button>
                    </div>
                </div>

                <div className="event-card">
                  <div className="event-image">
                    <img src="/api/placeholder/450/280" alt="이벤트 이미지" />
                    <div className="event-badge hot">HOT</div>
                  </div>
                  <div className="event-content">
                    <div className="event-category">신작 이벤트</div>
                    <h3 className="event-title">
                      여름 시즌 블록버스터 페스티벌
                    </h3>
                    <p className="event-description">
                      여름을 뜨겁게 달굴 최고의 블록버스터 영화들을 한자리에서
                      만나보세요.
                    </p>
                    <div className="event-period">
                      <span className="period-label">이벤트 기간</span>
                      <span className="period-date">
                        2024.07.10 ~ 2024.08.10
                      </span>
                    </div>
                  </div>
                  <div className="event-actions">
                      <button className="event-btn primary">이벤트 참여</button>
                      <button className="event-btn secondary">
                        자세히 보기
                      </button>
                    </div>
                </div>

                <div className="event-card">
                  <div className="event-image">
                    <img src="/api/placeholder/380/320" alt="이벤트 이미지" />
                  </div>
                  <div className="event-content">
                    <div className="event-category">할인 이벤트</div>
                    <h3 className="event-title">주말 가족 영화 관람 이벤트</h3>
                    <p className="event-description">
                      온 가족이 함께 즐길 수 있는 가족 영화를 특별 할인가로
                      만나보세요.
                    </p>
                    <div className="event-period">
                      <span className="period-label">이벤트 기간</span>
                      <span className="period-date">매주 토,일</span>
                    </div>
                  </div>
                  <div className="event-actions">
                      <button className="event-btn primary">이벤트 참여</button>
                      <button className="event-btn secondary">
                        자세히 보기
                      </button>
                    </div>
                </div>

                <div className="event-card">
                  <div className="event-image">
                    <img src="/api/placeholder/420/300" alt="이벤트 이미지" />
                    <div className="event-badge limited">한정</div>
                  </div>
                  <div className="event-content">
                    <div className="event-category">특별관</div>
                    <h3 className="event-title">VIP 프리미엄 라운지 체험</h3>
                    <p className="event-description">
                      럭셔리한 VIP 라운지에서 특별한 영화 관람 경험을
                      즐겨보세요.
                    </p>
                    <div className="event-period">
                      <span className="period-label">이벤트 기간</span>
                      <span className="period-date">
                        2024.07.05 ~ 2024.07.25 (한정)
                      </span>
                    </div>
                  </div>
                  <div className="event-actions">
                      <button className="event-btn primary">이벤트 참여</button>
                      <button className="event-btn secondary">
                        자세히 보기
                      </button>
                    </div>
                </div>

                <div className="event-card">
                  <div className="event-image">
                    <img src="/api/placeholder/400/300" alt="이벤트 이미지" />
                  </div>
                  <div className="event-content">
                    <div className="event-category">신작 이벤트</div>
                    <h3 className="event-title">아바타 2 개봉 기념 이벤트</h3>
                    <p className="event-description">
                      전 세계가 기다린 아바타 속편 개봉을 기념하여 특별한
                      이벤트를 준비했습니다.
                    </p>
                    <div className="event-period">
                      <span className="period-label">이벤트 기간</span>
                      <span className="period-date">
                        2024.06.25 ~ 2024.07.25
                      </span>
                    </div>
                  </div>
                  <div className="event-actions">
                      <button className="event-btn primary">이벤트 참여</button>
                      <button className="event-btn secondary">
                        자세히 보기
                      </button>
                    </div>
                </div>

                <div className="event-card">
                  <div className="event-image">
                    <img src="/api/placeholder/400/300" alt="이벤트 이미지" />
                  </div>
                  <div className="event-content">
                    <div className="event-category">할인 이벤트</div>
                    <h3 className="event-title">패밀리 패키지 할인</h3>
                    <p className="event-description">
                      가족과 함께 영화를 관람하는 고객을 위한 특별 할인
                      패키지입니다.
                    </p>
                    <div className="event-period">
                      <span className="period-label">이벤트 기간</span>
                      <span className="period-date">
                        2024.06.15 ~ 2024.08.15
                      </span>
                    </div>
                  </div>
                  <div className="event-actions">
                      <button className="event-btn primary">이벤트 참여</button>
                      <button className="event-btn secondary">
                        자세히 보기
                      </button>
                    </div>
                </div>

                <div className="event-card">
                  <div className="event-image">
                    <img src="/api/placeholder/400/300" alt="이벤트 이미지" />
                  </div>
                  <div className="event-content">
                    <div className="event-category">특별관</div>
                    <h3 className="event-title">4DX 체험 이벤트</h3>
                    <p className="event-description">
                      4DX 상영관에서 몰입감 넘치는 영화 체험을 특별 가격으로
                      만나보세요.
                    </p>
                    <div className="event-period">
                      <span className="period-label">이벤트 기간</span>
                      <span className="period-date">
                        2024.07.01 ~ 2024.07.31
                      </span>
                    </div>
                    <div className="event-actions">
                      <button className="event-btn primary">이벤트 참여</button>
                      <button className="event-btn secondary">
                        자세히 보기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="winners-section">
              <h2 className="section-title">당첨자 발표</h2>
              <div className="winners-list">
                <div className="winner-item">
                  <div className="winner-event">아바타 2 개봉 기념 이벤트</div>
                  <div className="winner-prize">영화 티켓 2매</div>
                  <div className="winner-name">김**님 외 9명</div>
                  <div className="winner-date">2024.06.25</div>
                </div>

                <div className="winner-item">
                  <div className="winner-event">IMAX 특별 상영회</div>
                  <div className="winner-prize">IMAX 티켓 1매</div>
                  <div className="winner-name">이**님 외 19명</div>
                  <div className="winner-date">2024.06.24</div>
                </div>

                <div className="winner-item">
                  <div className="winner-event">골드 멤버십 이벤트</div>
                  <div className="winner-prize">팝콘 세트</div>
                  <div className="winner-name">박**님 외 29명</div>
                  <div className="winner-date">2024.06.23</div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
