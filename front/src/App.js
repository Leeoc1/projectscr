import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import MoviePage from "./pages/MoviePage/MoviePage";
import TheaterPage from "./pages/TheaterPage/TheaterPage";
import EventPage from "./pages/EventPage/components/EventPage";
import NoticePage from "./pages/NoticePage/components/NoticePage";
import AdminPage from "./pages/AdminPage/components/AdminPage";
import Login from "./pages/LoginPage/components/Login";
import Register from "./pages/RegisterPage/components/Register";
import ReservationMoviePage from "./pages/reservation/components/ReservationMoviePage";
import ReservationPlacePage from "./pages/reservation/components/ReservationPlacePage";
import ReservationPlaceToMoviePage from "./pages/reservation/components/ReservationPlaceToMoviePage";
import ReservationSeatPage from "./pages/reservation/components/ReservationSeatPage";
import ReservationPaymentPage from "./pages/reservation/components/ReservationPaymentPage";
import ReservationSuccessPage from "./pages/reservation/components/ReservationSuccessPage";
import TheaterInfoPage from "./pages/TheaterInfoPage/TheaterInfoPage";
import NoticeContents from "./pages/NoticePage/NoticeContentsPage/NoticeContents";
import { CheckoutPage } from "./pages/reservation/Payments/Chekout";
import { SuccessPage } from "./pages/reservation/Payments/Success";
import { FailPage } from "./pages/reservation/Payments/Fail";
import MovieDetail from "./pages/MovieInfoPage/components/MovieDetail";
import MyPage from "./pages/MyPage/components/MyPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// 보호된 라우트 컴포넌트 (로그인 필요)
function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  
  return children;
}

// 관리자 페이지 보호 컴포넌트 (관리자 계정만 접근 가능)
function AdminProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userid = localStorage.getItem("userid");
  
  // 로그인하지 않았거나 관리자 계정이 아니면 홈으로 리다이렉트
  if (!isLoggedIn || userid !== "master001") {
    return <Navigate to="/" replace />;
  }
  
  return children;
}

