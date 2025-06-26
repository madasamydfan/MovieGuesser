import { useLocation } from 'react-router-dom';
import '../css/leaderboard.css';
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
      <p className="leaderboard-note">
        Note:  If you don't see your score,You have not made to top 15 , Go watch some movies and come back again.
      </p>
       <button className='PlayAgain'>
      <a href="/movieguess" className="play-again-button">
        Play Again
      </a>
    </button>
    </div>
    </>
  );
}

export default Leader;
