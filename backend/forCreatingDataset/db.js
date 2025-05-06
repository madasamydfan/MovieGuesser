const mysql = require('mysql2/promise');
const fs = require('fs');

// ✅ Declare the pool correctly before using it
const pool = mysql.createPool({
    host: 'sql12.freesqldatabase.com',
    user: 'sql12776328',
    password: 'ZlEYMBm3mf',
    database: 'sql12776328'
});

// ✅ Optional: Run your init script
async function runInitScript() {
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();

        await conn.query(`CREATE TABLE IF NOT EXISTS Questions (
            id INT AUTO_INCREMENT PRIMARY KEY,
            imdb_id VARCHAR(30) NOT NULL UNIQUE,
            movie_name VARCHAR(255) NOT NULL,
            description TEXT NOT NULL
        );`);

        await conn.query(`CREATE TABLE IF NOT EXISTS Clues (
            id INT AUTO_INCREMENT PRIMARY KEY,
            clue TEXT NOT NULL,
            imdb_id VARCHAR(50) NOT NULL,
            FOREIGN KEY (imdb_id) REFERENCES Questions(imdb_id)
        );`);

        await conn.commit();
        console.log("✅ Tables created or verified");
    } catch (error) {
        console.error('❌ Error running init script:', error);
    } finally {
        conn.release();
    }
}
runInitScript();

// ✅ Export pool after it's declared
module.exports = pool;
