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
            const result = await TagService.postTags(req);
            if (result) {
                res.status(201).json({
                    status: true,
                    message: "Tag request created successfully!",
                    data: result
                });
            } else {
                res.status(409).json({
                    status: false,
                    message: "Tag request already exists or tag is already available."
                });
            }
        } catch (error) {
            console.error("Error in handling tag request:", error.message);
            res.status(400).json({
                status: false,
                message: error.message
            });
        }
    };
    
}

export default tagController;