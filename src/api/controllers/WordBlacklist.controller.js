import auth from "../services/WordBlacklist.services.js";

class WordBlacklistController {

    static viewWordBlacklist = async (req, res, next) => {
        try {
            const list = await auth.viewWordBlacklist();
            res.status(200).json({
                status: true,
                message: 'Word Blacklist displayed successfully!',
                data: list
            });
        } catch (e) {
            next(e);
            console.log(e);
            res.send(e);
        }
    };

    static addWordToWordBlacklist = async (req, res, next) => {
        try {
            const list = await auth.addWordToWordBlacklist(req.body);
            res.status(200).json({
                status: true,
                message: "Word added successfully!",
                data: list
            });
        } catch (e) {
            next(e);
            console.log(e);
            res.send(e);
        }
    };

    static deleteWordFromWordBlacklist = async (req, res, next) => {
        try {
            const list = await auth.deleteWordFromWordBlacklist(req.body);
            res.status(200).json({
                status: true,
                message: "Word deleted successfully!",
                data: list
            });
        } catch (e) {
            next(e);
            console.log(e);
            res.send(e);
        }
    };
}

export default WordBlacklistController;