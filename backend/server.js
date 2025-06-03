const express = require("express");
const axios = require("axios");
const { nextClue } = require("./getNextClue");
const { nextQuestion } = require("./getnextQuestion");
const { leaderboard } = require("./leaderboard");
const bodyParser = require("body-parser");
const cors = require("cors");
const { checkAnswerwithAI } = require("./checkAnswer");
const dotenv = require("dotenv");
// const serverless = require("serverless-http");

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Welcome to the Rest API");
});

app.get("/movieguess", async (req, res) => {
  try{
    const response = await nextQuestion();
   // console.log(response);
    res.json({ description: response.description, imdb_id: response.imdb_id });
  }
  catch(error){
    console.error("Error fetching question:", error);
    res.status(500).json({ error: "Failed to fetch question" });
  }
});

app.post("/movieguess", async (req, res) => {
  const type = req.query.type;
  if (type === "clue") {
    try{
      const clueNo = req.body.clueNo;
      const imdb_id = req.body.imdb_id;
      // console.log(clueNo, imdb_id);
      const clue = await nextClue(imdb_id, clueNo);
      //console.log(clue);
      if (!clue || !clue.length) {
        return res.status(404).json({ error: "Clue not found" });
      }
      res.json({ clue: clue[0].clue });
    }
    catch (error) {
      console.error("Error fetching clue:", error);
      res.status(500).json({ error: "Failed to fetch clue" });
    }
  }
  // console.log(req.body)
  else if (type === "answerCheck") {
    try{
      const imdb_id = req.body.id;
      const userAnswer = req.body.userAnswer;
      // console.log(imdb_id)
      const {result,movie_name} = await checkAnswerwithAI(userAnswer, imdb_id);  
      // console.log(movie_name)
        res.json({"answer":result,"originalAnswer": movie_name});
      }
    catch (error) {
      console.error("Error fetching movie name:", error);
      res.status(500).json({ error: "Failed to fetch movie name" });
    }
  }
  else if(type === "leaderboard"){
    try{
      const username = req.body.username;
      const score = req.body.score;
      // console.log(username,score)
      const topscorers = await leaderboard(username,score);
      // console.log(topscorers)
      res.json(topscorers);
    }
    catch (error) {
      console.error("Error fetching leaderboard:", error);
      res.status(500).json({ error: "Failed to fetch leaderboard" });
    } 
  }
});
// const PORT = process.env.PORT || 8080;
const PORT = process.env.PORT || 5172;
console.log("PORT from env:", process.env.PORT);
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

// module.exports = serverless(app);