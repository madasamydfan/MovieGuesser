const express = require('express')
const axios = require('axios');
const { GoogleGenAI } = require('@google/genai');

// Initialize the ai instance with your API key
const ai = new GoogleGenAI({ apiKey: "AIzaSyDVh4LOsByojljF3XEtSRHaZA7qSojJQ-8" });
//for movie data
let listOfGenres = ["Action","Comedy","Romance","Crime","Thriller","Horror","Adventure","Drama","Mystery"];
let randomIndex = Math.floor(Math.random() * listOfGenres.length);
const options = {
  method: 'GET',
  url: 'https://imdb236.p.rapidapi.com/imdb/search',
  params: {
    type: 'movie',
    genre: `${listOfGenres[randomIndex]}`,
    averageRatingFrom: '8',
    numVotesFrom: '3000',
    startYearFrom: '2000',
    rows: '50',
    spokenLanguages: 'ta',
    sortOrder: 'DESC',
    sortField: 'averageRating'
  },
  headers: {
    'x-rapidapi-key': '98f8ecf8fbmsh063188e17a36fdap1107fbjsncfd81697664b',
    'x-rapidapi-host': 'imdb236.p.rapidapi.com'
  }
};


async function fetchData() {
	try {
		const response = await axios.request(options);
    const movie = response.data.results[randomIndex];
    const title = movie.originalTitle;
    const movieDescription = movie.description;
    const movieId= movie.id;
    const genres = movie.genres; 
    const releaseYear = movie.startYear;
    const spokenLanguages = movie.spokenLanguages; 
    //for cast of a movie
      const optionsforcast = {
      method: 'GET',
      url: `https://imdb236.p.rapidapi.com/imdb/${movieId}/cast`,
      headers: {
        'x-rapidapi-key': '98f8ecf8fbmsh063188e17a36fdap1107fbjsncfd81697664b',
        'x-rapidapi-host': 'imdb236.p.rapidapi.com'
      }
        };
        
    const castresponse = await axios.request(optionsforcast);
    //console.log(castresponse);
    
    const actors = [];
    const crew = [];

    castresponse.data.forEach(person => {
      if (person.job === "actor" || person.job === "actress") {
        actors.push(person.fullName);
      } else if (["director", "writer"].includes(person.job)) {
        crew.push(person.fullName);
      }
    });

    // console.log("Actors:", actors);
    // console.log("Crew:", crew);

async function generateQuestion() {
  
  const prompt = `
  Movie Description: ${movieDescription}
  Genres: ${genres.join(', ')}
  Release Year: ${releaseYear}
  Genres : ${genres}
  cast : ${crew}
  actors :${actors}
  See Iam preparing a movie guess kinda game , i will give the data, you give the description based Text to guess the movie,and three clues
  to help it, You just have to understand the description i give , remove the character name , and understand the context of the movie, by telling 
  the plot you will have to give the prompt.The description should be maximum of two lines .simple clue are good , i will give the cast and crew , in clue one 
  tell about the movie ,year of relese or genre mixed.second one should be The director and writers.third one should be actors. just two or three main 
  actors.
  
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
	} catch (error) {
		console.error(error);
	}
}

fetchData();
