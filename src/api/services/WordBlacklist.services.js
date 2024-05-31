import prisma from "../../prisma/index.js";
import createError from "http-errors";

class WordBlacklistService {

    static async viewWordBlacklist() {
        const wordBlacklist = await prisma.WordBlacklist.findMany();
        return wordBlacklist;
    }

    static async addWordToWordBlacklist(wordData) {
        const { word } = wordData;

        if(!word) {
            throw createError.BadRequest('Cannot provide empty word!');
        } else {
            const sameWord = await prisma.WordBlacklist.findUnique({
                where: { word: word }
            })

            if(sameWord) {
                throw createError.BadRequest('Word already exists in the blacklist!');
            }
        }

        let newWord = await prisma.wordBlacklist.create({
            data: {
                word: word
            },
        })
        return newWord;
    }

    static async deleteWordFromWordBlacklist(wordData) {
        const { word } = wordData;

        if(!word) {
            throw createError.BadRequest('Cannot provide empty word!');
        } else {
            const wordNotFound = await prisma.WordBlacklist.findUnique({
                where: { word: word }
            })

            if(!wordNotFound) {
                throw createError.BadRequest('Word not found in blacklist!');
            }
        }

        const deletedWord = await prisma.WordBlacklist.delete({
            where: { word: word }
        });

        return deletedWord;
    }

}

export default WordBlacklistService