# MovieGuesser

MovieGuesser is an interactive web game where players guess movies based on AI-generated descriptions and clues. The game leverages modern JavaScript, CSS, and HTML, and uses a Node.js backend powered by Google Gemini AI for natural language understanding.

---

## Features

- **AI-generated questions:** Each round gives you a short, AI-crafted movie description (without naming the movie or characters) to guess from.
- **Hints/Clues:** Up to three helpful clues per movie—from genre/year, to director/writers, to main actors.
- **Smart Answer Checking:** Accepts correct answers with minor typos or variations, using Google Gemini AI.
- **Score System:** Earn points based on correct answers and clues used.
- **Modern UI:** Responsive, visually appealing, and mobile-friendly interface.

---

## How to Play

1. Read the description and try to guess the movie.
2. Enter your guess in the provided input box.
3. If unsure, use the "bulb" clue button for up to three hints.
4. Click "Check" to submit your answer.
5. Points are awarded for correct answers (fewer clues = more points).
6. Play as many rounds as you like!

---

## Tech Stack

- **Frontend:** React (JavaScript), CSS
- **Backend:** Node.js, Express, Google Gemini AI API
- **Database:** MySQL (for storing questions and answers)
- **Deployment:** Microsoft Azure

---

## Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/madasamydfan/MovieGuesser.git
   cd MovieGuesser
   ```

2. **Backend Setup:**
   - Install dependencies:
     ```bash
     cd backend
     npm install
     ```
   - Set up your `.env` file with your Google Gemini API key and MySQL database credentials.
   - Start the backend server:
     ```bash
     node server.js
     ```

3. **Frontend Setup:**
   - Install dependencies:
     ```bash
     cd ../frontend
     npm install
     ```
   - Set up your `.env` file (`VITE_BACKEND_URL`) to point to your backend server.
   - Start the frontend:
     ```bash
     npm start
     ```

---

## Project Structure

```
MovieGuesser/
├── backend/
│   ├── server.js
│   ├── checkAnswer.js
│   └── forCreatingDataset/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── MovieguessPage.jsx
│   │   └── css/
│   └── public/
└── README.md
```

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

This project currently does not specify a license.

---

## Acknowledgements

- [Google Gemini AI](https://ai.google.dev/)
- [Microsoft Azure](https://azure.microsoft.com/)
- Movie data sourced via internal dataset and AI generation.

---

Enjoy playing and challenge your friends!
