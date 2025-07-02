import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../css/overlay.css'
function ScoreCard(props) {
  const navigate = useNavigate();
  console.log("Name at ScoreCard", props.name);
  // const name = state.location?.name || "";
  // const score = state.location?.score || 0;
  async function handlegetLeaderboard(name, score) {
    // alert("LeaderBoard feature will be added soon");
    // console.log("hi");
    try {
      const topscorers = await axios.post(
       `${import.meta.env.VITE_BACKEND_URL}/movieguess`,
        {
          username: name,
          score: score,
        },
        { params: { type: "leaderboard" } }
      );
      // console.log(topscorers.data);
      navigate("/leaderboard", {
        state: { leaderboard: topscorers.data , name:name},
      });
    } catch (error) {
      console.log("Error in getting leaderboard", error);
    }
  }
 // console.log(props.score, props.name);
  return (
    <>
      <div className="score-overlay">
        <div className="gameover-title">GAME OVER</div>
        <p className="score">Your score is :{props.score}</p>
        <button
          className="leaderboard"
          onClick={() => {
            // console.log(props.name, props.score);
            handlegetLeaderboard(props.name,props.score);
          }}
        >
          Leaderboard
        </button>
      </div>
    </>
  );
}

export default ScoreCard;
