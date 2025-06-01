const pool = require("./forCreatingDataset/db");

async function getMovieName(imdb_id) {
    conn = await pool.getConnection();
    const [rows] = await conn.query(
      `SELECT movie_name FROM questions WHERE imdb_id = ?`,
      [imdb_id]
    );
    conn.release()
    return rows[0].movie_name;
}

module.exports= {getMovieName};