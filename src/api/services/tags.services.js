import createError from "http-errors";
import prisma from "../../prisma/index.js";

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
        
        const userId = 4;
        const { name } = req.body;
    
        if (!name) {
            throw new Error("Tag name is required");
        }
    
        const existingTag = await prisma.Tag.findUnique({
            where: { name }
        });
    
        if (existingTag) {
            throw new Error("Tag name already exists in Tag table");
        }
    
        const existingTagRequest = await prisma.TagRequest.findUnique({
            where: { tagName: name }
        });
    
        if (!existingTagRequest) {
            return await prisma.TagRequest.create({
                data: { tagName: name, userId: userId }
            });
        }
    }
    
}

export default TagService;