function parseGeneratedText(text) {
    const descriptionMatch = text.match(/Description\s*:\s*(.*?)(?=\nClue 1:)/s);
    const clue1Match = text.match(/Clue 1\s*:\s*(.*?)(?=\nClue 2:)/s);
    const clue2Match = text.match(/Clue 2\s*:\s*(.*?)(?=\nClue 3:)/s);
    const clue3Match = text.match(/Clue 3\s*:\s*(.*)/s);

    const description = descriptionMatch ? descriptionMatch[1].trim() : '';
    const clue1 = clue1Match ? clue1Match[1].trim() : '';
    const clue2 = clue2Match ? clue2Match[1].trim() : '';
    const clue3 = clue3Match ? clue3Match[1].trim() : '';

    return { description, clue1, clue2, clue3 };
}

module.exports = {parseGeneratedText}