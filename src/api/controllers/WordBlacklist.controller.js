import WordBlacklistService from "../services/WordBlacklist.services.js";

class WordBlacklistController {
    static async viewWordBlacklist(req, res, next) {
        try {
            const list = await WordBlacklistService.viewWordBlacklist();
            res.status(200).json({
                status: true,
                message: 'Word Blacklist displayed successfully!',
                data: list
            });
        } catch (error) {
            next(error);
        }
    }

    static async addWordToWordBlacklist(req, res, next) {
        try {
            const list = await WordBlacklistService.addWordToWordBlacklist(req.body);
            res.status(200).json({
                status: true,
                message: "Word added successfully!",
                data: list
            });
        } catch (error) {
            next(error);
        }
    }

    static async deleteWordFromWordBlacklist(req, res, next) {
        try {
            const list = await WordBlacklistService.deleteWordFromWordBlacklist(req.body);
            res.status(200).json({
                status: true,
                message: "Word deleted successfully!",
                data: list
            });
        } catch (error) {
            next(error);
        }
    }

    static async checkText(req, res, next) {
        try {
            const { text } = req.body;
            const foundBlacklistedWords = await WordBlacklistService.checkTextForBlacklistedWords(text);

            if (foundBlacklistedWords.length > 0) {
                res.status(403).json({
                    status: false,
                    message: "The text contains prohibited words.",
                    blacklistedWords: foundBlacklistedWords
                });
            } else {
                res.status(200).json({
                    status: true,
                    message: "The text contains no prohibited words."
                });
            }
        } catch (error) {
            next(error);
        }
    }
}

export default WordBlacklistController;