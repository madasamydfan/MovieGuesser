const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI({ apiKey: "AIzaSyDVh4LOsByojljF3XEtSRHaZA7qSojJQ-8" });

async function checkAnswerwithAI(userAnswer,movie_name) {
	const prompt = `I will give a userAnswer and a original Title of the Movie, You have to tell me 
	whether the userAnswwer is refering the same movie that i give, neglect case sensitivity , spelling mistake ,if both the movies are same
	tell me response as '1' and '0' if not.nothing more nothing less
	${movie_name}
	${userAnswer}
	` 
	const response = await ai.models.generateContent({
		model: "gemini-2.0-flash",
		contents: prompt,
	  });
	console.log(response.candidates[0].content.parts[0].text);
}
const userAnswer = "pudhupettai";
const movie_name = "Petta"
 checkAnswerwithAI(userAnswer,movie_name)

 module.exports = {checkAnswerwithAI}