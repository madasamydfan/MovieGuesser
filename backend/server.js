const express = require("express");
const axios = require("axios");
// const pool = require('./forCreatingDataset/db')
const { nextClue } = require("./getNextClue");
const { nextQuestion } = require("./getnextQuestion");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors()); // This allows all origins
app.use(bodyParser.json());

app.get("/", (req, res) => {
  return res.send("Welcome to the Rest API");
});

app.get("/movieguess", async (req, res) => {
    const response = await nextQuestion();
    res.json({ description: response.description, id: response.id });
});

app.listen(5172, () => {
  console.log("Server is running on port 5172");
});

//  async function  one(){
// 	const {movie_name,imdb_id,description} = await nextQuestion()
// 	cluenumber = 1;
// 	console.log(movie_name,imdb_id,description);
// 	const res = await nextClue(cluenumber,imdb_id);
// 	console.log(res[0].clue)
// }

// one()
