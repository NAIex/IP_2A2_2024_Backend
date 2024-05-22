import createError from "http-errors";
import prisma from "../../prisma/index.js";
import { promises as fsPromises } from "fs";

class TagService {

    static async getTags() {    

        const tags = await prisma.Tag.findMany();
        res.send(tags);
        
    }
}

export default TagService;