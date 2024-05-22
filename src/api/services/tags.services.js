import createError from "http-errors";
import prisma from "../../prisma/index.js";
import { promises as fsPromises } from "fs";

class TagService {

    static async getTags(req, res) {
        try {
            const tags = await prisma.Tag.findMany();
            return tags;
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred while fetching tags');
        }
    }

    static async postTags(req, res, next) { 
        const { name } = req.body;

        if (!name) {
            return next(createError(400, "Tag name is required"));
        }

        try {
            const existingTag = await prisma.Tag.findUnique({
                where: { name }
            });

            if (existingTag) {
                return next(createError(409, "Tag name already exists"));
            }

            const tag = await prisma.Tag.create({
                data: { name },
            });

            res.status(201).json(tag);
        } catch (error) {
            console.error("Error creating tag:", error);
            next(createError(500, "Unable to create tag"));
        }
    }
}

export default TagService;