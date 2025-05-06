const express = require("express");
const axios = require("axios");
// const pool = require('./forCreatingDataset/db')
const { nextClue } = require("./getNextClue");
const { nextQuestion } = require("./getnextQuestion");
const bodyParser = require("body-parser");
const cors = require("cors");
const { checkAnswerwithAI } = require("./checkAnswer");
const app = express();
app.use(cors()); // This allows all origins
app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Welcome to the Rest API");
});

app.get("/movieguess", async (req, res) => {
  try{
    const response = await nextQuestion();
    res.json({ description: response.description, imdb_id: response.imdb_id });
  }
  catch(error){
    console.error("Error fetching question:", err);
    res.status(500).json({ error: "Failed to fetch question" });
  }
});

app.post("/movieguess", async (req, res) => {
  const type = req.query.type;
  if (type === "clue") {
    const clueNo = req.body.clueNo;
    const imdb_id = req.body.imdb_id;
   console.log(clueNo, imdb_id);
    const clue = await nextClue(imdb_id, clueNo);
    //console.log(clue);
    if (!clue || !clue.length) {
      return res.status(404).json({ error: "Clue not found" });
    }
    res.json({ "clue" : clue[0].clue });
  }
  // console.log(req.body)
  if (type === "answerCheck") {
    const id = req.body.id;
    // console.log(id)
    const userAnswer = req.body.userAnswer;
    // console.log(userAnswer,id)
    const { result, movie_name } = await checkAnswerwithAI(userAnswer, id);
    console.log(userAnswer);
    console.log(movie_name);
    //console.log(response)
    res.json({ answer: result, originalAnswer: movie_name });
  }
});

app.listen(5172, () => {
  console.log("Server is running on port 5172");
});

