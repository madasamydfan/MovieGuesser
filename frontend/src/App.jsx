import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/homepage";
import MovieguessPage from "./components/MovieguessPage";
import Leaderboard from "./components/leaderboard";
import Instructions from "./components/instructions";
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
