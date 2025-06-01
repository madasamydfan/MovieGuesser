const pool = require("./forCreatingDataset/db");

async function nextClue(imdb_id, clue_no) {
  const conn = await pool.getConnection();
  //console.log(imdb_id,clue_no);
  try {
    let res = await conn.query(
      `SELECT clue FROM clues WHERE imdb_id  = ? LIMIT 1 OFFSET ?`,
      [imdb_id, clue_no]
    );
    
    // console.log(res);
    return res[0];
  } catch (error) {
    console.error("❌ Error inserting into DB:", error);
    throw error;
  } finally {
    if (conn) {
      conn.release();
    }
  }
}

module.exports = { nextClue };
