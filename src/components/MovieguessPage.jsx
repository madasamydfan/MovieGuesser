import { useEffect, useState } from "react";
import "../css/MovieguessPage.css";
import axios from "axios";

//const response = await axios.get("http://localhost:5173/movieguess")
function MovieguessPage() {
  const [question, setQuestion] = useState("Loading...");
  const [questionNo,setQuestionNo] = useState(0);
  const fetchQuestion = async () => {
    try {
      const response = await axios.get("http://localhost:5172/movieguess");
      // console.log(response.data);
      setQuestion(response.data.description);
      setQuestionNo(response.data.id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  return (
    <>
      <div className="question-page-container">
        <div className="question-box">
          <div className="question-title">Guess the Movie?</div>
          <div className="question-text">{question}</div>
        </div>
        <div className="input-clues-container">
          <input
            type="text"
            className="answer-input"
            placeholder="Your guess here..."
          />
          <button className="bulb-button"></button>
          {/* <button className='bulb-button'></button>
            <button className='bulb-button'></button> */}
        </div>

        <button className="AnswerCheckButton">Check</button>
        <button className="AnswerCheckButton">Quit</button>
      </div>
    </>
  );
}

export default MovieguessPage;
