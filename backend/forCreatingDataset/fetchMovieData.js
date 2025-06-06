const express = require('express')
const axios = require('axios');
const {fetchCastData} = require('./fetchCastData')
const {parseGeneratedText} = require('./parseGeneratedQuestion')
const {generateQuestion} = require('./generateGeminiQuestion');
const writeToDB = require('./writeIntoDb');
require('dotenv').config();
async function fetchMovieData(){
    // let listOfGenres = ["Action","Comedy","Romance","Crime","Thriller","Horror","Adventure","Drama","Mystery"];
  
    const options = {
      method: 'GET',
      url: 'https://imdb236.p.rapidapi.com/imdb/search',
      params: {
        type: 'movie',
        genre:"Crime", 
        //comedy done,romance,action,crime,
        //local db thriller ,romance, action mystery  -- comedy adventure crime horror
        averageRatingFrom: '5',
        numVotesFrom: '2000',
        startYearFrom: '2000',
        rows: '100',
        spokenLanguages: 'ta',
        sortOrder: 'DESC',
        sortField: 'numVotes'
      },
      headers: {
        'x-rapidapi-key': process.env.RAPID_API_KEY,
        'x-rapidapi-host': 'imdb236.p.rapidapi.com'
      }
    };
    const response = await axios.request(options);
  //  console.log(response);
  //console.log(response.data.results[0]);
  for(let i=99;i>0;i--){
    try{
      const detailsForPrompt = await fetchCastData(response.data.results[i]);
    }
    catch(error){
      continue;
    }
  
   const {title,finalText,movieId} = await generateQuestion(detailsForPrompt);
   const parsed = parseGeneratedText(finalText);
   parsed["title"] = title;
   parsed["movie_id"] = movieId;
   console.log(parsed);
   writeToDB(parsed);
  }
    //return response.data.results[0];
}

function reqmoviedata(){
  fetchMovieData();
}
reqmoviedata()
