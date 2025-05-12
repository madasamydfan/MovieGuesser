const pool = require("./forCreatingDataset/db");

async function nextQuestion() {
	let conn;
  try {
    conn = await pool.getConnection();
    const res = await conn.query(
      `SELECT id,imdb_id,movie_name,description FROM Questions ORDER BY RAND() LIMIT 1`
    );
    const movie_name = res[0][0].movie_name;
    const imdb_id = res[0][0].imdb_id;
    const description = res[0][0].description;
    const id = res[0][0].id;
    return { movie_name, imdb_id, description, id };
  } catch (error) {
    console.error("❌ Error inserting into DB:", error);
    throw error;
  } finally {
    if (conn) {
      conn.release();
    } 
  }
}

module.exports = { nextQuestion };
