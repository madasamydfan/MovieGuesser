const express = require('express')
const axios = require('axios');
const { GoogleGenAI } = require('@google/genai');

// Initialize the ai instance with your API key
const ai = new GoogleGenAI({ apiKey: "AIzaSyDVh4LOsByojljF3XEtSRHaZA7qSojJQ-8" });
const options = {
  method: 'GET',
  url: 'https://imdb236.p.rapidapi.com/imdb/search',
  params: {
    type: 'movie',
    genre: 'Drama',
    rows: '1',
    sortOrder: 'ASC',
    sortField: 'id',
    
  },
  headers: {
    'x-rapidapi-key': '98f8ecf8fbmsh063188e17a36fdap1107fbjsncfd81697664b',
    'x-rapidapi-host': 'imdb236.p.rapidapi.com'
  }
};

async function fetchData() {
	try {
		const response = await axios.request(options);
    const movie = response.data.results[0];
    const title = movie.primaryTitle;
    const movieDescription = movie.description;
    const movieId= movie.id;
    const genres = movie.genres; 
    const releaseYear = movie.startYear;
    const spokenLanguages = movie.spokenLanguages; 
    

async function generateQuestion() {
  
  const prompt = `
  Movie Description: ${movieDescription}
  Genres: ${genres.join(', ')}
  Release Year: ${releaseYear}
  Genres : ${genres}
  See Iam preparing a movie guess kinda game , i will give the data, you give the description based Text to guess the movie,and three clues
  to help it, You just have to understand the description i give , remove the character name , and understand the context of the movie, by telling 
  the plot you will have to give the prompt.
  
  Task:
  1. Create a guess-the-movie question based on the above.
  2. Don't reveal the movie title or character names.
  3. Give 3 clues separately.
  `;
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });
  console.log(title)
  console.log(response.text);
  }
  generateQuestion()
		//console.log(response.data);
    // async function listModels() {
    //   try {
    //     // Get the list of available models
    //     const response = await ai.models.listModels();
    
    //     // Log the available models
    //     console.log('Available Models:', response);
    //   } catch (error) {
    //     console.error('Error listing models:', error);
    //   }
    // }
    // listModels()
	} catch (error) {
		console.error(error);
	}
}

fetchData();
