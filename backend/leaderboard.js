const pool = require('./forCreatingDataset/db')

async function leaderboard(username,score){
    try{
        const conn = await pool.getConnection();
        await conn.query(`INSERT INTO Leaderboard (username, score) VALUES (?, ?)`, [username, score]);
        const leaderboard = await conn.query(`SELECT * FROM Leaderboard ORDER BY score DESC`);
        return leaderboard[0];
    }
    catch(error){
        console.error('❌ Error inserting into DB:', error);
    }
} 

module.exports = { leaderboard };