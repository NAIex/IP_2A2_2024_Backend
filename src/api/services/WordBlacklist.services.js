import prisma from "../../prisma/index.js";
import createError from "http-errors";

class WordBlacklistService {
    
    static async viewWordBlacklist() {
        try {
            const wordBlacklist = await prisma.WordBlacklist.findMany();
            return wordBlacklist;
        } catch (error) {
            throw createError(500, 'Database error when fetching the blacklist.');
        }
    }

    static async addWordToWordBlacklist(wordData) {
        const { word } = wordData;
        if (!word) {
            throw createError(400, 'You must provide a word to add to the blacklist.');
        }

        try {
            const sameWord = await prisma.WordBlacklist.findUnique({
                where: { word }
            });

            if (sameWord) {
                throw createError(409, `The word '${word}' already exists in the blacklist.`);
            }

            const newWord = await prisma.wordBlacklist.create({ data: { word } });
            return newWord;
        } catch (error) {
            if (error.status) {
                throw error;
            }
            throw createError(500, `Database error when adding a word to the blacklist: ${error.message}`);
        }
    }

    static async deleteWordFromWordBlacklist(wordData) {
        const { word } = wordData;
        if (!word) {
            throw createError(400, 'You must provide a word to delete from the blacklist.');
        }

        try {
            const wordEntry = await prisma.WordBlacklist.findUnique({
                where: { word }
            });

            if (!wordEntry) {
                throw createError(404, `The word '${word}' was not found in the blacklist.`);
            }

            const deletedWord = await prisma.WordBlacklist.delete({
                where: { word }
            });
            return deletedWord;
        } catch (error) {
            if (error.code === 'P2025' || error.status) {
                throw createError(404, `The word '${word}' was not found in the blacklist.`);
            }
            throw createError(500, `Database error when deleting a word from the blacklist: ${error.message}`);
        }
    }

    static async checkTextForBlacklistedWords(text) {
        try {
            const blacklistEntries = await prisma.WordBlacklist.findMany();
            const blacklistedWords = blacklistEntries.map(entry => entry.word.toLowerCase());

            const inputWords = text.toLowerCase().split(/\s+/);

            const foundBlacklistedWords = inputWords.filter(word => blacklistedWords.includes(word));

            return foundBlacklistedWords;
        } catch (error) {
            console.error("Error during blacklist check:", error);
            throw createError(500, "Internal server error while checking the blacklist.");
        }
    }
}

export default WordBlacklistService;