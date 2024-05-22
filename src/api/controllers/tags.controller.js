import TagService from "../services/tags.services.js";

class tagController {

    static getTags = async (req, res, next) => {
        try {
            const tags = await TagService.getTags();
            res.status(200).json({
                status: true,
                message: "Tags displayed successfully!",
                data: tags
            });
        } catch (e) {
            next(e);
            console.log(e);
            res.send(e);
        }
    };

    static postTags = async (req, res, next) => {
        try {
            await TagService.postTags(req, res, next); 
        } catch (e) {
            next(e);
        }
    };

}

export default tagController;