import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import TheaterPage from "./pages/TheaterPage";
import EventPage from "./pages/EventPage";
import AdminPage from "./pages/AdminPage";
import Login from "./components/loginpagecomponents/Login";
import Register from "./components/registerpagecomponents/Register";
import ReservationMoviePage from "./pages/reservation/ReservationMoviePage";
import ReservationPlacePage from "./pages/reservation/ReservationPlacePage";
import ReservationPlaceToMoviePage from "./pages/reservation/ReservationPlaceToMoviePage";
import ReservationSeatPage from "./pages/reservation/ReservationSeatPage";
import ReservationPaymentPage from "./pages/reservation/ReservationPaymentPage";
import ReservationSuccessPage from "./pages/reservation/ReservationSuccessPage";

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
        <Route path="/admin/sales" element={<AdminPage />} />
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
