import React, { useState } from 'react';
import { createReview } from '../../../api/api';

const ReviewForm = ({ onReviewCreated, currentMovies }) => {
  const [formData, setFormData] = useState({
    userid: '',
    moviecd: '',
    reviewcontent: '',
    rating: 10, // 10점 만점으로 기본값 변경
    likes: 0 // 기본값 추가
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 데이터 유효성 검사
      if (!formData.userid.trim()) {
        alert('사용자 ID를 입력해주세요.');
        return;
      }
      if (!formData.moviecd) {
        alert('영화를 선택해주세요.');
        return;
      }
      if (!formData.reviewcontent.trim()) {
        alert('리뷰 내용을 입력해주세요.');
        return;
      }

      // 백엔드에 맞는 데이터 형식으로 변환
      const reviewData = {
        userid: formData.userid.trim(),
        moviecd: formData.moviecd,
        reviewcontent: formData.reviewcontent.trim(),
        rating: Number(formData.rating), // 숫자 타입으로 확실히 변환
        likes: 0, // 기본값
        viewingpoints: null // 옵셔널 필드도 명시적으로 설정
      };

      console.log('제출할 리뷰 데이터:', reviewData);
      const result = await createReview(reviewData);
      console.log('리뷰 작성 결과:', result);
      alert('리뷰가 성공적으로 작성되었습니다!');
      if (onReviewCreated) {
        onReviewCreated(); // 리뷰 목록 새로고침
      }
      setFormData({ userid: '', moviecd: '', reviewcontent: '', rating: 10, likes: 0 });
    } catch (error) {
      console.error('리뷰 작성 에러 상세:', error);
      if (error.response) {
        console.error('응답 데이터:', error.response.data);
        console.error('응답 상태:', error.response.status);
        alert(`리뷰 작성에 실패했습니다: ${error.response.data.message || error.response.statusText}`);
      } else {
        alert(`리뷰 작성에 실패했습니다: ${error.message || '알 수 없는 오류'}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const testApiConnection = async () => {
    try {
      console.log('API 연결 테스트 시작...');
      
      // 실제 존재하는 영화 코드 사용
      const firstMovie = currentMovies && currentMovies.length > 0 ? currentMovies[0] : null;
      if (!firstMovie) {
        alert('테스트할 영화가 없습니다. 관리자가 상영 중인 영화를 설정해주세요.');
        return;
      }
      
      const testData = {
        userid: "testuser",
        moviecd: firstMovie.moviecd,
        reviewcontent: "테스트 리뷰입니다.",
        rating: 10, // 10점 만점으로 수정
        likes: 0,
        viewingpoints: null
      };
      
      console.log('사용할 영화 정보:', firstMovie);
      console.log('테스트 데이터:', testData);
      
      const result = await createReview(testData);
      console.log('테스트 성공:', result);
      alert('API 연결 테스트 성공!');
    } catch (error) {
      console.error('테스트 실패:', error);
      alert('API 연결 테스트 실패: ' + (error.message || '알 수 없는 오류'));
    }
  };

  return (
    <div className="review-form-container">
      <h3>새 리뷰 작성</h3>
      <form onSubmit={handleSubmit} className="review-form">
        <div className="form-group">
          <label htmlFor="userid">사용자 ID</label>
          <input
            id="userid"
            type="text"
            placeholder="사용자 ID를 입력하세요"
            value={formData.userid}
            onChange={(e) => handleChange('userid', e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="moviecd">영화 선택</label>
          <select
            id="moviecd"
            value={formData.moviecd}
            onChange={(e) => handleChange('moviecd', e.target.value)}
            required
          >
            <option value="">영화를 선택하세요</option>
            {currentMovies?.map(movie => (
              <option key={movie.moviecd} value={movie.moviecd}>
                {movie.movienm}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="rating">평점 (10점 만점)</label>
          <select
            id="rating"
            value={formData.rating}
            onChange={(e) => handleChange('rating', parseInt(e.target.value))}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
              <option key={num} value={num}>
                {num}점
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="reviewcontent">리뷰 내용</label>
          <textarea
            id="reviewcontent"
            placeholder="리뷰를 작성해주세요..."
            value={formData.reviewcontent}
            onChange={(e) => handleChange('reviewcontent', e.target.value)}
            rows="4"
            required
          />
        </div>

        <div className="form-buttons">
          <button 
            type="button"
            className="test-btn"
            onClick={testApiConnection}
            disabled={isSubmitting}
          >
            API 테스트
          </button>
          
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? '작성 중...' : '리뷰 작성'}
          </button>
        </div>
      </form>

      <button onClick={testApiConnection} className="test-api-btn">
        API 연결 테스트
      </button>
    </div>
  );
};

export default ReviewForm;
