import prisma from "../../prisma/index.js";
import createError from "http-errors";

class WordBlacklistService {

    static async viewWordBlacklist() {
        const wordBlacklist = await prisma.WordBlacklist.findMany();
        return wordBlacklist;
    }

    static async addWordToWordBlacklist(wordData) {
        const { word } = wordData;

        if (!word) {
            throw createError.BadRequest('Cannot provide an empty word!');
        }
        
        try {
            const sameWord = await prisma.wordBlacklist.findUnique({
                where: { word: word }
            });

            if (sameWord) {
                throw createError.Conflict(`Word '${word}' already exists in the blacklist.`);
            }

            let newWord = await prisma.wordBlacklist.create({
                data: {
                    word: word
                },
            });
            return newWord;

        } catch (error) {
            console.error("Error adding word to blacklist: ", error);
            throw error;
        }
    }

    static async deleteWordFromWordBlacklist(wordData) {
        const { word } = wordData;

        if (!word) {
            throw createError.BadRequest('Cannot provide an empty word!');
        }

        try {
            const wordToDelete = await prisma.wordBlacklist.findUnique({
                where: { word: word }
            });

            if (!wordToDelete) {
                throw createError.NotFound(`Word '${word}' not found in the blacklist.`);
            }

            const deletedWord = await prisma.wordBlacklist.delete({
                where: { word: word }
            });

            return deletedWord;

        } catch (error) {
            console.error("Error deleting word from blacklist: ", error);
            throw error;
        }
    }
}

export default WordBlacklistService