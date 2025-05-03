const express = require('express')
const axios = require('axios');
const {fetchMovieData} = require('./fetchMovieData');
const {fetchCastData} = require('./fetchCastData');
const {generateQuestion} = require('./generateGeminiQuestion')
const {parseGeneratedText} = require('./parseGeneratedQuestion')
const {writeToDB} = require('./writeIntoDb')
// Initialize the ai instance with your API key

//for movie data



async function fetchData() {
	try {
	const response = await fetchMovieData();
    // const detailsForPrompt = await fetchCastData(response);
	// const {title,finalText,movieId} = await generateQuestion(detailsForPrompt)
    // // actors = cast[0];
    // // crew = cast[1];
    // // const MovieTitle = generateGeminiQuestion()
	// // 
	// const parsed = parseGeneratedText(finalText);
	// parsed["title"] = title;
	// parsed["movie_id"] = movieId;
	// console.log(parsed);
	} catch (error) {
		console.error(error);
	}
	//writeToDB()
}


fetchData();
