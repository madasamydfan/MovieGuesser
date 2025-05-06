const pool = require('./forCreatingDataset/db')

async function nextClue(imdb_id,clue_no) {
    
const conn = await pool.getConnection();
    //console.log(imdb_id,clue_no);
    let res = await conn.query(
        `SELECT clue FROM Clues WHERE imdb_id  = ? LIMIT 1 OFFSET ?`,
         [imdb_id,clue_no]
      );
     // console.log(res);
      return res[0];
}

module.exports = {nextClue}
      