// 예약 플로우 보호 컴포넌트
function ReservationProtectedRoute({ children, requiredStep }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  
  // 로그인 체크
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  
  // 예약 플로우 단계 체크
  switch (requiredStep) {
    case 'place':
      // /reservation/place는 영화 선택이 되어야 접근 가능
      const moviecd = sessionStorage.getItem("moviecd");
      const movienm = sessionStorage.getItem("movienm");
      const selectedMovieCode = sessionStorage.getItem("selectedMovieCode");
      const selectedMovieName = sessionStorage.getItem("selectedMovieName");
      
      if ((!moviecd || !movienm) && (!selectedMovieCode || !selectedMovieName)) {
        return <Navigate to="/movie" replace />;
      }
      break;
      
    case 'theater-first':
      // /reservation/movie는 극장 선택이 먼저 되어야 접근 가능 (theater → movie 플로우)
      const theaterCinemacd = sessionStorage.getItem("cinemacd");
      const theaterCinemanm = sessionStorage.getItem("cinemanm");
      
      if (!theaterCinemacd || !theaterCinemanm) {
        return <Navigate to="/theater" replace />;
      }
      break;
      
    case 'seat':
      // /reservation/seat은 극장과 시간 선택이 되어야 접근 가능
      const seatCinemanm = sessionStorage.getItem("cinemanm");
      const selectedMovieTime = sessionStorage.getItem("selectedMovieTime");
      const selectedFullDate = sessionStorage.getItem("selectedFullDate");
      
      // 핵심적인 정보만 체크: 상영관, 상영시간, 날짜
      if (!seatCinemanm || !selectedMovieTime || !selectedFullDate) {
        return <Navigate to="/movie" replace />;
      }
      break;
      
    case 'payment':
      // /reservation/payment는 좌석 선택이 되어야 접근 가능 (빈 값, 0, 빈 배열 등도 모두 비정상)
      const finalReservationInfo = sessionStorage.getItem("finalReservationInfo");
      if (!finalReservationInfo) {
        return <Navigate to="/movie" replace />;
      }
      try {
        const info = JSON.parse(finalReservationInfo);
        // selectedSeats: 배열이며 1개 이상, guestCount/totalGuests: 1 이상
        if (
          !info.selectedSeats ||
          !Array.isArray(info.selectedSeats) ||
          info.selectedSeats.length === 0 ||
          !info.guestCount || info.guestCount < 1 ||
          !info.totalGuests || info.totalGuests < 1
        ) {
          return <Navigate to="/movie" replace />;
        }
      } catch (error) {
        return <Navigate to="/movie" replace />;
      }
      break;
      
    case 'checkout':
      // /checkout은 finalReservationInfo에 finalPrice가 1원 이상이어야 접근 가능
      const checkoutReservationInfo = sessionStorage.getItem("finalReservationInfo");
      if (!checkoutReservationInfo) {
        return <Navigate to="/movie" replace />;
      }
      try {
        const checkoutInfo = JSON.parse(checkoutReservationInfo);
        if (
          checkoutInfo.finalPrice === undefined ||
          checkoutInfo.finalPrice === null ||
          isNaN(checkoutInfo.finalPrice) ||
          Number(checkoutInfo.finalPrice) < 1
        ) {
          return <Navigate to="/movie" replace />;
        }
      } catch (error) {
        return <Navigate to="/movie" replace />;
      }
      break;
      
    case 'success':
      // /success는 결제 완료 후에만 접근 가능 (URL 파라미터 체크)
      const urlParams = new URLSearchParams(window.location.search);
      const paymentKey = urlParams.get('paymentKey');
      const orderId = urlParams.get('orderId');
      const amount = urlParams.get('amount');
      
      if (!paymentKey || !orderId || !amount) {
        return <Navigate to="/" replace />;
      }
      break;
      
    case 'reservation-success':
      // /reservation/success는 finalReservationInfo가 있어야 접근 가능 (빈 값, 빈 배열 등도 모두 비정상)
      const reservationSuccessInfo = sessionStorage.getItem("finalReservationInfo");
      if (!reservationSuccessInfo) {
        return <Navigate to="/movie" replace />;
      }
      try {
        const successInfo = JSON.parse(reservationSuccessInfo);
        // 예매 완료 후에는 reservationCompleted 플래그로만 접근 허용
        if (successInfo.reservationCompleted) {
          // 예매 완료된 상태면 접근 허용
          break;
        }
        // 기존 검증 로직 (예매 진행 중인 경우)
        if (
          !successInfo.movienm ||
          !successInfo.cinemanm ||
          !successInfo.selectedSeats ||
          !Array.isArray(successInfo.selectedSeats) ||
          successInfo.selectedSeats.length === 0
        ) {
          return <Navigate to="/movie" replace />;
        }
      } catch (error) {
        return <Navigate to="/movie" replace />;
      }
      break;
      
    default:
      break;
  }
  
  return children;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie" element={<MoviePage />} />
        <Route path="/moviedetail" element={<MovieDetail />} />
        <Route path="/reservation" element={<ReservationMoviePage />} />
        <Route path="/theater" element={<TheaterPage />} />
        <Route path="/event" element={<EventPage />} />
        <Route path="/notice" element={<NoticePage />} />
        <Route path="/notice/notice" element={<NoticePage />} />
        <Route path="/notice/faq" element={<NoticePage />} />
        <Route path="/notice/:noticenum" element={<NoticeContents />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/theater/info" element={<TheaterInfoPage />} />
        <Route 
          path="/mypage" 
          element={
            <ProtectedRoute>
              <MyPage />
            </ProtectedRoute>
          } 
        />

        {/* 관리자 페이지 라우팅 */}
        <Route 
          path="/admin" 
          element={
            <AdminProtectedRoute>
              <AdminPage />
            </AdminProtectedRoute>
          } 
        />
        <Route 
          path="/admin/dashboard" 
          element={
            <AdminProtectedRoute>
              <AdminPage />
            </AdminProtectedRoute>
          } 
        />
        <Route 
          path="/admin/staff" 
          element={
            <AdminProtectedRoute>
              <AdminPage />
            </AdminProtectedRoute>
          } 
        />
        <Route 
          path="/admin/users" 
          element={
            <AdminProtectedRoute>
              <AdminPage />
            </AdminProtectedRoute>
          } 
        />
        <Route 
          path="/admin/theaters" 
          element={
            <AdminProtectedRoute>
              <AdminPage />
            </AdminProtectedRoute>
          } 
        />
        <Route 
          path="/admin/movies" 
          element={
            <AdminProtectedRoute>
              <AdminPage />
            </AdminProtectedRoute>
          } 
        />
        <Route 
          path="/admin/screens" 
          element={
            <AdminProtectedRoute>
              <AdminPage />
            </AdminProtectedRoute>
          } 
        />
        <Route 
          path="/admin/reservations" 
          element={
            <AdminProtectedRoute>
              <AdminPage />
            </AdminProtectedRoute>
          } 
        />
        <Route 
          path="/admin/inquiries" 
          element={
            <AdminProtectedRoute>
              <AdminPage />
            </AdminProtectedRoute>
          } 
        />
        <Route 
          path="/admin/events" 
          element={
            <AdminProtectedRoute>
              <AdminPage />
            </AdminProtectedRoute>
          } 
        />

        <Route 
          path="/reservation/place" 
          element={
            <ReservationProtectedRoute requiredStep="place">
              <ReservationPlacePage />
            </ReservationProtectedRoute>
          } 
        />
        <Route
          path="/reservation/movie"
          element={
            <ReservationProtectedRoute requiredStep="theater-first">
              <ReservationPlaceToMoviePage />
            </ReservationProtectedRoute>
          }
        />
        <Route 
          path="/reservation/seat" 
          element={
            <ReservationProtectedRoute requiredStep="seat">
              <ReservationSeatPage />
            </ReservationProtectedRoute>
          } 
        />
        <Route
          path="/reservation/payment"
          element={
            <ReservationProtectedRoute requiredStep="payment">
              <ReservationPaymentPage />
            </ReservationProtectedRoute>
          }
        />

        {/* 토스 결제 api 연동 */}
        <Route 
          path="/checkout" 
          element={
            <ReservationProtectedRoute requiredStep="checkout">
              <CheckoutPage />
            </ReservationProtectedRoute>
          } 
        />
        <Route 
          path="/success" 
          element={
            <ReservationProtectedRoute requiredStep="success">
              <SuccessPage />
            </ReservationProtectedRoute>
          } 
        />
        <Route path="/fail" element={<FailPage />} />

        <Route
          path="/reservation/success"
          element={
            <ReservationProtectedRoute requiredStep="reservation-success">
              <ReservationSuccessPage />
            </ReservationProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
