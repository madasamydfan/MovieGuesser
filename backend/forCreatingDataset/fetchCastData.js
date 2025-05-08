const axios = require('axios')


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
           // 'x-rapidapi-key': '98f8ecf8fbmsh063188e17a36fdap1107fbjsncfd81697664b',
           'x-rapidapi-key': '18de5db6aamshcfb79b4232eccc5p1ff057jsna5e632a86c76',
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