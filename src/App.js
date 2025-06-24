import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import ReservationInfoPage from './pages/ReservationInfoPage';
import MyPage from './pages/MyPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
