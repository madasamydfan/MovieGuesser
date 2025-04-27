const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3001; // Or any port you like

// Define the root route
app.get('/', (req, res) => {
  res.send('Welcome to the Movie API! Visit /movies to see popular movies.');
});

app.get('/movies', async (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://imdb236.p.rapidapi.com/imdb/most-popular-movies',
    headers: {
      'X-RapidAPI-Key': '98f8ecf8fbmsh063188e17a36fdap1107fbjsncfd81697664b', // Replace with your own key
      'X-RapidAPI-Host': 'imdb236.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    res.json(response.data); // Send movie data to frontend
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching movie data');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
