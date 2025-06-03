import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import MovieGuessPage from "./components/MovieGuessPage";
import Leader from "./components/leaderboard";
import Instructions from "./components/Instructions";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/movieguess" element={<MovieGuessPage />} />
        <Route path="/leaderboard" element={<Leader />} />
        <Route path="/instructions" element={<Instructions />} />
      </Routes>
    </Router>
  );
}

export default App;
