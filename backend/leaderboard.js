const pool = require('./forCreatingDataset/db')

async function leaderboard(username,score){
    let conn;
    try{
        conn = await pool.getConnection();
        await conn.query(`INSERT INTO leaderboard (username, score) VALUES (?, ?)`, [username, score]);
        const leaderboard = await conn.query(`SELECT * FROM leaderboard ORDER BY score DESC LIMIT 15`);
        //console.log(leaderboard[0])
        return leaderboard[0];
    }
    catch(error){
        console.error('❌ Error inserting into DB:', error);
        throw error;
    }
    finally{
        if (conn) {
            conn.release();
        }
    }
} 

module.exports = { leaderboard };