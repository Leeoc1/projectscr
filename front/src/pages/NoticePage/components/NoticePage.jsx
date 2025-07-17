import React, { useEffect, useState } from "react";
import {
  fetchAllNotices,
  fetchAllFaqs,
  fetchAllReviews,
} from "../../../api/userApi";
import { getMoviesForAdmin } from "../../../api/movieApi";
import Pagination from "./Pagination";
import NoticeItem from "./NoticeItem";
import TabNavigation from "./TabNavigation";
import ReviewForm from "./ReviewForm";
import "../styles/NoticePage.css";
import Header from "../../../shared/Header";

const NoticePage = () => {
  const [notices, setNotices] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [currentMovies, setCurrentMovies] = useState([]); // 현재상영작 목록
  const [activeTab, setActiveTab] = useState("review"); // 기본 탭을 리뷰로 설정
  const [currentPage, setCurrentPage] = useState(1);
  const [openedFaqIndex, setOpenedFaqIndex] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(""); // 영화 필터
  const [showReviewPopup, setShowReviewPopup] = useState(false); // 리뷰 작성 팝업 상태

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    fetchAllNotices().then(setNotices);
    fetchAllFaqs().then(setFaqs);
    fetchAllReviews().then(setReviews);

    // 현재상영작 목록 가져오기 (관리자가 상영 시작한 영화만)
    getMoviesForAdmin()
      .then((movieData) => {
        // movieinfo가 "Y"인 영화만 필터링 (실제 상영중인 영화만)
        const screeningMovies = (movieData.currentMovies || []).filter(
          (movie) => movie.movieinfo === "Y"
        );
        setCurrentMovies(screeningMovies);
      })
      .catch((error) => {
        console.error("현재상영작 조회 실패:", error);
        setCurrentMovies([]);
      });
  }, []);

  // URL 변경 감지 제거 - 탭은 상태로만 관리

  const getCurrentData = () => {
    let data, sortKey;
    if (activeTab === "notice") {
      data = notices;
      sortKey = "noticenum";
    } else if (activeTab === "faq") {
      data = faqs;
      sortKey = "faqnum";
    } else {
      data = reviews;
      sortKey = "reviewnum";
      // 리뷰에서 영화별 필터링 적용
      if (selectedMovie) {
        data = data.filter((review) => {
          const movie = currentMovies.find((m) => m.moviecd === selectedMovie);
          return movie && review.movienm === movie.movienm;
        });
      }
    }
    return data.sort((a, b) => b[sortKey] - a[sortKey]);
  };

  const currentData = getCurrentData().slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(getCurrentData().length / ITEMS_PER_PAGE);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setOpenedFaqIndex(null); // 탭 변경 시 열린 FAQ 닫기
    setSelectedMovie(""); // 탭 변경 시 영화 필터 초기화
    // navigate 제거 - 같은 페이지 내에서 탭만 전환
  };

  // 글로벌 인덱스(전체 데이터 기준)로 드롭다운 상태 관리
  const handleFaqToggle = (globalIndex) => {
    if (openedFaqIndex === globalIndex) {
      setOpenedFaqIndex(null);
    } else {
      setOpenedFaqIndex(globalIndex);
    }
  };

  // 전체 데이터에서의 글로벌 인덱스 계산
  const baseIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  // 전체 건수 표시 텍스트 (필터링된 데이터 기준)
  const totalCount = getCurrentData().length;

  const refreshReviews = async () => {
    try {
      const updatedReviews = await fetchAllReviews();
      setReviews(updatedReviews);
    } catch (error) {
      console.error("리뷰 목록 새로고침 실패:", error);
    }
  };

  return (
    <div className="notice-page">
      <Header />
      <div className="notice-container">
        <h1 className="notice-page-title">고객센터</h1>

        <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />

        <div className="tab-content">
          {/* 영화 필터와 리뷰 쓰기 버튼 (리뷰 탭에서만 표시) */}
          {activeTab === "review" && (
            <div className="review-controls">
              <div className="movie-filter">
                <label htmlFor="movie-select">영화별 필터: </label>
                <select
                  id="movie-select"
                  value={selectedMovie}
                  onChange={(e) => {
                    setSelectedMovie(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="">전체 영화</option>
                  {currentMovies.map((movie) => (
                    <option key={movie.moviecd} value={movie.moviecd}>
                      {movie.movienm}
                    </option>
                  ))}
                </select>
              </div>

              <button
                className="write-review-btn"
                onClick={() => setShowReviewPopup(true)}
              >
                리뷰 쓰기
              </button>
            </div>
          )}

          {/* 전체 건수 표시 */}
          <span className="notice-total-count">전체 {totalCount}건</span>
          <div className="notice-list">
            {currentData.map((item, index) => {
              const globalIndex = baseIndex + index;
              let key;
              if (activeTab === "notice") {
                key = item.noticenum;
              } else if (activeTab === "faq") {
                key = item.faqnum;
              } else {
                key = item.reviewnum;
              }
              return (
                <NoticeItem
                  key={key}
                  item={item}
                  index={globalIndex}
                  type={activeTab}
                  isExpanded={openedFaqIndex === globalIndex}
                  onToggle={handleFaqToggle}
                />
              );
            })}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* 리뷰 작성 팝업 */}
      {showReviewPopup && (
        <div
          className="review-popup-overlay"
          onClick={() => setShowReviewPopup(false)}
        >
          <div
            className="review-popup-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="review-popup-header">
              <h3>새 리뷰 작성</h3>
              <button
                className="review-popup-close"
                onClick={() => setShowReviewPopup(false)}
              >
                ×
              </button>
            </div>
            <ReviewForm
              onReviewCreated={() => {
                refreshReviews();
                setShowReviewPopup(false);
              }}
              currentMovies={currentMovies}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticePage;
