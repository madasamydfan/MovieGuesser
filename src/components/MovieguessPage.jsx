import { useEffect, useState } from "react";
import "../css/MovieguessPage.css";
import axios from "axios";
import "../css/overlay.css";
import Cluecard from "./clueCard";
import ScoreCard from "./scoreCard";
//const response = await axios.get("http://localhost:5173/movieguess")\

function MovieguessPage() {
  const [question, setQuestion] = useState("Loading...");
  const [questionNo, setQuestionNo] = useState("");
  const [inputText, setInputText] = useState("");
  const [clueNo, setClueNo] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [showClue, setShowClue] = useState(false);
  const [clueText, setClueText] = useState("");
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [name, setName] = useState("");
  const [showNameCard, setshowNameCard] = useState(true);
  async function handleAnswerCheck() {
    try {
      const response = await axios.post(
        "http://localhost:5172/movieguess",
        {
          id: questionNo,
          userAnswer: inputText.trim(),
        },
        {
          params: { type: "answerCheck" },
        }
      );
      console.log(response.data.answer);
      if (response.data.answer.trim() === "1") {
        setIsCorrect(true); // Trigger the blink
        setScore((s) => s + 10 - clueNo * 2);
        setTimeout(() => setIsCorrect(false), 1000);
        setInputText("");
      } else {
        setIsWrong(true);
        await setTimeout(() => setIsWrong(false), 1000);
        setShowScore(true);
      }
    } catch (error) {
      console.log("Failed to check answer", error);
      
    }
  }

  const handlegetClue = async () => {
    try {
      setClueNo((c) => c + 1);
      if (clueNo >= 3) {
        alert("No more clues available");
        return;
      }
      console.log(clueNo, questionNo);
      const response = await axios.post(
        "http://localhost:5172/movieguess",
        {
          clueNo: clueNo,
          imdb_id: questionNo,
        },
        { params: { type: "clue" } }
      );
      console.log(response.data);
      setClueText(response.data.clue);
      setShowClue(true);
      console.log("question no at time of clue", questionNo);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchQuestion = async () => {
    try {
      const response = await axios.get("http://localhost:5172/movieguess");
      // console.log(response.data);
      setQuestion(response.data.description);
      setQuestionNo(response.data.imdb_id);
      setClueNo(0);
      console.log("Question no at time of question", questionNo);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchQuestion();
  }, [isCorrect]);

  useEffect(() => {
    if (showClue) {
      const timeout = setTimeout(() => {
        setShowClue(false);
      }, 5000); // 5000ms = 5 seconds
      return () => clearTimeout(timeout); // Cleanup if component unmounts or showClue changes
    }
  }, [showClue]);

  return (
    <>
      {showNameCard && (
        <div className="name-card">
          <input
            type="text"
            placeholder="Type your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="Username"
          />
          <button
            className="submit-name-button"
            onClick={() => setshowNameCard(false)}
            disabled={!name.trim()}
          >
            Sumbit
          </button>
        </div>
      )}
      {showClue && <Cluecard clueText={clueText} clueNo={clueNo}></Cluecard>}
      {showScore && <ScoreCard score={score} name={name}></ScoreCard>}
      <div
        className={`question-page-container ${
          isCorrect ? "correct-blink" : !isWrong ? "wrong-blink" : ""
        }`}
      >
        <div className="question-box">
          <div className="question-title">Guess the Movie?</div>
          <div className="question-text">{question}</div>
        </div>
        <div className="input-clues-container">
          <input
            type="text"
            className="answer-input"
            value={inputText}
            placeholder="Your guess here..."
            onChange={(e) => setInputText(e.target.value)}
          />
          <button className="bulb-button" onClick={handlegetClue}></button>
        </div>
        <div className="check-and-quit-button">
          <button
            className="AnswerCheckButton"
            onClick={handleAnswerCheck}
            disabled={!inputText.trim()}
          >
            Check
          </button>
          <button
            className="AnswerCheckButton"
            onClick={() => {
              setShowScore(true);
            }}
          >
            Quit
          </button>
        </div>
      </div>
    </>
  );
}

export default MovieguessPage;
