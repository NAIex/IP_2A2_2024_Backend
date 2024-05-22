import createError from "http-errors";
import prisma from "../../prisma/index.js";
import { promises as fsPromises } from "fs";

class TagService {

    static async getTags() {    

        const tags = await prisma.Tag.findMany();
        res.send(tags);
        
    }

    static async postTags(userData) {
        const { name } = userData.name;

        if (!name) {
            return next(createError(400, "Tag name is required"));
        }

        try {
            const tag = await prisma.Tag.create({
                data: {
                    name,
                },
            });
            res.status(201).send(tag);
        } catch (error) {
            next(createError(500, "Unable to create tag"));
        }
    }
}

export default TagService;