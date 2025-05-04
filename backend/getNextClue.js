const pool = require('./forCreatingDataset/db')

async function nextClue(cluenumber,imdb_id) {
    
const conn = await pool.getConnection();

 
    let res = await pool.query(
        `SELECT clue FROM Clues WHERE imdb_id = ? ORDER BY id LIMIT 1 OFFSET ?`,
        [imdb_id, cluenumber - 1]
      );
      return res[0];
}

module.exports = {nextClue}
      