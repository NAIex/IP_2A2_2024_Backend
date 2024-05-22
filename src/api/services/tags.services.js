import createError from "http-errors";
import prisma from "../../prisma/index.js";
import { promises as fsPromises } from "fs";
import jwt from 'jsonwebtoken';

class TagService {

    static async getTags() {
        try {
            const tags = await prisma.Tag.findMany();
            return tags;
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred while fetching tags');
        }
    }

    static async postTags(req) {

        const userId = req.user.id;
        const { name } = req.body;

        console.log('##########################################' + name, userId);
    
        if (!name) {
            throw new Error("Tag name is required");
        }
    
        const existingTag = await prisma.Tag.findUnique({
            where: { name }
        });
    
        if (existingTag) {
            throw new Error("Tag name already exists");
        }
    
        return await prisma.TagRequest.create({
            data: { tagName: name, userId: userId },
        })
    }
    
}

export default TagService;