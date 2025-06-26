import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import MovieGuessPage from "./components/MovieguessPage";
import Leader from "./components/Leaderboard";
import Instructions from "./components/instructions";

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
