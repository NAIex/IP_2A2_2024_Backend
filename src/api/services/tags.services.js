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
    
}

export default TagService;