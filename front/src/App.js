import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <Router>
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

        {/* 관리자 페이지 라우팅 */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/dashboard" element={<AdminPage />} />
        <Route path="/admin/staff" element={<AdminPage />} />
        <Route path="/admin/users" element={<AdminPage />} />
        <Route path="/admin/theaters" element={<AdminPage />} />
        <Route path="/admin/movies" element={<AdminPage />} />
        <Route path="/admin/screens" element={<AdminPage />} />
        <Route path="/admin/reservations" element={<AdminPage />} />
        <Route path="/admin/inquiries" element={<AdminPage />} />
        <Route path="/admin/events" element={<AdminPage />} />

        <Route path="/reservation/place" element={<ReservationPlacePage />} />
        <Route
          path="/reservation/movie"
          element={<ReservationPlaceToMoviePage />}
        />
        <Route path="/reservation/seat" element={<ReservationSeatPage />} />
        <Route
          path="/reservation/payment"
          element={<ReservationPaymentPage />}
        />

        {/* 토스 결제 api 연동 */}
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/fail" element={<FailPage />} />

        <Route
          path="/reservation/success"
          element={<ReservationSuccessPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
