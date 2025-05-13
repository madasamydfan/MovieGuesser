import { useNavigate } from "react-router-dom";
import "../css/instructions.css";

function Instructions() {
  const navigate = useNavigate()
  const instructions = [
    "1. The game consists of 10 rounds.",
    "2. Each round will show you a movie poster.",
    "3. You have to guess the name of the movie.",
    "4. You can use hints if you get stuck.",
    "5. The game ends after 10 rounds, and your score will be displayed.",
  ];
  return (
    <div className="instruction-container">
      <div className="instructions-box">      
        <div className="instructions-heading">Instructions</div>
        {instructions.map((instruction, index) => (
          <p className="instruction-text" key={index + 1}>
            {instruction}
          </p>
        ))}
      </div>
      <button className="Get-Started-button" onClick={() => {navigate('../movieguess')}}>Get Started</button>
    </div>
  );
}

export default Instructions;
