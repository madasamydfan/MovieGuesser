const e = require("express");

const pool = require("./db");
const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function RewriteintoDb() {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query("SELECT id,description FROM questions");
    // console.log(rows[0]);
    var i;
    for ( i = 261; i < rows.length; i++) {
      //    i=0;
      const oldDescription = rows[i].description;
     // console.log(oldDescription)
      const newDescription = await EasyQuestion(oldDescription);
      console.log(newDescription);
      await conn.query("UPDATE questions SET description = ? WHERE id = ?", [
        newDescription,
        rows[i].id,
      ]);
      //     const[result] = await conn.query('SELECT id,description FROM questions');
      // console.log(result[0]);
    }
  } catch (err) {
    console.log("Error", err,"AT the i value :",i);
  } finally {
    conn.release();
  }
}

(async () => {
  await RewriteintoDb();
})();

async function EasyQuestion(oldDescription) {
  const prompt = `
Rewrite the following movie description to make it easier for a 10-year-old to understand.
Keep the main idea but use simpler words.
Only change if the words are difficult; otherwise, keep it the same.
Output only the rewritten description — no extra comments.

Description:
${oldDescription}
`;
try{
const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });
 // console.log(response.candidates[0].content.parts[0].text);
  return response.candidates[0].content.parts[0].text;
}
catch(error){
    console.log("Error in AI:",error);
}
  
}
