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
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/reservation/place" element={<ReservationPlacePage />} />
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
