import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import MovieguessPage from "./components/MovieguessPage";
import Leaderboard from "./components/Leaderboard";
import Instructions from "./components/Instructions";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/movieguess" element={<MovieguessPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/instructions" element={<Instructions />} />
      </Routes>
    </Router>
  );
}

export default App;
