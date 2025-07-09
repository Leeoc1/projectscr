import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import MoviePage from "./pages/MoviePage/MoviePage";
import TheaterPage from "./pages/TheaterPage/TheaterPage";
import EventPage from "./pages/EventPage/components/EventPage";
import AdminPage from "./pages/AdminPage/components/AdminPage";
import Login from "./pages/LoginPage/components/Login";
import Register from "./pages/RegisterPage/components/Register";
import ReservationMoviePage from "./pages/reservation/components/ReservationMoviePage";
import ReservationPlacePage from "./pages/reservation/components/ReservationPlacePage";
import ReservationPlaceToMoviePage from "./pages/reservation/components/ReservationPlaceToMoviePage";
import ReservationSeatPage from "./pages/reservation/components/ReservationSeatPage";
import ReservationPaymentPage from "./pages/reservation/components/ReservationPaymentPage";
import ReservationSuccessPage from "./pages/reservation/components/ReservationSuccessPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie" element={<MoviePage />} />
        <Route path="/reservation" element={<ReservationMoviePage />} />
        <Route path="/theater" element={<TheaterPage />} />
        <Route path="/event" element={<EventPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

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
        <Route
          path="/reservation/success"
          element={<ReservationSuccessPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
