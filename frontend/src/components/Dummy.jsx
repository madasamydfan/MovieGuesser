import { useLocation } from 'react-router-dom';
import '../css/Leaderboard.css';
function Leader() {
   const location = useLocation();
   const data = location.state?.leaderboard || [];    
  return (
    <>
    <div className="leader-board-container">
      <h2>LeaderBoard🏆</h2>
      <table className="Leaderboard-table">
        <thead>
          <tr> 
            <th>Rank</th>
            <th>Username</th>
            <th>Score</th>
          </tr>
        </thead>
      <tbody>
  {data.map((item, index) => {
    if (index === 0) {
      return (
        <a
          href="https://instagram.com/madasamy_dfan"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'contents' }} // Makes <a> transparent
          key={index}
        >
          <tr>
            <td>{index + 1}</td>
            <td>{item.username}</td>
            <td>{item.score}</td>
          </tr>
        </a>
      );
    } else {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item.username}</td>
          <td>{item.score}</td>
        </tr>
      );
    }
  })}
</tbody>

      </table>
    </div>

    {/* <button className='PlayAgain'>
      <a href="/movieguess" className="play-again-button">
        Play Again
      </a>
    </button> */}
    </>
  );
}

export default Leader;
