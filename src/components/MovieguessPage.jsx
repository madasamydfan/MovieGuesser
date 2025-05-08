import { useEffect, useState } from "react";
import "../css/MovieguessPage.css";
import axios from "axios";

//const response = await axios.get("http://localhost:5173/movieguess")\

function MovieguessPage() {
  const [question, setQuestion] = useState("Loading...");
  const [questionNo, setQuestionNo] = useState("");
  const [inputText, setInputText] = useState("");
  const [clueNo, setClueNo] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showClue, setShowClue] = useState(false);
  const [clueText, setClueText] = useState("");
  const [score,setScore] = useState(0);
  const [showScore,setShowScore] = useState(false);
  const [name ,setName] = useState("");
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
        setScore((s)=> s + 10 - (clueNo *2));
        setTimeout(() => setIsCorrect(false), 1000);
        setInputText("");
      } else {

        alert(`Wrong Answer ${response.data.originalAnswer}`);
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

  const handlequitbutton = ()=>{
    setShowScore(true);
  }
  const  handlegetLeaderboard = async () => {
    // alert("LeaderBoard feature will be added soon");
    const topscorers = await axios.post("http://localhost:5172/movieguess",
      {
        username :{name},
        score :{score}
      }
    )
  }

  useEffect(() => {
    fetchQuestion();
  }, [isCorrect]);

  return (
    <>
      {showClue && (
        <div className="clue-overlay">
          <button className="close-btn" onClick={() => setShowClue(false)}>
            ×
          </button>
          <div className="cluecard">
            <h1 className="ClueHeading">CLUE {clueNo}</h1>
            <p className="clueText">{clueText}</p>
          </div>
        </div>
      )}

      {
        showScore && (
          <div className="score-overlay">
            <div className="gameover-title">GAME OVER</div>
            <p className="score">Your score is :{score}</p>
            <input type="text" placeholder="Type your name" value={name} onChange={(e)=>setName(e.target.value)}/>
            <button className="leaderboard" onClick={handlegetLeaderboard} disabled={!name.trim()}>Leaderboard</button>
          </div>
        )
      }

      <div
        className={`question-page-container ${
          isCorrect ? "correct-blink" : ""
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
          <button className="AnswerCheckButton" onClick={handlequitbutton}>Quit</button>
        </div>
      </div>
    </>
  );
}

export default MovieguessPage;
