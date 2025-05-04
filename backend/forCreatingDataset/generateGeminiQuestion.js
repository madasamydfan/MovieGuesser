const axios = require('axios');
const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI({ apiKey: "AIzaSyDVh4LOsByojljF3XEtSRHaZA7qSojJQ-8" });

async function generateQuestion(detailsForPrompt) {
   // console.log(detailsForPrompt);
    movieDescription = detailsForPrompt[0];
    genres = detailsForPrompt[1];
    releaseYear = detailsForPrompt[2];
    crew = detailsForPrompt[3][0];
    actors = detailsForPrompt[3][1];
    title =detailsForPrompt[4];
    movieId = detailsForPrompt[5]
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
    The result should be in the format 
    Description : ______
    Clue 1:_____
    Clue 2:_______
    Clue 3:_________
  
    no other extra symbols and text ,like okay here the movie guess kinda things, just what i asked
  
    `;
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    const finalText = response.candidates[0].content.parts[0].text;
    //console.log(finalText);
   // console.log(title);
    return {title,finalText,movieId};
   
}

module.exports = {generateQuestion};
