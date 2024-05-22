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
            const tag = await TagService.postTags(req.body);
            res.status(201).json({
                status: true,
                message: "Tag created successfully!",
                data: tag
            });
        } catch (error) {
            console.error("Error in creating tag:", error.message);
            next(error);
        }
    };
}

export default tagController;