const axios = require('axios')
require('dotenv').config();


async function fetchCastData(movie) {
//const movie = response.data.results[0];
        const title = movie.originalTitle;
       // const title = movie.primaryTitle;
        const movieDescription = movie.description;
        const movieId= movie.id;
        const genres = movie.genres; 
        const releaseYear = movie.startYear;
        const spokenLanguages = movie.spokenLanguages; 
        detailsForPrompt = []
        detailsForPrompt.push(movieDescription)
        detailsForPrompt.push(genres)
        detailsForPrompt.push(releaseYear)
        //for cast of a movie
          const optionsforcast = {
          method: 'GET',
          url: `https://imdb236.p.rapidapi.com/imdb/${movieId}/cast`,
          headers: {
            'x-rapidapi-key': process.env.RAPID_API_KEY,
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
        const cast = [];
        cast.push(actors);
        cast.push(crew);
        detailsForPrompt.push(cast)
        detailsForPrompt.push(title)
        detailsForPrompt.push(movieId)
       // console.log(detailsForPrompt);
        return detailsForPrompt;
}

module.exports = {fetchCastData};