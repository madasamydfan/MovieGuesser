const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({
  apiKey: "AIzaSyDVh4LOsByojljF3XEtSRHaZA7qSojJQ-8",
});
const pool = require("./forCreatingDataset/db");

async function checkAnswerwithAI(userAnswer, id) {
  try {
    const conn = await pool.getConnection();
    const queryResult = await conn.query(
      `SELECT movie_name FROM Questions WHERE imdb_id = ?`,
      [id]
    );
    conn.release();

    console.log(queryResult);
    movie_name = queryResult[0][0].movie_name;
    //console.log(movie_name);
    const prompt = `
	Your task is to determine if the user is referring to the same movie title as the original title.
	Only respond with "1" if the user answer refers to the same movie (case-insensitive, minor typos allowed).
	Otherwise, respond with "0".
	
	Original Title: ${movie_name}
	User Answer: ${userAnswer}
	`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    const result = response.candidates[0].content.parts[0].text;
    return { result, movie_name };
  } catch (error) {
    console.log("DB or AI error:", error);
    return { result: "0", movie_name: "Unknown" };
  }
}

module.exports = { checkAnswerwithAI };
