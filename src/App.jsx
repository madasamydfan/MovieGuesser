// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './components/homepage'
import MovieguessPage from './components/MovieguessPage'
import Gameover from './components/leaderboard'
import Leaderboard from './components/leaderboard';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movieguess" element={<MovieguessPage />} />
        <Route path='/leaderboard' element={<Leaderboard/>}/>
      </Routes>
    </Router>
  );
}

export default App
