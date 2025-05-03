const pool = require('./db')

async function writeToDB(movieData){
    const { description, clue1, clue2, clue3, title, movie_id } = movieData;
    const conn = await pool.getConnection();

    try {
      await conn.beginTransaction();
  
      // Insert into Questions table
      await conn.query(
        'INSERT INTO Questions (imdb_id, movie_name, description) VALUES (?, ?, ?)',
        [movie_id, title, description]
      );
  
      // Prepare clues
      const clues = [clue1, clue2, clue3].map(clue => [clue, movie_id]);
  
      // Insert all clues into Clues table
      await conn.query(
        'INSERT INTO Clues (clue, imdb_id) VALUES ?',
        [clues]
      );
  
      await conn.commit();
      console.log('✅ Movie and clues inserted successfully.');
    } catch (err) {
      await conn.rollback();
      console.error('❌ Error inserting movie data:', err.message);
    } finally {
      conn.release();
    }
  }
  
  module.exports = writeToDB;
