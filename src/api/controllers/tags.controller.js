import TagService from "../services/tags.services.js";

class tagController {

    static getTags = async (req, res, next) => {
        try {
            const data = await TagService.getTags();
            res.status(200).json({
                status: true,
                message: "Tags displayed successfully!",
                data
            });
        } catch (e) {
            next(e);
            console.log(e);
            res.send(e);
        }
    };

}

export default tagController;